# Englishpusher Hub Constitution

## Core Principles

### I. Shared Shell, No Custom Chrome
Every activity app (everything except the landing page `Index.tsx`) MUST use
`AppHeader` and `AppFooter` from `src/shared/AppShell.tsx`. Never write a
bespoke header or footer for a new activity. `onTopics` / `showTopics` MUST
be wired whenever the activity has a topic-selection screen.

### II. Single Source of Truth for Vocabulary
Each vocabulary set lives in exactly one `data.ts` (e.g.
`b1-flashcards/data.ts`, `c1-flashcards/data.ts`). Apps that reuse the same
words (trivia reusing flashcard data, etc.) MUST import from that file
rather than duplicating word lists. The `id` field on a topic is a public
contract once a `?topic=` deep link has been shared — it MUST NOT be renamed
after publishing.

### III. MPA Boundaries Stay Explicit
This is a Vite multi-page app, not a router-based SPA (NO react-router, NO
shadcn). Every new app gets its own entry (`apps/<name>/index.html`,
`src/<name>/main.tsx`) registered in `vite.config.ts`
`build.rollupOptions.input`, and its own dev-server rewrite so local URLs
match deployed `/<name>/` paths exactly.

### IV. Deploy Safety Is Non-Negotiable
Any deploy path (manual script, CI workflow, or a new one introduced later)
MUST explicitly set the `app.englishpusher.in.ua` CNAME. The `gh-pages`
package replaces the entire branch on every publish — omitting `--cname`
silently deletes the custom domain and takes the site down. Never remove
`--cname` from `package.json`'s `deploy` script without replacing it with an
equivalent safeguard.

### V. Known Rendering Pitfalls Are Respected
Background colour is set on `body` in `index.css`, never on a `motion.div`
wrapper (motion's transform creates a stacking context that hides layers
behind it). Decorative animation (`ElegantShape` and similar) uses only
`opacity`, `y`, `rotate` — no SVG `pathOffset`/`pathLength`, no Three.js
canvas; these are unreliable with `motion/react` v11 in this codebase.

### VI. Topic Additions Go Through Their Skill
New B1 or C1 vocabulary topics are added via the `add-b1-topic` /
`add-c1-topic` skills, not by hand-editing multiple files ad hoc. Every new
topic's direct `?topic=` link is added to the table in the root `CLAUDE.md`
immediately, not deferred.

## Development Workflow

- **Idea → spec**: for a complex, multi-step feature, explore intent first
  with the `superpowers:brainstorming` skill, then formalize the agreed
  direction with `/speckit-specify`. Small, well-understood changes (a copy
  tweak, a single topic add, a style fix) skip spec-kit entirely.
- **Spec → build**: `/speckit-specify` → (optional `/speckit-clarify`) →
  `/speckit-plan` → `/speckit-tasks` → (optional `/speckit-analyze`) →
  `/speckit-implement`.
- Feature specs and plans produced by spec-kit live under `specs/` (per
  spec-kit's own tooling). The legacy `docs/superpowers/specs/` and
  `docs/superpowers/plans/` folders are historical — new work does not add
  to them.
- `CLAUDE.md` remains the authoritative day-to-day reference (tech stack,
  file structure, conventions, TODOs). This constitution captures the
  principles that must hold across all future specs; `CLAUDE.md` captures
  the current state of the project. When they conflict, update `CLAUDE.md`
  to match reality and amend this constitution if the principle itself
  changed.

## Governance

This constitution governs specs and plans produced by spec-kit for this
project. Amendments happen by editing this file directly and bumping the
version below; no separate approval workflow is required for a
single-maintainer project. `/speckit-plan` and `/speckit-analyze` MUST
flag any plan that contradicts a principle above rather than silently
overriding it.

**Version**: 1.0.0 | **Ratified**: 2026-07-14 | **Last Amended**: 2026-07-14
