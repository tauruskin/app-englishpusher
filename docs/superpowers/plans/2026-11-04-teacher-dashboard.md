# Learning Analytics — Plan 2: Teacher Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A `/teacher/` page in the Englishpusher App where Tetiana (teacher) and Oleksandr (admin) see the whole group: Overview, Students, Topics (heatmap), a page per student and a page per topic, drawn from the live `public.analytics_*` RPCs.

**Architecture:** New MPA entry `apps/teacher/index.html` → `src/teacher/`. Hash routing (`#/overview`, `#/students`, `#/topics`, `#/student/<id>`, `#/topic/<key>`, filters in the hash query). All numbers come from the database (plan 1); the page only formats and draws. Pure logic (routes, formatting, sorting, heat bands, column layout) lives in small `.ts` modules with `node --test` tests; React components stay thin. Charts are hand-built SVG/HTML following the dataviz skill rules (no chart library). A dev-only `?demo` mode serves fixture data so the layout can be checked without signing in.

**Tech Stack:** React 18, TypeScript (strict), Tailwind 3, Vite 6 MPA, `@supabase/supabase-js` RPC, `lucide-react` icons, `node --test` (Node 22, runs `.ts` directly).

**Spec:** `moodle-task-builder/docs/superpowers/specs/2026-11-04-learning-analytics-dashboard-design.md` ("Teacher dashboard"). Data layer: `moodle-task-builder/docs/analytics-database.md`.

---

## Ground rules

- Worktree: `D:\tmp\app-teacher-dashboard` (Git Bash `/d/tmp/app-teacher-dashboard`), branch `feat/teacher-dashboard` from `origin/main`. Never touch the main checkout `D:\VIBE CODING\app-englishpusher` (stale branch) except to copy `.env.local` in Task 1.
- Create/edit files with the Write/Edit tools (no heredocs). Commit messages end with a blank line + `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Do not push (Task 15 does).
- No database writes. No Docker. The RPCs already exist live (plan 1).
- Never print or commit `.env.local` (it is gitignored; check `git status` before every commit).
- After every task: `npm test` and `npm run build` must pass.

## RPC contract (from plan 1, live)

All called with `supabase.rpc(name, args)` (POST). Errors: `42501` = not allowed / not signed in, `22023` = bad parameter or unknown person.

| RPC | Args | Returns |
|---|---|---|
| `analytics_me` | — | `{person_id, display_name, role: 'student'|'teacher'|'admin', telegram_linked}` |
| `analytics_teacher_overview` | `p_days int|null, p_source text|null` | `{total_students, active_students, accuracy, accuracy_prev, answers, daily: [{day:'YYYY-MM-DD', by_source:{bot:n,…}}], sources: string[], needs_attention: Attention[]}` |
| `analytics_teacher_students` | `p_days, p_source` | `[{person_id, display_name, accuracy, accuracy_prev, answers, last_active, weakest_topic: {topic_key,title,accuracy}|null, sources: string[]}]` |
| `analytics_teacher_topics` | `p_days, p_source, p_level, p_kind` | `{topics:[{topic_key,title,kind,level,answers,accuracy}], students:[{person_id,display_name}], cells:[{person_id,topic_key,answers,accuracy}], sources}` |
| `analytics_topic_detail` | `p_topic_key, p_days, p_source` | `{topic_key,title,answers,accuracy, students:[{person_id,display_name,answers,accuracy}], most_missed:[{item,label,wrong,answers}], sources}` |
| `analytics_student_detail` | `p_person uuid` | `{person:{id,display_name,role}, summary:{accuracy,accuracy_prev,answers,streak,words_learned,active_days_month,last_active}, weak_topics:[…], topics:[{topic_key,kind,level,title,answers,accuracy,mastery,last_at}], trend:[{week,answers,accuracy}], calendar:[{day,events,by_source}], sources:{bot:n,…}, recent_mistakes:[{topic_key,title,item,item_label,source,activity,occurred_at}]}` |

`Attention = {type:'inactive'|'dropping'|'hard_topic', person_id, display_name, topic_key, title, value, value2}` — inactive: value = days inactive; dropping: value = accuracy now, value2 = before; hard_topic: value = group accuracy, value2 = students. `p_days = null` means all time. Levels are codes `a2, a2plus, b1, b1plus, b2plus, c1`; kinds `grammar | vocab`; sources `bot | app` (later `moodle`, `grammar`).

## Visual rules (dataviz skill, validated)

- Source colors follow the entity, fixed: bot `#2a78d6`, app `#eb6834`, moodle `#1baf7a`, grammar `#eda100` (slots 1–4 of the reference palette; bot+app validated: CVD ΔE 24.7, all checks pass).
- Heatmap/mastery bands use the status palette with the number or label always printed in/next to the mark: below 60 `#d03b3b` (white text), 60–79 `#fab219` (near-black text), 80+ `#0ca30c` (white text), no data `#f0efec` (muted text). Limits mirror `analytics.settings` (`mastery_learning_pct` 60, `mastery_strong_pct` 80).
- Columns ≤ 24px wide, 4px rounded top, square at the baseline, 2px surface gap between stacked segments; hairline grid `#e1e0d9`, axis `#c3c2b7`, muted labels `#898781`, tabular numbers on axes and table columns; text never in a series color.
- Legend only when ≥ 2 series; tooltip on hover AND keyboard focus; every chart has a "Show as table" view.
- Filters in one row above the content: period (7 / 30 / 90 days / all) first, then source (only sources that have data). Refetch keeps the old render at reduced opacity.
- The App is light-only; no dark mode.

## File map

| File | Responsibility |
|---|---|
| `apps/teacher/index.html` | MPA entry |
| `vite.config.ts` | register `teacher` in `APPS` and `rollupOptions.input` |
| `src/teacher/main.tsx` | mount |
| `src/teacher/types.ts` | RPC response types (no imports) |
| `src/teacher/route.ts` (+ test) | parse/format hash routes and filters |
| `src/teacher/format.ts` (+ test) | labels, percentages, deltas, relative days, attention text, error text |
| `src/teacher/sort.ts` (+ test) | stable sort with nulls last |
| `src/teacher/heat.ts` (+ test) | accuracy → band, band styles, cell index |
| `src/teacher/theme.ts` (+ test) | source colors/order, ink tokens |
| `src/teacher/charts/columns.ts` (+ test) | day filling, nice ticks, stacked column layout, rounded-top path |
| `src/teacher/charts/StackedColumns.tsx` | SVG columns + tooltip + legend + table |
| `src/teacher/demo.ts` | dev-only fixtures for `?demo` |
| `src/teacher/api.ts` | RPC wrappers (demo-aware) |
| `src/teacher/useData.ts` | load hook with retry + keep-previous |
| `src/teacher/ui.tsx` | Card, StatTile, Filters, Tabs, StateBox, SourceDots, MasteryBadge, BarRow |
| `src/teacher/App.tsx` | auth + staff gate, header, tabs, routing |
| `src/teacher/pages/Overview.tsx` | tiles, daily chart, needs attention |
| `src/teacher/pages/Students.tsx` | sortable roster |
| `src/teacher/pages/Topics.tsx` | heatmap with level/kind filters |
| `src/teacher/pages/TopicPage.tsx` | one topic: students bars, most missed |
| `src/teacher/pages/StudentPage.tsx` | one student: tiles, topics, weekly answers, mistakes |
| `src/account/App.tsx` | "Teacher dashboard" link for staff |

---

### Task 1: Worktree, dependencies, empty page

**Files:** Create `apps/teacher/index.html`, `src/teacher/main.tsx`, `src/teacher/App.tsx` (placeholder). Modify `vite.config.ts`.

- [ ] **Step 1: Prepare the worktree**

The worktree already exists (`git -C "/d/VIBE CODING/app-englishpusher" worktree list` shows `/d/tmp/app-teacher-dashboard`). Then:

```bash
cd /d/tmp/app-teacher-dashboard
cp "/d/VIBE CODING/app-englishpusher/.env.local" .env.local
git status --short          # .env.local must NOT appear (gitignored)
npm install
npm test
```
Expected: `npm test` passes (existing tests). If `.env.local` shows in `git status`, stop and report.

- [ ] **Step 2: Create `apps/teacher/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex" />
    <title>Teacher dashboard — Englishpusher</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-neutral-50">
    <div id="root"></div>
    <script type="module" src="/src/teacher/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Register the page in `vite.config.ts`**

Add `"teacher",` to the `APPS` array (after `"account",`) and add to `rollupOptions.input` after the `account` line:

```ts
        teacher:         resolve(__dirname, "apps/teacher/index.html"),
```

- [ ] **Step 4: Create `src/teacher/main.tsx`**

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

- [ ] **Step 5: Placeholder `src/teacher/App.tsx`**

```tsx
export default function App() {
  return <p className="p-6 font-body text-sm">Teacher dashboard</p>;
}
```

- [ ] **Step 6: Build**

Run: `npm run build` → succeeds; `ls dist/teacher/index.html` exists.

- [ ] **Step 7: Commit**

```bash
git add apps/teacher/index.html src/teacher/main.tsx src/teacher/App.tsx vite.config.ts
git commit -F <msgfile>   # "Teacher dashboard: empty /teacher/ page"
```

---

### Task 2: Types and routes

**Files:** Create `src/teacher/types.ts`, `src/teacher/route.ts`. Test: `src/teacher/route.test.ts`.

- [ ] **Step 1: Write `src/teacher/types.ts`**

```ts
// Shapes returned by the public.analytics_* RPCs (moodle-task-builder plan 1).
// No imports: tests load this file directly.

export type Role = "student" | "teacher" | "admin";
export type Mastery = "not_enough_data" | "needs_work" | "learning" | "strong" | "mastered";
export type BySource = Record<string, number>;

export interface Me {
  person_id: string;
  display_name: string | null;
  role: Role;
  telegram_linked: boolean;
}

export interface Attention {
  type: "inactive" | "dropping" | "hard_topic";
  person_id: string | null;
  display_name: string | null;
  topic_key: string | null;
  title: string | null;
  value: number | null;
  value2: number | null;
}

export interface DailyRow { day: string; by_source: BySource }

export interface Overview {
  total_students: number;
  active_students: number;
  accuracy: number | null;
  accuracy_prev: number | null;
  answers: number;
  daily: DailyRow[];
  sources: string[];
  needs_attention: Attention[];
}

export interface RosterRow {
  person_id: string;
  display_name: string | null;
  accuracy: number | null;
  accuracy_prev: number | null;
  answers: number;
  last_active: string | null;
  weakest_topic: { topic_key: string; title: string; accuracy: number | null } | null;
  sources: string[];
}

