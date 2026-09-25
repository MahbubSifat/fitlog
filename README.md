# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a
library of workouts, lock lifts into today's plan, save others for later,
and track your progress — all backed by a REST API and persisted locally
in the browser.

## Technologies Used

- **Next.js 16** (App Router) — routing, layouts, dynamic pages
- **TypeScript** — type-safe components and API data
- **Tailwind CSS** — styling and responsive layout
- **lucide-react** — icon set
- **react-hot-toast** — toast notifications
- **React Context API** — global state for Today's Plan / Saved
- **Browser localStorage** — persists plan/saved data across reloads

## Features

1. **Workout Library** — 12 workouts displayed in a responsive 3×4 grid,
   each with category tags, equipment, and a duration/calories/rating
   stats row, pulled live from a REST API.
2. **Workout Details Page** — dynamic route per workout with a full
   spec table, step-by-step instructions, and Add to Plan / Save actions.
3. **Live Navbar Badges** — "Plan" and "Saved" counters update instantly
   across the whole app via a shared Context, with no page reload needed.
4. **My Plan Page** — Today's Plan and Saved tabs, a live Exercises /
   Minutes / Calories summary, sorting by Duration, Calories, or Rating,
   and Mark as Done / Remove actions per item.
5. **Persistent State** — Today's Plan and Saved lists survive a full
   page reload via localStorage.
6. **Fully Responsive** — usable layout across mobile, tablet, and
   desktop breakpoints.
7. **Custom 404 Page** — friendly not-found page for any invalid route.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Live Demo

- Live Link: https://fitlog-two-self.vercel.app/
- GitHub Repository: https://github.com/MahbubSifat/fitlog