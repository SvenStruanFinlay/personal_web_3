// Single-key localStorage persistence. All data stays on the device.
import { uid, dateStr, addDays } from './util.js';

const KEY = 'fittrack.v1';

function defaults() {
  const today = dateStr();
  return {
    settings: {
      startWeightKg: null,          // set during onboarding
      goalLossKg: 10,
      startDate: today,
      targetDate: addDays(today, 92), // ~3 months
      restSec: 90,
    },
    weights: [],     // [{d:'YYYY-MM-DD', kg}] kept sorted by date
    habits: [],      // [{id, name, emoji, created, log:{'YYYY-MM-DD':true}}]
    templates: [],   // [{id, name, exercises:[{name, sets}]}]
    workouts: [],    // finished sessions, newest first
    activeWorkout: null,
  };
}

export const state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...defaults(), ...JSON.parse(raw) };
  } catch { /* corrupted storage — start fresh */ }
  return defaults();
}

export function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export const onboarded = () => state.settings.startWeightKg != null;

/* ---------- weights ---------- */

export function logWeight(d, kg) {
  const existing = state.weights.find(w => w.d === d);
  if (existing) existing.kg = kg;
  else state.weights.push({ d, kg });
  state.weights.sort((a, b) => a.d.localeCompare(b.d));
  save();
}

export function deleteWeight(d) {
  state.weights = state.weights.filter(w => w.d !== d);
  save();
}

export const currentWeight = () =>
  state.weights.length ? state.weights[state.weights.length - 1].kg : state.settings.startWeightKg;

export const goalWeight = () => state.settings.startWeightKg - state.settings.goalLossKg;

/* ---------- habits ---------- */

export function addHabit(name, emoji) {
  state.habits.push({ id: uid(), name, emoji, created: dateStr(), log: {} });
  save();
}

export function deleteHabit(id) {
  state.habits = state.habits.filter(h => h.id !== id);
  save();
}

export function toggleHabit(id, d = dateStr()) {
  const h = state.habits.find(h => h.id === id);
  if (!h) return false;
  if (h.log[d]) delete h.log[d];
  else h.log[d] = true;
  save();
  return !!h.log[d];
}

/** Consecutive days ending today (or yesterday, if today isn't ticked yet). */
export function habitStreak(h) {
  let d = dateStr();
  if (!h.log[d]) d = addDays(d, -1);
  let n = 0;
  while (h.log[d]) { n++; d = addDays(d, -1); }
  return n;
}

/* ---------- templates ---------- */

export function saveTemplate(tpl) {
  const i = state.templates.findIndex(t => t.id === tpl.id);
  if (i >= 0) state.templates[i] = tpl;
  else state.templates.push(tpl);
  save();
}

export function deleteTemplate(id) {
  state.templates = state.templates.filter(t => t.id !== id);
  save();
}

/* ---------- workouts ---------- */

export function startWorkout(name, exercises = []) {
  state.activeWorkout = {
    id: uid(),
    name,
    date: dateStr(),
    start: Date.now(),
    exercises: exercises.map(e => ({
      name: e.name,
      sets: Array.from({ length: e.sets || 3 }, () => ({ kg: '', reps: '', done: false })),
    })),
  };
  save();
}

export function finishWorkout() {
  const w = state.activeWorkout;
  if (!w) return null;
  w.end = Date.now();
  // keep only exercises with at least one completed set
  w.exercises = w.exercises
    .map(e => ({ ...e, sets: e.sets.filter(s => s.done) }))
    .filter(e => e.sets.length);
  state.activeWorkout = null;
  if (w.exercises.length) state.workouts.unshift(w);
  save();
  return w.exercises.length ? w : null;
}

export function discardWorkout() {
  state.activeWorkout = null;
  save();
}

/** Last completed sets for an exercise name — used as "previous" hints. */
export function lastSetsFor(name) {
  for (const w of state.workouts) {
    const e = w.exercises.find(e => e.name === name);
    if (e && e.sets.length) return e.sets;
  }
  return null;
}

export function workoutVolume(w) {
  return w.exercises.reduce((sum, e) =>
    sum + e.sets.reduce((s, set) => s + (Number(set.kg) || 0) * (Number(set.reps) || 0), 0), 0);
}

/* ---------- backup ---------- */

export function exportJSON() {
  return JSON.stringify(state, null, 2);
}

export function importJSON(text) {
  const data = JSON.parse(text); // throws on bad input — caller handles
  if (!data || typeof data !== 'object' || !data.settings) throw new Error('Not a FitTrack backup');
  Object.assign(state, { ...defaults(), ...data });
  save();
}

export function resetAll() {
  Object.assign(state, defaults());
  save();
}
