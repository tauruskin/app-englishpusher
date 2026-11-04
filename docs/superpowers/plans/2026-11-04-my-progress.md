# Learning Analytics — Plan 3: Student "My progress" Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A `/progress/` page in the Englishpusher App where every signed-in student sees their own progress across the Quiz Bot and the App. The page has three parts: Coach, Mastery map and Activity. Each topic also has its own page.

> **Layout change (2026-11-04, owner request):** the single long home page is split into three tabs. `#/` is Overview (greeting, three tiles, weak topics, accuracy per week), `#/topics` is Topics (the Mastery map) and `#/activity` is Activity (calendar, tiles, "Where you practise"). `#/topic/<key>` stays a separate page, its back link is "← Topics" and the Topics tab shows as active there. The shell (`App.tsx`) loads `progressApi.me()` once for all tabs. The task code blocks below show the original single-page `Home.tsx`; the code that shipped is split as in the File map.

**Architecture:** A new MPA entry `apps/progress/index.html` → `src/progress/`. It uses hash routes: `#/` for the home page and `#/topic/<key>` for one topic. All numbers come from two live RPCs from plan 1: `analytics_student()` (the caller's own data) and `analytics_student_topic(p_topic_key)`. The page only formats and draws. It reuses the teacher dashboard's modules from `src/teacher/` (formatting, colours, `useData`, UI pieces, column helpers). Two parts are extracted into `src/teacher/rpc.ts` so both pages share them: the RPC call itself and the dev-only demo switch. New pure logic (routes, greeting, grouping, calendar grid, line layout) lives in small `.ts` modules with `node --test` tests. Plan 4 will open the same URL as a Telegram Mini App, so all data access goes through one small `progressApi`.

**Tech Stack:** React 18, TypeScript (strict), Tailwind 3, Vite 6 MPA, `@supabase/supabase-js` RPC, `lucide-react` icons, `node --test` (Node 22, runs `.ts` directly).

**Spec:** `moodle-task-builder/docs/superpowers/specs/2026-11-04-learning-analytics-dashboard-design.md`, section "My progress (student)". The data layer is plan 1, live since 2026-11-04. Plan 2 (`docs/superpowers/plans/2026-11-04-teacher-dashboard.md`, merged as PR #47) built the modules this plan reuses.

---

## Ground rules

- Worktree: `D:\tmp\app-my-progress` (Git Bash `/d/tmp/app-my-progress`), branch `feat/my-progress`, created from `origin/main` at 080ca60. It already exists, and this plan is its first commit.
- Don't touch other checkouts. The only exception is copying `.env.local` in Task 1.
- Create and edit files with the Write/Edit tools, not heredocs. Commit with `git commit -m "<message>" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`. Do not push; Task 13 does that.
- No database writes and no Docker. The RPCs already exist and are live.
- Never print or commit `.env.local`. It is gitignored; check `git status` before every commit.
- After every task, `npm test` and `npm run build` must pass.
- **Privacy:** this page shows one student's results, so Google Tag Manager (GA4 and Clarity session recording) must never load on it. This works the same way as on `/teacher/`; see Task 1.

## RPC contract (live, from plan 1)

Both functions are called with `supabase.rpc(name, args)`. Error codes: `42501` means not signed in or no App profile. `22023` or `22P02` means a bad parameter.

`analytics_student()` takes no arguments and returns the caller's own data:

```
{ person: {id, display_name, role} | null,
  summary: {accuracy, accuracy_prev, answers, streak, words_learned, active_days_month, last_active},
  weak_topics: [{topic_key, title, kind, level, answers, accuracy, mastery}],      // ≤ 3, weakest first
  topics: [{topic_key, kind, level, title, answers, accuracy, mastery, last_at}],  // every topic practised
  trend: [{week:'YYYY-MM-DD', answers, accuracy|null}],                            // 8 weeks, oldest first, Monday dates
  calendar: [{day:'YYYY-MM-DD', events, by_source:{bot:n,…}}],                    // last 90 days, days with events only
  sources: {bot:n, app:n, …} }                                                     // all-time events per source
```

`analytics_student_topic(p_topic_key text)` returns:

```
{ topic_key, title,                     // title is "" for an unknown key (no error is raised)
  trend: [{week, answers, accuracy|null}],   // 12 weeks
  recent_mistakes: [{topic_key, title, item, item_label, source, activity, occurred_at}] }  // ≤ 10, newest first
```

How the numbers are defined:
- `accuracy` and `answers` cover the last 30 days, and `accuracy_prev` the 30 days before that.
- `mastery` is one of `not_enough_data | needs_work | learning | strong | mastered`.
- Weak topics need at least 5 answers and practice in the last 60 days.
- Levels: `a2, a2plus, b1, b1plus, b2, b2plus, c1`. Kinds: `grammar | vocab`. Sources: `bot | app`.

## Practice button (decision)

The spec asks for a "Practise weak topics" button that deep-links into the Quiz Bot's practice. The bot has a `/practice` command but no deep-link payload. `t.me/...?start=practice` would land in the bot's `/start` (subscribe) flow, which must never be triggered from here.

So in this plan the button opens the bot (`https://t.me/Englishpusher_quiz_bot`) and the text under it says "send /practice". Plan 4 patches the live bot anyway for the Mini App button. It will add a `practice` start payload and change `PRACTICE_URL` in `src/progress/shape.ts`. That constant is the only place to change.

## Visual rules (same as plan 2, dataviz skill)

- **One series:** charts with a single series (weekly accuracy) use the neutral ink `#4b5563`, never a source colour, and have no legend.
- **Source colours** appear only where something is split by source:
  - bot `#2a78d6`, app `#eb6834` (`src/teacher/theme.ts`).
  - Text is never in a series colour.
- **Accuracy and mastery colours:**
  - These use the status palette (`BAND_STYLE`), always with the number or label printed.
  - Bands: below 60, 60–79, 80 and up, and no data.
- **Activity calendar:**
  - It uses a single-hue neutral ramp (`INTENSITY` in `src/progress/calendar.ts`).
  - Every day's count is in its tooltip and in screen-reader text.
- **Every line chart** has hover and keyboard-focus readouts and a "Show as table" view.
- **Layout:**
  - Mobile-first: it must read well at 390px wide.
  - The App is light-only.
- **Empty states:** a student with no activity gets a friendly "get started" card, never empty axes. Sources without data are hidden.

## File map

| File | Responsibility |
|---|---|
| `apps/progress/index.html` | MPA entry (noindex) |
| `vite.config.ts` | register `progress`; GTM exclusion generalised to "private pages" (teacher + progress) |
| `src/teacher/rpc.ts` | shared: `isDemo`, `rpc()` (Supabase call + error mapping + demo hook) |
| `src/teacher/api.ts` | teacher RPC wrappers, now built on `rpc()` (behaviour unchanged) |
| `src/progress/main.tsx` | mount |
| `src/progress/types.ts` | `Progress`, `TopicProgress`, `Week`, `CalendarDay`, `Mistake`, `WeakTopic` |
| `src/progress/errors.ts` (+ test) | `progressError()` — student wording for RPC errors |
| `src/progress/demo.ts` | dev-only fixtures for `?demo` |
| `src/progress/api.ts` | `progressApi.me()`, `progressApi.topic(key)` |
| `src/progress/route.ts` (+ test) | parse/format `#/` and `#/topic/<key>` |
| `src/progress/shape.ts` (+ test) | greeting, first name, topic grouping, source shares, emptiness checks, `PRACTICE_URL` |
| `src/progress/calendar.ts` (+ test) | month list, month grid (Monday first), intensity buckets, month stats |
| `src/progress/line.ts` (+ test) | line chart layout (0–100%, gaps for empty weeks) |
| `src/progress/charts/LineChart.tsx` | SVG line + readout + table |
| `src/progress/charts/MonthCalendar.tsx` | month calendar with month switcher and legend |
| `src/progress/App.tsx` | auth states, hash routing, page frame |
| `src/progress/pages/Overview.tsx` | Overview tab: greeting, tiles, weak topics, accuracy per week |
| `src/progress/pages/Topics.tsx` | `TopicsTab`: Mastery map |
| `src/progress/pages/Activity.tsx` | Activity tab: calendar, tiles, where you practise |
| `src/progress/pages/GetStarted.tsx` | get-started state (no activity yet) |
| `src/progress/pages/TopicPage.tsx` | one topic: accuracy over 12 weeks, recent mistakes |
| `src/account/App.tsx` | "All my progress" link for every signed-in user |

---

### Task 1: Dependencies, empty page, GTM exclusion for private pages

**Files:**
- Create: `apps/progress/index.html`, `src/progress/main.tsx`, `src/progress/App.tsx` (placeholder)
- Modify: `vite.config.ts` (the `APPS` list, the GTM block around lines 72-86, and `rollupOptions.input`)

- [ ] **Step 1: Install and copy the env file**

```bash
cd /d/tmp/app-my-progress
npm ci
cp /d/tmp/app-teacher-dashboard/.env.local .env.local   # do not print it
git status --short   # .env.local must NOT appear (gitignored)
```

If `/d/tmp/app-teacher-dashboard/.env.local` is missing, copy it from `"/d/VIBE CODING/app-englishpusher/.env.local"` instead.

- [ ] **Step 2: Create `apps/progress/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>My progress — Englishpusher</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-neutral-50">
    <div id="root"></div>
    <script type="module" src="/src/progress/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Create `src/progress/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "../shared/auth.tsx";
import App from "./App.tsx";
import "../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
```

- [ ] **Step 4: Create the placeholder `src/progress/App.tsx`** (Task 8 replaces it)

```tsx
export default function App() {
  return null;
}
```

- [ ] **Step 5: Register the page in `vite.config.ts`**

In the `APPS` array, add `"progress",` on the line after `"teacher",`.

In `rollupOptions.input`, add this line after the `teacher:` line:

```ts
        progress:        resolve(__dirname, "apps/progress/index.html"),
```

- [ ] **Step 6: Generalise the GTM exclusion in `vite.config.ts`**

Replace this block, from the comment `// Inject the Google Tag Manager container` through the end of `function isTeacherPage(...) { ... }`:

```ts
// Inject the Google Tag Manager container (GA4 + Clarity live inside it) into
// every HTML entry point. Build-only, so local dev visits are not tracked.
// The staff-only teacher dashboard (apps/teacher) shows student names and accuracy,
// so it must never load GTM / Clarity session recording.
const GTM_ID = "GTM-KJVX8GRG";
// Matches the teacher entry exactly: the absolute file, or the server path /apps/teacher[/index.html].
// Nothing looser, so a checkout folder named "teacher" cannot strip GTM from other pages.
// Only the server path (ctx.path) can carry a query/hash; a file name may legally contain '#'.
const normPath = (p: string) => p.replace(/\\/g, "/");
const TEACHER_ENTRY = normPath(resolve(__dirname, "apps/teacher/index.html")).toLowerCase();
function isTeacherPage(ctx?: { filename?: string; path?: string }): boolean {
  if (ctx?.filename && normPath(ctx.filename).toLowerCase() === TEACHER_ENTRY) return true;
  return ctx?.path !== undefined && /^\/apps\/teacher(\/(index\.html)?)?$/.test(normPath(ctx.path).split(/[?#]/)[0]);
}
```

with:

```ts
// Inject the Google Tag Manager container (GA4 + Clarity live inside it) into
// every HTML entry point. Build-only, so local dev visits are not tracked.
// Private pages show a person's results (teacher dashboard: student names and accuracy;
// progress: the student's own results), so they must never load GTM / Clarity session recording.
const GTM_ID = "GTM-KJVX8GRG";
const PRIVATE_APPS = ["teacher", "progress"];
// Matches a private entry exactly: the absolute file, or the server path /apps/<name>[/index.html].
// Nothing looser, so a checkout folder named "teacher" cannot strip GTM from other pages.
// Only the server path (ctx.path) can carry a query/hash; a file name may legally contain '#'.
const normPath = (p: string) => p.replace(/\\/g, "/");
const PRIVATE_ENTRIES = new Set(
  PRIVATE_APPS.map((app) => normPath(resolve(__dirname, `apps/${app}/index.html`)).toLowerCase()),
);
const PRIVATE_PATH = new RegExp(`^/apps/(${PRIVATE_APPS.join("|")})(/(index\\.html)?)?$`);
function isPrivatePage(ctx?: { filename?: string; path?: string }): boolean {
  if (ctx?.filename && PRIVATE_ENTRIES.has(normPath(ctx.filename).toLowerCase())) return true;
  return ctx?.path !== undefined && PRIVATE_PATH.test(normPath(ctx.path).split(/[?#]/)[0]);
}
```

Then, inside `injectGtm()`, change `if (isTeacherPage(ctx)) return [];` to `if (isPrivatePage(ctx)) return [];`.

- [ ] **Step 7: Build and check that GTM is excluded**

```bash
npm test && npm run build
grep -c googletagmanager dist/progress/index.html dist/teacher/index.html dist/index.html dist/account/index.html
```

Expected: `dist/progress/index.html:0`, `dist/teacher/index.html:0`, `dist/index.html:2`, `dist/account/index.html:2`. If `dist/progress/index.html` doesn't exist, the `APPS` / `input` registration is wrong.

- [ ] **Step 8: Commit**

```bash
git add apps/progress/index.html src/progress/main.tsx src/progress/App.tsx vite.config.ts
git commit -m "My progress: empty /progress/ page, no GTM on private pages" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Shared RPC helper (teacher API keeps its behaviour)

**Files:**
- Create: `src/teacher/rpc.ts`
- Modify: `src/teacher/api.ts` (whole file)

- [ ] **Step 1: Create `src/teacher/rpc.ts`**

```ts
import { supabase, isSupabaseConfigured } from "../shared/supabase.ts";
import { friendlyError } from "./format.ts";
import type { Result } from "./types.ts";

// Dev server only: ?demo serves fixtures so a layout can be checked without signing in.
export const isDemo: boolean = import.meta.env.DEV && new URLSearchParams(window.location.search).has("demo");

export type RpcError = { code?: string; message?: string; status?: number };

// One Supabase RPC call. `demo` returns fixture data; callers pass null in production builds
// (see loadDemo in api.ts), so fixtures never reach the bundle. `errorText` turns an error into
// the sentence shown on the page.
export async function rpc<T>(
  fn: string,
  args: Record<string, unknown>,
  demo: (() => Promise<T>) | null,
  errorText: (e: RpcError) => string = friendlyError,
): Promise<Result<T>> {
  if (isDemo && demo) return { data: await demo(), error: null };
  if (!isSupabaseConfigured) return { data: null, error: "Analytics are not available right now." };
  // .rpc() sends POST: these functions may create the caller's person row on first use.
  try {
    const { data, error, status } = await supabase.rpc(fn, args);
    if (error) return { data: null, error: errorText({ code: error.code, message: error.message, status }) };
    if (data === null || data === undefined) return { data: null, error: errorText({}) };
    return { data: data as T, error: null };
  } catch (e) {
    return { data: null, error: errorText({ message: e instanceof Error ? e.message : undefined }) };
  }
}
```

- [ ] **Step 2: Replace `src/teacher/api.ts` with the version built on `rpc()`**

```ts
import { rpc } from "./rpc.ts";
import type { Filters } from "./route.ts";
import type { Me, Overview, RosterRow, StudentDetail, TopicDetail, TopicMatrix } from "./types.ts";

export { isDemo } from "./rpc.ts";

// DEV-only fixtures. In production `import.meta.env.DEV` is the literal false, so this branch and the
// import() of the fake names are removed from the bundle (checked by grepping dist in the final task).
const loadDemo = import.meta.env.DEV ? async () => (await import("./demo.ts")).DEMO : null;
type Demo = typeof import("./demo.ts").DEMO;

function call<T>(fn: string, args: Record<string, unknown>, pick: (d: Demo) => T) {
  const load = loadDemo; // a local const keeps TypeScript's null check inside the arrow function
  return rpc<T>(fn, args, load && (async () => pick(await load())));
}

const period = (f: Filters) => ({ p_days: f.days, p_source: f.source });

export const api = {
  me: () => call<Me>("analytics_me", {}, (d) => d.me),
  overview: (f: Filters) => call<Overview>("analytics_teacher_overview", period(f), (d) => d.overview),
  students: (f: Filters) => call<RosterRow[]>("analytics_teacher_students", period(f), (d) => d.students),
  topics: (f: Filters, level: string | null, kind: string | null) =>
    call<TopicMatrix>("analytics_teacher_topics", { ...period(f), p_level: level, p_kind: kind }, (d) => d.topics),
  topic: (topicKey: string, f: Filters) =>
    call<TopicDetail>("analytics_topic_detail", { p_topic_key: topicKey, ...period(f) }, (d) => d.topic),
  student: (personId: string) =>
    call<StudentDetail>("analytics_student_detail", { p_person: personId }, (d) => d.student),
};
```

- [ ] **Step 3: Check the build, the tests, and that no demo fixtures are in the bundle**

```bash
npm test && npm run build
grep -rl "Chrystia" dist || echo "no teacher fixtures in dist"
```

Expected: all tests pass (77 before this plan), the build passes, and the output reads `no teacher fixtures in dist`.

- [ ] **Step 4: Check that teacher demo mode still works**

Run `npm run dev` and open `http://localhost:5173/teacher/?demo#/students`. The roster must show Anna, Bohdan, Chrystia and Dmytro. Stop the server afterwards. If you have no browser, say so in your report; the controller will check.

- [ ] **Step 5: Commit**

```bash
git add src/teacher/rpc.ts src/teacher/api.ts
git commit -m "Teacher dashboard: shared rpc() helper for analytics pages" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Types, error wording, demo fixtures, progress API

**Files:**
- Create: `src/progress/types.ts`, `src/progress/errors.ts`, `src/progress/errors.test.ts`, `src/progress/demo.ts`, `src/progress/api.ts`

- [ ] **Step 1: Create `src/progress/types.ts`**

```ts
// Shapes returned by analytics_student() and analytics_student_topic() (moodle-task-builder plan 1).
import type { BySource, Role, StudentTopic } from "../teacher/types.ts";

export type WeakTopic = Omit<StudentTopic, "last_at">;

export interface Week { week: string; answers: number; accuracy: number | null }

export interface CalendarDay { day: string; events: number; by_source: BySource }

export interface Mistake {
  topic_key: string; title: string; item: string | null; item_label: string | null;
  source: string | null; activity: string; occurred_at: string;
}

export interface Progress {
  person: { id: string; display_name: string | null; role: Role } | null;
  summary: {
    accuracy: number | null; accuracy_prev: number | null; answers: number; streak: number;
    words_learned: number; active_days_month: number; last_active: string | null;
  };
  weak_topics: WeakTopic[];
  topics: StudentTopic[];
  trend: Week[];
  calendar: CalendarDay[];
  sources: BySource;
}

export interface TopicProgress {
  topic_key: string;
  title: string;
  trend: Week[];
  recent_mistakes: Mistake[];
}
```

- [ ] **Step 2: Write the failing test `src/progress/errors.test.ts`**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { progressError } from "./errors.ts";
import { SESSION_EXPIRED } from "../teacher/format.ts";

test("progressError speaks to the student", () => {
  assert.equal(progressError({ code: "42501" }), "Please sign in to see your progress.");
  assert.equal(progressError({ code: "22023" }), "That topic doesn't exist.");
  assert.equal(progressError({ code: "22P02" }), "That topic doesn't exist.");
});

test("progressError keeps the shared session and network messages", () => {
  assert.equal(progressError({ code: "PGRST301" }), SESSION_EXPIRED);
  assert.equal(progressError({}), "Couldn't load the data. Check your connection and try again.");
});
```

- [ ] **Step 3: Run it and confirm it fails**

Run: `node --test src/progress/errors.test.ts`
Expected: FAIL, because `./errors.ts` cannot be found.

- [ ] **Step 4: Create `src/progress/errors.ts`**

```ts
import { friendlyError } from "../teacher/format.ts";
import type { RpcError } from "../teacher/rpc.ts";

// Same as the teacher wording, except the two cases a student can actually hit.
export function progressError(e: RpcError): string {
  if (e.code === "42501") return "Please sign in to see your progress.";
  if (e.code === "22023" || e.code === "22P02") return "That topic doesn't exist.";
  return friendlyError(e);
}
```

`import type` is erased when Node runs the test, so the test never loads `rpc.ts` (which needs the browser).

- [ ] **Step 5: Run it and confirm it passes**

Run: `node --test src/progress/errors.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 6: Create `src/progress/demo.ts`**

```ts
import type { StudentTopic } from "../teacher/types.ts";
import type { Progress, TopicProgress, Week } from "./types.ts";

// Used only when the dev server runs with ?demo in the URL (see api.ts). Invented data.
const now = new Date();
const iso = (daysBack: number) => new Date(now.getTime() - daysBack * 86_400_000).toISOString();
const day = (daysBack: number) => iso(daysBack).slice(0, 10);
// Monday of the week `weeksBack` weeks ago (UTC; close enough for fixtures).
function monday(weeksBack: number): string {
  const d = new Date(now.getTime());
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7) - weeksBack * 7);
  return d.toISOString().slice(0, 10);
}
function weeks(count: number, answers: number[], accuracy: (number | null)[]): Week[] {
  return Array.from({ length: count }, (_, i) => ({ week: monday(count - 1 - i), answers: answers[i] ?? 0, accuracy: accuracy[i] ?? null }));
}

