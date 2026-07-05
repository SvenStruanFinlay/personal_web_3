import {
  state, save, onboarded, logWeight, deleteWeight, currentWeight, goalWeight,
  addHabit, deleteHabit, toggleHabit, habitStreak,
  saveTemplate, deleteTemplate,
  startWorkout, finishWorkout, discardWorkout, lastSetsFor, workoutVolume,
  exportJSON, importJSON, resetAll,
} from './store.js';
import {
  uid, dateStr, addDays, daysBetween, fmtDate, fmtDuration, fmtClock, fmtKg,
  esc, vibrate, beep,
} from './util.js';
import { EXERCISE_LIBRARY, STARTER_TEMPLATES, HABIT_EMOJIS, HABIT_SUGGESTIONS } from './exercises.js';
import { renderWeightChart } from './chart.js';

const $ = (sel, el = document) => el.querySelector(sel);
const views = { today: $('#view-today'), train: $('#view-train'), habits: $('#view-habits'), weight: $('#view-weight') };
const TITLES = { today: 'Today', train: 'Train', habits: 'Habits', weight: 'Weight' };
let activeView = 'today';

/* ================= navigation ================= */

$('#tabbar').addEventListener('click', e => {
  const tab = e.target.closest('.tab');
  if (tab) showView(tab.dataset.view);
});

function showView(name) {
  activeView = name;
  $('#viewTitle').textContent = TITLES[name];
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === name));
  Object.entries(views).forEach(([k, el]) => { el.hidden = k !== name; });
  render();
}

function render() {
  ({ today: renderToday, train: renderTrain, habits: renderHabits, weight: renderWeight })[activeView]();
}

/* ================= goal maths ================= */

function goalStats() {
  const s = state.settings;
  const totalDays = Math.max(1, daysBetween(s.startDate, s.targetDate));
  const elapsed = Math.min(totalDays, Math.max(0, daysBetween(s.startDate, dateStr())));
  const cur = currentWeight();
  const lost = s.startWeightKg - cur;
  const expectedLost = s.goalLossKg * (elapsed / totalDays);
  const ratePerWeek = s.goalLossKg / (totalDays / 7);
  const onTrack = lost >= expectedLost - 0.3;
  const pct = Math.min(100, Math.max(0, (lost / s.goalLossKg) * 100));
  return { cur, lost, expectedLost, ratePerWeek, onTrack, pct, totalDays, elapsed, daysLeft: totalDays - elapsed };
}

/** Linear trend over the recent weigh-ins → projected weight at the deadline. */
function projection() {
  const w = state.weights;
  if (w.length < 2) return null;
  const last = w[w.length - 1];
  let ref = w[0];
  for (const p of w) { if (daysBetween(p.d, last.d) >= 14) ref = p; }
  const days = daysBetween(ref.d, last.d);
  if (days < 5) return null;
  const slope = (last.kg - ref.kg) / days; // kg per day
  const remaining = daysBetween(last.d, state.settings.targetDate);
  if (remaining <= 0) return null;
  return { atDeadline: last.kg + slope * remaining, perWeek: slope * 7 };
}

/* ================= Today ================= */

