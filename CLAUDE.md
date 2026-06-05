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
| Vocabulary Trivia (B1) | https://app.englishpusher.in.ua/b1-trivia/ |
| Word Connections (B1) | https://app.englishpusher.in.ua/word-connections/ |
| B1 Vocabulary Cards | https://app.englishpusher.in.ua/b1-flashcards/ |
| C1 Flash Cards | https://app.englishpusher.in.ua/c1-flashcards/ |
| C1 Vocabulary Trivia | https://app.englishpusher.in.ua/c1-trivia/ |
| Instagram | https://www.instagram.com/teti_push_english?igsh=MWMxbGxodnJrOHI2 |

### Direct topic links — Flash Card apps

Both flash card apps support `?topic=<id>` deep links. The teacher can copy and share these to send students directly to a specific topic.

**B1 Vocabulary Cards** (`/b1-flashcards/`):

| Topic | Direct link |
|---|---|
| Adjectives for Feelings | https://app.englishpusher.in.ua/b1-flashcards/?topic=adjectives-feelings |
| Stative Verbs | https://app.englishpusher.in.ua/b1-flashcards/?topic=stative-verbs |
| Personality & Relationships | https://app.englishpusher.in.ua/b1-flashcards/?topic=personality-relationships |
| Adverbs of Frequency | https://app.englishpusher.in.ua/b1-flashcards/?topic=adverbs-frequency |
| Lesson 6: Jobs & Work | https://app.englishpusher.in.ua/b1-flashcards/?topic=jobs |
| Lesson 15: Story Words | https://app.englishpusher.in.ua/b1-flashcards/?topic=story-words |
| Lesson 16: Get & Make Collocations | https://app.englishpusher.in.ua/b1-flashcards/?topic=collocations-get-make |

**B1 Vocabulary Trivia** (`/b1-trivia/`):

| Topic | Direct link |
|---|---|
| Adjectives for Feelings | https://app.englishpusher.in.ua/b1-trivia/?topic=adjectives-feelings |
| Stative Verbs | https://app.englishpusher.in.ua/b1-trivia/?topic=stative-verbs |
| Personality & Relationships | https://app.englishpusher.in.ua/b1-trivia/?topic=personality-relationships |
| Adverbs of Frequency | https://app.englishpusher.in.ua/b1-trivia/?topic=adverbs-frequency |
| Lesson 6: Jobs & Work | https://app.englishpusher.in.ua/b1-trivia/?topic=jobs |
| Lesson 15: Story Words | https://app.englishpusher.in.ua/b1-trivia/?topic=story-words |
| Lesson 16: Get & Make Collocations | https://app.englishpusher.in.ua/b1-trivia/?topic=collocations-get-make |

**C1 Flash Cards** (`/c1-flashcards/`):

| Topic | Direct link |
|---|---|
| Innovation | https://app.englishpusher.in.ua/c1-flashcards/?topic=innovation |
| Writing CEO Communication | https://app.englishpusher.in.ua/c1-flashcards/?topic=ceo-communication |
| Leadership & Equality | https://app.englishpusher.in.ua/c1-flashcards/?topic=leadership-equality |
| Innovation & Leadership | https://app.englishpusher.in.ua/c1-flashcards/?topic=innovation-leadership |

**C1 Vocabulary Trivia** (`/c1-trivia/`):

| Topic | Direct link |
|---|---|
| Innovation | https://app.englishpusher.in.ua/c1-trivia/?topic=innovation |
| Writing CEO Communication | https://app.englishpusher.in.ua/c1-trivia/?topic=ceo-communication |
| Leadership & Equality | https://app.englishpusher.in.ua/c1-trivia/?topic=leadership-equality |
| Innovation & Leadership | https://app.englishpusher.in.ua/c1-trivia/?topic=innovation-leadership |

**How it works:** `?topic=<id>` is read on mount via `URLSearchParams`. The URL updates automatically when the user selects a topic, and clears when they go back to the topic list. The `id` field in `TOPICS` in `data.ts` is the canonical key — keep it stable, never rename it after publishing.

**When adding a new topic:** add the direct link to this table immediately.

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
apps/
  b1-trivia/index.html            ← B1 Trivia entry point
  b1-flashcards/index.html        ← B1 Flashcards entry point
  c1-trivia/index.html            ← C1 Trivia entry point
  c1-flashcards/index.html        ← C1 Flashcards entry point
  c1-business/index.html          ← C1 Business entry point
  word-connections/index.html     ← Word Connections entry point
