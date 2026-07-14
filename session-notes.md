# Session Notes

## 2026-03-28 — Initial build

### What was done

- Scaffolded full Vite + React + TypeScript project from scratch
- Installed: `motion`, `lucide-react`, `tailwindcss`, `autoprefixer`, `postcss`,
  `cross-env`, `gh-pages`
- Built single-page hub landing page in `src/Index.tsx`:
  - Header with logo + "Englishpusher **Learning Apps**" title
  - Teacher celebrate character (left, desktop only) with speech bubble
  - 3 animated app cards (stagger slide-in from left):
    - Grammar Testing → https://grammar.englishpusher.in.ua
    - Vocabulary Trivia → https://trivia.englishpusher.in.ua/
    - Vocabulary Cards → Coming Soon (disabled)
  - Footer: Copyright © 2026 — Developed by Tetiana Pushkar
- Added `animate-character-idle` CSS keyframe in `index.css`
- Configured Tailwind with `font-display` (Space Grotesk) and `text-brand` (#f07c1a)
- Set up GitHub Actions deploy workflow (auto-deploys to `gh-pages` on push to `main`)
- Initial commit pushed to https://github.com/tauruskin/app-englishpusher

### Assets already in place (committed)

- `public/logo.png`
- `public/favicon.png`
- `src/assets/teacher-celebrate.png`
- `src/assets/teacher-correct.png`
- `src/assets/teacher_thinking.png`
- `src/assets/teacher_sad-2.png`

---

## 2026-03-28 — Major redesign + polish

### What was done

**Layout redesign**
- Replaced speech bubble with professional hero text paragraph
- Replaced simple card list with interactive horizontal accordion (desktop):
  - Hover to expand panel, click whole card to open app URL
  - Inactive panels show vertical rotated title
  - Active panel shows icon, description, CTA
- Mobile keeps original staggered slide-in card design
- Teacher character moved to bottom of hero text column (desktop only)

**Background**
- Tried Three.js DottedSurface — didn't work (WebGL canvas hidden behind stacking context)
- Tried SVG FloatingPaths with motion/react pathOffset — didn't work (motion/react v11 doesn't support SVG path properties reliably)
- ✅ Used ElegantShape floating pills (motion/react opacity/y/rotate only) — works perfectly
- **Key lesson**: body background must be set in `index.css` on `body`, NOT on the `motion.div` wrapper (motion transforms create stacking context that hides fixed layers)

**Visual polish**
- Background: warm cream `#faf8f5` (was cold `#fafafa`)
- Header: added `border-b border-neutral-700/50` to soften edge
- Footer: changed from white → `bg-neutral-900` to mirror header (dark bookend)
- Accordion panel gradients: slightly lighter starts so they don't look like holes on light bg
- ElegantShape opacity increased to 0.22–0.32 (was too faint)

**Content updates**
- Vocabulary Trivia URL confirmed → https://trivia.englishpusher.in.ua/
- Added Instagram link to footer: https://www.instagram.com/teti_push_english
- Renamed "Vocabulary Builder" → "Vocabulary Cards"
- Updated Vocabulary Cards description: "Practise English words in an interactive way"

### Pending / known TODOs

- [ ] Vocabulary Cards app — future project, card already stubbed as Coming Soon
- [ ] Verify custom domain DNS (CNAME `app.englishpusher.in.ua`) is pointed at GitHub Pages

---

## 2026-04-01 — Word Connections game

### What was done

**New game: `word-connections/`**
- Built as a separate Vite + React + TypeScript project inside the same repo
- Deploys to `app.englishpusher.in.ua/word-connections/` (not a separate subdomain)
- GitHub Actions workflow updated to build both projects and merge into one `dist/`
- Hub landing page updated: added Word Connections as card 3 (green), Vocabulary Cards moved to card 4 (still Coming Soon)

**Game mechanics**
- 4×4 grid of word tiles, select up to 4, submit to check
- Correct → group revealed with difficulty colour (yellow/green/blue/purple)
- Wrong → grid shakes, lose a life dot; "One away!" toast when 3/4 correct
- 4 lives total; win/lose end screen with all answers revealed
- Shuffle and Deselect All buttons
- Hint tooltip next to puzzle title (hover/tap) showing the 4 category names
- Category names always visible as pills below the top bar during play (solved ones get strikethrough + colour)
- Teacher thinking image in left sidebar on menu screen (desktop only) with speech bubble

