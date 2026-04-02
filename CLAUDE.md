# Englishpusher Hub — CLAUDE.md

## Project overview

Hub landing page for Tetiana Pushkar's English learning apps.
Lives at **app.englishpusher.in.ua**, links out to all sub-apps.

## URLs

| App | URL |
|---|---|
| Main website | https://englishpusher.in.ua |
| Hub (this project) | https://app.englishpusher.in.ua |
| Grammar Testing | https://grammar.englishpusher.in.ua |
| Vocabulary Trivia (B1) | https://trivia.englishpusher.in.ua/ |
| Word Connections (B1) | https://app.englishpusher.in.ua/word-connections/ |
| C1 Vocabulary Trivia | https://app.englishpusher.in.ua/c1-trivia/ |
| Vocabulary Cards | Coming Soon — not yet built |
| Instagram | https://www.instagram.com/teti_push_english?igsh=MWMxbGxodnJrOHI2 |

## Tech stack

- **Vite 6 + React 18 + TypeScript** — Multi-Page App (MPA), single `package.json`
- **Tailwind CSS 3** (postcss + autoprefixer)
- **motion** (from `"motion/react"`) for animations
- **lucide-react** for icons
- NO shadcn, NO react-router

## Fonts & colours

- **Space Grotesk** — headings / display (`font-display`)
- **Inter** — body (`font-body`)
- Primary orange: `#f07c1a` (`text-brand` / `bg-brand` via Tailwind config)
- Background: `#faf8f5` (warm cream — set on body in index.css)
- Header/Footer: `bg-neutral-900` (dark bookend)

## File structure

```
public/
  logo.png                        ← site logo (used in header + favicon)
index.html                        ← hub entry point
word-connections/
  index.html                      ← Word Connections entry point
c1-trivia/
  index.html                      ← C1 Trivia entry point
src/
  assets/
    teacher-celebrate.png         ← used on hub landing page
    teacher-correct.png
    teacher_thinking.png
    teacher_sad-2.png
  index.css                       ← Tailwind imports + character-idle animation
  main.tsx                        ← hub React entry
  Index.tsx                       ← entire hub landing page (single file)
  word-connections/
    main.tsx / App.tsx / data.ts  ← Word Connections game
    assets/                       ← teacher images for game
  c1-trivia/
    main.tsx / App.tsx / data.ts  ← C1 Vocabulary Trivia game
    *.png                         ← teacher images
```

## Architecture decisions

- **Vite MPA**: `vite.config.ts` uses `build.rollupOptions.input` with three entry points (main, wordConnections, c1Trivia). Each builds to its own path in `dist/`.
- Hub lives in a **single `Index.tsx`** — no routing, no sub-pages.
- Cards link out to URLs; internal apps use relative paths (`/word-connections/`, `/c1-trivia/`).
- Teacher character is **hidden on mobile** (`hidden md:flex`).
- App cards data lives in the `ITEMS` array at the top of `Index.tsx` — easy to update. Each item has a `level: "B1" | "C1"` field used by the level tabs.
- **Background colour must be set on `body` in `index.css`**, NOT on the `motion.div` wrapper — otherwise motion's transform creates a stacking context that hides any background layer behind it.
- **WSL HMR fix**: `server: { watch: { usePolling: true } }` in `vite.config.ts` — inotify can't watch Windows filesystem from WSL.

## Page layout

### Header
Dark (`bg-neutral-900`), logo + "Englishpusher Learning Apps" title.

### Main section
Two-column on desktop, single-column on mobile:
- **Left**: badge link → hero heading → description paragraph → teacher character (desktop only)
- **Right (desktop)**: interactive horizontal accordion — hover to expand panel, click to open app
- **Right (mobile)**: staggered slide-in cards

### Background decoration
`ElegantShape` — floating animated pill shapes using `motion/react`.
Uses only `opacity`, `y`, `rotate` (standard CSS) + `Infinity` repeat for float.
**Do NOT use SVG pathOffset/pathLength or Three.js canvas** — these do not work reliably with `motion/react` v11.

### Footer
Dark (`bg-neutral-900`) — mirrors header for bookend effect.
Left: copyright + main site link. Right: Instagram icon + handle.

## App cards (ITEMS array in Index.tsx)

| id | Level | Label | href | Status |
|---|---|---|---|---|
| 1 | B1 | Grammar Testing | https://grammar.englishpusher.in.ua | Live |
| 2 | B1 | Vocabulary Trivia | https://trivia.englishpusher.in.ua/ | Live |
| 3 | B1 | Word Connections | /word-connections/ | Live |
| 4 | B1 | Vocabulary Cards | # | Coming Soon (disabled) |
| 5 | C1 | C1 Vocabulary Trivia | /c1-trivia/ | Live |

Hub has level tabs (All / B1 / C1) above the accordion — filters `filteredItems`.

## Animations (motion/react)

- Page: fade + slide up (`opacity 0→1`, `y 20→0`, 0.35 s ease-out)
- Cards: stagger from left (`x -24→0`, spring, staggerChildren 0.1 s, delayChildren 0.15 s)
- ElegantShape entry: `y -150→0`, `opacity 0→1`, staggered delays
- ElegantShape float: `y [0, 15, 0]`, 12 s infinite easeInOut
- Card hover: `scale 1.02`, arrow nudges right

## Deploy

- **GitHub Actions** → `.github/workflows/deploy.yml`
- Triggers on push to `main`
- Builds with `VITE_BASE_PATH=/`, publishes `dist/` to `gh-pages` branch
- `cname: app.englishpusher.in.ua` written automatically by the action
- Manual deploy: `npm run deploy` (uses `cross-env` + `gh-pages`)

## Git identity (local repo config)

- name: `Oleksandr Pushkar (tauruskin)`
- email: `pushkar.xander@gmail.com`
- remote: `https://github.com/tauruskin/app-englishpusher`

## C1 Vocabulary Trivia — design notes

- Data: `src/c1-trivia/data.ts` — 40 C1 words `{ word, partOfSpeech, definition, example }`
- 4 question types, ordered easy → hard every session via `assignOrderedTypes()`:
  1. True / False
  2. Match definition → word (4 options)
  3. Fill in blank (typed input, case-insensitive)
  4. Match word → definition (4 options)
- End screen: score %, word lists side-by-side, "Practice weak words" button rebuilds session from missed words
- All screens: `max-w-4xl`, teacher sidebar `w-56 max-w-none` (prevents squeeze)
- Purple colour scheme (`bg-purple-600`) distinguishes C1 from B1 apps

## Remaining TODOs

- Vocabulary Cards app — future project, card already stubbed as Coming Soon
- Verify DNS CNAME `app.englishpusher.in.ua` is pointed at GitHub Pages
- Add real C1 word list from teacher when available
- Rename `c1-trivia/` to final name when teacher decides
