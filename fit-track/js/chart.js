// Weight-progress line chart — hand-rolled SVG, no libraries.
// Follows the dataviz mark specs: 2px round line, 10% area wash, hairline solid
// gridlines, ≥8px end marker with a 2px surface ring, crosshair + tooltip.
import { parseDate, dateStr, daysBetween, fmtDate, fmtMonth, fmtKg, esc } from './util.js';

const C = {
  surface: '#1a1a19',
  grid: '#2c2c2a',
  baseline: '#383835',
  muted: '#898781',
  ink2: '#c3c2b7',
  series: '#3987e5', // categorical slot 1, dark step — 3:1+ on this surface
};

export function renderWeightChart(container, { weights, settings }) {
  const W = Math.max(280, container.clientWidth || 340);
  const H = 220;
  const pad = { l: 38, r: 14, t: 12, b: 24 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;

  const start = settings.startDate;
  const target = settings.targetDate;
  const goalKg = settings.startWeightKg - settings.goalLossKg;
  const today = dateStr();

  // x domain: the full goal window, stretched if data falls outside it
  let x0 = start, x1 = target;
  if (weights.length) {
    if (weights[0].d < x0) x0 = weights[0].d;
    if (weights[weights.length - 1].d > x1) x1 = weights[weights.length - 1].d;
  }
  if (today > x1) x1 = today;
  const span = Math.max(1, daysBetween(x0, x1));
  const x = d => pad.l + (daysBetween(x0, d) / span) * pw;

  // y domain: data + both goal-line endpoints, padded, on clean tick steps
  const ys = [settings.startWeightKg, goalKg, ...weights.map(w => w.kg)];
  let yMin = Math.min(...ys) - 0.5, yMax = Math.max(...ys) + 0.5;
  const step = pickStep(yMax - yMin);
  yMin = Math.floor(yMin / step) * step;
  yMax = Math.ceil(yMax / step) * step;
  const y = v => pad.t + (1 - (v - yMin) / (yMax - yMin)) * ph;

  let g = '';

  // horizontal gridlines + y tick labels (hairline, solid, recessive)
  for (let v = yMin; v <= yMax + 1e-9; v += step) {
    const yy = y(v);
    g += `<line x1="${pad.l}" y1="${yy}" x2="${W - pad.r}" y2="${yy}" stroke="${C.grid}" stroke-width="1"/>`;
    g += `<text x="${pad.l - 7}" y="${yy + 3.5}" text-anchor="end" font-size="10.5" fill="${C.muted}" style="font-variant-numeric:tabular-nums">${stripZero(v)}</text>`;
  }

  // x tick labels: first of each month inside the window, plus the window edges
  for (const t of monthTicks(x0, x1)) {
    g += `<text x="${x(t)}" y="${H - 7}" text-anchor="middle" font-size="10.5" fill="${C.muted}">${fmtMonth(t)}</text>`;
  }

  // goal reference line (neutral — the data series owns the accent hue)
  g += `<line x1="${x(start)}" y1="${y(settings.startWeightKg)}" x2="${x(target)}" y2="${y(goalKg)}"
        stroke="${C.muted}" stroke-width="2" stroke-linecap="round" opacity="0.75"/>`;

  // actual weight series
  const pts = weights.map(w => [x(w.d), y(w.kg)]);
  if (pts.length >= 2) {
    const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('');
    const areaBottom = pad.t + ph;
    g += `<path d="${path}L${pts[pts.length - 1][0].toFixed(1)},${areaBottom}L${pts[0][0].toFixed(1)},${areaBottom}Z" fill="${C.series}" opacity="0.10"/>`;
    g += `<path d="${path}" fill="none" stroke="${C.series}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  if (pts.length) {
    const [ex, ey] = pts[pts.length - 1];
    g += `<circle cx="${ex}" cy="${ey}" r="6.5" fill="${C.surface}"/>`; // 2px surface ring
    g += `<circle cx="${ex}" cy="${ey}" r="4.5" fill="${C.series}"/>`;
  }

  // baseline
  g += `<line x1="${pad.l}" y1="${pad.t + ph}" x2="${W - pad.r}" y2="${pad.t + ph}" stroke="${C.baseline}" stroke-width="1"/>`;

  container.innerHTML = `
    <div class="chart-legend">
      <span class="key"><span class="key-line"></span>Weight</span>
      <span class="key"><span class="key-line goal"></span>Goal path</span>
    </div>
    <div class="chart-wrap">
      <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Weight over time versus goal path">
        ${g}
        <line id="xhair" y1="${pad.t}" y2="${pad.t + ph}" stroke="${C.baseline}" stroke-width="1" visibility="hidden"/>
        <circle id="xdot" r="4.5" fill="${C.series}" stroke="${C.surface}" stroke-width="2" visibility="hidden"/>
      </svg>
      <div class="chart-tip" hidden></div>
    </div>`;

  attachHover(container, weights, pts, W);
}

/* crosshair + tooltip: nearest weigh-in to the pointer */
function attachHover(container, weights, pts, W) {
  if (!pts.length) return;
  const wrap = container.querySelector('.chart-wrap');
  const svg = wrap.querySelector('svg');
  const tip = wrap.querySelector('.chart-tip');
  const xhair = svg.querySelector('#xhair');
  const xdot = svg.querySelector('#xdot');

  function show(clientX) {
    const rect = svg.getBoundingClientRect();
    const sx = (clientX - rect.left) * (W / rect.width);
    let best = 0;
    for (let i = 1; i < pts.length; i++) {
      if (Math.abs(pts[i][0] - sx) < Math.abs(pts[best][0] - sx)) best = i;
    }
    const [px, py] = pts[best];
    xhair.setAttribute('x1', px); xhair.setAttribute('x2', px);
    xhair.removeAttribute('visibility');
    xdot.setAttribute('cx', px); xdot.setAttribute('cy', py);
    xdot.removeAttribute('visibility');
    tip.innerHTML = `${esc(fmtDate(weights[best].d))} · <b>${fmtKg(weights[best].kg)} kg</b>`;
    tip.hidden = false;
    const fx = (px / W) * rect.width;
    tip.style.left = `${Math.min(Math.max(fx, 54), rect.width - 54)}px`;
    tip.style.top = `${(py / 220) * rect.height}px`;
  }
  function hide() {
    tip.hidden = true;
    xhair.setAttribute('visibility', 'hidden');
    xdot.setAttribute('visibility', 'hidden');
  }
  svg.addEventListener('pointermove', e => show(e.clientX));
  svg.addEventListener('pointerdown', e => show(e.clientX));
  svg.addEventListener('pointerleave', hide);
}

function pickStep(range) {
  for (const s of [0.5, 1, 2, 2.5, 5, 10, 20]) {
    if (range / s <= 6) return s;
  }
  return 50;
}

function stripZero(v) {
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

/** First-of-month dates strictly inside the window (skipping ones too close to the edges). */
function monthTicks(x0, x1) {
  const ticks = [];
  const d = parseDate(x0);
  d.setDate(1);
  d.setMonth(d.getMonth() + 1);
  const end = parseDate(x1);
  const span = daysBetween(x0, x1);
  while (d <= end) {
    const s = dateStr(d);
    if (daysBetween(x0, s) / span > 0.04 && daysBetween(s, x1) / span > 0.04) ticks.push(s);
    d.setMonth(d.getMonth() + 1);
  }
  return ticks;
}