function renderToday() {
  const g = goalStats();
  const w = state.activeWorkout;
  const lastW = state.workouts[0];
  const todaysDone = state.habits.filter(h => h.log[dateStr()]).length;

  views.today.innerHTML = `
    <p class="sub" style="margin:-4px 2px 0">${fmtDate(dateStr(), { weekday: true })}</p>

    <div class="card">
      <div class="row spread">
        <div class="card-title" style="margin:0">Weight goal</div>
        <span class="pill ${g.onTrack ? 'ok' : 'warn'}">${g.onTrack ? '● On track' : '● Behind plan'}</span>
      </div>
      <div class="row spread" style="margin-top:10px">
        <div>
          <div class="hero-number">${fmtKg(g.cur)}<small> kg</small></div>
          <div class="sub" style="margin-top:4px">${fmtKg(-g.lost, true)} kg since start · ${fmtKg(Math.max(0, state.settings.goalLossKg - g.lost))} kg to go</div>
        </div>
      </div>
      <div class="meter" style="margin-top:12px"><div style="width:${g.pct.toFixed(1)}%"></div></div>
      <div class="row spread tiny" style="margin-top:6px">
        <span>${g.pct.toFixed(0)}% of ${fmtKg(state.settings.goalLossKg)} kg</span>
        <span>${g.daysLeft} days left</span>
      </div>
      <button class="btn block sm" data-action="quick-weigh" style="margin-top:12px">⚖️ Log today's weight</button>
    </div>

    <div class="card">
      <div class="card-title">Workout</div>
      ${w
        ? `<div class="row spread">
             <div><b>${esc(w.name)}</b><div class="tiny">in progress</div></div>
             <button class="btn sm primary" data-action="goto-train">Resume</button>
           </div>`
        : `${lastW
             ? `<div class="sub" style="margin-bottom:10px">Last: <b>${esc(lastW.name)}</b> · ${fmtDate(lastW.date)} · ${Math.round(workoutVolume(lastW)).toLocaleString('en-GB')} kg volume</div>`
             : `<div class="sub" style="margin-bottom:10px">No workouts logged yet.</div>`}
           <button class="btn block primary" data-action="goto-train">🏋️ Start a workout</button>`}
    </div>

    <div class="card">
      <div class="row spread">
        <div class="card-title" style="margin:0">Habits</div>
        <span class="tiny">${todaysDone}/${state.habits.length} today</span>
      </div>
      <div class="list" style="margin-top:10px">
        ${state.habits.length
          ? state.habits.map(h => habitRow(h, { dots: false })).join('')
          : `<div class="empty">No habits yet — add some in the Habits tab.</div>`}
      </div>
    </div>`;
}

/* ================= Habits ================= */

function habitRow(h, { dots = true } = {}) {
  const done = !!h.log[dateStr()];
  const streak = habitStreak(h);
  const dotRow = dots ? `<div class="habit-dots">${last14Dots(h)}</div>` : '';
  return `
    <div class="habit-item">
      <span class="habit-emoji">${h.emoji}</span>
      <div class="grow">
        <div class="habit-name">${esc(h.name)}</div>
        <div class="streak">${streak > 0 ? `<b>🔥 ${streak}</b> day streak` : 'no streak yet'}</div>
        ${dotRow}
      </div>
      ${dots ? `<button class="weigh-del" data-action="habit-del" data-id="${h.id}" aria-label="Delete habit">✕</button>` : ''}
      <button class="habit-check ${done ? 'done' : ''}" data-action="habit-toggle" data-id="${h.id}" aria-label="Toggle habit">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
      </button>
    </div>`;
}

function last14Dots(h) {
  let out = '';
  for (let i = 13; i >= 0; i--) {
    const d = addDays(dateStr(), -i);
    out += `<span class="dot ${h.log[d] ? 'hit' : ''} ${i === 0 ? 'today' : ''}"></span>`;
  }
  return out;
}

function renderHabits() {
  views.habits.innerHTML = `
    <div class="list">
      ${state.habits.length
        ? state.habits.map(h => habitRow(h)).join('')
        : `<div class="empty">Build the habits that make the weight loss stick.<br><br>
             ${HABIT_SUGGESTIONS.map(s =>
               `<button class="btn sm" style="margin:3px" data-action="habit-suggest" data-name="${esc(s.name)}" data-emoji="${s.emoji}">${s.emoji} ${esc(s.name)}</button>`).join('')}
           </div>`}
    </div>
    <button class="btn block" data-action="habit-add">＋ New habit</button>`;
}

