# Moodle Results: App Screens (Plan B) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show the Moodle H5P lesson scores (already live in Supabase, Plan A) on `/teacher/` and `/progress/`, beside the Bot and App data, hidden when there is no Moodle data.

**Architecture:** The RPCs already return a `moodle` key (null when there is no data) on `analytics_teacher_topics`, `analytics_topic_detail`, `analytics_student_detail`, `analytics_student`, plus `hard_lesson` rows in the overview's `needs_attention` and a new RPC `analytics_student_moodle_attempts(p_person)`. This plan adds types, small pure helpers (unit-tested with `node --test`), demo fixtures, and the UI: a "Moodle · first try" row in the Topics heatmap, a "Moodle lessons" card on the teacher topic and student pages, a Moodle line in "Needs attention", and a "Moodle lessons" card on the student's Overview and Topics tabs.

**Tech Stack:** React + TypeScript + Vite MPA (app-englishpusher), Tailwind, `node --test` for pure modules.

**Spec:** `moodle-task-builder/docs/superpowers/specs/2026-11-06-moodle-results-analytics-design.md` §4 (App) and the session mockup. SQL shapes: `moodle-task-builder/deploy/analytics/sql/2026-11-06-analytics-11-moodle-metrics.sql` (functions `moodle_matrix`, `moodle_topic_detail`, `moodle_student`, `moodle_attempts_list`, `moodle_attention`).

**Adaptations to the real screens (decided while planning):**
- The Topics page is a topics × students heatmap, so Moodle is an extra row "Moodle · first try" under "Group" (latest + attempts in the tooltip); Moodle-only topics become extra columns at the end. Student rows stay Bot + App.
- The Moodle attempts list is on the teacher's student page only. In Telegram, `/progress/` loads through the Edge Function `progress-telegram`, which returns `analytics_student` only; students see their Moodle summary, topics and other lessons.
- Moodle never changes accuracy, mastery or weak topics in the UI either: it is always a separate card/row labelled "Moodle".

## Rules for every task