const topics: StudentTopic[] = [
  { topic_key: "b1:grammar:modifiers", kind: "grammar", level: "b1", title: "Modifiers", answers: 14, accuracy: 57, mastery: "needs_work", last_at: iso(2) },
  { topic_key: "b1:grammar:irregular-verbs", kind: "grammar", level: "b1", title: "Irregular Verbs", answers: 20, accuracy: 65, mastery: "learning", last_at: iso(1) },
  { topic_key: "a2:grammar:present-simple", kind: "grammar", level: "a2", title: "Present Simple", answers: 20, accuracy: 95, mastery: "mastered", last_at: iso(20) },
  { topic_key: "b1:vocab:jobs", kind: "vocab", level: "b1", title: "Lesson 6: Jobs & Work", answers: 18, accuracy: 83, mastery: "strong", last_at: iso(0) },
  { topic_key: "b1:vocab:travel", kind: "vocab", level: "b1", title: "Lesson 4: Travel", answers: 9, accuracy: 70, mastery: "learning", last_at: iso(5) },
  { topic_key: "b1plus:vocab:feelings", kind: "vocab", level: "b1plus", title: "Feelings and Emotions", answers: 3, accuracy: 67, mastery: "not_enough_data", last_at: iso(9) },
];

const calendar = Array.from({ length: 90 }, (_, i) => {
  const events = i % 3 === 1 ? 0 : (i * 7) % 23;
  const bot = Math.ceil(events * 0.7);
  return { day: day(i), events, by_source: { bot, app: events - bot } };
}).filter((d) => d.events > 0);