export interface MatrixTopic { topic_key: string; title: string; kind: string; level: string; answers: number; accuracy: number | null }
export interface MatrixCell { person_id: string; topic_key: string; answers: number; accuracy: number | null }
export interface TopicMatrix {
  topics: MatrixTopic[];
  students: { person_id: string; display_name: string | null }[];
  cells: MatrixCell[];
  sources: string[];
}

export interface TopicDetail {
  topic_key: string;
  title: string;
  answers: number;
  accuracy: number | null;
  students: { person_id: string; display_name: string | null; answers: number; accuracy: number | null }[];
  most_missed: { item: string; label: string | null; wrong: number; answers: number }[];
  sources: string[];
}

export interface StudentTopic {
  topic_key: string; kind: string; level: string; title: string;
  answers: number; accuracy: number | null; mastery: Mastery; last_at: string | null;
}

export interface StudentDetail {
  person: { id: string; display_name: string | null; role: Role } | null;
  summary: {
    accuracy: number | null; accuracy_prev: number | null; answers: number; streak: number;
    words_learned: number; active_days_month: number; last_active: string | null;
  };
  weak_topics: StudentTopic[];
  topics: StudentTopic[];
  trend: { week: string; answers: number; accuracy: number | null }[];
  calendar: { day: string; events: number; by_source: BySource }[];
  sources: BySource;
  recent_mistakes: {
    topic_key: string; title: string; item: string | null; item_label: string | null;
    source: string; activity: string; occurred_at: string;
  }[];
}

export type Result<T> = { data: T; error: null } | { data: null; error: string };
```

- [ ] **Step 2: Write the failing test `src/teacher/route.test.ts`**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_FILTERS, parseHash, toHash } from "./route.ts";

test("empty hash is the overview with default filters", () => {
  assert.deepEqual(parseHash(""), { route: { page: "overview" }, filters: DEFAULT_FILTERS });
  assert.deepEqual(parseHash("#/"), { route: { page: "overview" }, filters: DEFAULT_FILTERS });
});

test("tabs and filters are read from the hash", () => {
  assert.deepEqual(parseHash("#/students?days=7&source=bot"), {
    route: { page: "students" },
    filters: { days: 7, source: "bot" },
  });
  assert.deepEqual(parseHash("#/topics?days=all").filters, { days: null, source: null });
});

test("unknown pages and bad filter values fall back to defaults", () => {
  assert.deepEqual(parseHash("#/nope?days=13&source=DROP%20TABLE"), {
    route: { page: "overview" },
    filters: DEFAULT_FILTERS,
  });
});

test("student and topic pages keep their id, including ':' in topic keys", () => {
  assert.deepEqual(parseHash("#/student/abc-123").route, { page: "student", personId: "abc-123" });
  const hash = toHash({ page: "topic", topicKey: "b1:grammar:past-simple" }, DEFAULT_FILTERS);
  assert.equal(hash, "#/topic/b1%3Agrammar%3Apast-simple");
  assert.deepEqual(parseHash(hash).route, { page: "topic", topicKey: "b1:grammar:past-simple" });
});

test("toHash writes only non-default filters", () => {
  assert.equal(toHash({ page: "students" }, DEFAULT_FILTERS), "#/students");
  assert.equal(toHash({ page: "students" }, { days: null, source: "app" }), "#/students?days=all&source=app");
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `node --test src/teacher/route.test.ts` → FAIL (`Cannot find module './route.ts'`).

- [ ] **Step 4: Write `src/teacher/route.ts`**

```ts
// Hash routes for the teacher dashboard: #/<page>[/<id>][?days=7|30|90|all&source=bot]

export type Tab = "overview" | "students" | "topics";
export type Route =
  | { page: Tab }
  | { page: "student"; personId: string }
  | { page: "topic"; topicKey: string };

export interface Filters {
  days: number | null; // null = all time
  source: string | null; // null = every source
}

export const DEFAULT_FILTERS: Filters = { days: 30, source: null };
export const DAY_OPTIONS: (number | null)[] = [7, 30, 90, null];
const TABS: Tab[] = ["overview", "students", "topics"];

function parseFilters(params: URLSearchParams): Filters {
  const d = params.get("days");
  let days = DEFAULT_FILTERS.days;
  if (d === "all") days = null;
  else if (d !== null && DAY_OPTIONS.includes(Number(d))) days = Number(d);
  const s = params.get("source");
  const source = s !== null && /^[a-z]{1,20}$/.test(s) ? s : null;
  return { days, source };
}

export function parseHash(hash: string): { route: Route; filters: Filters } {
  const raw = hash.replace(/^#\/?/, "");
  const [path, query = ""] = raw.split("?");
  const parts = path.split("/").filter(Boolean);
  const filters = parseFilters(new URLSearchParams(query));
  let route: Route = { page: "overview" };
  if (TABS.includes(parts[0] as Tab)) route = { page: parts[0] as Tab };
  else if (parts[0] === "student" && parts[1]) route = { page: "student", personId: decodeURIComponent(parts[1]) };
  else if (parts[0] === "topic" && parts[1]) route = { page: "topic", topicKey: decodeURIComponent(parts[1]) };
  return { route, filters };
}

export function toHash(route: Route, filters: Filters): string {
  let path: string;
  if (route.page === "student") path = `student/${encodeURIComponent(route.personId)}`;
  else if (route.page === "topic") path = `topic/${encodeURIComponent(route.topicKey)}`;
  else path = route.page;
  const q = new URLSearchParams();
  if (filters.days !== DEFAULT_FILTERS.days) q.set("days", filters.days === null ? "all" : String(filters.days));
  if (filters.source) q.set("source", filters.source);
  const qs = q.toString();
  return `#/${path}${qs ? `?${qs}` : ""}`;
}
```

- [ ] **Step 5: Run tests** — `node --test src/teacher/route.test.ts` → 5 passed. `npm run build` passes.

- [ ] **Step 6: Commit** — `git add src/teacher/types.ts src/teacher/route.ts src/teacher/route.test.ts` → "Teacher dashboard: RPC types and hash routes".

---

### Task 3: Formatting helpers

**Files:** Create `src/teacher/format.ts`. Test: `src/teacher/format.test.ts`.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  attentionText, daysAgo, delta, friendlyError, levelLabel, pct, periodLabel, personName, sourceLabel,
} from "./format.ts";

test("pct shows a dash for no data", () => {
  assert.equal(pct(76), "76%");
  assert.equal(pct(0), "0%");
  assert.equal(pct(null), "–");
});

test("delta is signed, in points, with a direction", () => {
  assert.deepEqual(delta(75, 80), { text: "−5 pts", direction: "down" });
  assert.deepEqual(delta(80, 75), { text: "+5 pts", direction: "up" });
  assert.deepEqual(delta(70, 70), { text: "±0", direction: "flat" });
  assert.equal(delta(70, null), null);
  assert.equal(delta(null, 70), null);
});

test("labels for levels, sources, periods and names", () => {
  assert.equal(levelLabel("b1plus"), "B1+");
  assert.equal(levelLabel("c1"), "C1");
  assert.equal(sourceLabel("bot"), "Quiz Bot");
  assert.equal(sourceLabel("app"), "App");
  assert.equal(sourceLabel("other"), "other");
  assert.equal(periodLabel(30), "last 30 days");
  assert.equal(periodLabel(null), "all time");
  assert.equal(personName("  "), "Unnamed student");
  assert.equal(personName("Olena"), "Olena");
});

test("daysAgo counts whole days", () => {
  const now = Date.parse("2026-11-04T12:00:00Z");
  assert.equal(daysAgo("2026-11-04T08:00:00Z", now), "today");
  assert.equal(daysAgo("2026-11-03T10:00:00Z", now), "yesterday");
  assert.equal(daysAgo("2026-10-25T12:00:00Z", now), "10 days ago");
  assert.equal(daysAgo(null, now), "never");
});

test("needs-attention sentences", () => {
  const base = { person_id: "p", display_name: "Nelpy", topic_key: null, title: null, value: null, value2: null };
  assert.equal(attentionText({ ...base, type: "inactive", value: 10 }), "Nelpy hasn't practised for 10 days");
  assert.equal(attentionText({ ...base, type: "dropping", value: 74, value2: 89 }), "Nelpy's accuracy fell from 89% to 74% in the last 14 days");
  assert.equal(
    attentionText({ ...base, type: "hard_topic", person_id: null, display_name: null, topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", value: 56, value2: 4 }),
    "Irregular Verbs is hard for the group: 56% from 4 students",
  );
});

test("RPC errors become friendly messages", () => {
  assert.equal(friendlyError({ code: "42501" }), "You don't have access to this page.");
  assert.equal(friendlyError({ code: "22023" }), "That student or topic doesn't exist.");
  assert.equal(friendlyError({ message: "fetch failed" }), "Couldn't load the data. Check your connection and try again.");
});
```

- [ ] **Step 2: Run** — `node --test src/teacher/format.test.ts` → FAIL (module missing).

- [ ] **Step 3: Write `src/teacher/format.ts`**

```ts
import type { Attention } from "./types.ts";

const SOURCE_LABEL: Record<string, string> = {
  bot: "Quiz Bot",
  app: "App",
  moodle: "Moodle",
  grammar: "Grammar site",
};

export function sourceLabel(source: string): string {
  return SOURCE_LABEL[source] ?? source;
}

export function pct(value: number | null | undefined): string {
  return value === null || value === undefined ? "–" : `${value}%`;
}

export function delta(now: number | null, before: number | null): { text: string; direction: "up" | "down" | "flat" } | null {
  if (now === null || before === null) return null;
  const d = now - before;
  if (d === 0) return { text: "±0", direction: "flat" };
  return { text: `${d > 0 ? "+" : "−"}${Math.abs(d)} pts`, direction: d > 0 ? "up" : "down" };
}

// 'b1plus' -> 'B1+'
export function levelLabel(code: string): string {
  return code.toUpperCase().replace("PLUS", "+");
}

export function periodLabel(days: number | null): string {
  return days === null ? "all time" : `last ${days} days`;
}

export function personName(name: string | null | undefined): string {
  return name?.trim() || "Unnamed student";
}

export function daysAgo(iso: string | null, now: number = Date.now()): string {
  if (!iso) return "never";
  const days = Math.floor((now - Date.parse(iso)) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

export function attentionText(a: Attention): string {
  const name = personName(a.display_name);
  if (a.type === "inactive") return `${name} hasn't practised for ${a.value} days`;
  if (a.type === "dropping") return `${name}'s accuracy fell from ${a.value2}% to ${a.value}% in the last 14 days`;
  return `${a.title ?? a.topic_key} is hard for the group: ${a.value}% from ${a.value2} students`;
}

