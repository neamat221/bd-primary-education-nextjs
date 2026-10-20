# ShikkhaBondhu — Bangladesh Primary Education System

A responsive Next.js (App Router) learning space for Bangladesh primary schools, designed to feel warm and crafted rather than templated: a paper-inspired palette, a sunrise hero, hand-drawn characters, and gentle motion — all built on an accessible, reduced-motion-aware design system.

Eight working pages: Overview dashboard, My learning, Class routine, Attendance, Achievements, Messages, Class community, and Settings.

## Error handling

- **Error boundaries** — `app/(dashboard)/error.jsx` catches route errors with a friendly retry, and `app/global-error.jsx` is the last-resort fallback that renders its own `<html>`/`<body>`.
- **Not found** — `app/not-found.jsx` renders a themed 404 for unknown routes.
- **Toasts & safe actions** — `components/AppProvider.jsx` exposes `notify()` and `runSafely()`, wrapping async work in try/catch so failures surface as toasts instead of silent freezes.
- **Form validation** — Settings validates name, roll, email, and phone inline with `aria-invalid`/`aria-describedby`; Messages validates empty/overlong drafts and guards a missing thread.
- **Defensive UI** — pages guard against missing data (empty subjects, no conversations, missing badge icons) with empty states rather than crashing.

## Design system

- **Tokens first** — warm neutral ink/paper scale, brand washes, and warm-toned elevation defined as CSS custom properties in `app/globals.css`.
- **Typography** — Plus Jakarta Sans (headings), DM Sans (body), Noto Sans Bengali (Bangla text), and Caveat for handwritten accents.
- **Motion** — entrance rises, floating hero art, bar growth, bubble-in chat, and a pulsing notification dot, all disabled under `prefers-reduced-motion`.
- **Accessibility** — visible focus rings, `aria-current` navigation, keyboard/Escape handling for overlays, and a mobile drawer with a blurred backdrop.

## Requirements

- Node.js 20.9+ recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Project structure

- `app/(dashboard)/page.jsx` — interactive dashboard (Overview)
- `app/(dashboard)/learning/` — My learning (subjects + lessons + tips)
- `app/(dashboard)/routine/` — Class routine (weekly timetable)
- `app/(dashboard)/attendance/` — Attendance (calendar + stats + record)
- `app/(dashboard)/achievements/` — Achievements (badges, filters, points)
- `app/(dashboard)/messages/` — Messages (inbox + working chat)
- `app/(dashboard)/community/` — Class community (feed, classmates, notices)
- `app/(dashboard)/settings/` — Settings (profile, language, notifications, safety)
- `app/layout.jsx` — root layout, metadata, and the `AppProvider` mount
- `app/error.jsx` / `app/global-error.jsx` / `app/not-found.jsx` — error boundaries
- `app/globals.css` — documented design system (tokens → base → shell → components → motion → responsive)
- `components/` — AppShell, Sidebar, Topbar, PageHeader, AppProvider, LanguageProvider
- `lib/data.js` — sample data plus five lightweight data classes (see below)
- `lib/i18n.js` — EN/BN dictionaries, `translate()`, `interpolate()`, `LANGUAGES`
- `lib/components/` — five class-level activity datasets + `index.js` barrel:
  - `classplay.js` (Play Group), `classNarchari.js` (Nursery), `classOne.js`, `classTwo.js`, `classThree.js` — 20 activities each
  - `index.js` — exposes `classLevels`, `getClassLevel`, `allActivities`, `allSubjects`, `activitiesBySubject` (also re-exported from `lib/data.js`)

## Classes page (`/classes`)

A working page that uses all five class datasets: class tabs (Play Group → Class Three), per-class subject filter, live search, an activity card grid, and a cross-class subject cloud.

## Language switching (English / বাংলা)

- `lib/i18n.js` holds two flat dictionaries (271 keys) with a `translate(lang, key, vars)` helper that interpolates `{placeholders}` and falls back to English when a Bengali key is missing.
- `components/LanguageProvider.jsx` exposes `useLang()` → `{ lang, setLang, toggleLang, t }`. The choice is saved to `localStorage` and reflected on `<html lang>`/`data-lang`.
- Pages always server-render in English and adopt the saved language after mount, so there is never a hydration mismatch.
- The header `EN / বাং` toggle (in `Topbar`) switches the whole UI instantly — nav, shell, every page, form validation messages, and error screens.

### Adding a new string

1. Add the key under both `en` and `bn` in `lib/i18n.js`.
2. Call `t("your.key")` (or `t("your.key", { name })` for interpolation) inside a client component that uses `useLang()`.

## Data classes (`lib/data.js`)

Five plain JS classes own the sample data and expose the queries the pages need. They run on server and client, and swapping in a real API later means changing method bodies rather than every component.

- `Student` — profile accessors: `firstName`, `label`, `display`, plus raw fields.
- `Subjects` — `all()`, `get(english)`, `first()`, `top(n)`, `lessonsFor(english)`, `averagePercent()`, `count`.
- `Tasks` — `doneIds()`, `get(id)`, `filter({ status, query, completed })`, `progress(completed)`, `count`.
- `Attendance` — `count(status)`, `present`/`absent`/`late`/`schoolDays`, `percent()`, `summary()`.
- `Messages` — `unread()`, `unreadCount()`, `find(id)`, `first()`, `count`.

## Important

This is a frontend demo with sample data. Login, real student records, attendance persistence, teacher/admin permissions, and database integrations are not connected. Before real school use, add secure authentication, role-based authorization, validated APIs, a database, backups, and privacy safeguards. Do not put real children's personal data into this demo.

# Bangladesh Primary Education Class Data

Five JavaScript files, each exporting 20 sample learning activities.

## Next.js usage

```jsx
import playActivities from "@/data/classplay";

export default function PlayGroupPage() {
  return (
    <div>
      {playActivities.map((activity) => (
        <article key={activity.id}>
          <h2>{activity.title}</h2>
          <p>{activity.subject}</p>
          <p>{activity.description}</p>
        </article>
      ))}
    </div>
  );
}
```

Files: `classplay.js`, `classNarchari.js`, `classOne.js`, `classTwo.js`, `classThree.js`.

These are sample activities, not an official NCTB curriculum.