function openHabitModal() {
  let emoji = HABIT_EMOJIS[0];
  openModal(m => {
    m.innerHTML = `
      <h2>New habit</h2>
      <div class="field"><label>Name</label><input id="habitName" placeholder="e.g. Drink 2L water" maxlength="40"></div>
      <div class="field"><label>Icon</label><div class="emoji-row">
        ${HABIT_EMOJIS.map(e => `<button class="emoji-opt ${e === emoji ? 'sel' : ''}" data-emoji="${e}">${e}</button>`).join('')}
      </div></div>
      <div class="row">
        <button class="btn grow ghost" data-close>Cancel</button>
        <button class="btn grow primary" id="habitSave">Add habit</button>
      </div>`;
    m.querySelector('.emoji-row').addEventListener('click', e => {
      const b = e.target.closest('.emoji-opt');
      if (!b) return;
      emoji = b.dataset.emoji;
      m.querySelectorAll('.emoji-opt').forEach(x => x.classList.toggle('sel', x === b));
    });
    $('#habitSave', m).addEventListener('click', () => {
      const name = $('#habitName', m).value.trim();
      if (!name) return toast('Give the habit a name');
      addHabit(name, emoji);
      closeModal();
      render();
    });
    setTimeout(() => $('#habitName', m).focus(), 50);
  });
}

/* ================= Train ================= */

function renderTrain() {
  if (state.activeWorkout) return renderActiveWorkout();

  views.train.innerHTML = `
    <div class="section-head"><h2>Routines</h2>
      <button class="btn sm ghost" data-action="tpl-new">＋ New</button>
    </div>
    <div class="list">
      ${state.templates.map(t => `
        <div class="template-card">
          <div class="grow" data-action="tpl-edit" data-id="${t.id}">
            <div class="template-name">${esc(t.name)}</div>
            <div class="template-sub">${t.exercises.map(e => esc(e.name)).join(' · ') || 'empty'}</div>
          </div>
          <button class="btn sm primary" data-action="tpl-start" data-id="${t.id}">Start</button>
        </div>`).join('')}
      <button class="btn block" data-action="empty-start">🕐 Start empty workout</button>
    </div>

    <div class="section-head"><h2>History</h2>
      ${state.workouts.length ? `<span class="tiny">${state.workouts.length} workout${state.workouts.length === 1 ? '' : 's'}</span>` : ''}
    </div>
    <div class="list">
      ${state.workouts.length
        ? state.workouts.slice(0, 30).map(historyItem).join('')
        : '<div class="empty">Your finished workouts will appear here.</div>'}
    </div>`;
}

function historyItem(w) {
  const vol = Math.round(workoutVolume(w));
  const sets = w.exercises.reduce((n, e) => n + e.sets.length, 0);
  return `
    <details class="history-item">
      <summary>
        <div class="grow">
          <b>${esc(w.name)}</b>
          <div class="tiny">${fmtDate(w.date, { weekday: true })} · ${fmtDuration(w.end - w.start)} · ${sets} sets · ${vol.toLocaleString('en-GB')} kg</div>
        </div>
        <span class="tiny">▾</span>
      </summary>
      <div class="history-detail">
        ${w.exercises.map(e => `
          <div class="ex-line">
            <span>${esc(e.name)}</span>
            <span>${e.sets.map(s => `${stripNum(s.kg)}×${s.reps}`).join('  ')}</span>
          </div>`).join('')}
      </div>
    </details>`;
}

const stripNum = v => String(Number(v) || 0).replace(/\.0$/, '');

function renderActiveWorkout() {
  const w = state.activeWorkout;
  views.train.innerHTML = `
    <div class="card">
      <div class="row spread">
        <div>
          <b style="font-size:17px">${esc(w.name)}</b>
          <div class="workout-timer tiny" id="woTimer">${fmtClock((Date.now() - w.start) / 1000)}</div>
        </div>
        <div class="row">
          <button class="btn sm ghost danger" data-action="wo-discard">Discard</button>
          <button class="btn sm primary" data-action="wo-finish">Finish</button>
        </div>
      </div>
    </div>

    ${w.exercises.map((e, ei) => exerciseBlock(e, ei)).join('')}

    <button class="btn block" data-action="wo-add-ex">＋ Add exercise</button>`;
  startWorkoutTimer();
}