export function friendlyError(error: { code?: string; message?: string }): string {
  if (error.code === "42501") return "You don't have access to this page.";
  if (error.code === "22023") return "That student or topic doesn't exist.";
  return "Couldn't load the data. Check your connection and try again.";
}

export const MASTERY_LABEL: Record<string, string> = {
  not_enough_data: "Not enough data",
  needs_work: "Needs work",
  learning: "Learning",
  strong: "Strong",
  mastered: "Mastered",
};
```

- [ ] **Step 4: Run** — format tests pass; `npm run build` passes.
- [ ] **Step 5: Commit** — "Teacher dashboard: formatting helpers".

---

### Task 4: Sorting, heat bands, theme

**Files:** Create `src/teacher/sort.ts`, `src/teacher/heat.ts`, `src/teacher/theme.ts`. Tests: `src/teacher/sort.test.ts`, `src/teacher/heat.test.ts`, `src/teacher/theme.test.ts`.

- [ ] **Step 1: Write the failing tests**

`src/teacher/sort.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { sortRows } from "./sort.ts";

const rows = [
  { name: "Olena", acc: 70 },
  { name: "anna", acc: null },
  { name: "Bohdan", acc: 90 },
];

test("numbers sort both ways, nulls always last", () => {
  assert.deepEqual(sortRows(rows, (r) => r.acc, "asc").map((r) => r.name), ["Olena", "Bohdan", "anna"]);
  assert.deepEqual(sortRows(rows, (r) => r.acc, "desc").map((r) => r.name), ["Bohdan", "Olena", "anna"]);
});

test("text sorts case-insensitively and does not mutate the input", () => {
  const copy = [...rows];
  assert.deepEqual(sortRows(rows, (r) => r.name, "asc").map((r) => r.name), ["anna", "Bohdan", "Olena"]);
  assert.deepEqual(rows, copy);
});
```

`src/teacher/heat.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { band, BAND_STYLE, cellIndex } from "./heat.ts";

test("accuracy bands match the mastery limits 60 / 80", () => {
  assert.equal(band(null), "none");
  assert.equal(band(0), "low");
  assert.equal(band(59), "low");
  assert.equal(band(60), "mid");
  assert.equal(band(79), "mid");
  assert.equal(band(80), "high");
  assert.equal(band(100), "high");
});

