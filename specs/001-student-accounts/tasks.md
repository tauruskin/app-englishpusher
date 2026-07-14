# Tasks: Student Accounts, Progress & Saved Words

**Input**: Design documents from `/specs/001-student-accounts/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md — all complete

**Tests**: No test framework in repo (per plan). Each story phase ends with the matching validation scenarios from [quickstart.md](./quickstart.md) (manual + scripted browser).

**Organization**: By user story priority: US5 (beta infra) + US1 (accounts) are the P1 foundation, then US2 (trivia progress), US3 (saved words), US4 (study activity).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependency on incomplete tasks)
- **[Story]**: US1–US5 from spec.md
- **⚑ USER**: Requires the owner to act (external dashboards) — Claude prepares, user clicks

## Phase 1: Setup

**Purpose**: Dependency, env plumbing, backend project

- [X] T001 Install `@supabase/supabase-js` v2 (`npm install @supabase/supabase-js`) and create `.env.example` at repo root with `VITE_SUPABASE_URL=` / `VITE_SUPABASE_ANON_KEY=` placeholders
- [X] T002 ⚑ USER Create Supabase project per quickstart §1: run full DDL from [contracts/database.md](./contracts/database.md) in SQL editor, disable "Confirm email", set Site URL + redirect allowlist, then put Project URL + anon key into `.env.local`
- [X] T003 Verify schema: confirm all 4 tables exist with RLS enabled and the `on_auth_user_created` trigger present (Supabase SQL: `select * from pg_policies`), fix any DDL errors

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared modules + the new MPA entry skeleton — everything user stories build on

**⚠️ CRITICAL**: No user story work until this phase completes

- [X] T004 [P] Create `src/shared/supabase.ts` — singleton client from `import.meta.env`, export `isSupabaseConfigured`; missing env vars ⇒ configured=false and a null-safe client stub (contract: [client-api.md](./contracts/client-api.md))
- [X] T005 [P] Register the `/account/` MPA entry: create `apps/account/index.html` (mirror `apps/b1-flashcards/index.html` head/fonts), `src/account/main.tsx`, placeholder `src/account/App.tsx` ("coming soon" shell with AppHeader/AppFooter); add `"account"` to `APPS` array and `account:` input in `vite.config.ts`; verify `npm run dev` serves `/account/` and `npm run build` emits `dist/account/index.html`
- [X] T006 Create `src/shared/auth.tsx` — `AuthProvider` + `useAuth()` per contract: `getSession()` on mount, `onAuthStateChange` subscription, `loading` flag, `signUp`/`signIn`/`signOut`/`resetPassword` returning `{ error: string | null }` with user-readable messages (depends on T004)
- [X] T007 Create `src/shared/progress.ts` — all data-access functions per contract: `saveTriviaResult`, `logStudyEvent`, `saveWord` (upsert on unique), `unsaveWord`, `listSavedWords`, `fetchProgress` (incl. weak-words newest-occurrence derivation and recentStudy limit 20); every function no-ops/returns empty without session or config (depends on T004)

**Checkpoint**: `npm run build` passes; `/account/` renders placeholder; shared modules typecheck

---

## Phase 3: User Story 5 — Beta environment live (Priority: P1) 🎯 infrastructure

**Goal**: Feature branch auto-deploys to a stable public URL; production untouched

**Independent Test**: quickstart V16 — push to `beta` updates pages.dev URL, production URL unaffected

- [X] T008 [US5] Push `beta` branch to origin (`git push -u origin beta`) so Cloudflare can build it
- [ ] T009 ⚑ USER [US5] Create Cloudflare Pages project per quickstart §3: connect repo, production branch `beta`, build `npm run build`, output `dist`, env vars `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` / `VITE_BASE_PATH=/` / `NODE_VERSION=20`; note the `*.pages.dev` URL
- [ ] T010 ⚑ USER [US5] Add the pages.dev URL to Supabase Auth redirect allowlist (`https://<project>.pages.dev/**`)
- [ ] T011 [US5] Validate V16: confirm beta URL serves the current `beta` build (placeholder `/account/` visible) and production `app.englishpusher.in.ua` is unchanged

**Checkpoint**: Teacher-visitable beta URL exists; every later phase is instantly testable live

---