**Puzzle content — real student vocabulary (5 puzzles)**
1. Feelings & Emotions — -ed/-ing adjective trap (purple group: boring/exciting/frightening/exhausting)
2. Adverbs of Frequency — "spot the noun" trap (purple: frequency/frequently/generally/annually)
3. Jobs & Work — hands-on vs people-facing jobs + work status + career nouns
4. Personality & Relationships — phrasal verbs as hardest group (get on well with / take after / look up to / stay in touch with)
5. Stative Verbs — split into 4 grammar categories (emotions / thinking / senses / possession)

**Design decisions**
- Decided NOT to show answer words in the hint tooltip — would give away answers and remove the challenge
- Category names visible during play is sufficient scaffolding
- `usePolling: true` added to both Vite configs to fix HMR not working from WSL on Windows filesystem

### Pending / known TODOs

- [ ] Vocabulary Cards app — future project
- [ ] Verify DNS CNAME `app.englishpusher.in.ua` → GitHub Pages
- [ ] Add more puzzles as teacher covers new vocabulary topics

---

## 2026-04-02 — C1 Vocabulary Trivia app + Hub level tabs

### What was done

**Hub landing page (`src/Index.tsx`)**
- Added level tabs: All / B1 / C1 above the accordion
- `AppItem` interface now includes `level: "B1" | "C1"`
- All existing apps tagged B1; new C1 Vocabulary Trivia card added (purple, Zap icon)
- `filteredItems` computed from active tab; accordion and mobile cards both use it
- Tab change resets `activeIndex` to 0

**Merged into single Vite MPA**
- Single `package.json` / `vite.config.ts` — `build.rollupOptions.input` has three entry points:
  - `main` → `index.html`
  - `wordConnections` → `word-connections/index.html`
  - `c1Trivia` → `c1-trivia/index.html`
- `tailwind.config.js` content paths updated to include all three HTML entry points
- GitHub Actions `.github/workflows/deploy.yml` simplified to one `npm run build`

**New app: C1 Vocabulary Trivia (`src/c1-trivia/`)**
- Lives at `app.englishpusher.in.ua/c1-trivia/`
- English-only (no Ukrainian translations) — uses definitions and example sentences
- Data: 40 C1 words in `data.ts` (`{ word, partOfSpeech, definition, example }`)
- 4 question types ordered easy → hard per session:
  1. **True / False** — is this the correct definition?
  2. **Match definition** — given a definition, pick the word (4 options)
  3. **Fill in blank** — type the missing word in a sentence (case-insensitive)
  4. **Match meaning** — given a word, pick the correct definition (4 options)
- `assignOrderedTypes(count)` distributes types proportionally across difficulty tiers for any session length
- 10 questions per standard round; practice mode uses only wrong-answer words
- Teacher reactions: thinking → correct/sad during play → celebrate/sad at end screen
- Purple colour scheme to distinguish from B1 apps

**Game screens**
- All three screens (Start, Game, End) use `max-w-4xl` two-column layout: teacher sidebar (`w-56`) left, content right
- Teacher column uses `max-w-none` to prevent image squeeze
- Start screen: teacher + speech bubble left, badge/title/question-types/button right
- Game screen: teacher animates between thinking/correct/sad based on last answer; auto-advances after 1800 ms
- Fill-blank questions: text input + Check button (or Enter key), case-insensitive match
- End screen:
  - Score box (large %, X out of Y)
  - Word lists side-by-side: ✅ Words you know | ❌ Words to practise (no scroll limit, coloured borders)
  - Buttons: Practice weak words (red) / Play again (purple) / Back — `py-4 text-base`
- Practice weak words: rebuilds question set from missed words only, same difficulty ordering

### Pending / known TODOs

- [ ] Vocabulary Cards app — future project
- [ ] Verify DNS CNAME `app.englishpusher.in.ua` → GitHub Pages
- [ ] Add more puzzles as teacher covers new vocabulary topics
- [ ] Add real C1 word list from teacher when available (currently uses default 40-word set)
- [ ] Rename `c1-trivia/` to final name when teacher decides

---

## 2026-07-08 — Skills overhaul + c1-trivia translation-mode fix

### What was done

**Skills migrated to `.claude/skills/` (auto-discovered by Claude Code)**
- Old `SKIILS/` folder removed — files there were renamed away from `SKILL.md`, so
  Claude Code never discovered them (skills MUST be `.claude/skills/<name>/SKILL.md`)
- `add-b1-topic` — improved: stale hardcoded topic-ID list replaced with
  "read TOPICS in data.ts", added common-mistakes table, quality checklist before deploy