function exerciseBlock(e, ei) {
  const prev = lastSetsFor(e.name);
  return `
    <div class="card exercise-card">
      <div class="row spread">
        <span class="exercise-name">${esc(e.name)}</span>
        <button class="weigh-del" data-action="wo-del-ex" data-ex="${ei}" aria-label="Remove exercise">✕</button>
      </div>
      <div class="set-grid head"><span>Set</span><span style="text-align:center">Prev</span><span style="text-align:center">kg</span><span style="text-align:center">Reps</span><span></span></div>
      ${e.sets.map((s, si) => {
        const p = prev && prev[si];
        return `
        <div class="set-grid">
          <span class="set-no">${si + 1}</span>
          <span class="set-prev">${p ? `${stripNum(p.kg)}×${p.reps}` : '—'}</span>
          <input class="set-input" inputmode="decimal" placeholder="${p ? stripNum(p.kg) : 'kg'}" value="${s.kg}" data-ex="${ei}" data-set="${si}" data-field="kg">
          <input class="set-input" inputmode="numeric" placeholder="${p ? p.reps : 'reps'}" value="${s.reps}" data-ex="${ei}" data-set="${si}" data-field="reps">
          <button class="set-done ${s.done ? 'done' : ''}" data-action="set-done" data-ex="${ei}" data-set="${si}" aria-label="Set done">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
          </button>
        </div>`;
      }).join('')}
      <button class="btn sm ghost block" style="margin-top:10px" data-action="wo-add-set" data-ex="${ei}">＋ Add set</button>
    </div>`;
}

let woTimerInterval = null;
function startWorkoutTimer() {
  clearInterval(woTimerInterval);
  woTimerInterval = setInterval(() => {
    const el = $('#woTimer');
    if (!el || !state.activeWorkout) { clearInterval(woTimerInterval); return; }
    el.textContent = fmtClock((Date.now() - state.activeWorkout.start) / 1000);
  }, 1000);
}

function openExercisePicker(onPick) {
  openModal(m => {
    const list = () => {
      const q = ($('#exSearch', m)?.value || '').trim().toLowerCase();
      let html = '';
      for (const [cat, names] of Object.entries(EXERCISE_LIBRARY)) {
        const hits = names.filter(n => n.toLowerCase().includes(q));
        if (!hits.length) continue;
        html += `<div class="ex-cat">${cat}</div>` +
          hits.map(n => `<button class="ex-opt" data-name="${esc(n)}">${esc(n)}</button>`).join('');
      }
      if (q) html = `<button class="ex-opt" data-name="${esc($('#exSearch', m).value.trim())}" style="color:var(--accent)">＋ Add “${esc($('#exSearch', m).value.trim())}”</button>` + html;
      return html || '<div class="empty">No matches — type a name to add it.</div>';
    };
    m.innerHTML = `
      <h2>Add exercise</h2>
      <div class="field"><input id="exSearch" placeholder="Search or type a custom exercise"></div>
      <div id="exList">${''}</div>
      <button class="btn block ghost" data-close style="margin-top:10px">Cancel</button>`;
    const listEl = $('#exList', m);
    listEl.innerHTML = list();
    $('#exSearch', m).addEventListener('input', () => { listEl.innerHTML = list(); });
    listEl.addEventListener('click', e => {
      const b = e.target.closest('.ex-opt');
      if (!b || !b.dataset.name) return;
      closeModal();
      onPick(b.dataset.name);
    });
  });
}