test("every band has a fill, a readable text color and a label", () => {
  for (const b of ["none", "low", "mid", "high"] as const) {
    assert.match(BAND_STYLE[b].bg, /^#[0-9a-f]{6}$/);
    assert.match(BAND_STYLE[b].fg, /^#[0-9a-f]{6}$/);
    assert.ok(BAND_STYLE[b].label.length > 0);
  }
  assert.equal(BAND_STYLE.mid.fg, "#0b0b0b"); // near-black on the yellow warning fill
});

test("cellIndex finds a cell by person and topic", () => {
  const idx = cellIndex([{ person_id: "p1", topic_key: "t1", answers: 3, accuracy: 67 }]);
  assert.equal(idx.get("p1|t1")?.accuracy, 67);
  assert.equal(idx.get("p1|t2"), undefined);
});
```

`src/teacher/theme.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { orderSources, sourceColor } from "./theme.ts";

test("sources keep a fixed order and fixed colors", () => {
  assert.deepEqual(orderSources(["app", "zzz", "bot"]), ["bot", "app", "zzz"]);
  assert.equal(sourceColor("bot"), "#2a78d6");
  assert.equal(sourceColor("app"), "#eb6834");
  assert.equal(sourceColor("unknown"), "#898781");
});
```

- [ ] **Step 2: Run** — the three test files FAIL (modules missing).

- [ ] **Step 3: Implement**

`src/teacher/sort.ts`:

```ts
export type SortDir = "asc" | "desc";

// Stable sort; null/undefined values always go last, whatever the direction.
export function sortRows<T>(rows: T[], get: (row: T) => string | number | null | undefined, dir: SortDir): T[] {
  return [...rows].sort((a, b) => {
    const x = get(a);
    const y = get(b);
    const xn = x === null || x === undefined;
    const yn = y === null || y === undefined;
    if (xn && yn) return 0;
    if (xn) return 1;
    if (yn) return -1;
    const c = typeof x === "number" && typeof y === "number"
      ? x - y
      : String(x).localeCompare(String(y), "en", { sensitivity: "base" });
    return dir === "asc" ? c : -c;
  });
}
```

`src/teacher/heat.ts`:

```ts
import type { MatrixCell } from "./types.ts";

export type Band = "none" | "low" | "mid" | "high";

// Mirrors analytics.settings: mastery_learning_pct = 60, mastery_strong_pct = 80.
const MID = 60;
const HIGH = 80;

export function band(accuracy: number | null): Band {
  if (accuracy === null) return "none";
  if (accuracy >= HIGH) return "high";
  if (accuracy >= MID) return "mid";
  return "low";
}

// Status palette (dataviz reference): the printed number/label always accompanies the fill.
export const BAND_STYLE: Record<Band, { bg: string; fg: string; label: string }> = {
  none: { bg: "#f0efec", fg: "#898781", label: "No data" },
  low: { bg: "#d03b3b", fg: "#ffffff", label: "Below 60%" },
  mid: { bg: "#fab219", fg: "#0b0b0b", label: "60–79%" },
  high: { bg: "#0ca30c", fg: "#ffffff", label: "80% and up" },
};

export function cellIndex(cells: MatrixCell[]): Map<string, MatrixCell> {
  return new Map(cells.map((c) => [`${c.person_id}|${c.topic_key}`, c]));
}
```

`src/teacher/theme.ts`:

```ts
// Colors follow the entity, never its rank (dataviz). Slots 1-4 of the reference palette.
const SOURCE_ORDER = ["bot", "app", "moodle", "grammar"];
const SOURCE_COLOR: Record<string, string> = {
  bot: "#2a78d6",
  app: "#eb6834",
  moodle: "#1baf7a",
  grammar: "#eda100",
};

export const INK = {
  primary: "#0b0b0b",
  secondary: "#52514e",
  muted: "#898781",
  grid: "#e1e0d9",
  axis: "#c3c2b7",
  surface: "#fcfcfb",
  good: "#006300",
  bad: "#d03b3b",
};

export function sourceColor(source: string): string {
  return SOURCE_COLOR[source] ?? INK.muted;
}

export function orderSources(sources: string[]): string[] {
  const known = SOURCE_ORDER.filter((s) => sources.includes(s));
  const rest = sources.filter((s) => !SOURCE_ORDER.includes(s)).sort();
  return [...known, ...rest];
}
```

- [ ] **Step 4: Run** — `npm test` passes; `npm run build` passes.
- [ ] **Step 5: Commit** — "Teacher dashboard: sorting, heat bands, source colors".

---

### Task 5: Column chart layout (pure)

**Files:** Create `src/teacher/charts/columns.ts`. Test: `src/teacher/charts/columns.test.ts`.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { addDays, dayLabel, fillDays, layoutColumns, niceStep, roundedTopPath } from "./columns.ts";

test("addDays and dayLabel work on plain ISO dates", () => {
  assert.equal(addDays("2026-10-31", 1), "2026-11-01");
  assert.equal(addDays("2026-03-01", -1), "2026-02-28");
  assert.equal(dayLabel("2026-11-04"), "4 Nov");
});

test("fillDays covers the whole period, empty days included", () => {
  const out = fillDays([{ day: "2026-11-03", by_source: { bot: 2 } }], "2026-11-04", 2);
  assert.deepEqual(out.map((d) => d.key), ["2026-11-02", "2026-11-03", "2026-11-04"]);
  assert.deepEqual(out[1].values, { bot: 2 });
  assert.deepEqual(out[0].values, {});
});

test("fillDays for all time starts at the first day with data", () => {
  const out = fillDays([{ day: "2026-11-02", by_source: { app: 1 } }], "2026-11-04", null);
  assert.deepEqual(out.map((d) => d.key), ["2026-11-02", "2026-11-03", "2026-11-04"]);
  assert.deepEqual(fillDays([], "2026-11-04", null).map((d) => d.key), ["2026-11-04"]);
});

test("niceStep picks 1/2/5 x 10^k steps for about 4 ticks", () => {
  assert.equal(niceStep(0), 1);
  assert.equal(niceStep(3), 1);
  assert.equal(niceStep(7), 2);
  assert.equal(niceStep(100), 50);
});

test("stacked segments: fixed order, 2px gap below the top segment, top one rounded", () => {
  const layout = layoutColumns(
    [{ key: "d1", label: "1 Nov", values: { app: 2, bot: 2 } }],
    ["bot", "app"],
    { width: 136, height: 124, left: 36, bottom: 24, top: 0 },
  );
  // plot height 100, top of scale 4 (step 1)
  const [col] = layout.columns;
  assert.equal(col.total, 4);
  assert.equal(col.width, 24); // capped at 24px
  assert.deepEqual(col.segments.map((s) => s.series), ["bot", "app"]);
  assert.deepEqual(col.segments.map((s) => s.top), [false, true]);
  assert.deepEqual(col.segments[0], { series: "bot", value: 2, y: 52, height: 48, top: false });
  assert.deepEqual(col.segments[1], { series: "app", value: 2, y: 0, height: 50, top: true });
  assert.deepEqual(layout.ticks.map((t) => t.value), [0, 1, 2, 3, 4]);
});

test("zero values draw nothing", () => {
  const layout = layoutColumns(
    [{ key: "d1", label: "1 Nov", values: { bot: 0 } }],
    ["bot", "app"],
    { width: 136, height: 124, left: 36, bottom: 24, top: 0 },
  );
  assert.deepEqual(layout.columns[0].segments, []);
  assert.equal(layout.columns[0].total, 0);
});

test("roundedTopPath rounds only the top corners", () => {
  assert.equal(roundedTopPath(0, 0, 10, 20, 4), "M0,20V4Q0,0 4,0H6Q10,0 10,4V20Z");
  // radius never exceeds half the width or the height
  assert.equal(roundedTopPath(0, 0, 4, 1, 4), "M0,1V1Q0,0 1,0H3Q4,0 4,1V1Z");
});
```

- [ ] **Step 2: Run** — FAIL (module missing).

- [ ] **Step 3: Write `src/teacher/charts/columns.ts`**

```ts
import type { BySource, DailyRow } from "../types.ts";

export interface StackDatum { key: string; label: string; values: BySource }
export interface Segment { series: string; value: number; y: number; height: number; top: boolean }
export interface Column {
  key: string; label: string; total: number;
  x: number; width: number; slotX: number; slotWidth: number;
  segments: Segment[];
}
export interface ColumnLayout { columns: Column[]; ticks: { value: number; y: number }[]; plotTop: number; plotBottom: number }
export interface Size { width: number; height: number; left: number; bottom: number; top: number }

export const GAP = 2;      // surface gap between stacked segments
export const MAX_BAR = 24; // columns never thicker than this

export function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function dayLabel(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

export function kyivToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Kyiv", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

// One datum per Kyiv day from (today - days) to today; all time starts at the first day with data.
export function fillDays(daily: DailyRow[], today: string, days: number | null): StackDatum[] {
  const byDay = new Map(daily.map((r) => [r.day, r.by_source]));
  const first = days === null
    ? (daily.length ? [...daily.map((r) => r.day)].sort()[0] : today)
    : addDays(today, -days);
  const out: StackDatum[] = [];
  for (let d = first; d <= today; d = addDays(d, 1)) {
    out.push({ key: d, label: dayLabel(d), values: byDay.get(d) ?? {} });
  }
  return out;
}

export function niceStep(max: number, count = 4): number {
  if (max <= 0) return 1;
  const raw = max / count;
  const exp = Math.pow(10, Math.floor(Math.log10(raw)));
  for (const m of [1, 2, 5, 10]) {
    if (m * exp >= raw) return Math.max(1, m * exp);
  }
  return Math.max(1, 10 * exp);
}

export function layoutColumns(data: StackDatum[], series: string[], size: Size): ColumnLayout {
  const plotTop = size.top;
  const plotBottom = size.height - size.bottom;
  const plotH = plotBottom - plotTop;
  const plotW = size.width - size.left;
  const totals = data.map((d) => series.reduce((sum, s) => sum + (d.values[s] ?? 0), 0));
  const maxTotal = Math.max(0, ...totals);
  const step = niceStep(maxTotal);
  const scaleTop = Math.max(step, Math.ceil(maxTotal / step) * step);

  const ticks: { value: number; y: number }[] = [];
  for (let v = 0; v <= scaleTop; v += step) ticks.push({ value: v, y: plotBottom - (v / scaleTop) * plotH });

  const slot = data.length ? plotW / data.length : plotW;
  const width = Math.max(1, Math.min(MAX_BAR, slot * 0.6));

  const columns = data.map((d, i) => {
    const slotX = size.left + i * slot;
    const x = slotX + (slot - width) / 2;
    const present = series.filter((s) => (d.values[s] ?? 0) > 0);
    let base = plotBottom;
    const segments = present.map((s, j) => {
      const value = d.values[s];
      const h = (value / scaleTop) * plotH;
      const top = j === present.length - 1;
      const yTop = base - h;
      base = yTop;
      return top
        ? { series: s, value, y: yTop, height: h, top }
        : { series: s, value, y: yTop + GAP, height: Math.max(0, h - GAP), top };
    });
    return { key: d.key, label: d.label, total: totals[i], x, width, slotX, slotWidth: slot, segments };
  });

  return { columns, ticks, plotTop, plotBottom };
}

// Rect path with the top two corners rounded; square at the baseline.
export function roundedTopPath(x: number, y: number, w: number, h: number, r: number): string {
  const rr = Math.min(r, w / 2, h);
  return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`;
}
```

- [ ] **Step 4: Run** — `node --test src/teacher/charts/columns.test.ts` passes. If a geometry assertion is off by floating point, fix the implementation, not the expected numbers (they are exact by construction: plot height 100, scale 4). `npm test`, `npm run build` pass.
- [ ] **Step 5: Commit** — "Teacher dashboard: column chart layout".

---

### Task 6: Data access, demo fixtures, load hook

**Files:** Create `src/teacher/demo.ts`, `src/teacher/api.ts`, `src/teacher/useData.ts`.

- [ ] **Step 1: Write `src/teacher/demo.ts`** (dev-only sample data; names invented)

```ts
import type { Me, Overview, RosterRow, StudentDetail, TopicDetail, TopicMatrix } from "./types.ts";

// Used only when the dev server runs with ?demo in the URL (see api.ts).
const today = new Date();
const iso = (daysBack: number) => new Date(today.getTime() - daysBack * 86_400_000).toISOString();
const day = (daysBack: number) => iso(daysBack).slice(0, 10);

const people = [
  { person_id: "d1", display_name: "Anna" },
  { person_id: "d2", display_name: "Bohdan" },
  { person_id: "d3", display_name: "Chrystia" },
  { person_id: "d4", display_name: "Dmytro" },
];

export const DEMO = {
  me: { person_id: "d0", display_name: "Demo Teacher", role: "teacher", telegram_linked: true } as Me,
  overview: {
    total_students: 4, active_students: 3, accuracy: 74, accuracy_prev: 79, answers: 262,
    daily: Array.from({ length: 30 }, (_, i) => ({
      day: day(i),
      by_source: i % 4 === 3 ? {} : { bot: 3 + ((i * 7) % 9), ...(i % 3 === 0 ? { app: 2 + (i % 4) } : {}) },
    })),
    sources: ["app", "bot"],
    needs_attention: [
      { type: "dropping", person_id: "d2", display_name: "Bohdan", topic_key: null, title: null, value: 61, value2: 84 },
      { type: "hard_topic", person_id: null, display_name: null, topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", value: 56, value2: 4 },
      { type: "inactive", person_id: "d4", display_name: "Dmytro", topic_key: null, title: null, value: 12, value2: null },
    ],
  } as Overview,
  students: [
    { ...people[0], accuracy: 86, accuracy_prev: 80, answers: 120, last_active: iso(0), weakest_topic: { topic_key: "b1:grammar:modifiers", title: "Modifiers", accuracy: 58 }, sources: ["app", "bot"] },
    { ...people[1], accuracy: 61, accuracy_prev: 84, answers: 74, last_active: iso(1), weakest_topic: { topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", accuracy: 40 }, sources: ["bot"] },
    { ...people[2], accuracy: 77, accuracy_prev: null, answers: 55, last_active: iso(3), weakest_topic: null, sources: ["bot"] },
    { ...people[3], accuracy: null, accuracy_prev: 70, answers: 0, last_active: iso(12), weakest_topic: null, sources: ["app"] },
  ] as RosterRow[],
  topics: {
    topics: [
      { topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", kind: "grammar", level: "b1", answers: 60, accuracy: 56 },
      { topic_key: "b1:grammar:modifiers", title: "Modifiers", kind: "grammar", level: "b1", answers: 44, accuracy: 68 },
      { topic_key: "b1:vocab:jobs", title: "Lesson 6: Jobs & Work", kind: "vocab", level: "b1", answers: 30, accuracy: 83 },
    ],
    students: people,
    cells: [
      { person_id: "d1", topic_key: "b1:grammar:irregular-verbs", answers: 20, accuracy: 75 },
      { person_id: "d1", topic_key: "b1:grammar:modifiers", answers: 12, accuracy: 58 },
      { person_id: "d1", topic_key: "b1:vocab:jobs", answers: 18, accuracy: 94 },
      { person_id: "d2", topic_key: "b1:grammar:irregular-verbs", answers: 25, accuracy: 40 },
      { person_id: "d2", topic_key: "b1:grammar:modifiers", answers: 20, accuracy: 70 },
      { person_id: "d3", topic_key: "b1:grammar:irregular-verbs", answers: 15, accuracy: 60 },
      { person_id: "d3", topic_key: "b1:vocab:jobs", answers: 12, accuracy: 67 },
    ],
    sources: ["app", "bot"],
  } as TopicMatrix,
  topic: {
    topic_key: "b1:grammar:irregular-verbs", title: "Irregular Verbs", answers: 60, accuracy: 56,
    students: [
      { person_id: "d2", display_name: "Bohdan", answers: 25, accuracy: 40 },
      { person_id: "d3", display_name: "Chrystia", answers: 15, accuracy: 60 },
      { person_id: "d1", display_name: "Anna", answers: 20, accuracy: 75 },
    ],
    most_missed: [
      { item: "b12", label: "Yesterday I ___ (go) to the cinema with my friends.", wrong: 9, answers: 14 },
      { item: "b15", label: "She has ___ (write) three books so far.", wrong: 6, answers: 12 },
    ],
    sources: ["app", "bot"],
  } as TopicDetail,
  student: {
    person: { id: "d1", display_name: "Anna", role: "student" },
    summary: { accuracy: 86, accuracy_prev: 80, answers: 120, streak: 6, words_learned: 214, active_days_month: 9, last_active: iso(0) },
    weak_topics: [],
    topics: [
      { topic_key: "b1:grammar:modifiers", kind: "grammar", level: "b1", title: "Modifiers", answers: 12, accuracy: 58, mastery: "needs_work", last_at: iso(2) },
      { topic_key: "b1:grammar:irregular-verbs", kind: "grammar", level: "b1", title: "Irregular Verbs", answers: 20, accuracy: 75, mastery: "learning", last_at: iso(1) },
      { topic_key: "b1:vocab:jobs", kind: "vocab", level: "b1", title: "Lesson 6: Jobs & Work", answers: 18, accuracy: 94, mastery: "mastered", last_at: iso(0) },
      { topic_key: "b1:vocab:stative-verbs", kind: "vocab", level: "b1", title: "Stative Verbs", answers: 2, accuracy: 50, mastery: "not_enough_data", last_at: iso(9) },
    ],
    trend: Array.from({ length: 8 }, (_, i) => ({ week: day((7 - i) * 7), answers: 8 + ((i * 5) % 11), accuracy: 70 + i * 2 })),
    calendar: [],
    sources: { bot: 100, app: 20 },
    recent_mistakes: [
      { topic_key: "b1:grammar:modifiers", title: "Modifiers", item: "b40", item_label: "It was ___ cold that we stayed inside.", source: "bot", activity: "quiz", occurred_at: iso(1) },
      { topic_key: "b1:vocab:jobs", title: "Lesson 6: Jobs & Work", item: "w:plumber", item_label: "plumber", source: "app", activity: "trivia", occurred_at: iso(2) },
    ],
  } as StudentDetail,
};
```

- [ ] **Step 2: Write `src/teacher/api.ts`**

```ts
import { supabase, isSupabaseConfigured } from "../shared/supabase.ts";
import { DEMO } from "./demo.ts";
import { friendlyError } from "./format.ts";
import type { Filters } from "./route.ts";
import type { Me, Overview, Result, RosterRow, StudentDetail, TopicDetail, TopicMatrix } from "./types.ts";

// Dev server only: /teacher/?demo serves fixtures so the layout can be checked without signing in.
export const isDemo: boolean = import.meta.env.DEV && new URLSearchParams(window.location.search).has("demo");

async function call<T>(fn: string, args: Record<string, unknown>, demo: T): Promise<Result<T>> {
  if (isDemo) return { data: demo, error: null };
  if (!isSupabaseConfigured) return { data: null, error: "Analytics are not available right now." };
  // .rpc() sends POST: these functions may create the caller's person row on first use.
  const { data, error } = await supabase.rpc(fn, args);
  if (error) return { data: null, error: friendlyError(error) };
  return { data: data as T, error: null };
}

const period = (f: Filters) => ({ p_days: f.days, p_source: f.source });

export const api = {
  me: () => call<Me>("analytics_me", {}, DEMO.me),
  overview: (f: Filters) => call<Overview>("analytics_teacher_overview", period(f), DEMO.overview),
  students: (f: Filters) => call<RosterRow[]>("analytics_teacher_students", period(f), DEMO.students),
  topics: (f: Filters, level: string | null, kind: string | null) =>
    call<TopicMatrix>("analytics_teacher_topics", { ...period(f), p_level: level, p_kind: kind }, DEMO.topics),
  topic: (topicKey: string, f: Filters) =>
    call<TopicDetail>("analytics_topic_detail", { p_topic_key: topicKey, ...period(f) }, DEMO.topic),
  student: (personId: string) => call<StudentDetail>("analytics_student_detail", { p_person: personId }, DEMO.student),
};
```

- [ ] **Step 3: Write `src/teacher/useData.ts`**

```ts
import { useCallback, useEffect, useState } from "react";
import type { Result } from "./types.ts";

export interface DataState<T> {
  data: T | null;     // last good data: kept while reloading, so the frame doesn't jump
  error: string | null;
  loading: boolean;
  retry: () => void;
}

// `key` changes → reload. Responses for an older key are ignored.
export function useData<T>(load: () => Promise<Result<T>>, key: string): DataState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let current = true;
    setLoading(true);
    setError(null);
    load().then((r) => {
      if (!current) return;
      if (r.error === null) setData(r.data);
      else setError(r.error);
      setLoading(false);
    });
    return () => {
      current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `key` captures every input of `load`
  }, [key, nonce]);

  const retry = useCallback(() => setNonce((n) => n + 1), []);
  return { data, error, loading, retry };
}
```

- [ ] **Step 4: Build** — `npm run build` passes (`npm test` unchanged). If `tsc` complains that `import.meta.env.DEV` is unknown, check `src/vite-env.d.ts` exists with `/// <reference types="vite/client" />`; create it if missing.
- [ ] **Step 5: Commit** — "Teacher dashboard: RPC access, demo fixtures, load hook".

---

### Task 7: Shared UI pieces and the column chart

**Files:** Create `src/teacher/ui.tsx`, `src/teacher/charts/StackedColumns.tsx`.

- [ ] **Step 1: Write `src/teacher/ui.tsx`**

```tsx
import type { ReactNode } from "react";
import { AlertCircle, ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { BAND_STYLE, band } from "./heat.ts";
import { delta, MASTERY_LABEL, periodLabel, pct, sourceLabel } from "./format.ts";
import { DAY_OPTIONS, type Filters } from "./route.ts";
import { INK, orderSources, sourceColor } from "./theme.ts";
import type { Mastery } from "./types.ts";

export function Card({ title, subtitle, children, right }: { title?: string; subtitle?: string; children: ReactNode; right?: ReactNode }) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-5">
      {(title || right) && (
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="font-display text-base font-bold text-neutral-900">{title}</h2>}
            {subtitle && <p className="font-body text-xs text-neutral-500">{subtitle}</p>}
          </div>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

// Stat tile: label · value · optional delta vs a named period (up is good for accuracy).
export function StatTile({ label, value, now, before, hint }: { label: string; value: string; now?: number | null; before?: number | null; hint?: string }) {
  const d = now !== undefined && before !== undefined ? delta(now, before) : null;
  const Icon = d?.direction === "up" ? ArrowUpRight : d?.direction === "down" ? ArrowDownRight : Minus;
  const color = d?.direction === "up" ? INK.good : d?.direction === "down" ? INK.bad : INK.muted;
  return (
    <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
      <p className="font-body text-xs text-neutral-500">{label}</p>
      <p className="mt-1 font-body text-2xl font-semibold text-neutral-900">{value}</p>
      {d && (
        <p className="mt-0.5 flex items-center gap-1 font-body text-xs" style={{ color }}>
          <Icon size={12} aria-hidden /> {d.text} <span className="text-neutral-400">vs previous period</span>
        </p>
      )}
      {hint && <p className="mt-0.5 font-body text-xs text-neutral-400">{hint}</p>}
    </div>
  );
}

export function StateBox({ error, onRetry, children }: { error?: string | null; onRetry?: () => void; children?: ReactNode }) {
  if (error) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
        <span className="flex items-center gap-2"><AlertCircle size={16} aria-hidden /> {error}</span>
        {onRetry && <button onClick={onRetry} className="rounded-md border border-red-300 px-2 py-1 text-xs hover:bg-red-100">Retry</button>}
      </div>
    );
  }
  return <p className="font-body text-sm text-neutral-400">{children}</p>;
}

// While reloading, keep the previous render at reduced opacity (no skeleton, no jump).
export function Dimmed({ when, children }: { when: boolean; children: ReactNode }) {
  return <div className={`transition-opacity ${when ? "opacity-50" : "opacity-100"}`} aria-busy={when}>{children}</div>;
}

export function SourceDots({ sources }: { sources: string[] }) {
  return (
    <span className="inline-flex flex-wrap gap-2">
      {orderSources(sources).map((s) => (
        <span key={s} className="inline-flex items-center gap-1 font-body text-xs text-neutral-600">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: sourceColor(s) }} aria-hidden />
          {sourceLabel(s)}
        </span>
      ))}
    </span>
  );
}

const MASTERY_BAND: Record<Mastery, keyof typeof BAND_STYLE> = {
  not_enough_data: "none", needs_work: "low", learning: "mid", strong: "high", mastered: "high",
};

export function MasteryBadge({ mastery }: { mastery: Mastery }) {
  const s = BAND_STYLE[MASTERY_BAND[mastery]];
  return (
    <span className="inline-block rounded-full px-2 py-0.5 font-body text-xs font-semibold" style={{ background: s.bg, color: s.fg }}>
      {MASTERY_LABEL[mastery]}
    </span>
  );
}

export function AccuracyCell({ accuracy, answers }: { accuracy: number | null; answers?: number }) {
  const s = BAND_STYLE[band(accuracy)];
  return (
    <span
      className="inline-flex min-w-[3rem] justify-center rounded-md px-2 py-0.5 font-body text-xs font-semibold tabular-nums"
      style={{ background: s.bg, color: s.fg }}
      title={answers !== undefined ? `${pct(accuracy)} of ${answers} answers` : undefined}
    >
      {pct(accuracy)}
    </span>
  );
}

// Horizontal bar: 4px rounded end, square at the start, <= 24px thick, value at the tip.
export function BarRow({ label, value, max, href, note }: { label: string; value: number | null; max: number; href?: string; note?: string }) {
  const w = value === null || max <= 0 ? 0 : Math.max(1, (value / max) * 100);
  const name = href ? <a href={href} className="truncate hover:text-brand hover:underline">{label}</a> : <span className="truncate">{label}</span>;
  return (
    <div className="grid grid-cols-[8rem_1fr_auto] items-center gap-3 py-1.5 font-body text-sm text-neutral-800">
      {name}
      <div className="h-3 rounded-r bg-neutral-100" aria-hidden>
        <div className="h-3 rounded-r" style={{ width: `${w}%`, background: BAND_STYLE[band(value)].bg }} />
      </div>
      <span className="tabular-nums text-neutral-600">{pct(value)}{note && <span className="ml-1 text-xs text-neutral-400">{note}</span>}</span>
    </div>
  );
}

export function FiltersRow({ filters, sources, onChange }: { filters: Filters; sources: string[]; onChange: (f: Filters) => void }) {
  const btn = (active: boolean) =>
    `rounded-md px-3 py-1.5 font-body text-sm transition-colors ${active ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-200/70"}`;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex rounded-lg bg-neutral-100 p-1" role="group" aria-label="Period">
        {DAY_OPTIONS.map((d) => (
          <button key={String(d)} className={btn(filters.days === d)} aria-pressed={filters.days === d} onClick={() => onChange({ ...filters, days: d })}>
            {d === null ? "All time" : `${d} days`}
          </button>
        ))}
      </div>
      {sources.length > 1 && (
        <div className="flex rounded-lg bg-neutral-100 p-1" role="group" aria-label="Source">
          <button className={btn(filters.source === null)} aria-pressed={filters.source === null} onClick={() => onChange({ ...filters, source: null })}>
            All sources
          </button>
          {orderSources(sources).map((s) => (
            <button key={s} className={btn(filters.source === s)} aria-pressed={filters.source === s} onClick={() => onChange({ ...filters, source: s })}>
              {sourceLabel(s)}
            </button>
          ))}
        </div>
      )}
      <span className="font-body text-xs text-neutral-400">Showing {periodLabel(filters.days)}</span>
    </div>
  );
}

export function BandLegend() {
  return (
    <div className="flex flex-wrap gap-3 font-body text-xs text-neutral-600">
      {(["low", "mid", "high", "none"] as const).map((b) => (
        <span key={b} className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-sm" style={{ background: BAND_STYLE[b].bg }} aria-hidden />
          {BAND_STYLE[b].label}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Write `src/teacher/charts/StackedColumns.tsx`**

```tsx
import { useLayoutEffect, useRef, useState } from "react";
import { layoutColumns, roundedTopPath, type StackDatum } from "./columns.ts";
import { INK, orderSources, sourceColor } from "../theme.ts";
import { sourceLabel } from "../format.ts";

const SIZE = { left: 36, bottom: 24, top: 8 };

// Stacked columns per day (or week). Hover or focus a column for the readout; table view below.
// `color` defaults to the fixed source colors; single-series charts pass their own.
export function StackedColumns({ data, series, height = 220, unit, label, color = sourceColor }: {
  data: StackDatum[]; series: string[]; height?: number; unit: string; label: string;
  color?: (series: string) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [hover, setHover] = useState<number | null>(null);
  const ordered = orderSources(series);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(Math.max(240, el.clientWidth)));
    ro.observe(el);
    setWidth(Math.max(240, el.clientWidth));
    return () => ro.disconnect();
  }, []);

  const layout = layoutColumns(data, ordered, { width, height, ...SIZE });
  const every = Math.max(1, Math.ceil(data.length / 6));
  const hovered = hover === null ? null : layout.columns[hover];

  return (
    <div>
      <div ref={ref} className="relative">
        <svg width={width} height={height} role="img" aria-label={label}>
          {layout.ticks.map((t) => (
            <g key={t.value}>
              <line x1={SIZE.left} x2={width} y1={t.y} y2={t.y} stroke={t.value === 0 ? INK.axis : INK.grid} strokeWidth={1} />
              <text x={SIZE.left - 6} y={t.y + 4} textAnchor="end" fontSize={11} fill={INK.muted} style={{ fontVariantNumeric: "tabular-nums" }}>
                {t.value}
              </text>
            </g>
          ))}
          {layout.columns.map((c, i) => (
            <g key={c.key} opacity={hover === null || hover === i ? 1 : 0.55}>
              {c.segments.map((s) =>
                s.top ? (
                  <path key={s.series} d={roundedTopPath(c.x, s.y, c.width, s.height, 4)} fill={color(s.series)} />
                ) : (
                  <rect key={s.series} x={c.x} y={s.y} width={c.width} height={s.height} fill={color(s.series)} />
                ),
              )}
              {i % every === 0 && (
                <text x={c.x + c.width / 2} y={height - 6} textAnchor="middle" fontSize={11} fill={INK.muted}>{c.label}</text>
              )}
              <rect
                x={c.slotX} y={layout.plotTop} width={c.slotWidth} height={layout.plotBottom - layout.plotTop}
                fill="transparent" tabIndex={0} aria-label={`${c.label}: ${c.total} ${unit}`}
                onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(i)} onBlur={() => setHover(null)}
              />
            </g>
          ))}
        </svg>
        {hovered && (
          <div
            className="pointer-events-none absolute top-0 z-10 rounded-lg border border-neutral-200 bg-white px-3 py-2 font-body text-xs shadow-md"
            style={{ left: Math.min(Math.max(0, hovered.x - 60), width - 150) }}
          >
            <p className="mb-1 text-neutral-500">{hovered.label}</p>
            {ordered.map((s) => (
              <p key={s} className="flex items-center gap-2">
                <span className="inline-block h-0.5 w-3" style={{ background: color(s) }} aria-hidden />
                <span className="font-semibold tabular-nums text-neutral-900">{data[hover!].values[s] ?? 0}</span>
                <span className="text-neutral-500">{sourceLabel(s)}</span>
              </p>
            ))}
          </div>
        )}
      </div>
      {ordered.length >= 2 && (
        <div className="mt-2 flex gap-4 font-body text-xs text-neutral-600">
          {ordered.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm" style={{ background: color(s) }} aria-hidden />
              {sourceLabel(s)}
            </span>
          ))}
        </div>
      )}
      <details className="mt-2 font-body text-xs text-neutral-500">
        <summary className="cursor-pointer hover:text-neutral-800">Show as table</summary>
        <table className="mt-2 w-full text-left tabular-nums">
          <thead><tr><th className="py-1 pr-3">Date</th>{ordered.map((s) => <th key={s} className="py-1 pr-3">{sourceLabel(s)}</th>)}</tr></thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.key} className="border-t border-neutral-100">
                <td className="py-1 pr-3">{d.label}</td>
                {ordered.map((s) => <td key={s} className="py-1 pr-3">{d.values[s] ?? 0}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
```

- [ ] **Step 3: Build** — `npm run build` passes (unused exports are fine; `noUnusedLocals` only flags locals).
- [ ] **Step 4: Commit** — "Teacher dashboard: UI pieces and stacked column chart".

---

### Task 8: App shell — sign-in and staff gate, tabs, routing

**Files:** Replace `src/teacher/App.tsx`. Create stubs `src/teacher/pages/{Overview,Students,Topics,TopicPage,StudentPage}.tsx` (each `export function X(props: PageProps) { return null; }`) so the shell compiles; Tasks 9-12 fill them.

- [ ] **Step 1: Write `src/teacher/pages/types.ts`** — shared page props:

```ts
import type { Filters, Route } from "../route.ts";

export interface PageProps {
  filters: Filters;
  setFilters: (f: Filters) => void;
  go: (route: Route) => void;
  href: (route: Route) => string;
}
```

- [ ] **Step 2: Create the five stub pages**, e.g. `src/teacher/pages/Overview.tsx`:

```tsx
import type { PageProps } from "./types.ts";

export function Overview(_props: PageProps) {
  return null;
}
```

`Students.tsx` and `Topics.tsx` are the same with their own names. `TopicPage.tsx` and `StudentPage.tsx`:

```tsx
import type { PageProps } from "./types.ts";

export function TopicPage(_props: PageProps & { topicKey: string }) {
  return null;
}
```

```tsx
import type { PageProps } from "./types.ts";

export function StudentPage(_props: PageProps & { personId: string }) {
  return null;
}
```

- [ ] **Step 3: Write `src/teacher/App.tsx`**

```tsx
import { useEffect, useState, type ReactNode } from "react";
import { AppFooter, AppHeader } from "../shared/AppShell.tsx";
import { useAuth } from "../shared/auth.tsx";
import { isSupabaseConfigured } from "../shared/supabase.ts";
import { api, isDemo } from "./api.ts";
import { parseHash, toHash, type Filters, type Route, type Tab } from "./route.ts";
import { useData } from "./useData.ts";
import { StateBox } from "./ui.tsx";
import { Overview } from "./pages/Overview.tsx";
import { Students } from "./pages/Students.tsx";
import { Topics } from "./pages/Topics.tsx";
import { TopicPage } from "./pages/TopicPage.tsx";
import { StudentPage } from "./pages/StudentPage.tsx";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "students", label: "Students" },
  { id: "topics", label: "Topics" },
];

function useHashState() {
  const [state, setState] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onHash = () => {
      setState(parseHash(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return state;
}

function Dashboard() {
  const { route, filters } = useHashState();
  const me = useData(() => api.me(), "me");
  const href = (r: Route, f: Filters = filters) => toHash(r, f);
  const go = (r: Route) => { window.location.hash = href(r); };
  const setFilters = (f: Filters) => { window.location.hash = href(route, f); };
  const props = { filters, setFilters, go, href: (r: Route) => href(r) };

  if (me.error) return <StateBox error={me.error} onRetry={me.retry} />;
  if (!me.data) return null;
  if (me.data.role === "student") {
    return <StateBox>This page is for teachers. <a href="/account/" className="text-brand hover:underline">Go to My Account</a></StateBox>;
  }

  let page: ReactNode;
  if (route.page === "students") page = <Students {...props} />;
  else if (route.page === "topics") page = <Topics {...props} />;
  else if (route.page === "topic") page = <TopicPage {...props} topicKey={route.topicKey} />;
  else if (route.page === "student") page = <StudentPage {...props} personId={route.personId} />;
  else page = <Overview {...props} />;

  const activeTab = route.page === "student" ? "students" : route.page === "topic" ? "topics" : route.page;
  return (
    <div className="w-full max-w-5xl space-y-5">
      <nav className="flex gap-1 border-b border-neutral-200" aria-label="Dashboard sections">
        {TABS.map((t) => (
          <a
            key={t.id}
            href={href({ page: t.id })}
            aria-current={activeTab === t.id ? "page" : undefined}
            className={`-mb-px border-b-2 px-4 py-2 font-display text-sm font-semibold transition-colors ${
              activeTab === t.id ? "border-brand text-neutral-900" : "border-transparent text-neutral-500 hover:text-neutral-800"
            }`}
          >
            {t.label}
          </a>
        ))}
      </nav>
      {page}
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  let body: ReactNode;
  if (isDemo) body = <Dashboard />;
  else if (!isSupabaseConfigured) body = <StateBox>Analytics are not available right now.</StateBox>;
  else if (loading) body = null;
  else if (!user) body = <StateBox>Please <a href="/account/" className="text-brand hover:underline">sign in</a> with your teacher account.</StateBox>;
  else body = <Dashboard />;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <AppHeader title="Teacher dashboard" subtitle={isDemo ? "Demo data" : "by Englishpusher"} />
      <main className="flex flex-1 justify-center px-4 py-6 sm:px-6 sm:py-8">{body}</main>
      <AppFooter />
    </div>
  );
}
```

- [ ] **Step 4: Build and smoke-test**

`npm run build` passes. Start `npm run dev` (background) and open `http://localhost:5173/teacher/?demo#/overview` — the header and the three tabs render (pages are empty). Stop the dev server.
If `AppFooter` doesn't exist under that name in `src/shared/AppShell.tsx`, read the file and use its actual footer export (the account page imports `AppHeader, AppFooter` from it).

- [ ] **Step 5: Commit** — "Teacher dashboard: shell with staff gate, tabs and routing".

---

### Task 9: Overview page

**Files:** Replace `src/teacher/pages/Overview.tsx`.

- [ ] **Step 1: Write the page**

```tsx
import { AlertTriangle, TrendingDown, UserX } from "lucide-react";
import { api } from "../api.ts";
import { fillDays, kyivToday } from "../charts/columns.ts";
import { StackedColumns } from "../charts/StackedColumns.tsx";
import { attentionText, periodLabel, pct } from "../format.ts";
import { useData } from "../useData.ts";
import { Card, Dimmed, FiltersRow, StatTile, StateBox } from "../ui.tsx";
import type { Attention } from "../types.ts";
import type { PageProps } from "./types.ts";

const ICON = { inactive: UserX, dropping: TrendingDown, hard_topic: AlertTriangle };
const ICON_LABEL = { inactive: "Inactive", dropping: "Dropping", hard_topic: "Hard topic" };

function attentionHref(a: Attention, href: PageProps["href"]): string | null {
  if (a.type === "hard_topic" && a.topic_key) return href({ page: "topic", topicKey: a.topic_key });
  if (a.person_id) return href({ page: "student", personId: a.person_id });
  return null;
}

export function Overview({ filters, setFilters, href }: PageProps) {
  const { data, error, loading, retry } = useData(() => api.overview(filters), JSON.stringify(filters));
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : null;

  const sources = filters.source ? [filters.source] : data.sources;
  return (
    <div className="space-y-5">
      <FiltersRow filters={filters} sources={data.sources} onChange={setFilters} />
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading}>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatTile label="Active students (7 days)" value={`${data.active_students}`} hint={`of ${data.total_students}`} />
            <StatTile label="Accuracy" value={pct(data.accuracy)} now={data.accuracy} before={data.accuracy_prev} />
            <StatTile label="Answers" value={data.answers.toLocaleString("en-GB")} hint={periodLabel(filters.days)} />
            <StatTile label="Needs attention" value={`${data.needs_attention.length}`} />
          </div>

          <Card title="Activity per day" subtitle="Answers and study sessions, by where they happened">
            {data.total_students === 0 ? (
              <StateBox>No students yet.</StateBox>
            ) : (
              <StackedColumns
                data={fillDays(data.daily, kyivToday(), filters.days)}
                series={sources}
                unit="activities"
                label="Activity per day by source"
              />
            )}
          </Card>

          <Card title="Needs attention" subtitle="Inactive students, dropping accuracy and topics the group finds hard">
            {data.needs_attention.length === 0 ? (
              <StateBox>Nothing needs attention right now.</StateBox>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {data.needs_attention.map((a, i) => {
                  const Icon = ICON[a.type];
                  const link = attentionHref(a, href);
                  const text = attentionText(a);
                  return (
                    <li key={i} className="flex items-center gap-3 py-2.5 font-body text-sm text-neutral-800">
                      <Icon size={16} className="shrink-0 text-red-600" aria-hidden />
                      <span className="sr-only">{ICON_LABEL[a.type]}:</span>
                      {link ? <a href={link} className="hover:text-brand hover:underline">{text}</a> : <span>{text}</span>}
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </Dimmed>
    </div>
  );
}
```

- [ ] **Step 2: Build + visual check**

`npm run build` passes. Run `npm run dev`, open `http://localhost:5173/teacher/?demo#/overview`, take a screenshot (superpowers-chrome browser tool if available; otherwise describe what you see). Check: 4 tiles in a row on desktop (2×2 on a 390px-wide viewport), the columns chart with two colors, a legend, a working hover tooltip, "Show as table", three attention rows with icons. Fix layout problems before committing.

- [ ] **Step 3: Commit** — "Teacher dashboard: Overview page".

---

### Task 10: Students page

**Files:** Replace `src/teacher/pages/Students.tsx`.

- [ ] **Step 1: Write the page**

```tsx
import { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { api } from "../api.ts";
import { daysAgo, delta, personName } from "../format.ts";
import { sortRows, type SortDir } from "../sort.ts";
import { useData } from "../useData.ts";
import { AccuracyCell, Card, Dimmed, FiltersRow, SourceDots, StateBox } from "../ui.tsx";
import type { RosterRow } from "../types.ts";
import type { PageProps } from "./types.ts";

type Key = "name" | "accuracy" | "answers" | "last_active";
const GET: Record<Key, (r: RosterRow) => string | number | null> = {
  name: (r) => personName(r.display_name),
  accuracy: (r) => r.accuracy,
  answers: (r) => r.answers,
  last_active: (r) => (r.last_active ? Date.parse(r.last_active) : null),
};

export function Students({ filters, setFilters, href }: PageProps) {
  const { data, error, loading, retry } = useData(() => api.students(filters), JSON.stringify(filters));
  const [sort, setSort] = useState<{ key: Key; dir: SortDir }>({ key: "accuracy", dir: "asc" });
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : null;

  const sources = [...new Set(data.flatMap((r) => r.sources))];
  const rows = sortRows(data, GET[sort.key], sort.dir);
  const header = (key: Key, label: string, align = "text-left") => (
    <th className={`py-2 pr-3 ${align}`} aria-sort={sort.key === key ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}>
      <button
        className="inline-flex items-center gap-1 font-semibold hover:text-neutral-900"
        onClick={() => setSort({ key, dir: sort.key === key && sort.dir === "asc" ? "desc" : "asc" })}
      >
        {label}
        {sort.key === key && (sort.dir === "asc" ? <ArrowUp size={12} aria-hidden /> : <ArrowDown size={12} aria-hidden />)}
      </button>
    </th>
  );

  return (
    <div className="space-y-5">
      <FiltersRow filters={filters} sources={sources} onChange={setFilters} />
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading}>
        <Card title="Students" subtitle="Accuracy and answers for the chosen period; weakest topic over each student's last answers">
          {data.length === 0 ? (
            <StateBox>No students yet.</StateBox>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] font-body text-sm">
                <thead className="text-xs text-neutral-500">
                  <tr className="border-b border-neutral-200">
                    {header("name", "Student")}
                    {header("accuracy", "Accuracy")}
                    {header("answers", "Answers", "text-right")}
                    {header("last_active", "Last active")}
                    <th className="py-2 pr-3 text-left font-semibold">Weakest topic</th>
                    <th className="py-2 text-left font-semibold">Uses</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const d = delta(r.accuracy, r.accuracy_prev);
                    return (
                      <tr key={r.person_id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-2 pr-3">
                          <a href={href({ page: "student", personId: r.person_id })} className="font-semibold text-neutral-900 hover:text-brand hover:underline">
                            {personName(r.display_name)}
                          </a>
                        </td>
                        <td className="py-2 pr-3">
                          <AccuracyCell accuracy={r.accuracy} answers={r.answers} />
                          {d && d.direction !== "flat" && <span className="ml-2 text-xs text-neutral-500">{d.text}</span>}
                        </td>
                        <td className="py-2 pr-3 text-right tabular-nums">{r.answers}</td>
                        <td className="py-2 pr-3 text-neutral-600">{daysAgo(r.last_active)}</td>
                        <td className="py-2 pr-3">
                          {r.weakest_topic ? (
                            <a href={href({ page: "topic", topicKey: r.weakest_topic.topic_key })} className="hover:text-brand hover:underline">
                              {r.weakest_topic.title}
                            </a>
                          ) : <span className="text-neutral-400">–</span>}
                        </td>
                        <td className="py-2"><SourceDots sources={r.sources} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </Dimmed>
    </div>
  );
}
```

- [ ] **Step 2: Build + visual check** of `?demo#/students` (sorting by each column works; nulls stay at the bottom; the table scrolls sideways on a 390px viewport).
- [ ] **Step 3: Commit** — "Teacher dashboard: Students page".

---

### Task 11: Topics page (heatmap)

**Files:** Replace `src/teacher/pages/Topics.tsx`.

- [ ] **Step 1: Write the page**

```tsx
import { useState } from "react";
import { api } from "../api.ts";
import { levelLabel, pct, personName } from "../format.ts";
import { BAND_STYLE, band, cellIndex } from "../heat.ts";
import { useData } from "../useData.ts";
import { BandLegend, Card, Dimmed, FiltersRow, StateBox } from "../ui.tsx";
import type { PageProps } from "./types.ts";

const LEVELS = ["a2", "a2plus", "b1", "b1plus", "b2plus", "c1"];
const KINDS: { id: string | null; label: string }[] = [
  { id: null, label: "All" }, { id: "grammar", label: "Grammar" }, { id: "vocab", label: "Vocabulary" },
];

export function Topics({ filters, setFilters, href }: PageProps) {
  const [level, setLevel] = useState<string | null>(null);
  const [kind, setKind] = useState<string | null>(null);
  const { data, error, loading, retry } = useData(
    () => api.topics(filters, level, kind),
    JSON.stringify([filters, level, kind]),
  );
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : null;
  const cells = cellIndex(data.cells);

  return (
    <div className="space-y-5">
      <FiltersRow filters={filters} sources={data.sources} onChange={setFilters} />
      <div className="flex flex-wrap items-center gap-3 font-body text-sm">
        <label className="flex items-center gap-2 text-neutral-600">
          Level
          <select
            className="rounded-md border border-neutral-300 bg-white px-2 py-1"
            value={level ?? ""}
            onChange={(e) => setLevel(e.target.value || null)}
          >
            <option value="">All levels</option>
            {LEVELS.map((l) => <option key={l} value={l}>{levelLabel(l)}</option>)}
          </select>
        </label>
        <div className="flex rounded-lg bg-neutral-100 p-1" role="group" aria-label="Kind">
          {KINDS.map((k) => (
            <button
              key={String(k.id)}
              aria-pressed={kind === k.id}
              onClick={() => setKind(k.id)}
              className={`rounded-md px-3 py-1 ${kind === k.id ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-200/70"}`}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading}>
        <Card title="Topics × students" subtitle="Accuracy per student and topic; hardest topics first" right={<BandLegend />}>
          {data.topics.length === 0 ? (
            <StateBox>No answers for these filters.</StateBox>
          ) : (
            <div className="overflow-x-auto">
              <table className="border-separate border-spacing-[2px] font-body text-xs">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 bg-white" />
                    {data.topics.map((t) => (
                      <th key={t.topic_key} className="h-32 w-14 align-bottom font-normal">
                        <a
                          href={href({ page: "topic", topicKey: t.topic_key })}
                          className="inline-block max-h-32 -rotate-180 overflow-hidden text-ellipsis whitespace-nowrap text-neutral-700 [writing-mode:vertical-rl] hover:text-brand"
                          title={`${t.title} (${levelLabel(t.level)})`}
                        >
                          {t.title}
                        </a>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="sticky left-0 z-10 bg-white pr-3 text-left font-display text-sm font-bold text-neutral-900">Group</th>
                    {data.topics.map((t) => {
                      const s = BAND_STYLE[band(t.accuracy)];
                      return (
                        <td key={t.topic_key} className="h-9 w-14 rounded-md text-center font-bold tabular-nums" style={{ background: s.bg, color: s.fg }} title={`${t.title}: ${pct(t.accuracy)} of ${t.answers} answers`}>
                          {pct(t.accuracy)}
                        </td>
                      );
                    })}
                  </tr>
                  {data.students.map((p) => (
                    <tr key={p.person_id}>
                      <th className="sticky left-0 z-10 max-w-[10rem] truncate bg-white pr-3 text-left font-semibold">
                        <a href={href({ page: "student", personId: p.person_id })} className="text-neutral-800 hover:text-brand hover:underline">
                          {personName(p.display_name)}
                        </a>
                      </th>
                      {data.topics.map((t) => {
                        const c = cells.get(`${p.person_id}|${t.topic_key}`);
                        const s = BAND_STYLE[band(c?.accuracy ?? null)];
                        const text = c ? pct(c.accuracy) : "";
                        const tip = c ? `${personName(p.display_name)} · ${t.title}: ${pct(c.accuracy)} of ${c.answers} answers` : `${personName(p.display_name)} · ${t.title}: no data`;
                        return (
                          <td key={t.topic_key} className="h-9 w-14 rounded-md text-center tabular-nums" style={{ background: s.bg, color: s.fg }} title={tip} aria-label={tip}>
                            {text}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </Dimmed>
    </div>
  );
}
```

- [ ] **Step 2: Build + visual check** of `?demo#/topics`: vertical topic headers readable, the "Group" row first, empty cells grey with no text, the first column stays visible while scrolling sideways, the legend shows all four bands.
- [ ] **Step 3: Commit** — "Teacher dashboard: Topics heatmap".

---

### Task 12: Topic page and student page

**Files:** Replace `src/teacher/pages/TopicPage.tsx`, `src/teacher/pages/StudentPage.tsx`.

- [ ] **Step 1: Write `TopicPage.tsx`**

```tsx
import { api } from "../api.ts";
import { levelLabel, pct, personName } from "../format.ts";
import { useData } from "../useData.ts";
import { BarRow, Card, Dimmed, FiltersRow, StatTile, StateBox } from "../ui.tsx";
import type { PageProps } from "./types.ts";

export function TopicPage({ filters, setFilters, href, topicKey }: PageProps & { topicKey: string }) {
  const { data, error, loading, retry } = useData(() => api.topic(topicKey, filters), JSON.stringify([topicKey, filters]));
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : null;
  const [level, kind] = topicKey.split(":");

  return (
    <div className="space-y-5">
      <div>
        <a href={href({ page: "topics" })} className="font-body text-sm text-neutral-500 hover:text-brand">← Topics</a>
        <h1 className="mt-1 font-display text-2xl font-bold text-neutral-900">{data.title}</h1>
        <p className="font-body text-sm text-neutral-500">{levelLabel(level)} · {kind === "grammar" ? "Grammar" : "Vocabulary"}</p>
      </div>
      <FiltersRow filters={filters} sources={data.sources} onChange={setFilters} />
      {error && <StateBox error={error} onRetry={retry} />}
      <Dimmed when={loading}>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <StatTile label="Group accuracy" value={pct(data.accuracy)} />
            <StatTile label="Answers" value={`${data.answers}`} />
            <StatTile label="Students" value={`${data.students.length}`} />
          </div>
          <Card title="Students on this topic" subtitle="Weakest first">
            {data.students.length === 0 ? <StateBox>No answers for these filters.</StateBox> : (
              <div>
                {data.students.map((s) => (
                  <BarRow
                    key={s.person_id}
                    label={personName(s.display_name)}
                    value={s.accuracy}
                    max={100}
                    href={href({ page: "student", personId: s.person_id })}
                    note={`(${s.answers})`}
                  />
                ))}
              </div>
            )}
          </Card>
          <Card title="Most missed" subtitle="Questions and words answered wrong most often — worth reteaching">
            {data.most_missed.length === 0 ? <StateBox>No mistakes on this topic. 🎉</StateBox> : (
              <table className="w-full font-body text-sm">
                <thead className="text-xs text-neutral-500">
                  <tr className="border-b border-neutral-200">
                    <th className="py-2 pr-3 text-left font-semibold">Question / word</th>
                    <th className="py-2 text-right font-semibold">Wrong</th>
                  </tr>
                </thead>
                <tbody>
                  {data.most_missed.map((m) => (
                    <tr key={m.item} className="border-b border-neutral-100">
                      <td className="py-2 pr-3 text-neutral-800">{m.label ?? m.item}</td>
                      <td className="py-2 text-right tabular-nums text-neutral-600">{m.wrong} of {m.answers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>
      </Dimmed>
    </div>
  );
}
```

- [ ] **Step 2: Write `StudentPage.tsx`** (the full "My progress" view arrives with plan 3; this is the teacher's working view)

```tsx
import { api } from "../api.ts";
import { addDays, dayLabel } from "../charts/columns.ts";
import { StackedColumns } from "../charts/StackedColumns.tsx";
import { daysAgo, levelLabel, pct, personName, sourceLabel } from "../format.ts";
import { useData } from "../useData.ts";
import { AccuracyCell, Card, Dimmed, MasteryBadge, SourceDots, StatTile, StateBox } from "../ui.tsx";
import type { PageProps } from "./types.ts";

export function StudentPage({ href, personId }: PageProps & { personId: string }) {
  const { data, error, loading, retry } = useData(() => api.student(personId), personId);
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : null;
  const s = data.summary;
  const weeks = data.trend.map((w) => ({
    key: w.week,
    label: `${dayLabel(w.week)}–${dayLabel(addDays(w.week, 6))}`,
    values: { answers: w.answers },
  }));

  return (
    <Dimmed when={loading}>
      <div className="space-y-5">
        <div>
          <a href={href({ page: "students" })} className="font-body text-sm text-neutral-500 hover:text-brand">← Students</a>
          <h1 className="mt-1 font-display text-2xl font-bold text-neutral-900">{personName(data.person?.display_name)}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-3 font-body text-sm text-neutral-500">
            Last active {daysAgo(s.last_active)} <SourceDots sources={Object.keys(data.sources)} />
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatTile label="Accuracy (30 days)" value={pct(s.accuracy)} now={s.accuracy} before={s.accuracy_prev} />
          <StatTile label="Streak" value={`🔥 ${s.streak}`} hint={s.streak === 1 ? "day" : "days"} />
          <StatTile label="Words learned" value={`${s.words_learned}`} />
          <StatTile label="Answers (30 days)" value={`${s.answers}`} hint={`${s.active_days_month} active days this month`} />
        </div>
        <Card title="Answers per week" subtitle="Last 8 weeks, every platform">
          <StackedColumns data={weeks} series={["answers"]} height={180} unit="answers" label="Answers per week" color={() => "#2a78d6"} />
        </Card>
        <Card title="Topics" subtitle="Mastery over the last 20 answers per topic">
          {data.topics.length === 0 ? <StateBox>No activity yet.</StateBox> : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[32rem] font-body text-sm">
                <thead className="text-xs text-neutral-500">
                  <tr className="border-b border-neutral-200">
                    <th className="py-2 pr-3 text-left font-semibold">Topic</th>
                    <th className="py-2 pr-3 text-left font-semibold">Level</th>
                    <th className="py-2 pr-3 text-left font-semibold">Accuracy</th>
                    <th className="py-2 pr-3 text-right font-semibold">Answers</th>
                    <th className="py-2 text-left font-semibold">Mastery</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topics.map((t) => (
                    <tr key={t.topic_key} className="border-b border-neutral-100">
                      <td className="py-2 pr-3">
                        <a href={href({ page: "topic", topicKey: t.topic_key })} className="hover:text-brand hover:underline">{t.title}</a>
                      </td>
                      <td className="py-2 pr-3 text-neutral-600">{levelLabel(t.level)} {t.kind === "grammar" ? "Grammar" : "Vocab"}</td>
                      <td className="py-2 pr-3"><AccuracyCell accuracy={t.accuracy} answers={t.answers} /></td>
                      <td className="py-2 pr-3 text-right tabular-nums">{t.answers}</td>
                      <td className="py-2"><MasteryBadge mastery={t.mastery} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
        <Card title="Recent mistakes" subtitle="Latest wrong answers on every platform">
          {data.recent_mistakes.length === 0 ? <StateBox>No mistakes yet.</StateBox> : (
            <ul className="divide-y divide-neutral-100">
              {data.recent_mistakes.map((m, i) => (
                <li key={i} className="flex flex-wrap items-baseline justify-between gap-2 py-2 font-body text-sm">
                  <span className="text-neutral-800">{m.item_label ?? m.item ?? "–"}</span>
                  <span className="text-xs text-neutral-500">{m.title} · {sourceLabel(m.source)} · {daysAgo(m.occurred_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </Dimmed>
  );
}
```

The weekly chart has one series, so it passes its own color (`color={() => "#2a78d6"}`) and shows no legend.

- [ ] **Step 3: Build + visual check** of `?demo#/topic/b1%3Agrammar%3Airregular-verbs` and `?demo#/student/d1`.
- [ ] **Step 4: Commit** — "Teacher dashboard: topic and student pages".

---

### Task 13: Link from My Account for staff

**Files:** Modify `src/account/App.tsx` (`PersonalPage`).

- [ ] **Step 1: Add the link**

In `PersonalPage`, add state and an effect after the existing `useEffect`:

```tsx
  const [isStaff, setIsStaff] = useState(false);
  useEffect(() => {
    if (!user) return;
    api.me().then((r) => setIsStaff(r.data?.role === "teacher" || r.data?.role === "admin"));
  }, [user]);
```

with `import { api } from "../teacher/api.ts";` and `LayoutDashboard` added to the `lucide-react` import. Then, right after the greeting/sign-out row:

```tsx
      {isStaff && (
        <a
          href="/teacher/"
          className="flex items-center justify-between rounded-xl border border-brand/30 bg-brand/5 px-5 py-4 font-display text-sm font-bold text-neutral-900 hover:bg-brand/10 transition-colors"
        >
          <span className="flex items-center gap-2"><LayoutDashboard size={16} className="text-brand" /> Teacher dashboard</span>
          <span aria-hidden>→</span>
        </a>
      )}
```

Students see no change (role `student`); errors leave `isStaff` false.

- [ ] **Step 2: Build** — `npm run build`, `npm test` pass.
- [ ] **Step 3: Commit** — "My Account: Teacher dashboard link for staff".

---

### Task 14: Final checks (no sign-in needed)

- [ ] **Step 1:** `npm test` (all pass) and `npm run build` (passes; `dist/teacher/index.html` exists).
- [ ] **Step 2:** With `npm run dev`, screenshot every demo page at 1280px and 390px wide: `?demo#/overview`, `#/students`, `#/topics`, `#/topic/b1%3Agrammar%3Airregular-verbs`, `#/student/d1`. Check against `dataviz` `references/anti-patterns.md`: no dual axis, no text in series colors, legend only for ≥2 series, columns ≤ 24px with rounded tops, labels not clipped, tables scroll instead of overflowing. Fix and commit any problem.
- [ ] **Step 3:** Confirm demo mode cannot run in production: open `npm run preview` (serves the production build) at `/teacher/?demo` — it must show the sign-in message, not demo data (`import.meta.env.DEV` is `false` in builds).

---

### Task 15: Live check with Oleksandr, then PR

- [ ] **Step 1:** Ask Oleksandr to run `npm run dev` in the worktree (or start it for him) and open `http://localhost:5173/account/`, sign in with his admin account (`pushkar.promo`), click **Teacher dashboard**, and look through all tabs with real data. Things to confirm: Overview numbers match the plan-1 spot-check (6 students, accuracy ~75%, 4 needs-attention items); a student page opens from the roster; a topic page opens from the heatmap; the source filter switches between Quiz Bot and App.
- [ ] **Step 2:** Also confirm a non-staff account sees "This page is for teachers" (Olena's account if he can, otherwise skip and note it — the database refuses non-staff anyway, tested in plan 1).
- [ ] **Step 3:** Push and hand over the PR link (Oleksandr merges; merging to `main` deploys via GitHub Actions):

```bash
git push -u origin feat/teacher-dashboard
```

PR body: what the page does, screenshots from Task 14, the live check result, and that merging deploys to app.englishpusher.in.ua/teacher/. End with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