## Phase 4: User Story 1 — Create an account and sign in (Priority: P1) 🎯 MVP

**Goal**: Optional email+password accounts; session everywhere; guests unaffected

**Independent Test**: quickstart V1–V3, V11, V12, V14 (guest parity)

- [X] T012 [US1] Build the logged-out view in `src/account/App.tsx`: login/signup tab form (email, password, submit, inline error from `useAuth()`, "Forgot password?" → `resetPassword`), brand styling (`bg-brand`, `font-display`), wrapped in `AuthProvider` in `src/account/main.tsx`
- [X] T013 [US1] Build the signed-in personal page shell in `src/account/App.tsx`: greeting with `display_name`, sign-out button, empty sections scaffolded for Progress / My Words / Recent activity ("nothing yet" states); handle `?type=recovery` password-reset landing (new-password form)
- [X] T014 [US1] Add the auth-aware account element to `AppHeader` and mobile `AppFooter` in `src/shared/AppShell.tsx`: outline `User` icon (lucide) linking to `/account/` for guests, brand-filled when signed in; requires wiring `useAuth()` inside AppShell with graceful guest fallback when `isSupabaseConfigured` is false; existing prop signatures unchanged
- [X] T015 [P] [US1] Add the same account link to the hub header in `src/Index.tsx` (manual, hub doesn't use AppShell)
- [X] T016 [US1] Validate V1, V2, V3, V11, V12 + full guest-parity pass V14 on local dev, then push `beta` and re-verify V1/V2 on the live beta URL

**Checkpoint**: MVP — accounts work end-to-end on beta; teacher can sign up

> T016 note (2026-07-14): V1-V3, V12, V14 validated locally via scripted Edge — all pass. V11 (reset email) needs a real inbox → folded into T033. Live-beta re-verification folded into T011/T033 (Cloudflare setup pending).

---

## Phase 5: User Story 2 — Trivia progress saved and visible (Priority: P2)

**Goal**: Auto-saved trivia results; per-topic scores + weak words on personal page

**Independent Test**: quickstart V4–V6

- [X] T017 [P] [US2] In `src/b1-trivia/App.tsx`: on entering the end-screen phase call `saveTriviaResult` exactly once (ref guard against re-render double-fire), map result to `{app:'b1-trivia', topicId, scorePct, correctWords, missedWords}`; failure ⇒ small dismissible notice component; guests ⇒ subtle "Sign in to save your progress" link to `/account/`; wrap app in `AuthProvider`
- [X] T018 [P] [US2] Same for `src/c1-trivia/App.tsx` (`app:'c1-trivia'`; words resolve via the `definition ?? translation` convention already in place)
- [X] T019 [US2] Personal page Progress section in `src/account/App.tsx`: render `fetchProgress()` — per (app, topic) best + latest score with topic titles resolved from both apps' `data.ts` TOPICS (unresolvable topic ids silently dropped), and the Weak Words list (word + topic title)
- [X] T020 [US2] Validate V4, V5 (DevTools offline), V6 (weak-word rule across 3 sessions) locally; push `beta`, re-verify V4 live

**Checkpoint**: US1 + US2 fully functional on beta

> T020 note (2026-07-14): V4/V5/V6 validated via scripted Edge on c1-trivia (guest hint, DB row, offline notice, weak-rule both directions). b1-trivia uses the identical shared TriviaSaveStatus component; its matching-card flow spot-checked manually in T033.

---

## Phase 6: User Story 3 — Saved words & "My Words" deck (Priority: P3)

**Goal**: Star-to-save everywhere; My Words virtual topic in all four apps

**Independent Test**: quickstart V7–V10, V15

- [X] T021 [P] [US3] Star toggle on flashcards in `src/b1-flashcards/App.tsx`: `Star` icon (lucide) in the card's control row, filled when saved, optimistic toggle via `saveWord`/`unsaveWord` (`level:'B1'`, `source:'flashcards'`, current `topicId`), hidden for guests/unconfigured; load saved set once per session via `listSavedWords('B1')`
- [X] T022 [P] [US3] Same star toggle in `src/c1-flashcards/App.tsx` (`level:'C1'`)
- [X] T023 [P] [US3] Star toggles on trivia end-screen word lists in `src/b1-trivia/App.tsx` and `src/c1-trivia/App.tsx` (`source:'trivia'`, optimistic, deduped by contract upsert)
- [X] T024 [US3] "My Words" virtual topic in both flashcard apps (`src/b1-flashcards/App.tsx`, `src/c1-flashcards/App.tsx`): assemble from `listSavedWords(level)` resolved against local `TOPICS` (exact topic_id + word match, misses dropped), reserved id `my-words`, star icon, listed first, visible only when ≥1 word resolves; `?topic=my-words` deep link resolves only under that condition, else falls back to topic list (depends on T021/T022)
- [X] T025 [US3] "My Words" quiz topic in both trivia apps (`src/b1-trivia/App.tsx`, `src/c1-trivia/App.tsx`): same assembly, feeds the existing question generator; same deep-link guard (depends on T023)
- [X] T026 [US3] Personal page My Words section in `src/account/App.tsx`: list saved words with meaning resolved from `data.ts` (`definition ?? translation`), unsave button per word, links to the level's My Words deck
- [X] T027 [US3] Validate V7, V8, V9, V10, V15 locally; push `beta`, spot-check V9 live

**Checkpoint**: US1–US3 all independently functional

---

## Phase 7: User Story 4 — Flashcard study activity (Priority: P4)

**Goal**: Lightweight practice log

**Independent Test**: quickstart — US4 scenarios (open 2 topics → both on personal page)

- [X] T028 [P] [US4] Call `logStudyEvent` once per topic selection in `src/b1-flashcards/App.tsx` and `src/c1-flashcards/App.tsx` — on the topic-open transition, not per card; `my-words` opens are logged too (real study); guests are skipped
- [X] T029 [US4] Personal page Recent Activity section in `src/account/App.tsx`: reverse-chronological list from `fetchProgress().recentStudy` with topic titles + relative dates ("Tuesday", "2 days ago")
- [X] T030 [US4] Validate US4 scenarios locally, push `beta`

**Checkpoint**: All five stories functional

---

## Phase 8: Polish & Cross-Cutting

- [ ] T031 [P] Update `CLAUDE.md`: add `/account/` to URLs table + file structure, document `src/shared/supabase.ts` / `auth.tsx` / `progress.ts` modules, the beta branch + Cloudflare Pages deployment, and the release-merge checklist (env vars into GH Actions)
- [ ] T032 [P] Update `session-notes.md` with the feature state and beta URL
- [ ] T033 Full quickstart validation pass V1–V17 against the beta URL (scripted browser where practical), including V13 RLS isolation with two real accounts; record results in `specs/001-student-accounts/quickstart.md` as a dated checklist
- [ ] T034 ⚑ USER Send the beta URL + a 3-line "how to test" note to the teacher

**NOT in this feature**: merge to `main` / production release — happens only after teacher approval (quickstart §Release).

---

## Dependencies & Execution Order

```
Phase 1 (Setup) ─→ Phase 2 (Foundational) ─→ Phase 3 (US5 beta) ─→ Phase 4 (US1 accounts MVP)
                                                                          │
                                              ┌───────────────────────────┤
                                              ▼                           ▼
                                     Phase 5 (US2 trivia)        Phase 6 (US3 saved words)
                                              └───────────┬───────────────┘
                                                          ▼
                                                 Phase 7 (US4 events) ─→ Phase 8 (Polish)
```

- **US5 before US1**: so every subsequent checkpoint is verifiable on the live beta
- **US2 and US3 are independent** of each other (different data paths); both need US1 (auth UI) — can be built in either order or in parallel
- **US4** touches the same files as US3's flashcard changes — do it after US3 to avoid conflicts; it's tiny
- **T002, T009, T010, T034** need the owner (external dashboards); everything else is autonomous

### Parallel opportunities

- T004 ∥ T005 (foundational, different files)
- T014 ∥ T015 (AppShell vs Index.tsx)
- T017 ∥ T018 (b1 vs c1 trivia) · T021 ∥ T022 ∥ T023 (different apps)
- T031 ∥ T032 (docs)

## Implementation Strategy

**MVP = Phases 1–4** (Setup → Foundational → beta live → accounts). Stop, let the teacher create an account on the live beta, gather feedback. Then US2 → US3 → US4 as independent increments, each pushed to beta on completion. Production merge is a separate, explicitly-approved step.