export const PROGRESS_DEMO = {
  progress: {
    person: { id: "demo-student", display_name: "Demo Student", role: "student" },
    summary: { accuracy: 78, accuracy_prev: 71, answers: 164, streak: 4, words_learned: 96, active_days_month: 3, last_active: iso(0) },
    weak_topics: topics
      .filter((t) => t.answers >= 5)
      .sort((a, b) => (a.accuracy ?? 0) - (b.accuracy ?? 0))
      .slice(0, 3)
      .map(({ last_at: _lastAt, ...t }) => t),
    topics,
    trend: weeks(8, [12, 0, 18, 22, 15, 25, 19, 14], [64, null, 69, 72, 70, 76, 79, 81]),
    calendar,
    sources: { bot: 120, app: 44 },
  } as Progress,
  topic: (topicKey: string): TopicProgress => {
    const title = topics.find((t) => t.topic_key === topicKey)?.title ?? "";
    // Like the real RPC for an unknown key: empty title, 12 empty weeks, no mistakes.
    if (!title) return { topic_key: topicKey, title: "", trend: weeks(12, [], []), recent_mistakes: [] };
    return {
      topic_key: topicKey,
      title,
      trend: weeks(12, [0, 0, 4, 6, 0, 5, 8, 3, 6, 7, 4, 5], [null, null, 50, 50, null, 60, 63, 67, 50, 71, 75, 60]),
      recent_mistakes: [
        { topic_key: topicKey, title, item: "q40", item_label: "It was ___ cold that we stayed inside.", source: "bot", activity: "quiz", occurred_at: iso(1) },
        { topic_key: topicKey, title, item: "q12", item_label: "She speaks English ___ well.", source: "app", activity: "trivia", occurred_at: iso(3) },
      ],
    };
  },
};
```

- [ ] **Step 7: Create `src/progress/api.ts`**

```ts
import { rpc } from "../teacher/rpc.ts";
import { progressError } from "./errors.ts";
import type { Progress, TopicProgress } from "./types.ts";

// DEV-only fixtures; in production `import.meta.env.DEV` is the literal false and this is removed.
const loadDemo = import.meta.env.DEV ? async () => (await import("./demo.ts")).PROGRESS_DEMO : null;
type Demo = typeof import("./demo.ts").PROGRESS_DEMO;

function call<T>(fn: string, args: Record<string, unknown>, pick: (d: Demo) => T) {
  const load = loadDemo;
  return rpc<T>(fn, args, load && (async () => pick(await load())), progressError);
}

// The only data access of the page. Plan 4 (Telegram Mini App) adds a second source here.
export const progressApi = {
  me: () => call<Progress>("analytics_student", {}, (d) => d.progress),
  topic: (topicKey: string) =>
    call<TopicProgress>("analytics_student_topic", { p_topic_key: topicKey }, (d) => d.topic(topicKey)),
};
```

- [ ] **Step 8: Test, build, commit**

```bash
npm test && npm run build
git add src/progress/types.ts src/progress/errors.ts src/progress/errors.test.ts src/progress/demo.ts src/progress/api.ts
git commit -m "My progress: types, error wording, demo fixtures, API" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Routes

