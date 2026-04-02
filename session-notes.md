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