function openTemplateEditor(id) {
  const src = id && state.templates.find(t => t.id === id);
  // working copy — nothing persists until Save
  const tpl = src ? JSON.parse(JSON.stringify(src)) : { id: uid(), name: '', exercises: [] };

  const show = () => openModal(m => {
    m.innerHTML = `
      <h2>${src ? 'Edit routine' : 'New routine'}</h2>
      <div class="field"><label>Name</label><input id="tplName" value="${esc(tpl.name)}" placeholder="e.g. Upper Body" maxlength="40"></div>
      <div class="list" id="tplExs">
        ${tpl.exercises.map((e, i) => `
          <div class="row spread" style="padding:4px 2px">
            <span class="grow" style="font-weight:600">${esc(e.name)}</span>
            <div class="row">
              <button class="btn sm ghost" data-sets="-1" data-i="${i}">−</button>
              <span class="tiny" style="min-width:44px;text-align:center">${e.sets} sets</span>
              <button class="btn sm ghost" data-sets="1" data-i="${i}">＋</button>
              <button class="weigh-del" data-del="${i}">✕</button>
            </div>
          </div>`).join('') || '<div class="empty">No exercises yet.</div>'}
      </div>
      <button class="btn block ghost" id="tplAddEx" style="margin:10px 0">＋ Add exercise</button>
      <div class="row">
        ${src ? `<button class="btn ghost danger" id="tplDelete">Delete</button>` : ''}
        <button class="btn grow ghost" data-close>Cancel</button>
        <button class="btn grow primary" id="tplSave">Save</button>
      </div>`;
    $('#tplName', m).addEventListener('input', e => { tpl.name = e.target.value; });
    $('#tplExs', m).addEventListener('click', e => {
      const setsBtn = e.target.closest('[data-sets]');
      const delBtn = e.target.closest('[data-del]');
      if (setsBtn) {
        const ex = tpl.exercises[Number(setsBtn.dataset.i)];
        ex.sets = Math.max(1, Math.min(10, ex.sets + Number(setsBtn.dataset.sets)));
        closeModal(); show();
      } else if (delBtn) {
        tpl.exercises.splice(Number(delBtn.dataset.del), 1);
        closeModal(); show();
      }
    });
    $('#tplAddEx', m).addEventListener('click', () =>
      openExercisePicker(name => { tpl.exercises.push({ name, sets: 3 }); show(); }));
    $('#tplSave', m).addEventListener('click', () => {
      if (!tpl.name.trim()) return toast('Give the routine a name');
      tpl.name = tpl.name.trim();
      saveTemplate(tpl);
      closeModal(); render();
    });
    $('#tplDelete', m)?.addEventListener('click', () => {
      if (confirm(`Delete routine “${tpl.name}”?`)) { deleteTemplate(tpl.id); closeModal(); render(); }
    });
  });
  show();
}

/* ================= Weight ================= */

function renderWeight() {
  const g = goalStats();
  const proj = projection();
  const s = state.settings;

  views.weight.innerHTML = `
    <div class="stat-grid">
      <div class="stat"><div class="label">Current</div><div class="value">${fmtKg(g.cur)}<small> kg</small></div></div>
      <div class="stat"><div class="label">Lost</div><div class="value">${fmtKg(g.lost)}<small> kg</small></div>
        <div class="delta ${g.lost >= 0 ? 'down' : 'up'}">${g.onTrack ? 'on track' : `plan: ${fmtKg(g.expectedLost)}`}</div></div>
      <div class="stat"><div class="label">Goal</div><div class="value">${fmtKg(goalWeight())}<small> kg</small></div>
        <div class="delta">${fmtDate(s.targetDate)}</div></div>
    </div>

    <div class="card">
      <div class="card-title">Progress</div>
      <div id="weightChart"></div>
      <div class="tiny" style="margin-top:8px">
        Plan pace: <b>${fmtKg(g.ratePerWeek)} kg/week</b>
        ${proj ? ` · Your trend: <b>${fmtKg(proj.perWeek, true)} kg/week</b> → ~${fmtKg(proj.atDeadline)} kg by deadline` : ''}
      </div>
    </div>

    <div class="card">
      <div class="card-title">Log weigh-in</div>
      <div class="row">
        <input class="set-input grow" id="weighKg" inputmode="decimal" placeholder="${fmtKg(g.cur)}" style="font-size:18px;padding:12px 8px">
        <input class="set-input" id="weighDate" type="date" value="${dateStr()}" max="${dateStr()}" style="width:150px;padding:12px 8px">
        <button class="btn primary" data-action="weigh-save">Add</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Recent entries</div>
      ${state.weights.length
        ? [...state.weights].reverse().slice(0, 12).map(w => `
            <div class="weigh-row">
              <span>${fmtDate(w.d, { weekday: true })}</span>
              <span class="row"><span class="kg">${fmtKg(w.kg)} kg</span>
                <button class="weigh-del" data-action="weigh-del" data-d="${w.d}" aria-label="Delete entry">✕</button></span>
            </div>`).join('')
        : '<div class="empty">Weigh in each morning for the smoothest trend.</div>'}
    </div>`;

  renderWeightChart($('#weightChart'), { weights: state.weights, settings: s });
}