- Work in the worktree `D:\tmp\app-moodle-results` (branch `feat/moodle-results`). Never push.
- Use the Write/Edit tools, not shell heredocs. Never read or print `.env` / `.env.local`.
- Demo data uses invented names only (the existing demo people: Anna, Bohdan, Chrystia, Dmytro).
- Type-check with `npx tsc -p tsconfig.app.json --noEmit` (plain `tsc` checks nothing in this repo). Tests: `npm test`.
- Commit after each task with the trailer `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## File structure

| File | Change |
|---|---|
| `src/teacher/types.ts` | Moodle types; `moodle?` on `TopicMatrix`, `TopicDetail`, `StudentDetail`; `hard_lesson` in `Attention` |
| `src/progress/types.ts` | `moodle?` on `Progress` |
| `src/teacher/format.ts` (+ test) | `moodleRange`, `attemptsText`, `scoreText`, `hard_lesson` in `attentionText` |
| `src/teacher/moodle.ts` (+ `moodle.test.ts`) | `matrixColumns` (Bot/App topics + Moodle-only topics) |
| `src/teacher/ui.tsx` | `MoodleRange` component |
| `src/teacher/api.ts`, `src/teacher/demo.ts`, `src/progress/demo.ts` | attempts RPC + demo `moodle` blocks |
| `src/teacher/pages/Topics.tsx` | Moodle row + Moodle-only columns |
| `src/teacher/pages/TopicPage.tsx` | "Moodle lessons on this topic" card |
| `src/teacher/pages/StudentPage.tsx` | "Moodle lessons" card + attempts list |
| `src/teacher/pages/Overview.tsx` | `hard_lesson` row (icon, key by `hvp_id`) |
| `src/progress/pages/Overview.tsx`, `src/progress/pages/Topics.tsx` | "Moodle lessons" cards |

---

### Task 0: Worktree setup

- [ ] **Step 1:** `cd D:\tmp\app-moodle-results && npm ci` (the worktree has no `node_modules`).
- [ ] **Step 2:** `npm test` and `npx tsc -p tsconfig.app.json --noEmit`. Expected: all pass on the untouched branch. No commit.

---

### Task 1: Types and pure helpers

**Files:** Modify `src/teacher/types.ts`, `src/progress/types.ts`, `src/teacher/format.ts`, `src/teacher/format.test.ts`; Create `src/teacher/moodle.ts`, `src/teacher/moodle.test.ts`.

- [ ] **Step 1: Add the types** to `src/teacher/types.ts` (after `WrongAnswer`):

```ts
/** Moodle H5P lesson scores (moodle-task-builder parts 10-11). Percentages 0-100; null = unknown. */
export interface MoodleMatrixTopic {
  topic_key: string; title: string; kind: string; level: string;
  first_try: number | null; latest: number | null; attempts: number | null; students: number;
}
export interface MoodleMatrixCell { person_id: string; topic_key: string; first_try: number | null; latest: number | null; attempts: number }
export interface MoodleMatrix { topics: MoodleMatrixTopic[]; cells: MoodleMatrixCell[] }
export interface MoodleLesson {
  hvp_id: number; title: string; section_name: string | null;
  first_try: number | null; latest: number | null; attempts: number | null; students?: number;
}
export interface MoodleTopicDetail {
  first_try: number | null; latest: number | null; attempts: number | null; students: number;
  lessons: MoodleLesson[];
  by_student: { person_id: string; display_name: string | null; first_try: number | null; latest: number | null; attempts: number }[];
}
export interface MoodleStudentTopic { topic_key: string; title: string; first_try: number | null; latest: number | null; attempts: number; lessons: number }
export interface MoodleStudent {
  lessons: number; first_try: number | null; latest: number | null;
  topics: MoodleStudentTopic[]; other_lessons: MoodleLesson[];
}
export interface MoodleAttempt {
  attempt_id: number; occurred_at: string; hvp_id: number; title: string; section_name: string | null;
  topic_key: string | null; topic_title: string | null; raw_score: number; max_score: number | null;
  pct: number | null; before_tracking: boolean; is_first_try: boolean;
}
```

In `Attention`: `type: "inactive" | "dropping" | "hard_topic" | "hard_lesson";` and add `hvp_id?: number;`.
Add `moodle?: MoodleMatrix | null;` to `TopicMatrix`, `moodle?: MoodleTopicDetail | null;` to `TopicDetail`, `moodle?: MoodleStudent | null;` to `StudentDetail`.
In `src/progress/types.ts`: import `MoodleStudent` from `../teacher/types.ts` and add `moodle?: MoodleStudent | null;` to `Progress`.

- [ ] **Step 2: Write the failing tests.** Append to `src/teacher/format.test.ts` (and add `attemptsText, moodleRange, scoreText` to its import):

```ts
test("moodleRange shows first try and latest", () => {
  assert.equal(moodleRange(60, 80), "60% → 80%");
  assert.equal(moodleRange(null, 90), "– → 90%");
  assert.equal(moodleRange(undefined, null), "– → –");
});
test("attemptsText keeps one decimal for averages", () => {
  assert.equal(attemptsText(2), "2");
  assert.equal(attemptsText(1.8), "1.8");
  assert.equal(attemptsText(null), "–");
});
test("scoreText shows raw / max", () => {
  assert.equal(scoreText(8, 10), "8 / 10");
  assert.equal(scoreText(8.06, 10), "8.1 / 10");
  assert.equal(scoreText(5, null), "5");
});
test("attentionText for a hard Moodle lesson", () => {
  const base = { type: "hard_lesson" as const, person_id: null, display_name: null, topic_key: null, hvp_id: 460 };
  assert.equal(attentionText({ ...base, title: "Lesson 1. Activation", value: 48, value2: 5 }),
    "Lesson 1. Activation (Moodle): first try 48% from 5 students");
  assert.equal(attentionText({ ...base, title: null, value: null, value2: null }), "A Moodle lesson is hard for the group");
});
```

`src/teacher/moodle.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { matrixColumns } from "./moodle.ts";
import type { MatrixTopic, MoodleMatrix } from "./types.ts";

const t = (key: string, accuracy: number): MatrixTopic =>
  ({ topic_key: key, title: key.split(":")[2], kind: key.split(":")[1], level: key.split(":")[0], answers: 10, accuracy });
const m = (key: string, first: number | null): MoodleMatrix["topics"][number] =>
  ({ topic_key: key, title: key.split(":")[2], kind: key.split(":")[1], level: key.split(":")[0], first_try: first, latest: 90, attempts: 1.5, students: 2 });

