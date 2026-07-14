# Implementation Plan: Student Accounts, Progress & Saved Words

**Branch**: `beta` | **Date**: 2026-07-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-student-accounts/spec.md`

## Summary

Add optional student accounts to the Englishpusher hub: email+password auth via Supabase, automatic trivia-result saving, star-to-save words, a "My Words" virtual practice topic in flashcards + trivia, and a new `/account/` personal page. Everything rides the existing Vite MPA architecture: one shared Supabase client + `useAuth()` hook in `src/shared/`, light touches in the four existing activity apps, one new MPA entry. Feature develops on the long-lived `beta` branch, deployed live via Cloudflare Pages; production GitHub Pages CI is untouched until final merge.

## Technical Context

**Language/Version**: TypeScript 5 / React 18 / Vite 6 (existing stack)

**Primary Dependencies**: `@supabase/supabase-js` v2 (new — the only new dependency), Tailwind CSS 3, `motion/react`, `lucide-react` (existing)

**Storage**: Supabase (hosted Postgres, free tier) — 4 tables with RLS; word/topic content stays in app `data.ts` files (DB stores references only)

**Testing**: No test framework in repo (unchanged). Verification = manual + scripted-browser checklist per `quickstart.md`, using the established playwright-core + system Edge recipe

**Target Platform**: Static site (GitHub Pages prod, Cloudflare Pages beta), mobile-first responsive web

**Project Type**: Vite Multi-Page App — one new entry (`account`), four existing entries touched

**Performance Goals**: No regression to current page loads; auth session resolution must not block first paint (apps render guest UI immediately, upgrade when session resolves); saves are fire-and-forget

**Constraints**: Login strictly optional — guest behavior byte-identical to production; save failures never interrupt gameplay; anon key is public by design, RLS is the security boundary

**Scale/Scope**: < 1,000 student accounts, a few rows per student per day — trivially within Supabase free tier

## Constitution Check

*GATE: evaluated against `.specify/memory/constitution.md` v1.0.0*

| Principle | Status | Notes |
|---|---|---|
| I. Shared Shell, No Custom Chrome | ✅ | `/account/` uses `AppHeader`/`AppFooter`; auth entry point added *inside* `AppHeader` (one shared change, inherited by all apps) |
| II. Single Source of Truth for Vocabulary | ✅ | DB stores `{word, topic_id, level}` references; definitions resolved against `data.ts` at render; unresolvable words filtered (FR-011, FR-018) |
| III. MPA Boundaries Stay Explicit | ✅ | New entry follows the full checklist: `apps/account/index.html`, `src/account/`, `APPS` array, `rollupOptions.input`, dev rewrite + post-build remap already generic |
| IV. Deploy Safety | ✅ | Prod workflow and `deploy` script untouched. Cloudflare Pages is a separate pipeline with no CNAME interaction. Final merge adds env vars to CI only |
| V. Known Rendering Pitfalls | ✅ | No background/stacking changes; star button uses simple scale/fill transitions |
| VI. Topic Additions Go Through Their Skill | ✅ | "My Words" is a *virtual* topic assembled at runtime — not a `data.ts` topic, no skill/CLAUDE.md table entry needed |

**Post-design re-check**: no violations introduced by Phase 1 artifacts. No Complexity Tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-student-accounts/
├── spec.md              # Feature spec (approved)
├── plan.md              # This file
├── research.md          # Phase 0: decisions + rationale
├── data-model.md        # Phase 1: tables, RLS, triggers
├── quickstart.md        # Phase 1: setup + validation scenarios
├── contracts/
│   ├── database.md      # SQL DDL + RLS policies (authoritative schema)
│   └── client-api.md    # Shared module surface consumed by apps
└── tasks.md             # Phase 2 (/speckit-tasks — not yet created)
```

### Source Code (repository root)

```text
apps/
└── account/index.html            # NEW MPA entry point

src/
├── shared/
│   ├── AppShell.tsx              # MODIFIED: user icon in AppHeader (auth-aware)
│   ├── supabase.ts               # NEW: single client from VITE_ env vars
│   ├── auth.tsx                  # NEW: useAuth() hook (user, loading, signIn, signUp, signOut, resetPassword)
│   └── progress.ts               # NEW: data access — saveTriviaResult, toggleSavedWord, listSavedWords, logStudyEvent, fetchProgress
├── account/
│   ├── main.tsx                  # NEW: entry
│   └── App.tsx                   # NEW: login/signup form (logged out) | personal page (logged in)
├── b1-trivia/App.tsx             # MODIFIED: auto-save result, star-on-results, My Words topic, guest hint
├── c1-trivia/App.tsx             # MODIFIED: same as b1-trivia
├── b1-flashcards/App.tsx         # MODIFIED: star on card, study event on topic open, My Words topic
├── c1-flashcards/App.tsx         # MODIFIED: same as b1-flashcards
└── Index.tsx                     # MODIFIED: account link in hub header

vite.config.ts                    # MODIFIED: add "account" to APPS + rollupOptions.input
.env.local                        # NEW (gitignored): VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY
.env.example                      # NEW (committed): variable names with placeholder values
```

**Structure Decision**: Approach A from brainstorming — shared modules in `src/shared/` (following the `AppShell.tsx` precedent), one new MPA entry, minimal diffs in the four activity apps. No react-query, no router, no new UI libraries.

## Key Implementation Decisions

Cross-references — full rationale in [research.md](./research.md):

1. **Session across MPA pages**: supabase-js persists the session in `localStorage` keyed by project ref; every page creates its own client and picks the session up automatically. Apps render guest UI immediately and upgrade when `getSession()` resolves (avoids logged-out flicker *and* blocked first paint).
2. **Weak words** are derived client-side from `trivia_results` (word is weak ⇔ its most recent occurrence across sessions is in `missed_words`). No dedicated table.
3. **"My Words" virtual topic** is assembled at runtime: fetch `saved_words` for the level → resolve each against local `TOPICS` in `data.ts` → words that don't resolve are dropped silently. It appears in topic lists only when ≥ 1 word resolves.
4. **Non-blocking writes**: all inserts are fire-and-forget with a `.catch()` that surfaces a small dismissible notice; no retry queue in v1.
5. **One Supabase project** for beta + prod: Site URL = production domain; beta URL added to redirect allowlist. Email confirmation disabled in Supabase Auth settings.
6. **Beta deployment**: Cloudflare Pages project with production branch = `beta`, build `npm run build`, output `dist`, env vars in CF dashboard. `main → beta` merges keep beta content current.

## Complexity Tracking

No constitution violations — table not needed.