**Files:**
- Create: `src/progress/route.ts`, `src/progress/route.test.ts`

- [ ] **Step 1: Write the failing test `src/progress/route.test.ts`**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseRoute, routeHash } from "./route.ts";

test("empty, unknown or incomplete hash is home", () => {
  assert.deepEqual(parseRoute(""), { page: "home" });
  assert.deepEqual(parseRoute("#/"), { page: "home" });
  assert.deepEqual(parseRoute("#/nonsense"), { page: "home" });
  assert.deepEqual(parseRoute("#/topic/"), { page: "home" });
});

test("topic route decodes its key", () => {
  assert.deepEqual(parseRoute("#/topic/b1%3Agrammar%3Amodifiers"), { page: "topic", topicKey: "b1:grammar:modifiers" });
});

test("a malformed % does not throw", () => {
  assert.deepEqual(parseRoute("#/topic/%"), { page: "topic", topicKey: "%" });
});

test("routeHash round-trips, including / ? & in keys", () => {
  const r = { page: "topic" as const, topicKey: "b1:vocab:jobs & work/2?x" };
  assert.deepEqual(parseRoute(routeHash(r)), r);
  assert.equal(routeHash({ page: "home" }), "#/");
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --test src/progress/route.test.ts`
Expected: FAIL, because `./route.ts` cannot be found.

- [ ] **Step 3: Create `src/progress/route.ts`**

```ts
export type Route = { page: "home" } | { page: "topic"; topicKey: string };

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

// "#/" → home; "#/topic/<encoded key>" → one topic. Anything else → home.
export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#/, "").split("?")[0];
  const m = /^\/topic\/(.+)$/.exec(path);
  if (m) {
    const topicKey = safeDecode(m[1]);
    if (topicKey) return { page: "topic", topicKey };
  }
  return { page: "home" };
}

export function routeHash(r: Route): string {
  return r.page === "topic" ? `#/topic/${encodeURIComponent(r.topicKey)}` : "#/";
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `node --test src/progress/route.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/progress/route.ts src/progress/route.test.ts
git commit -m "My progress: hash routes" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Shaping helpers (greeting, grouping, shares, emptiness)

**Files:**
- Create: `src/progress/shape.ts`, `src/progress/shape.test.ts`

- [ ] **Step 1: Write the failing test `src/progress/shape.test.ts`**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import type { StudentTopic } from "../teacher/types.ts";
import type { Progress, TopicProgress } from "./types.ts";
import { firstName, greeting, groupTopics, hasActivity, kyivHour, sourceShares, topicExists } from "./shape.ts";

const topic = (topic_key: string, kind: string, level: string, title: string): StudentTopic => ({
  topic_key, kind, level, title, answers: 5, accuracy: 70, mastery: "learning", last_at: null,
});

const empty: Progress = {
  person: { id: "p", display_name: "Anna", role: "student" },
  summary: { accuracy: null, accuracy_prev: null, answers: 0, streak: 0, words_learned: 0, active_days_month: 0, last_active: null },
  weak_topics: [], topics: [], trend: [], calendar: [], sources: {},
};

test("firstName takes the first word, with a friendly fallback", () => {
  assert.equal(firstName("  Anna Petrenko "), "Anna");
  assert.equal(firstName(null), "there");
  assert.equal(firstName("   "), "there");
});

test("greeting follows the hour", () => {
  assert.equal(greeting(8), "Good morning");
  assert.equal(greeting(12), "Good afternoon");
  assert.equal(greeting(17), "Good afternoon");
  assert.equal(greeting(18), "Good evening");
  assert.equal(greeting(3), "Good evening");
});

test("kyivHour uses Europe/Kyiv, including summer time", () => {
  assert.equal(kyivHour(new Date("2026-11-04T06:30:00Z")), 8);  // UTC+2
  assert.equal(kyivHour(new Date("2026-07-01T16:30:00Z")), 19); // UTC+3
});

test("groupTopics: grammar first, then vocabulary; levels in course order, then title", () => {
  const groups = groupTopics([
    topic("b1:vocab:z", "vocab", "b1", "Zoo"),
    topic("b1plus:grammar:a", "grammar", "b1plus", "Articles"),
    topic("a2:grammar:p", "grammar", "a2", "Present Simple"),
    topic("b1:vocab:a", "vocab", "b1", "Animals"),
  ]);
  assert.deepEqual(groups.map((g) => g.label), ["Grammar", "Vocabulary"]);
  assert.deepEqual(groups[0].topics.map((t) => t.title), ["Present Simple", "Articles"]);
  assert.deepEqual(groups[1].topics.map((t) => t.title), ["Animals", "Zoo"]);
});

test("groupTopics: empty list gives no groups", () => {
  assert.deepEqual(groupTopics([]), []);
});

test("sourceShares: known order, whole percentages, zero sources hidden", () => {
  assert.deepEqual(sourceShares({ app: 1, bot: 3 }), [
    { source: "bot", count: 3, share: 75 },
    { source: "app", count: 1, share: 25 },
  ]);
  assert.deepEqual(sourceShares({ bot: 5, app: 0 }), [{ source: "bot", count: 5, share: 100 }]);
  assert.deepEqual(sourceShares({}), []);
});

test("hasActivity is false only when there is nothing at all", () => {
  assert.equal(hasActivity(empty), false);
  assert.equal(hasActivity({ ...empty, topics: [topic("b1:vocab:a", "vocab", "b1", "A")] }), true);
  assert.equal(hasActivity({ ...empty, calendar: [{ day: "2026-11-04", events: 2, by_source: { app: 2 } }] }), true);
});

test("topicExists: unknown keys come back with an empty title and no data", () => {
  const unknown: TopicProgress = { topic_key: "x", title: "", trend: [{ week: "2026-11-02", answers: 0, accuracy: null }], recent_mistakes: [] };
  assert.equal(topicExists(unknown), false);
  assert.equal(topicExists({ ...unknown, title: "Modifiers" }), true);
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --test src/progress/shape.test.ts`
Expected: FAIL, because `./shape.ts` cannot be found.

- [ ] **Step 3: Create `src/progress/shape.ts`**

```ts
import { lookup } from "../teacher/lookup.ts";
import { orderSources } from "../teacher/theme.ts";
import type { BySource, StudentTopic } from "../teacher/types.ts";
import type { Progress, TopicProgress } from "./types.ts";

// Opens the Quiz Bot. Plan 4 adds a `practice` start payload to the bot and changes only this line.
export const PRACTICE_URL = "https://t.me/Englishpusher_quiz_bot";

export function firstName(name: string | null | undefined): string {
  return name?.trim().split(/\s+/)[0] || "there";
}

export function kyivHour(now: Date = new Date()): number {
  return Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Kyiv", hour: "2-digit", hourCycle: "h23" }).format(now));
}

export function greeting(hour: number): string {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

const LEVEL_ORDER = ["a2", "a2plus", "b1", "b1plus", "b2", "b2plus", "c1"];
const KIND_ORDER = ["grammar", "vocab"];
const KIND_GROUP: Record<string, string> = { grammar: "Grammar", vocab: "Vocabulary" };
const rank = (list: string[], value: string) => {
  const i = list.indexOf(value);
  return i === -1 ? list.length : i;
};

export interface TopicGroup { kind: string; label: string; topics: StudentTopic[] }

// Mastery map groups: Grammar, then Vocabulary (unknown kinds after); inside, course level order, then title.
export function groupTopics(topics: StudentTopic[]): TopicGroup[] {
  const kinds = [...new Set(topics.map((t) => t.kind))].sort((a, b) => rank(KIND_ORDER, a) - rank(KIND_ORDER, b) || a.localeCompare(b));
  return kinds.map((kind) => ({
    kind,
    label: lookup(KIND_GROUP, kind) ?? kind.charAt(0).toUpperCase() + kind.slice(1),
    topics: topics
      .filter((t) => t.kind === kind)
      .sort((a, b) => rank(LEVEL_ORDER, a.level) - rank(LEVEL_ORDER, b.level) || a.title.localeCompare(b.title)),
  }));
}

export interface Share { source: string; count: number; share: number }

// Share of all activity per source; sources with no activity are left out.
export function sourceShares(sources: BySource): Share[] {
  const rows = orderSources(Object.keys(sources))
    .map((source) => ({ source, count: sources[source] ?? 0 }))
    .filter((r) => r.count > 0);
  const total = rows.reduce((n, r) => n + r.count, 0);
  return total === 0 ? [] : rows.map((r) => ({ ...r, share: Math.round((r.count / total) * 100) }));
}

// False for a brand-new student: show "get started" instead of empty charts.
export function hasActivity(p: Progress): boolean {
  return p.topics.length > 0 || p.summary.answers > 0 || p.calendar.some((d) => d.events > 0);
}

// analytics_student_topic raises no error for an unknown key; it returns an empty title and no data.
export function topicExists(t: TopicProgress): boolean {
  return t.title !== "" || t.trend.some((w) => w.answers > 0) || t.recent_mistakes.length > 0;
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `node --test src/progress/shape.test.ts`
Expected: PASS (8 tests).

- [ ] **Step 5: Commit**

```bash
git add src/progress/shape.ts src/progress/shape.test.ts
git commit -m "My progress: greeting, topic grouping, source shares" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Calendar helpers

**Files:**
- Create: `src/progress/calendar.ts`, `src/progress/calendar.test.ts`

- [ ] **Step 1: Write the failing test `src/progress/calendar.test.ts`**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { intensity, monthGrid, monthLabel, monthStats, recentMonths } from "./calendar.ts";
import type { CalendarDay } from "./types.ts";

const cal: CalendarDay[] = [
  { day: "2026-11-04", events: 6, by_source: { bot: 6 } },
  { day: "2026-11-01", events: 1, by_source: { app: 1 } },
  { day: "2026-10-31", events: 12, by_source: { bot: 12 } },
];

test("recentMonths: newest first, across a year boundary", () => {
  assert.deepEqual(recentMonths("2026-11-04", 3), ["2026-11", "2026-10", "2026-09"]);
  assert.deepEqual(recentMonths("2026-01-15", 3), ["2026-01", "2025-12", "2025-11"]);
});

test("monthLabel", () => {
  assert.equal(monthLabel("2026-11"), "November 2026");
});

test("monthGrid: Monday-first weeks, padded with nulls", () => {
  // 1 November 2026 is a Sunday; November has 30 days → 6 weeks.
  const weeks = monthGrid("2026-11", cal, "2026-11-04");
  assert.equal(weeks.length, 6);
  assert.ok(weeks.every((w) => w.length === 7));
  assert.equal(weeks[0][5], null);
  assert.equal(weeks[0][6]?.day, "2026-11-01");
  assert.equal(weeks[0][6]?.events, 1);
  const nov4 = weeks.flat().find((c) => c?.day === "2026-11-04");
  assert.equal(nov4?.events, 6);
  assert.equal(nov4?.future, false);
  assert.equal(weeks.flat().find((c) => c?.day === "2026-11-05")?.future, true);
  assert.equal(weeks[5][0]?.day, "2026-11-30");
  assert.equal(weeks[5][1], null);
});

test("intensity buckets", () => {
  assert.deepEqual([0, 1, 4, 5, 9, 10, 19, 20, 99].map(intensity), [0, 1, 1, 2, 2, 3, 3, 4, 4]);
});

test("monthStats counts only that month", () => {
  assert.deepEqual(monthStats("2026-11", cal), { activeDays: 2, events: 7 });
  assert.deepEqual(monthStats("2026-09", cal), { activeDays: 0, events: 0 });
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --test src/progress/calendar.test.ts`
Expected: FAIL, because `./calendar.ts` cannot be found.

- [ ] **Step 3: Create `src/progress/calendar.ts`**

```ts
import type { CalendarDay } from "./types.ts";

const DAY_MS = 86_400_000;

// "2026-11-04" → ["2026-11", "2026-10", "2026-09"] (count months, newest first). Dates are plain
// calendar days (already Kyiv days from the database), so all arithmetic is in UTC.
export function recentMonths(today: string, count = 3): string[] {
  const [y, m] = today.split("-").map(Number);
  return Array.from({ length: count }, (_, i) => new Date(Date.UTC(y, m - 1 - i, 1)).toISOString().slice(0, 7));
}

export function monthLabel(key: string): string {
  const [y, m] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

export interface DayCell { day: string; date: number; events: number; future: boolean }

// Weeks of 7 cells, Monday first; null pads the first and last week.
export function monthGrid(key: string, calendar: CalendarDay[], today: string): (DayCell | null)[][] {
  const [y, m] = key.split("-").map(Number);
  const first = Date.UTC(y, m - 1, 1);
  const length = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const offset = (new Date(first).getUTCDay() + 6) % 7;
  const events = new Map(calendar.map((c) => [c.day, c.events]));
  const cells: (DayCell | null)[] = Array.from({ length: offset }, () => null);
  for (let d = 1; d <= length; d++) {
    const day = new Date(first + (d - 1) * DAY_MS).toISOString().slice(0, 10);
    cells.push({ day, date: d, events: events.get(day) ?? 0, future: day > today });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (DayCell | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function intensity(events: number): 0 | 1 | 2 | 3 | 4 {
  if (events >= 20) return 4;
  if (events >= 10) return 3;
  if (events >= 5) return 2;
  if (events >= 1) return 1;
  return 0;
}

// Single-hue neutral ramp (activity from every platform together, so no source colour).
export const INTENSITY: { bg: string; fg: string }[] = [
  { bg: "#f0efec", fg: "#898781" },
  { bg: "#d1d5db", fg: "#0b0b0b" },
  { bg: "#9ca3af", fg: "#0b0b0b" },
  { bg: "#6b7280", fg: "#ffffff" },
  { bg: "#374151", fg: "#ffffff" },
];

export function monthStats(key: string, calendar: CalendarDay[]): { activeDays: number; events: number } {
  const rows = calendar.filter((c) => c.day.startsWith(`${key}-`) && c.events > 0);
  return { activeDays: rows.length, events: rows.reduce((n, c) => n + c.events, 0) };
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `node --test src/progress/calendar.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/progress/calendar.ts src/progress/calendar.test.ts
git commit -m "My progress: activity calendar helpers" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Line chart layout, LineChart and MonthCalendar components

**Files:**
- Create: `src/progress/line.ts`, `src/progress/line.test.ts`, `src/progress/charts/LineChart.tsx`, `src/progress/charts/MonthCalendar.tsx`

- [ ] **Step 1: Write the failing test `src/progress/line.test.ts`**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { lineLayout } from "./line.ts";

const SIZE = { width: 240, height: 120, left: 30, right: 10, top: 10, bottom: 20 }; // plot: x 30..230, y 10..100

test("points are spread across the plot; 100% at the top, 0% at the bottom", () => {
  const l = lineLayout([{ key: "a", label: "A", value: 0 }, { key: "b", label: "B", value: 100 }], SIZE);
  assert.deepEqual(l.points.map((p) => [p.x, p.y]), [[30, 100], [230, 10]]);
  assert.deepEqual(l.paths, ["M30.0,100.0 L230.0,10.0"]);
  assert.deepEqual(l.ticks.map((t) => t.value), [0, 50, 100]);
});

test("a week without answers breaks the line instead of dropping to zero", () => {
  const l = lineLayout([
    { key: "a", label: "A", value: 50 },
    { key: "b", label: "B", value: null },
    { key: "c", label: "C", value: 100 },
    { key: "d", label: "D", value: 100 },
  ], SIZE);
  assert.equal(l.points[1].y, null);
  assert.equal(l.paths.length, 1); // the single point A is drawn as a dot only
  assert.ok(l.paths[0].startsWith("M163.3,10.0"));
});

test("one point sits in the middle; values are clamped to 0–100", () => {
  const l = lineLayout([{ key: "a", label: "A", value: 120 }], SIZE);
  assert.equal(l.points[0].x, 130);
  assert.equal(l.points[0].y, 10);
  assert.deepEqual(l.paths, []);
});

test("no points, no paths", () => {
  const l = lineLayout([], SIZE);
  assert.deepEqual(l.points, []);
  assert.deepEqual(l.paths, []);
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `node --test src/progress/line.test.ts`
Expected: FAIL, because `./line.ts` cannot be found.

- [ ] **Step 3: Create `src/progress/line.ts`**

```ts
export interface LinePoint { key: string; label: string; axisLabel?: string; value: number | null; answers?: number }
export interface LineSize { width: number; height: number; left: number; right: number; top: number; bottom: number }
export interface PlacedPoint extends LinePoint { x: number; y: number | null }
export interface LineLayout {
  points: PlacedPoint[];
  paths: string[];                       // one path per run of consecutive values
  ticks: { value: number; y: number }[]; // 0, 50, 100 %
  plotTop: number;
  plotBottom: number;
}

// Accuracy line, 0–100%. A null value (no graded answers that week) breaks the line.
export function lineLayout(points: LinePoint[], size: LineSize): LineLayout {
  const plotTop = size.top;
  const plotBottom = size.height - size.bottom;
  const plotWidth = Math.max(0, size.width - size.left - size.right);
  const yOf = (v: number) => plotBottom - (Math.min(100, Math.max(0, v)) / 100) * (plotBottom - plotTop);
  const step = points.length > 1 ? plotWidth / (points.length - 1) : 0;
  const placed: PlacedPoint[] = points.map((p, i) => ({
    ...p,
    x: size.left + (points.length > 1 ? i * step : plotWidth / 2),
    y: p.value === null || !Number.isFinite(p.value) ? null : yOf(p.value),
  }));
  const paths: string[] = [];
  let run: string[] = [];
  const flush = () => {
    if (run.length > 1) paths.push(run.join(" "));
    run = [];
  };
  for (const p of placed) {
    if (p.y === null) {
      flush();
      continue;
    }
    run.push(`${run.length === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`);
  }
  flush();
  return { points: placed, paths, ticks: [0, 50, 100].map((value) => ({ value, y: yOf(value) })), plotTop, plotBottom };
}
```

- [ ] **Step 4: Run it and confirm it passes**

Run: `node --test src/progress/line.test.ts`
Expected: PASS (4 tests). In the second test, C is at x = 30 + 2 × 200/3 ≈ 163.3.

- [ ] **Step 5: Create `src/progress/charts/LineChart.tsx`**

```tsx
import { useLayoutEffect, useRef, useState } from "react";
import { axisLabelPlacement } from "../../teacher/charts/columns.ts";
import { pct } from "../../teacher/format.ts";
import { INK } from "../../teacher/theme.ts";
import { lineLayout, type LinePoint } from "../line.ts";

const SIZE = { left: 40, right: 12, top: 10, bottom: 24 };
// One series (every platform together): neutral ink, no legend.
const LINE_INK = "#4b5563";

function readout(p: LinePoint): string {
  const answers = p.answers === undefined ? "" : ` (${p.answers} ${p.answers === 1 ? "answer" : "answers"})`;
  return `${p.label}: ${pct(p.value)}${answers}`;
}

// Accuracy per week. Hover or focus a point for its value; "Show as table" lists every week.
export function LineChart({ points, label, height = 150 }: { points: LinePoint[]; label: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(480);
  const [active, setActive] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(Math.max(240, el.clientWidth)));
    ro.observe(el);
    setWidth(Math.max(240, el.clientWidth));
    return () => ro.disconnect();
  }, []);

  const layout = lineLayout(points, { width, height, ...SIZE });
  const every = Math.max(1, Math.ceil(points.length / Math.max(1, Math.floor(width / 64))));
  const shown = active !== null ? layout.points[active] : null;
  const hasAnswers = points.some((p) => p.answers !== undefined);

  return (
    <div ref={ref} className="w-full">
      <svg width={width} height={height} role="group" aria-label={label} className="block">
        {layout.ticks.map((t) => (
          <g key={t.value}>
            <line x1={SIZE.left} x2={width - SIZE.right} y1={t.y} y2={t.y} stroke={t.value === 0 ? INK.axis : INK.grid} />
            <text x={SIZE.left - 6} y={t.y + 4} textAnchor="end" fontSize={11} fill={INK.muted} className="tabular-nums">{t.value}%</text>
          </g>
        ))}
        {layout.paths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={LINE_INK} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        ))}
        {layout.points.map((p, i) => {
          const text = p.axisLabel ?? p.label;
          const place = axisLabelPlacement(p.x, text, width);
          return (
            <g key={p.key}>
              {i % every === 0 && (
                <text x={place.x} y={height - 6} textAnchor={place.anchor} fontSize={11} fill={INK.muted}>{text}</text>
              )}
              {p.y !== null && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={active === i ? 5 : 3.5}
                  fill={LINE_INK}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                  tabIndex={0}
                  role="img"
                  aria-label={readout(p)}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  className="outline-none"
                />
              )}
            </g>
          );
        })}
      </svg>
      <p className="h-5 font-body text-xs text-neutral-600" aria-live="polite">{shown ? readout(shown) : ""}</p>
      <details className="mt-1 font-body text-xs text-neutral-500">
        <summary className="cursor-pointer">Show as table</summary>
        <table className="mt-2 w-full text-left">
          <thead>
            <tr className="border-b border-neutral-200">
              <th scope="col" className="py-1 pr-3 font-semibold">Week</th>
              <th scope="col" className="py-1 pr-3 text-right font-semibold">Accuracy</th>
              {hasAnswers && <th scope="col" className="py-1 text-right font-semibold">Answers</th>}
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.key} className="border-b border-neutral-100">
                <td className="py-1 pr-3">{p.label}</td>
                <td className="py-1 pr-3 text-right tabular-nums">{pct(p.value)}</td>
                {hasAnswers && <td className="py-1 text-right tabular-nums">{p.answers ?? "–"}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
```

- [ ] **Step 6: Create `src/progress/charts/MonthCalendar.tsx`**

```tsx
import { useState } from "react";
import { dayLabel } from "../../teacher/charts/columns.ts";
import { INTENSITY, intensity, monthGrid, monthLabel, monthStats, recentMonths } from "../calendar.ts";
import type { CalendarDay } from "../types.ts";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// One month at a time (this month and the two before: the data covers 90 days).
export function MonthCalendar({ calendar, today }: { calendar: CalendarDay[]; today: string }) {
  const months = recentMonths(today, 3);
  const [index, setIndex] = useState(0);
  const key = months[index];
  const weeks = monthGrid(key, calendar, today);
  const stats = monthStats(key, calendar);
  const title = monthLabel(key);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIndex(index + 1)}
          disabled={index >= months.length - 1}
          aria-label="Previous month"
          className="rounded-md px-3 py-1 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30"
        >
          ←
        </button>
        <p className="font-display text-sm font-semibold text-neutral-900" aria-live="polite">{title}</p>
        <button
          type="button"
          onClick={() => setIndex(index - 1)}
          disabled={index === 0}
          aria-label="Next month"
          className="rounded-md px-3 py-1 text-neutral-600 hover:bg-neutral-100 disabled:opacity-30"
        >
          →
        </button>
      </div>
      <table className="w-full table-fixed border-separate border-spacing-1" aria-label={`Activity in ${title}`}>
        <thead>
          <tr>
            {WEEKDAYS.map((d) => (
              <th key={d} scope="col" className="font-body text-[11px] font-semibold text-neutral-400">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, w) => (
            <tr key={w}>
              {week.map((cell, i) => {
                if (!cell) return <td key={i} />;
                const text = cell.future ? "" : `${dayLabel(cell.day)}: ${cell.events} ${cell.events === 1 ? "activity" : "activities"}`;
                const style = INTENSITY[cell.future ? 0 : intensity(cell.events)];
                return (
                  <td key={i} className="p-0">
                    <div
                      title={text || undefined}
                      className={`flex aspect-square items-center justify-center rounded-md font-body text-xs tabular-nums ${
                        cell.day === today ? "ring-2 ring-brand" : ""
                      }`}
                      style={cell.future ? { color: "#c3c2b7" } : { background: style.bg, color: style.fg }}
                    >
                      <span aria-hidden>{cell.date}</span>
                      {text && <span className="sr-only">{text}</span>}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 font-body text-xs text-neutral-500">
        <span>{stats.activeDays} active {stats.activeDays === 1 ? "day" : "days"} · {stats.events} {stats.events === 1 ? "activity" : "activities"}</span>
        <span className="flex items-center gap-1" aria-hidden>
          Less
          {INTENSITY.map((s, i) => <span key={i} className="inline-block h-3 w-3 rounded-sm" style={{ background: s.bg }} />)}
          More
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Test, build, commit**

```bash
npm test && npm run build
git add src/progress/line.ts src/progress/line.test.ts src/progress/charts/LineChart.tsx src/progress/charts/MonthCalendar.tsx
git commit -m "My progress: accuracy line chart and activity calendar" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: App shell — sign-in states and routing

**Files:**
- Modify: `src/progress/App.tsx` (replace the placeholder)
- Create: `src/progress/pages/Home.tsx` and `src/progress/pages/TopicPage.tsx` as stubs, so the shell compiles. Tasks 9 and 10 fill them in.

- [ ] **Step 1: Create the stub `src/progress/pages/Home.tsx`**

```tsx
export function Home(_props: { userId: string }) {
  return null;
}
```

- [ ] **Step 2: Create the stub `src/progress/pages/TopicPage.tsx`**

```tsx
export function TopicPage(_props: { userId: string; topicKey: string }) {
  return null;
}
```

- [ ] **Step 3: Replace `src/progress/App.tsx`**

```tsx
import { useEffect, useState, type ReactNode } from "react";
import { AppFooter, AppHeader } from "../shared/AppShell.tsx";
import { useAuth } from "../shared/auth.tsx";
import { isSupabaseConfigured } from "../shared/supabase.ts";
import { isDemo } from "../teacher/rpc.ts";
import { StateBox } from "../teacher/ui.tsx";
import { parseRoute, type Route } from "./route.ts";
import { Home } from "./pages/Home.tsx";
import { TopicPage } from "./pages/TopicPage.tsx";

function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo(0, 0); // only page changes use the hash here (no filters)
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function ProgressPages({ userId }: { userId: string }) {
  const route = useRoute();
  return (
    <div className="w-full max-w-3xl">
      {route.page === "topic" ? <TopicPage userId={userId} topicKey={route.topicKey} /> : <Home userId={userId} />}
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  let body: ReactNode;
  if (isDemo) body = <ProgressPages userId="demo" />;
  else if (!isSupabaseConfigured) body = <StateBox>Progress is not available right now.</StateBox>;
  else if (loading) body = <StateBox>Loading…</StateBox>;
  else if (!user) body = <StateBox>Please <a href="/account/" className="text-brand hover:underline">sign in</a> to see your progress.</StateBox>;
  else body = <ProgressPages userId={user.id} />;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <AppHeader title="My progress" subtitle={isDemo ? "Demo data" : "by Englishpusher"} />
      <main className="flex flex-1 justify-center px-4 py-6 sm:px-6 sm:py-8">{body}</main>
      <AppFooter />
    </div>
  );
}
```

There is no role gate: everyone sees their own data, and the database enforces that.

- [ ] **Step 4: Test, build, commit**

```bash
npm test && npm run build
git add src/progress/App.tsx src/progress/pages/Home.tsx src/progress/pages/TopicPage.tsx
git commit -m "My progress: shell with sign-in states and routing" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Home page — Coach, Mastery map, Activity

**Files:**
- Modify: `src/progress/pages/Home.tsx` (replace the stub)

- [ ] **Step 1: Replace `src/progress/pages/Home.tsx`**

```tsx
import { Send } from "lucide-react";
import { addDays, dayLabel, kyivToday } from "../../teacher/charts/columns.ts";
import { levelLabel, pct, sourceLabel } from "../../teacher/format.ts";
import { sourceColor } from "../../teacher/theme.ts";
import { useData } from "../../teacher/useData.ts";
import { AccuracyCell, BarRow, Card, Dimmed, MasteryBadge, StateBox, StatTile } from "../../teacher/ui.tsx";
import { progressApi } from "../api.ts";
import { LineChart } from "../charts/LineChart.tsx";
import { MonthCalendar } from "../charts/MonthCalendar.tsx";
import { routeHash } from "../route.ts";
import { firstName, greeting, groupTopics, hasActivity, kyivHour, PRACTICE_URL, sourceShares } from "../shape.ts";

const BUTTON = "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-display text-sm font-bold transition-colors";

function GetStarted({ name }: { name: string | null }) {
  return (
    <Card>
      <h2 className="font-display text-2xl font-bold text-neutral-900">Hi, {firstName(name)}! 👋</h2>
      <p className="mt-2 font-body text-sm text-neutral-600">
        Your progress appears here after your first answers. Practise in the App or in the Quiz Bot: both count.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href="/" className={`${BUTTON} bg-brand text-white hover:bg-brand/90`}>Practise in the App</a>
        <a href={PRACTICE_URL} target="_blank" rel="noopener noreferrer" className={`${BUTTON} border border-neutral-300 text-neutral-800 hover:border-neutral-400`}>
          <Send size={16} aria-hidden /> Open the Quiz Bot
        </a>
      </div>
    </Card>
  );
}

export function Home({ userId }: { userId: string }) {
  const { data, error, loading, retry } = useData(() => progressApi.me(), `progress:${userId}`, `progress:${userId}`);
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>;
  if (!hasActivity(data)) return <GetStarted name={data.person?.display_name ?? null} />;

  const s = data.summary;
  const today = kyivToday();
  const weeks = data.trend.map((w) => ({
    key: w.week,
    label: `${dayLabel(w.week)}–${dayLabel(addDays(w.week, 6))}`,
    axisLabel: dayLabel(w.week),
    value: w.accuracy,
    answers: w.answers,
  }));
  const groups = groupTopics(data.topics);
  const shares = sourceShares(data.sources);

  return (
    <div className="space-y-5">
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading || !!error}>
        <div className="space-y-5">
          {/* 1. Coach */}
          <h2 className="font-display text-2xl font-bold text-neutral-900">
            {greeting(kyivHour())}, {firstName(data.person?.display_name)}! 👋
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="col-span-2 sm:col-span-1">
              <StatTile label="Accuracy (30 days)" value={pct(s.accuracy)} now={s.accuracy} before={s.accuracy_prev} />
            </div>
            <StatTile label="Streak" value={`🔥 ${s.streak}`} hint={s.streak === 1 ? "day" : "days"} />
            <StatTile label="Words learned" value={`${s.words_learned}`} />
          </div>

          <Card title="Your weak topics" subtitle="Lowest accuracy, practised in the last 60 days">
            {data.weak_topics.length === 0 ? (
              <p className="font-body text-sm text-neutral-500">No weak topics right now. Keep practising and they will show up here.</p>
            ) : (
              <div>
                {data.weak_topics.map((t) => (
                  <BarRow
                    key={t.topic_key}
                    label={t.title}
                    value={t.accuracy}
                    max={100}
                    href={routeHash({ page: "topic", topicKey: t.topic_key })}
                    note={`(${t.answers})`}
                  />
                ))}
              </div>
            )}
            <a href={PRACTICE_URL} target="_blank" rel="noopener noreferrer" className={`${BUTTON} mt-4 bg-brand text-white hover:bg-brand/90`}>
              <Send size={16} aria-hidden /> Practise weak topics
            </a>
            <p className="mt-2 font-body text-xs text-neutral-500">
              Opens the Quiz Bot in Telegram. Send <span className="font-semibold">/practice</span> there for 5 questions on your weakest topic.
            </p>
          </Card>

          <Card title="Accuracy per week" subtitle="Last 8 weeks, every platform">
            {weeks.some((w) => w.value !== null) ? (
              <LineChart points={weeks} label="Accuracy per week" height={150} />
            ) : (
              <StateBox>No graded answers in the last 8 weeks.</StateBox>
            )}
          </Card>

          {/* 2. Mastery map */}
          <Card title="Mastery map" subtitle="Every topic you have practised, judged by your last 20 answers">
            {groups.map((g) => (
              <div key={g.kind} className="mt-4 first:mt-0">
                <h3 className="mb-1 font-display text-sm font-semibold text-neutral-700">{g.label}</h3>
                <ul className="divide-y divide-neutral-100">
                  {g.topics.map((t) => (
                    <li key={t.topic_key}>
                      <a
                        href={routeHash({ page: "topic", topicKey: t.topic_key })}
                        className="flex items-center justify-between gap-3 rounded-md py-2 font-body text-sm hover:bg-neutral-50"
                      >
                        <span className="min-w-0">
                          <span className="block truncate text-neutral-900">{t.title}</span>
                          <span className="text-xs text-neutral-500">
                            {levelLabel(t.level)} · {t.answers} {t.answers === 1 ? "answer" : "answers"}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2">
                          <AccuracyCell accuracy={t.accuracy} answers={t.answers} />
                          <MasteryBadge mastery={t.mastery} />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>

          {/* 3. Activity */}
          <Card title="Activity" subtitle="Last 3 months, every platform">
            <MonthCalendar calendar={data.calendar} today={today} />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <StatTile label="Active days this month" value={`${s.active_days_month}`} />
              <StatTile label="Answers (30 days)" value={`${s.answers}`} />
            </div>
            {shares.length >= 2 && (
              <div className="mt-4">
                <h3 className="mb-2 font-display text-sm font-semibold text-neutral-700">Where you practise</h3>
                {shares.map((r) => (
                  <div key={r.source} className="grid grid-cols-[6rem_1fr_3rem] items-center gap-3 py-1 font-body text-sm text-neutral-800">
                    <span>{sourceLabel(r.source)}</span>
                    <div className="h-3 rounded-r bg-neutral-100" aria-hidden>
                      <div className="h-3 rounded-r" style={{ width: `${Math.max(1, r.share)}%`, background: sourceColor(r.source) }} />
                    </div>
                    <span className="text-right tabular-nums text-neutral-600">{r.share}%</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </Dimmed>
    </div>
  );
}
```

- [ ] **Step 2: Test and build**

Run: `npm test && npm run build`
Expected: both pass.

- [ ] **Step 3: Look at it (controller, if the implementer has no browser)**

Run `npm run dev` and open `http://localhost:5173/progress/?demo#/`. Check:
- The greeting reads "…, Demo!".
- There are three tiles, and three weak topics with bars.
- The weekly line has a gap in week 2.
- The mastery map shows Grammar and then Vocabulary.
- The calendar shows this month, and the "Where you practise" bars show Quiz Bot 73% and App 27%.

- [ ] **Step 4: Commit**

```bash
git add src/progress/pages/Home.tsx
git commit -m "My progress: coach, mastery map and activity" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Topic page

**Files:**
- Modify: `src/progress/pages/TopicPage.tsx` (replace the stub)

- [ ] **Step 1: Replace `src/progress/pages/TopicPage.tsx`**

```tsx
import { addDays, dayLabel } from "../../teacher/charts/columns.ts";
import { daysAgo, sourceLabel } from "../../teacher/format.ts";
import { useData } from "../../teacher/useData.ts";
import { Card, Dimmed, StateBox } from "../../teacher/ui.tsx";
import { progressApi } from "../api.ts";
import { LineChart } from "../charts/LineChart.tsx";
import { routeHash } from "../route.ts";
import { topicExists } from "../shape.ts";

export function TopicPage({ userId, topicKey }: { userId: string; topicKey: string }) {
  // Entity page: entityKey keeps topic A's numbers from showing under topic B while B loads.
  const { data, error, loading, retry } = useData(
    () => progressApi.topic(topicKey),
    `topic:${userId}:${topicKey}`,
    `topic:${topicKey}`,
  );
  const back = <a href={routeHash({ page: "home" })} className="font-body text-sm text-neutral-500 hover:text-brand">← My progress</a>;

  if (!data) {
    return (
      <div className="space-y-3">
        {back}
        {error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading…</StateBox>}
      </div>
    );
  }
  if (!topicExists(data)) {
    return (
      <div className="space-y-3">
        {back}
        <StateBox>That topic doesn't exist.</StateBox>
      </div>
    );
  }

  const weeks = data.trend.map((w) => ({
    key: w.week,
    label: `${dayLabel(w.week)}–${dayLabel(addDays(w.week, 6))}`,
    axisLabel: dayLabel(w.week),
    value: w.accuracy,
    answers: w.answers,
  }));
  const answered = data.trend.reduce((n, w) => n + w.answers, 0);

  return (
    <div className="space-y-5">
      <div>
        {back}
        <h2 className="mt-1 font-display text-2xl font-bold text-neutral-900">{data.title || "Topic"}</h2>
        <p className="mt-1 font-body text-sm text-neutral-500">
          {answered} {answered === 1 ? "answer" : "answers"} in the last 12 weeks
        </p>
      </div>
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading || !!error}>
        <div className="space-y-5">
          <Card title="Accuracy per week" subtitle="Last 12 weeks, every platform">
            {weeks.some((w) => w.value !== null) ? (
              <LineChart points={weeks} label={`Accuracy per week for ${data.title || "this topic"}`} height={160} />
            ) : (
              <StateBox>No graded answers in the last 12 weeks.</StateBox>
            )}
          </Card>
          <Card title="Recent mistakes" subtitle="Your latest wrong answers on this topic">
            {data.recent_mistakes.length === 0 ? (
              <StateBox>No mistakes here yet. Nice!</StateBox>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {data.recent_mistakes.map((m, i) => (
                  <li key={`${m.occurred_at}:${m.item ?? ""}:${i}`} className="flex flex-wrap items-baseline justify-between gap-2 py-2 font-body text-sm">
                    <span className="min-w-0 break-words text-neutral-800">{m.item_label ?? m.item ?? "(no label)"}</span>
                    <span className="min-w-0 break-words text-xs text-neutral-500">
                      {m.source ? sourceLabel(m.source) : "unknown source"} · {daysAgo(m.occurred_at)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </Dimmed>
    </div>
  );
}
```

- [ ] **Step 2: Test and build**

Run: `npm test && npm run build`
Expected: both pass.

- [ ] **Step 3: Look at it (controller, if the implementer has no browser)**

Run `npm run dev`, open `http://localhost:5173/progress/?demo#/`, and click "Modifiers" in the mastery map. Check:
- The title reads "Modifiers" and the subtitle says "48 answers in the last 12 weeks".
- The line has gaps where weeks have no answers.
- Two mistakes are listed.

Then open `#/topic/nope%3Anothing`. The page must say "That topic doesn't exist.", because the demo returns what the real RPC returns for an unknown key: an empty title, 12 empty weeks and no mistakes.

- [ ] **Step 4: Commit**

```bash
git add src/progress/pages/TopicPage.tsx
git commit -m "My progress: topic page" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Link from My Account

**Files:**
- Modify: `src/account/App.tsx` (the `lucide-react` import on line 3, and the `PersonalPage` render)

- [ ] **Step 1: Add the icon import**

Change line 3:

```tsx
import { LogOut, BarChart3, Star, Clock, Eye, EyeOff, LayoutDashboard } from "lucide-react";
```

to:

```tsx
import { LogOut, BarChart3, Star, Clock, Eye, EyeOff, LayoutDashboard, TrendingUp } from "lucide-react";
```

- [ ] **Step 2: Add the link**

In `PersonalPage`, insert this right before the line `{isStaff && (`:

```tsx
      <a
        href="/progress/"
        className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 font-display text-sm font-bold text-neutral-900 hover:border-brand/40 transition-colors"
      >
        <span className="flex items-center gap-2"><TrendingUp size={16} className="text-brand" /> All my progress (Quiz Bot + App)</span>
        <span aria-hidden>→</span>
      </a>
```

`PersonalPage` only renders for a signed-in user, so every student sees the link and staff see it too. The existing App-only "My progress" section below it stays as it is.

- [ ] **Step 3: Build, test, commit**

```bash
npm test && npm run build
git add src/account/App.tsx
git commit -m "My Account: link to All my progress" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Final checks (no sign-in needed)

- [ ] **Step 1: Tests, build, privacy greps**

```bash
npm test
npm run build
grep -c googletagmanager dist/progress/index.html dist/teacher/index.html dist/index.html dist/account/index.html
grep -rl "Demo Student\|Chrystia" dist || echo "no fixtures in dist"
```

Expected:
- All tests pass. That's 77 from before plus 23 new: errors 2, route 4, shape 8, calendar 5, line 4.
- GTM counts: `progress:0`, `teacher:0`, `index:2`, `account:2`.
- The last command prints `no fixtures in dist`.

- [ ] **Step 2: Screenshots (controller, using the browser tool)**

With `npm run dev`, take screenshots at 1280px and 390px wide of:
- `/progress/?demo#/`
- `/progress/?demo#/topic/b1%3Agrammar%3Amodifiers`

The account-page link has no demo mode, so it is checked in Task 13's live check.

Switch pages by setting `location.hash` with eval, because a hash-only navigate never fires a load event. Check against the dataviz anti-patterns:
- No text in series colours, and no legend on the single-series line.
- Axis labels are not clipped or overlapping at 390px.
- The calendar is readable at 390px.
- The mastery rows don't overflow.
- The source share bars use the source colours, with the labels in neutral text.

Fix and commit any problem.

- [ ] **Step 3: Check that demo mode cannot run in production**

Run `npx vite preview --port 4174`, which serves the production build. Open `http://localhost:4174/progress/?demo#/`. It must show "Please sign in to see your progress", not demo data. Stop the preview afterwards.

---

### Task 13: Live check with Oleksandr, then PR

- [ ] **Step 1:** Start `npm run dev` in the worktree. Ask Oleksandr to:
  - Open `http://localhost:5173/account/` and sign in as `pushkar.promo`. That account is linked to his Telegram, so it has Quiz Bot answers.
  - Click **All my progress (Quiz Bot + App)**.

  Then confirm:
  - The tiles match the teacher dashboard's student page for him (`/teacher/#/students`, then his name): accuracy, streak, words learned.
  - The weak topics and mastery map look right.
  - A topic page opens, and the calendar shows the days he practised.
- [ ] **Step 2:** If possible, also sign in with an account that has no activity, and check that the "get started" card appears. If he has no such account, skip this and note it; the SQL tests in plan 1 cover an empty person.
- [ ] **Step 3:** Push and open the PR. Oleksandr merges it, and merging to `main` deploys via GitHub Actions to app.englishpusher.in.ua/progress/.

```bash
git push -u origin feat/my-progress
```

If `gh` is missing, give him a prefilled compare link:
`https://github.com/tauruskin/app-englishpusher/compare/main...feat/my-progress?quick_pull=1&title=...&body=...`, built with Python's `urllib.parse.urlencode`.

The PR body should cover:
- what the page shows;
- privacy (no GTM, `noindex`, each student sees only their own data, enforced by the database);
- the practice-button decision (it opens the bot, and plan 4 adds the deep link);
- the checks and the live-check result.

End it with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