test("no Moodle: the Bot/App topics in their order", () => {
  const cols = matrixColumns([t("b1:grammar:a", 50), t("b1:vocab:b", 70)], null);
  assert.deepEqual(cols.map((c) => c.topic_key), ["b1:grammar:a", "b1:vocab:b"]);
  assert.ok(cols.every((c) => c.moodle === null && c.answers !== null));
});

test("Moodle data joins its topic; Moodle-only topics come last, lowest first try first", () => {
  const cols = matrixColumns([t("b1:grammar:a", 50)], {
    topics: [m("b1:vocab:z", 80), m("b1:grammar:a", 40), m("b1:vocab:y", null), m("b1:vocab:x", 30)],
    cells: [],
  });
  assert.deepEqual(cols.map((c) => c.topic_key), ["b1:grammar:a", "b1:vocab:x", "b1:vocab:z", "b1:vocab:y"]);
  assert.equal(cols[0].moodle?.first_try, 40);
  assert.equal(cols[0].answers, 10);
  assert.equal(cols[1].answers, null);
  assert.equal(cols[1].accuracy, null);
});
```

- [ ] **Step 3: Run to see them fail:** `npm test` → the new tests fail (missing exports / module).

- [ ] **Step 4: Implement.** In `src/teacher/format.ts` add:

```ts
/** "60% → 80%": a Moodle first try and the latest score. */
export function moodleRange(first: number | null | undefined, latest: number | null | undefined): string {
  return `${pct(first)} → ${pct(latest)}`;
}

/** Attempts: whole numbers as is, averages with one decimal. */
export function attemptsText(n: number | null | undefined): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return "–";
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}

const score = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1));

/** "8 / 10" for one Moodle attempt (the max may be unknown). */
export function scoreText(raw: number, max: number | null): string {
  return max === null || !Number.isFinite(max) ? score(raw) : `${score(raw)} / ${score(max)}`;
}
```

In `attentionText`, before `const topic = a.title || a.topic_key || "A topic";`:

```ts
  if (a.type === "hard_lesson") {
    const lesson = a.title || "A Moodle lesson";
    if (value === null) return `${lesson} is hard for the group`;
    return value2 === null
      ? `${lesson} (Moodle): first try ${value}%`
      : `${lesson} (Moodle): first try ${value}% from ${value2} students`;
  }
```

Create `src/teacher/moodle.ts`:

```ts
import type { MatrixTopic, MoodleMatrix, MoodleMatrixTopic } from "./types.ts";

/** One heatmap column: a topic with Bot/App numbers (null when Moodle-only) and Moodle numbers (null when none). */
export interface MatrixColumn {
  topic_key: string; title: string; kind: string; level: string;
  answers: number | null; accuracy: number | null; moodle: MoodleMatrixTopic | null;
}

// Bot/App topics keep their order (hardest first); Moodle-only topics follow, lowest first try first
// (unknown first try last), then by title.
export function matrixColumns(topics: MatrixTopic[], moodle: MoodleMatrix | null | undefined): MatrixColumn[] {
  const byKey = new Map((moodle?.topics ?? []).map((m) => [m.topic_key, m]));
  const cols: MatrixColumn[] = topics.map((t) => ({ ...t, moodle: byKey.get(t.topic_key) ?? null }));
  const known = new Set(topics.map((t) => t.topic_key));
  const extra = (moodle?.topics ?? [])
    .filter((m) => !known.has(m.topic_key))
    .sort((a, b) => (a.first_try ?? 101) - (b.first_try ?? 101) || a.title.localeCompare(b.title));
  for (const m of extra) {
    cols.push({ topic_key: m.topic_key, title: m.title, kind: m.kind, level: m.level, answers: null, accuracy: null, moodle: m });
  }
  return cols;
}
```

- [ ] **Step 5:** `npm test` and `npx tsc -p tsconfig.app.json --noEmit` → pass.
- [ ] **Step 6: Commit** `git add -A src && git commit -m "Moodle: types and helpers for lesson scores" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`

---

### Task 2: API call, MoodleRange component, demo data

**Files:** Modify `src/teacher/api.ts`, `src/teacher/ui.tsx`, `src/teacher/demo.ts`, `src/progress/demo.ts`.

- [ ] **Step 1: API.** In `src/teacher/api.ts` add `MoodleAttempt` to the type import and to `api`:

```ts
  studentMoodleAttempts: (personId: string) =>
    call<MoodleAttempt[]>("analytics_student_moodle_attempts", { p_person: personId }, (d) => d.moodleAttempts),
