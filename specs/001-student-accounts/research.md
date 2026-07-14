# Research: Student Accounts, Progress & Saved Words

**Phase 0 output** — all Technical Context unknowns resolved. Each entry: Decision / Rationale / Alternatives considered.

## R1. Auth & session sharing across a Vite MPA

**Decision**: `@supabase/supabase-js` v2 with default `localStorage` session persistence (`persistSession: true`, `autoRefreshToken: true`). Each MPA page instantiates the shared client from `src/shared/supabase.ts`; the session is stored under a key derived from the project ref, so every page on the same origin sees the same login.

**Rationale**: This is supabase-js default behavior — zero extra code for the MPA case. Token auto-refresh handles long-lived sessions. The origin is the same for all apps (`app.englishpusher.in.ua/...`), so no cross-domain concerns.

**Alternatives considered**: Cookie-based session (needs a server — none exists); broadcasting auth state via `BroadcastChannel` (unnecessary — pages are full loads, not concurrent SPAs).

**Flicker handling**: `getSession()` is async. Apps must render guest UI immediately and upgrade when the session resolves (a `loading` flag in `useAuth()`). Auth-gated UI (star buttons, personal page content) appears after resolution — sub-100ms in practice since it reads localStorage.

## R2. Security model with a public anon key

**Decision**: Anon key ships in the client bundle (standard Supabase pattern). Security is enforced entirely by Postgres RLS: every table has `user_id` policies (`auth.uid() = user_id`) for SELECT/INSERT/UPDATE/DELETE. `profiles` is created by a `SECURITY DEFINER` trigger on `auth.users` insert.

**Rationale**: This is Supabase's designed architecture for static frontends. Satisfies FR-013/SC-006 at the database layer, not the app layer.

**Alternatives considered**: Edge functions as an API layer — pointless indirection for per-user CRUD already expressible in RLS.

## R3. Email confirmation off

**Decision**: Disable "Confirm email" in Supabase Auth settings for v1. Password reset stays enabled (built-in email flow, redirect to `/account/`).

**Rationale**: Spec assumption — minimize signup friction for students; typo'd-email limitation explicitly accepted in the spec's edge cases.

**Alternatives considered**: Confirmation on (rejected: friction, students locked out until they check email); magic links (rejected in brainstorming).

## R4. Weak-words derivation

**Decision**: Client-side derivation from `trivia_results`: fetch the student's sessions, walk newest→oldest, first occurrence of each word decides (in `missed_words` → weak; in `correct_words` → not weak).

**Rationale**: Data volume is tiny (< a few hundred rows/student); deriving avoids a second write path that could drift from the source data. Matches spec acceptance scenario US2-4.

**Alternatives considered**: Dedicated `weak_words` table maintained on write (rejected: sync complexity, two sources of truth); SQL view (viable later, unnecessary now).

## R5. "My Words" virtual topic

**Decision**: Runtime assembly. `listSavedWords(level)` → map each `{word, topic_id}` against local `TOPICS` from that app's `data.ts` → build a synthetic topic object (`id: "my-words"`, star icon) prepended to the topic list when ≥1 word resolves. Words are matched by exact `word` string within the topic identified by `topic_id`; misses are dropped silently (FR-011).

**Rationale**: Keeps `data.ts` the single content source (constitution II); zero content duplication in DB; deleted topics degrade gracefully.

**Alternatives considered**: Storing full word objects in DB (violates constitution II; goes stale); matching by word string across all topics (ambiguous if a word appears in two topics — topic_id scoping avoids it, with cross-topic fallback rejected for v1 simplicity).

**Guard**: `"my-words"` becomes a reserved topic id — deep links `?topic=my-words` must be ignored for guests (falls back to topic list).

## R6. Non-blocking persistence

**Decision**: All writes (`saveTriviaResult`, `logStudyEvent`, `toggleSavedWord`) are promise-based fire-and-forget from the UI's perspective; failures set a dismissible notice state ("Couldn't save — check your connection"), UI proceeds regardless. Star toggles are optimistic (flip immediately, revert + notice on failure). No retry/offline queue in v1 (spec assumption).

**Rationale**: FR-005/FR-006 — gameplay must never block on network.

**Alternatives considered**: Retry queue in localStorage (deferred — real complexity, marginal v1 value); blocking save with spinner (violates FR-005).

## R7. Beta hosting on Cloudflare Pages

**Decision**: CF Pages project connected to the GitHub repo; **production branch = `beta`**; preview deployments disabled (or ignored); build command `npm run build`, output directory `dist`, env vars `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (and `VITE_BASE_PATH=/`) set in the CF dashboard. Node 20 via `NODE_VERSION` env var. Resulting stable URL: `<project>.pages.dev`; custom `beta.englishpusher.in.ua` optional later.

**Rationale**: Free tier, unlimited bandwidth, zero changes to existing GitHub Actions, stable URL per branch — exactly the "live beta without touching production" requirement (FR-016). The MPA's real HTML files per route need no SPA-fallback config.

**Alternatives considered**: Netlify (equivalent; CF chosen in brainstorming); second GitHub repo + Pages (clunky: PAT, DNS, manual).

**Verified**: existing `vite.config.ts` post-build remap produces `dist/<app>/index.html` — CF Pages serves these as clean URLs out of the box.

## R8. Supabase environments

**Decision**: One Supabase project for beta now and production later. Auth → URL configuration: Site URL = `https://app.englishpusher.in.ua`, additional redirect URLs = `https://<project>.pages.dev/**` and `http://localhost:5173/**`.

**Rationale**: Free tier allows 2 projects but one is enough — during beta only beta writes; after merge the same data continues seamlessly (students keep accounts created during testing). Password-reset emails redirect correctly on all three origins via the allowlist.

**Alternatives considered**: Separate beta project + data migration at launch (rejected: migration work, teacher's test accounts lost).

## R9. Env vars & secrets handling

**Decision**: `.env.local` (already gitignored) holds the two `VITE_` vars for dev; a committed `.env.example` documents them. CF Pages dashboard holds them for beta. At final release, add them to the GitHub Actions workflow (repo variables — they are not secrets, the anon key is public by design, but repo variables keep them out of the workflow file).

**Rationale**: Standard Vite pattern; matches existing `.gitignore`.

## R10. New MPA entry checklist (from constitution III + existing config)

**Decision**: `account` entry requires exactly: (1) `apps/account/index.html`, (2) `src/account/main.tsx` + `App.tsx`, (3) `"account"` in the `APPS` array in `vite.config.ts` (drives dev rewrite + post-build remap), (4) `account: resolve(__dirname, "apps/account/index.html")` in `rollupOptions.input`. Fonts/CSS imports mirror an existing app's `index.html`.

**Rationale**: Read from `vite.config.ts` — the rewrite and remap plugins iterate `APPS`, so both dev URL `/account/` and deployed URL `/account/` work with no further plugin changes.