function saveWeighInput(kgEl, dEl) {
  const kg = parseFloat(String(kgEl.value).replace(',', '.'));
  if (!kg || kg < 20 || kg > 400) { toast('Enter a weight in kg'); return false; }
  logWeight(dEl ? dEl.value : dateStr(), Math.round(kg * 10) / 10);
  vibrate(20);
  return true;
}

/* ================= modals ================= */

const modalRoot = $('#modalRoot');
const modalStack = [];

function openModal(renderFn, { dismissible = true } = {}) {
  modalStack.push({ renderFn, dismissible });
  paintModal();
}

function paintModal() {
  const top = modalStack[modalStack.length - 1];
  if (!top) { modalRoot.hidden = true; modalRoot.innerHTML = ''; return; }
  modalRoot.hidden = false;
  modalRoot.innerHTML = '<div class="modal"></div>';
  const m = $('.modal', modalRoot);
  top.renderFn(m);
  m.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
}

function closeModal() {
  modalStack.pop();
  paintModal();
}

modalRoot.addEventListener('click', e => {
  const top = modalStack[modalStack.length - 1];
  if (e.target === modalRoot && top?.dismissible) closeModal();
});

/* ================= onboarding & settings ================= */

function openOnboarding() {
  openModal(m => {
    m.innerHTML = `
      <h2>Welcome to FitTrack 💪</h2>
      <p class="sub" style="margin-bottom:14px">Set your weight-loss goal — everything is stored only on this phone.</p>
      <div class="field"><label>Current weight (kg)</label><input id="obKg" inputmode="decimal" placeholder="e.g. 85.0"></div>
      <div class="field"><label>Goal: lose (kg)</label><input id="obLoss" inputmode="decimal" value="10"></div>
      <div class="field"><label>Deadline</label><input id="obDate" type="date" value="${state.settings.targetDate}" min="${dateStr()}"></div>
      <button class="btn block primary" id="obGo">Let's go</button>`;
    $('#obGo', m).addEventListener('click', () => {
      const kg = parseFloat(String($('#obKg', m).value).replace(',', '.'));
      const loss = parseFloat(String($('#obLoss', m).value).replace(',', '.'));
      if (!kg || kg < 20 || kg > 400) return toast('Enter your current weight');
      if (!loss || loss <= 0) return toast('Enter a goal');
      state.settings.startWeightKg = Math.round(kg * 10) / 10;
      state.settings.goalLossKg = Math.round(loss * 10) / 10;
      state.settings.startDate = dateStr();
      state.settings.targetDate = $('#obDate', m).value || state.settings.targetDate;
      logWeight(dateStr(), state.settings.startWeightKg);
      if (!state.templates.length) STARTER_TEMPLATES.forEach(t => saveTemplate({ id: uid(), ...t }));
      save();
      closeModal();
      render();
      toast(`Target: ${fmtKg(goalWeight())} kg by ${fmtDate(state.settings.targetDate)}`);
    });
  }, { dismissible: false });
}

