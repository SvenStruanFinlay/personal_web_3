# FitTrack 💪

A personal gym, habit & weight-loss tracker built as an installable **PWA**.
No accounts, no servers — **all data stays on your phone** (browser local storage).

## Features

- **Train** — workout routines (Push/Pull/Legs seeded, fully editable), set-by-set
  logging with *previous session* hints, auto rest timer with vibration + beep,
  workout history with duration and total volume.
- **Habits** — daily habits with one-tap check-off, 🔥 streaks and a 14-day dot trail.
- **Weight** — weigh-in log, progress chart against your goal path, plan pace vs
  your actual trend, projected weight at your deadline.
- **Today** — one dashboard: goal progress, today's habits, and a start-workout button.
- Offline-first (service worker), backup export/import as JSON.

## Install on your phone (Android / Samsung)

1. Host the app (easiest: GitHub Pages, see below) and open the URL in **Chrome**.
2. Chrome will offer **"Add FitTrack to Home screen → Install"**
   (or use ⋮ menu → *Add to Home screen → Install*).
3. Launch it from your home screen — it runs full-screen and works offline.

> Tip: use Chrome rather than Samsung Internet for the smoothest install prompt,
> though Samsung Internet works too (menu → *Add page to* → *Home screen*).

## Host with GitHub Pages

1. Push this repo to GitHub.
2. Repo → **Settings → Pages → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
3. After a minute the app is live at `https://<user>.github.io/<repo>/`.

## Run locally

Any static file server works — there's no build step:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Your data

- Stored only in this device's browser storage (`localStorage`).
- **Settings → Export backup** downloads a JSON file; import it on a new
  device/browser to restore. Do this occasionally — clearing browser data wipes the app.

## Stack

Vanilla HTML/CSS/JS (ES modules), hand-rolled SVG chart, service worker + web app
manifest. No dependencies, no build step.
