// Small shared helpers.

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

export const pad = n => String(n).padStart(2, '0');

/** Local date as 'YYYY-MM-DD' (never UTC — weigh-ins and habits are local-day concepts). */
export function dateStr(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(s, n) {
  const d = parseDate(s);
  d.setDate(d.getDate() + n);
  return dateStr(d);
}

export function daysBetween(a, b) {
  return Math.round((parseDate(b) - parseDate(a)) / 86400000);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function fmtDate(s, { weekday = false } = {}) {
  const d = parseDate(s);
  const base = `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  return weekday ? `${DAYS[d.getDay()]} ${base}` : base;
}

export function fmtMonth(s) {
  return MONTHS[parseDate(s).getMonth()];
}

export function fmtDuration(ms) {
  const m = Math.floor(ms / 60000);
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
}

export function fmtClock(sec) {
  return `${Math.floor(sec / 60)}:${pad(Math.floor(sec % 60))}`;
}

export function fmtKg(n, signed = false) {
  const v = Math.round(n * 10) / 10;
  const s = v.toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  return signed && v > 0 ? `+${s}` : s;
}

/** Escape user-provided text before injecting into innerHTML. */
export function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export function vibrate(pattern) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

let audioCtx = null;
/** Short double beep for the rest timer (created lazily — needs a user gesture first). */
export function beep() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.18].forEach(t => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = 880;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const at = audioCtx.currentTime + t;
      gain.gain.setValueAtTime(0.25, at);
      gain.gain.exponentialRampToValueAtTime(0.001, at + 0.15);
      osc.start(at);
      osc.stop(at + 0.16);
    });
  } catch { /* audio unavailable — vibration still fires */ }
}