function openSettings() {
  openModal(m => {
    const s = state.settings;
    m.innerHTML = `
      <h2>Settings</h2>
      <div class="field"><label>Start weight (kg)</label><input id="stKg" inputmode="decimal" value="${s.startWeightKg ?? ''}"></div>
      <div class="field"><label>Goal: lose (kg)</label><input id="stLoss" inputmode="decimal" value="${s.goalLossKg}"></div>
      <div class="row" style="gap:10px">
        <div class="field grow"><label>Start date</label><input id="stStart" type="date" value="${s.startDate}"></div>
        <div class="field grow"><label>Deadline</label><input id="stTarget" type="date" value="${s.targetDate}"></div>
      </div>
      <div class="field"><label>Rest timer (seconds)</label><input id="stRest" inputmode="numeric" value="${s.restSec}"></div>
      <button class="btn block primary" id="stSave" style="margin-bottom:16px">Save</button>
      <div class="card-title">Your data</div>
      <div class="row" style="margin-bottom:8px">
        <button class="btn grow sm" id="stExport">⬇ Export backup</button>
        <button class="btn grow sm" id="stImport">⬆ Import backup</button>
      </div>
      <button class="btn block sm ghost danger" id="stReset">Erase all data</button>
      <input type="file" id="stFile" accept="application/json" hidden>
      <p class="tiny" style="margin-top:14px">All data lives in this phone's browser storage — export a backup now and then.</p>`;
    $('#stSave', m).addEventListener('click', () => {
      const kg = parseFloat($('#stKg', m).value);
      const loss = parseFloat($('#stLoss', m).value);
      const rest = parseInt($('#stRest', m).value, 10);
      if (kg > 0) s.startWeightKg = kg;
      if (loss > 0) s.goalLossKg = loss;
      if ($('#stStart', m).value) s.startDate = $('#stStart', m).value;
      if ($('#stTarget', m).value) s.targetDate = $('#stTarget', m).value;
      if (rest >= 10 && rest <= 600) s.restSec = rest;
      save();
      closeModal(); render();
      toast('Saved');
    });
    $('#stExport', m).addEventListener('click', () => {
      const blob = new Blob([exportJSON()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `fittrack-backup-${dateStr()}.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    });
    $('#stImport', m).addEventListener('click', () => $('#stFile', m).click());
    $('#stFile', m).addEventListener('change', async e => {
      const f = e.target.files[0];
      if (!f) return;
      try {
        importJSON(await f.text());
        closeModal(); render();
        toast('Backup restored');
      } catch { toast('Not a valid FitTrack backup'); }
    });
    $('#stReset', m).addEventListener('click', () => {
      if (confirm('Erase ALL FitTrack data on this device? This cannot be undone.')) {
        resetAll();
        closeModal();
        openOnboarding();
        render();
      }
    });
  });
}

$('#settingsBtn').addEventListener('click', openSettings);

/* ================= rest timer ================= */

const restBar = $('#restBar');
const restFill = $('#restBarFill');
const restTimeEl = $('#restTime');
let rest = null; // {endAt, total, interval}

function startRest(sec) {
  stopRest();
  rest = { endAt: Date.now() + sec * 1000, total: sec, interval: setInterval(tickRest, 200) };
  restBar.hidden = false;
  tickRest();
}

function tickRest() {
  if (!rest) return;
  const left = (rest.endAt - Date.now()) / 1000;
  if (left <= 0) {
    stopRest();
    beep();
    vibrate([120, 80, 120, 80, 250]);
    toast('Rest over — next set 💪');
    return;
  }
  restTimeEl.textContent = fmtClock(left);
  restFill.style.transform = `scaleX(${Math.max(0, left / rest.total)})`;
}

function stopRest() {
  if (rest) clearInterval(rest.interval);
  rest = null;
  restBar.hidden = true;
}

$('#restSkip').addEventListener('click', stopRest);
$('#restMinus').addEventListener('click', () => { if (rest) { rest.endAt -= 15000; tickRest(); } });
$('#restPlus').addEventListener('click', () => { if (rest) { rest.endAt += 15000; rest.total += 15; tickRest(); } });

/* ================= event delegation ================= */

$('#main').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;
  const w = state.activeWorkout;

  switch (action) {
    case 'goto-train': showView('train'); break;

    case 'quick-weigh':
      openModal(m => {
        m.innerHTML = `
          <h2>Log weight</h2>
          <div class="field"><label>Today · kg</label><input id="qwKg" inputmode="decimal" placeholder="${fmtKg(currentWeight())}"></div>
          <div class="row">
            <button class="btn grow ghost" data-close>Cancel</button>
            <button class="btn grow primary" id="qwSave">Save</button>
          </div>`;
        $('#qwSave', m).addEventListener('click', () => {
          if (saveWeighInput($('#qwKg', m), null)) { closeModal(); render(); }
        });
        setTimeout(() => $('#qwKg', m).focus(), 50);
      });
      break;

    case 'habit-toggle': {
      const nowDone = toggleHabit(id);
      if (nowDone) vibrate(25);
      render();
      break;
    }
    case 'habit-del': {
      const h = state.habits.find(h => h.id === id);
      if (h && confirm(`Delete habit “${h.name}” and its history?`)) { deleteHabit(id); render(); }
      break;
    }
    case 'habit-add': openHabitModal(); break;
    case 'habit-suggest': addHabit(btn.dataset.name, btn.dataset.emoji); render(); break;

    case 'tpl-new': openTemplateEditor(null); break;
    case 'tpl-edit': openTemplateEditor(id); break;
    case 'tpl-start': {
      const t = state.templates.find(t => t.id === id);
      if (t) { startWorkout(t.name, t.exercises); render(); }
      break;
    }
    case 'empty-start': startWorkout(`Workout — ${fmtDate(dateStr())}`); render(); break;

    case 'wo-add-ex':
      openExercisePicker(name => {
        w.exercises.push({ name, sets: [{ kg: '', reps: '', done: false }, { kg: '', reps: '', done: false }, { kg: '', reps: '', done: false }] });
        save(); render();
      });
      break;
    case 'wo-del-ex':
      if (confirm(`Remove ${w.exercises[Number(btn.dataset.ex)].name}?`)) {
        w.exercises.splice(Number(btn.dataset.ex), 1);
        save(); render();
      }
      break;
    case 'wo-add-set': {
      const ex = w.exercises[Number(btn.dataset.ex)];
      const prevSet = ex.sets[ex.sets.length - 1];
      ex.sets.push({ kg: prevSet ? prevSet.kg : '', reps: prevSet ? prevSet.reps : '', done: false });
      save(); render();
      break;
    }
    case 'set-done': {
      const ex = w.exercises[Number(btn.dataset.ex)];
      const set = ex.sets[Number(btn.dataset.set)];
      if (!set.done) {
        // autofill from the "previous" hint when left blank
        const prev = lastSetsFor(ex.name);
        const p = prev && prev[Number(btn.dataset.set)];
        if (set.kg === '' && p) set.kg = p.kg;
        if (set.reps === '' && p) set.reps = p.reps;
        set.done = true;
        vibrate(25);
        startRest(state.settings.restSec);
      } else {
        set.done = false;
      }
      save(); render();
      break;
    }
    case 'wo-finish': {
      const done = w.exercises.some(e => e.sets.some(s => s.done));
      if (!done) {
        if (confirm('No completed sets — discard this workout?')) { discardWorkout(); stopRest(); render(); }
        break;
      }
      const saved = finishWorkout();
      stopRest();
      render();
      if (saved) toast(`Saved · ${fmtDuration(saved.end - saved.start)} · ${Math.round(workoutVolume(saved)).toLocaleString('en-GB')} kg volume 🎉`);
      break;
    }
    case 'wo-discard':
      if (confirm('Discard this workout?')) { discardWorkout(); stopRest(); render(); }
      break;

    case 'weigh-save':
      if (saveWeighInput($('#weighKg'), $('#weighDate'))) render();
      break;
    case 'weigh-del':
      deleteWeight(btn.dataset.d);
      render();
      break;
  }
});

// live-sync set inputs into state without re-rendering (keeps the keyboard open)
$('#main').addEventListener('input', e => {
  const inp = e.target.closest('.set-input[data-field]');
  if (!inp || !state.activeWorkout) return;
  const ex = state.activeWorkout.exercises[Number(inp.dataset.ex)];
  if (!ex) return;
  ex.sets[Number(inp.dataset.set)][inp.dataset.field] = inp.value;
  save();
});

/* ================= toast ================= */

let toastTimer = null;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
}

/* ================= boot ================= */

showView('today');
if (!onboarded()) openOnboarding();