src/
  assets/
    teacher-celebrate.png
    teacher-correct.png
    teacher-thinking.png
    teacher-sad.png
  shared/
    AppShell.tsx                  ← ⭐ Shared AppHeader + AppFooter components
  index.css                       ← Tailwind imports + character animations
  main.tsx                        ← hub React entry
  Index.tsx                       ← entire hub landing page (single file)
  b1-trivia/
    main.tsx / App.tsx            ← B1 Vocabulary Trivia game
  b1-flashcards/
    main.tsx / App.tsx / data.ts  ← B1 Vocabulary Cards (data.ts = single source for B1 words)
  c1-trivia/
    main.tsx / App.tsx / data.ts  ← C1 Vocabulary Trivia game
  c1-flashcards/
    main.tsx / App.tsx / data.ts  ← C1 Flash Cards
  c1-business/
    main.tsx / App.tsx            ← C1 Business hub page
  word-connections/
    main.tsx / App.tsx / data.ts  ← Word Connections game
```

## Shared components — `src/shared/AppShell.tsx`

**All activity apps** (everything except the landing page `Index.tsx`) use two shared components:

### `AppHeader`

```tsx
import { AppHeader } from "../shared/AppShell.tsx";

<AppHeader
  title="Vocabulary Trivia"           // app name shown in header
  subtitle="B1 · by Englishpusher"    // second line (topic name when playing)
  onTitleClick={handleBackToSelect}   // makes title clickable (optional)
  onTopics={handleBackToSelect}        // enables "← Topics" nav button
  showTopics={phase !== "select"}      // controls Topics button visibility
  controls={<>…</>}                   // app-specific right-side controls (score, mute, restart…)
/>
```

- On **desktop**: shows logo + title on left, app controls + "← Topics" + "Home" on right
- On **mobile**: shows logo + title + app controls only (nav moves to footer)

### `AppFooter`

```tsx
import { AppFooter } from "../shared/AppShell.tsx";

<AppFooter
  onTopics={handleBackToSelect}    // callback for "‹ Topics" button (optional)
  showTopics={phase !== "select"}  // show Topics only when relevant
/>
```

- On **mobile**: shows "‹ Topics" (if applicable) on left, "Home" icon on right, then copyright
- On **desktop**: shows copyright only (nav is in the header)

### Rules for new activities

1. **Always** import and use `AppHeader` + `AppFooter` — never write a custom header/footer
2. Pass `onTopics` + `showTopics` if the activity has a topic selection screen
3. Pass app-specific controls (score badge, mute button, restart) via the `controls` prop
4. The landing page (`Index.tsx`) has its own header/footer — do not use `AppShell` there

## Architecture decisions

- **Vite MPA**: `vite.config.ts` uses `build.rollupOptions.input` with one entry per app. Each builds to its own path in `dist/`. Source HTML lives in `apps/<name>/index.html`; a post-build plugin moves them to `dist/<name>/index.html` so deployed URLs stay as `/<name>/`.
- **Dev rewrite plugin**: `configureServer` middleware rewrites `/<app>/*` → `/apps/<app>/*` in dev so local URLs match deployed URLs exactly.
- Hub lives in a **single `Index.tsx`** — no routing, no sub-pages.
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
| 2 | B1 | Vocabulary Trivia | /b1-trivia/ | Live — migrated from external repo |
| 3 | B1 | Word Connections | /word-connections/ | Live |
| 4 | B1 | Vocabulary Cards | /b1-flashcards/ | Live — crimson `#9f1239` card |
| 5 | C1 | C1 Vocabulary | /c1-business/ | Live |

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

### ⚠️ CNAME / custom domain — known gotcha

The `gh-pages` package **replaces the entire `gh-pages` branch** with the contents of `dist/`. The `dist/` folder never contains a `CNAME` file, so every deploy without `--cname` silently deletes the custom domain record from GitHub Pages → immediate 404 on `app.englishpusher.in.ua`.

**Fix already applied:** `package.json` deploy script always passes `--cname app.englishpusher.in.ua`:
```
"deploy": "gh-pages -d dist --cname app.englishpusher.in.ua"
```

**Never remove `--cname` from this command.** If you ever change the deploy script, add a new deploy script, or switch tools, make sure CNAME is handled explicitly. GitHub Actions workflow handles it via its own `cname:` option — that path is safe as-is.

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

- Verify DNS CNAME `app.englishpusher.in.ua` is pointed at GitHub Pages
- Add more C1 topics when teacher provides word lists
- Rename `c1-trivia/` to final name when teacher decides
- Update direct topic links table above whenever a new topic is added