- `add-c1-topic` — NEW: full workflow for C1 topics (c1-flashcards/data.ts feeds both
  apps), covers definition mode vs translation mode, `___` example rules, CLAUDE.md tables
- `flashcards` — updated to current C1Word interface (`definition?`/`translation?`),
  apps/ MPA entry points, AppShell rule; scoped to "NEW app" builds only
- Deleted generic `frontend-design` + `skill-creator` copies (redundant with plugins)

**Bug fix: c1-trivia showed blank meanings for translation-mode topics**
- `innovation-leadership` (26 words, Ukrainian translations, no definitions) linked to
  trivia, but trivia read `word.definition` directly → blank True/False + Match-meaning
- Added `meaningOf()` = `definition ?? translation ?? ""` in `src/c1-trivia/App.tsx`
  (same fallback c1-flashcards already used); all 3 usages routed through it
- Verified end-to-end: headless Edge (playwright-core) drove the full 26-question
  session — all 4 question types render Ukrainian meanings correctly; definition-mode
  topic (innovation) regression-checked OK; `npm run build` passes

**CLAUDE.md fixes**
- File structure + C1 design notes were stale (claimed `src/c1-trivia/data.ts` exists —
  it doesn't; data comes from c1-flashcards)
- Documented definition/translation topic modes + added Claude Code skills section

### Not deployed
- c1-trivia fix is committed-ready but NOT deployed — the live site still shows blank
  meanings for Innovation & Leadership trivia until next `npm run deploy`

---

## 2026-07-08 (later) — Hub redesign: B1 Vocabulary chooser page + unified CTAs

### What was done

- NEW `/b1-vocabulary/` chooser page (`src/b1-vocabulary/`, `apps/b1-vocabulary/index.html`,
  vite entry) — mirrors c1-business: Flash Cards (crimson, "Study now") + Vocabulary
  Trivia (blue, "Start quiz"). Word Connections included but `hidden: true`
  (teacher request preserved from old hub entry); app still reachable at /word-connections/
- Hub consolidated from 5 cards to 3: **B1 Grammar Testing** (renamed from "Grammar
  Testing"), **B1 Vocabulary** (→ /b1-vocabulary/), **C1 Vocabulary** (→ /c1-business/)
- CTA convention unified: hub cards all "Start practicing"; chooser pages "Study now" /
  "Start quiz" / "Start playing" (fixed: Vocabulary Cards had empty cta, C1 card
  said "Start quiz" while leading to a chooser)
- No student-facing links broken: all ?topic= deep links and app URLs unchanged
- Verified via headless Edge against production build: 17 checks (hub cards, tabs,
  accordion click-through, chooser links, word-connections URL, c1-business regression)

## 2026-07-14 — Spec-kit + Supabase student accounts (beta branch)

### What was done

- Installed **github/spec-kit** (`.specify/` + `speckit-*` skills); wrote project constitution; documented workflow: brainstorming skill → `/speckit-specify` → plan → tasks → implement (CLAUDE.md has the details)
- Full **student accounts feature** on the new long-lived `beta` branch (spec/plan/tasks in `specs/001-student-accounts/`):
  - Supabase backend (project `cwtidnvbazepqkfweaed`): `profiles`, `trivia_results`, `saved_words`, `study_events`, all RLS-protected, profile auto-created by trigger, email confirmation off
  - Shared modules: `supabase.ts`, `auth.tsx` (useAuth + useSessionUser), `progress.ts`, `savedWords.tsx`, `TriviaSave.tsx`
  - New `/account/` MPA entry: login/signup/reset form + personal page (progress, weak words, My Words, recent activity)
  - Account icon in AppHeader (all apps) + hub header
  - Trivia (b1+c1): auto-save results, stars on end-screen lists, guest sign-in hint
  - Flashcards (b1+c1): star on card, study-event log per topic open
  - "My Words" virtual topic (reserved id `my-words`) in all four apps, deep-linkable when signed in
- All phases validated via scripted Edge (playwright-core): signup/session/guest parity, saves incl. offline non-blocking, weak-word rule both directions, stars/dedup/ghost filtering, study events
- Test account: `claude.test.001@englishpusher.in.ua` (delete in Supabase dashboard when done)

### Pending

- User: create Cloudflare Pages project for `beta` (T009/T010 in tasks.md), then T033 full beta validation + T034 send link to teacher
- Password-reset email flow (V11) needs a real inbox — verify during T033
- Production release = merge `beta`→`main` + add VITE_ vars to deploy.yml (checklist in CLAUDE.md)