```

- [ ] **Step 2: `MoodleRange`** in `src/teacher/ui.tsx` (import `moodleRange` from `./format.ts`):

```tsx
// "60% → 80%": Moodle first try and latest; the latest is green when it went up, red when it went down.
export function MoodleRange({ first, latest }: { first: number | null; latest: number | null }) {
  const up = first !== null && latest !== null && latest > first;
  const down = first !== null && latest !== null && latest < first;
  const [a, b] = moodleRange(first, latest).split(" → ");
  return (
    <span className="whitespace-nowrap font-body text-sm tabular-nums">
      <span className="text-neutral-700">{a}</span>
      <span className="mx-1 text-neutral-400" aria-hidden>→</span>
      <span className="sr-only"> then </span>
      <span style={{ color: up ? INK.good : down ? INK.bad : undefined }} className={up || down ? "font-semibold" : "text-neutral-700"}>{b}</span>
    </span>
  );
}
```

- [ ] **Step 3: Teacher demo** (`src/teacher/demo.ts`, invented data only):
  - `overview.sources`: `["app", "bot", "moodle"]`; add to `needs_attention`:
    `{ type: "hard_lesson", person_id: null, display_name: null, topic_key: null, title: "Lesson 4. Adverbs of Frequency", value: 52, value2: 3, hvp_id: 567 }`.
  - `topics` gets `moodle: { topics: [ {topic_key:"b1:grammar:modifiers", title:"Modifiers", kind:"grammar", level:"b1", first_try:58, latest:86, attempts:2.1, students:3}, {topic_key:"b1:grammar:adverbs-of-frequency", title:"Adverbs of Frequency", kind:"grammar", level:"b1", first_try:65, latest:88, attempts:1.8, students:3} ], cells: [ {person_id:"d1", topic_key:"b1:grammar:modifiers", first_try:50, latest:90, attempts:3}, {person_id:"d2", topic_key:"b1:grammar:modifiers", first_try:40, latest:80, attempts:2}, {person_id:"d3", topic_key:"b1:grammar:adverbs-of-frequency", first_try:70, latest:70, attempts:1} ] }` (one Bot/App topic + one Moodle-only topic).
  - `topic` gets `moodle: { first_try:58, latest:86, attempts:2.1, students:3, lessons:[ {hvp_id:567, title:"Lesson 4. Adverbs of Frequency", section_name:"Lesson 4. ADVERBS of FREQUENCY", first_try:52, latest:84, attempts:2.3, students:3}, {hvp_id:653, title:"Lesson 4. Activation", section_name:"Lesson 4. ADVERBS of FREQUENCY", first_try:64, latest:88, attempts:1.7, students:3} ], by_student:[ {person_id:"d2", display_name:"Bohdan", first_try:40, latest:80, attempts:2}, {person_id:"d1", display_name:"Anna", first_try:50, latest:90, attempts:3}, {person_id:"d3", display_name:"Chrystia", first_try:85, latest:85, attempts:1} ] }`.
  - `student` gets `moodle: { lessons:3, first_try:58, latest:84, topics:[ {topic_key:"b1:grammar:modifiers", title:"Modifiers", first_try:50, latest:90, attempts:3, lessons:1} ], other_lessons:[ {hvp_id:460, title:"Lesson 1. Activation", section_name:"Lesson 1. WHO ARE YOU", first_try:null, latest:90, attempts:1} ] }`.
  - New key `moodleAttempts: [ {attempt_id:3, occurred_at: iso(0), hvp_id:567, title:"Lesson 4. Adverbs of Frequency", section_name:"Lesson 4. ADVERBS of FREQUENCY", topic_key:"b1:grammar:modifiers", topic_title:"Modifiers", raw_score:9, max_score:10, pct:90, before_tracking:false, is_first_try:false}, {attempt_id:2, occurred_at: iso(0), …raw_score:5, pct:50, is_first_try:true}, {attempt_id:1, occurred_at: iso(60), hvp_id:460, title:"Lesson 1. Activation", section_name:"Lesson 1. WHO ARE YOU", topic_key:null, topic_title:null, raw_score:9, max_score:10, pct:90, before_tracking:true, is_first_try:false} ] as MoodleAttempt[]`.
- [ ] **Step 4: Progress demo** (`src/progress/demo.ts`): `progress.moodle` = the same `MoodleStudent` shape as the teacher `student.moodle`, and add `moodle: 3` to `progress.sources` if a `sources` map exists there.
- [ ] **Step 5:** `npm test`, `npx tsc -p tsconfig.app.json --noEmit` → pass.
- [ ] **Step 6: Commit** "Moodle: attempts RPC, MoodleRange, demo data".

---

### Task 3: Topics heatmap — Moodle row

**Files:** Modify `src/teacher/pages/Topics.tsx`.

- [ ] **Step 1:** Import `matrixColumns` from `../moodle.ts`, `attemptsText` from `../format.ts`, `sourceColor` from `../theme.ts`. After `const cells = cellIndex(data.cells);` add `const cols = matrixColumns(data.topics, data.moodle);` and `const moodleCells = new Map((data.moodle?.cells ?? []).map((c) => [`${c.person_id}|${c.topic_key}`, c]));`.
- [ ] **Step 2:** Replace every `data.topics.map((t) => …)` in the table with `cols.map((t) => …)`. The empty check becomes `cols.length === 0`. In the "Group" row, a column without Bot/App data (`t.answers === null`) renders the "No data" style with `<span className="sr-only">No Bot or App data</span>`; otherwise as now (use `t.accuracy` and `t.answers ?? 0` in the tooltip). Student cells: when `t.answers === null`, render the "No data" cell (no lookup).
- [ ] **Step 3:** When `data.moodle` is not null, add a row right after "Group":

```tsx
{data.moodle && (
  <tr>
    <th scope="row" className="sticky left-0 z-10 bg-white pr-3 text-left font-display text-sm font-bold text-neutral-900">
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block h-2 w-2 rounded-full" style={{ background: sourceColor("moodle") }} aria-hidden />
        Moodle · first try
      </span>
    </th>
    {cols.map((t) => {
      const m = t.moodle;
      const s = BAND_STYLE[band(m?.first_try ?? null)];
      const tip = m
        ? `${t.title} · Moodle lessons: first try ${pct(m.first_try)}, latest ${pct(m.latest)}, ${attemptsText(m.attempts)} attempts per student, ${m.students} students`
        : `${t.title}: no Moodle lessons`;
      return (
        <td key={t.topic_key} className="h-9 w-14 min-w-[3.5rem] rounded-md text-center font-bold tabular-nums" style={{ background: s.bg, color: s.fg }} title={tip}>
          {m ? pct(m.first_try) : <span className="sr-only">No Moodle data</span>}
        </td>
      );
    })}
  </tr>
)}
```

  Student rows stay Bot + App only (the `moodleCells` map is used only in the cell tooltip: append ` · Moodle first try X% → latest Y%` when the student has a Moodle cell for that topic).
- [ ] **Step 4:** Card subtitle becomes `data.moodle ? "Accuracy per student and topic (Bot + App); Moodle row = lesson first-try average" : "Accuracy per student and topic; hardest topics first"`.
- [ ] **Step 5:** `npx tsc -p tsconfig.app.json --noEmit`, `npm test` → pass. Commit "Teacher Topics: Moodle first-try row and Moodle-only topics".

---

### Task 4: Teacher topic page — "Moodle lessons on this topic"

**Files:** Modify `src/teacher/pages/TopicPage.tsx`.

- [ ] **Step 1:** The "Unknown topic" check becomes `if (!data.title && data.answers === 0 && !data.moodle)`.
- [ ] **Step 2:** After the stat-tile grid, when `data.moodle` is not null, render:

```tsx
{data.moodle && (
  <Card title="Moodle lessons on this topic" subtitle="H5P lesson scores. First try = the first attempt we saw. They never change the accuracy above.">
    <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatTile label="First try" value={pct(data.moodle.first_try)} />
      <StatTile label="Latest" value={pct(data.moodle.latest)} />
      <StatTile label="Attempts" value={attemptsText(data.moodle.attempts)} hint="per student per lesson" />
      <StatTile label="Students" value={`${data.moodle.students}`} />
    </div>
    <table className="w-full font-body text-sm">
      <thead className="text-xs text-neutral-500">
        <tr className="border-b border-neutral-200">
          <th scope="col" className="py-2 pr-3 text-left font-semibold">Lesson</th>
          <th scope="col" className="py-2 pr-3 text-left font-semibold">First try → latest</th>
          <th scope="col" className="py-2 text-right font-semibold">Attempts</th>
        </tr>
      </thead>
      <tbody>
        {data.moodle.lessons.map((l) => (
          <tr key={l.hvp_id} className="border-b border-neutral-100">
            <td className="py-2 pr-3 text-neutral-800">{l.title}{l.section_name && <span className="block text-xs text-neutral-400">{l.section_name}</span>}</td>
            <td className="py-2 pr-3"><MoodleRange first={l.first_try} latest={l.latest} /></td>
            <td className="py-2 text-right tabular-nums text-neutral-600">{attemptsText(l.attempts)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <h3 className="mb-1 mt-5 font-display text-sm font-semibold text-neutral-700">Students</h3>
    <ul className="divide-y divide-neutral-100">
      {data.moodle.by_student.map((s) => (
        <li key={s.person_id} className="flex items-center justify-between gap-3 py-2 font-body text-sm">
          <a href={href({ page: "student", personId: s.person_id })} className="truncate hover:text-brand hover:underline">{personName(s.display_name)}</a>
          <span className="flex items-center gap-3">
            <MoodleRange first={s.first_try} latest={s.latest} />
            <span className="text-xs text-neutral-400">{s.attempts} {s.attempts === 1 ? "attempt" : "attempts"}</span>
          </span>
        </li>
      ))}
    </ul>
  </Card>
)}
```

  Imports: `attemptsText` from `../format.ts`, `MoodleRange` from `../ui.tsx`.
- [ ] **Step 3:** tsc + tests pass. Commit "Teacher topic page: Moodle lessons card".

---

### Task 5: Teacher student page — "Moodle lessons" + attempts

**Files:** Modify `src/teacher/pages/StudentPage.tsx`.

- [ ] **Step 1:** Add, in the same file, a component that loads the attempts only when shown:

```tsx
function MoodleAttempts({ personId }: { personId: string }) {
  const { data, error, retry } = useData(() => api.studentMoodleAttempts(personId), personId, `moodle-attempts:${personId}`);
  if (!data) return error ? <StateBox error={error} onRetry={retry} /> : <StateBox>Loading attempts…</StateBox>;
  if (data.length === 0) return <StateBox>No attempts yet.</StateBox>;
  return (
    <ul className="divide-y divide-neutral-100">
      {data.map((a) => (
        <li key={a.attempt_id} className="flex flex-wrap items-baseline justify-between gap-2 py-2 font-body text-sm">
          <span className="min-w-0">
            <span className="text-neutral-800">{a.title}</span>
            <span className="block text-xs text-neutral-500">{a.topic_title ?? a.section_name ?? "No topic"} · {daysAgo(a.occurred_at)}</span>
          </span>
          <span className="flex items-center gap-2 tabular-nums">
            {scoreText(a.raw_score, a.max_score)}
            {a.before_tracking && <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">before tracking</span>}
            {a.is_first_try && <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600">first try</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2:** After the "Topics" card, when `data.moodle` is not null:

```tsx
{data.moodle && (
  <Card title="Moodle lessons" subtitle="H5P lesson scores. Not part of accuracy or mastery.">
    <p className="mb-3 font-body text-sm text-neutral-700">
      {data.moodle.lessons} {data.moodle.lessons === 1 ? "lesson" : "lessons"} · first try → latest{" "}
      <MoodleRange first={data.moodle.first_try} latest={data.moodle.latest} />
    </p>
    {data.moodle.topics.length > 0 && (
      <ul className="divide-y divide-neutral-100">
        {data.moodle.topics.map((t) => (
          <li key={t.topic_key} className="flex items-center justify-between gap-3 py-2 font-body text-sm">
            <a href={href({ page: "topic", topicKey: t.topic_key })} className="truncate hover:text-brand hover:underline">{t.title}</a>
            <span className="flex items-center gap-3">
              <MoodleRange first={t.first_try} latest={t.latest} />
              <span className="text-xs text-neutral-400">{t.attempts} {t.attempts === 1 ? "attempt" : "attempts"}</span>
            </span>
          </li>
        ))}
      </ul>
    )}
    {data.moodle.other_lessons.length > 0 && (
      <>
        <h3 className="mb-1 mt-4 font-display text-sm font-semibold text-neutral-700">Other lessons</h3>
        <p className="mb-1 font-body text-xs text-neutral-400">Lessons whose Moodle section has no topic yet</p>
        <ul className="divide-y divide-neutral-100">
          {data.moodle.other_lessons.map((l) => (
            <li key={l.hvp_id} className="flex items-center justify-between gap-3 py-2 font-body text-sm">
              <span className="min-w-0 truncate text-neutral-800" title={l.section_name ?? undefined}>{l.title}</span>
              <MoodleRange first={l.first_try} latest={l.latest} />
            </li>
          ))}
        </ul>
      </>
    )}
    <h3 className="mb-1 mt-4 font-display text-sm font-semibold text-neutral-700">Attempts</h3>
    <p className="mb-1 font-body text-xs text-neutral-400">Results are read every 15 minutes; two retries less than 15 minutes apart may show as one.</p>
    <MoodleAttempts personId={personId} />
  </Card>
)}
```

  Imports: `scoreText` from `../format.ts`, `MoodleRange` from `../ui.tsx`.
- [ ] **Step 3:** tsc + tests. Commit "Teacher student page: Moodle lessons and attempts".

---

### Task 6: Overview — hard Moodle lesson

**Files:** Modify `src/teacher/pages/Overview.tsx`.

- [ ] **Step 1:** Import `BookOpen` from `lucide-react`. `ICON` gains `hard_lesson: BookOpen`; `ICON_LABEL` gains `hard_lesson: "Hard Moodle lesson"`. `attentionHref` returns `null` for `hard_lesson` (no lesson page).
- [ ] **Step 2:** The list key becomes `` `${a.type}:${a.person_id ?? ""}:${a.topic_key ?? ""}:${a.hvp_id ?? ""}` ``. The card subtitle: "Inactive students, dropping accuracy, topics and Moodle lessons the group finds hard".
- [ ] **Step 3:** tsc + tests. Commit "Teacher overview: hard Moodle lessons".

---

### Task 7: Student pages (`/progress/`)

**Files:** Modify `src/progress/pages/Overview.tsx`, `src/progress/pages/Topics.tsx`.

- [ ] **Step 1: Overview** — after the stat tiles, when `data.moodle` is not null:

```tsx
{data.moodle && (
  <Card title="Your Moodle lessons" subtitle="Lesson scores from the course. Your first try and your latest score.">
    <p className="font-body text-sm text-neutral-700">
      {data.moodle.lessons} {data.moodle.lessons === 1 ? "lesson" : "lessons"} done · <MoodleRange first={data.moodle.first_try} latest={data.moodle.latest} />
    </p>
  </Card>
)}
```

- [ ] **Step 2: Topics tab** — `TopicsTab` returns a fragment: the existing "Mastery map" card, then when `data.moodle` is not null a "Moodle lessons" card: the topics list (each a link `routeHash({ page: "topic", topicKey })` with `MoodleRange` and attempts) and, when present, "Other lessons" (title + `MoodleRange`), same markup pattern as Task 5 without the attempts list. When the student has Moodle data but no Bot/App topics (`data.topics.length === 0`), the "Mastery map" card shows `<StateBox>No quiz or App answers yet.</StateBox>` instead of empty groups.
- [ ] **Step 3:** tsc + tests. Commit "My progress: Moodle lessons".

---

### Task 8: Verification (controller)

- [ ] **Step 1:** `npm run build` (type-checks all configs, builds, and `scripts/check-private-pages.mjs` fails if GTM/Clarity appear on teacher/progress). `npm test`. Expected: pass.
- [ ] **Step 2:** `grep -r "Bohdan\|Chrystia" dist/` → no hits (demo data is dev-only).
- [ ] **Step 3:** Dev server (`npx vite --port 5180`), screenshots via the chrome MCP at 1280 and 390 px with `?demo`: `/teacher/?demo#/topics`, `#/topic/b1:grammar:modifiers`, `#/student/d1`, `#/` (overview), `/progress/?demo` Overview + Topics. Check: Moodle row/cards appear, hidden-when-null paths (`#/topic/b1:vocab:jobs` has no moodle block → no card), no layout overflow at 390 px.
- [ ] **Step 4:** Final reviewer subagent (Sonnet) over `git diff origin/main...HEAD`.
- [ ] **Step 5:** Push `feat/moodle-results`, prefilled PR link for Oleksandr (gh is missing). After merge + GitHub Pages deploy: Oleksandr opens `/teacher/` and a student page with real Moodle data (first-try numbers appear after students' next attempts; imported grades show as "before tracking").
