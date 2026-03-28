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
| Vocabulary Trivia | https://trivia.englishpusher.in.ua/ |
| Vocabulary Cards | Coming Soon — not yet built |
| Instagram | https://www.instagram.com/teti_push_english?igsh=MWMxbGxodnJrOHI2 |

## Tech stack

- **Vite 6 + React 18 + TypeScript**
- **Tailwind CSS 3** (postcss + autoprefixer)
- **motion** (from `"motion/react"`) for animations
- **lucide-react** for icons
- NO shadcn, NO react-router, NO game logic

## Fonts & colours

- **Space Grotesk** — headings / display (`font-display`)
- **Inter** — body (`font-body`)
- Primary orange: `#f07c1a` (`text-brand` / `bg-brand` via Tailwind config)
- Background: `#faf8f5` (warm cream — set on body in index.css)
- Header/Footer: `bg-neutral-900` (dark bookend)

## File structure

```
public/
  logo.png                  ← site logo (used in header + favicon)
src/
  assets/
    teacher-celebrate.png   ← used on landing page
    teacher-correct.png
    teacher_thinking.png
    teacher_sad-2.png
  index.css                 ← Tailwind imports + character-idle animation
                              body background set here (not on motion.div wrapper)
  main.tsx                  ← React entry point
  Index.tsx                 ← entire landing page (single file)
```

## Architecture decisions

- Everything lives in a **single `Index.tsx`** — no routing, no sub-pages.
- Cards link out to external URLs with `target="_blank"`.
- Teacher character is **hidden on mobile** (`hidden md:flex`).
- App cards data lives in the `ITEMS` array at the top of `Index.tsx` — easy to update.
- **Background colour must be set on `body` in `index.css`**, NOT on the `motion.div` wrapper — otherwise motion's transform creates a stacking context that hides any background layer behind it.

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

| Card | Label | href | Status |
|---|---|---|---|
| 1 | Grammar Testing | https://grammar.englishpusher.in.ua | Live |
| 2 | Vocabulary Trivia | https://trivia.englishpusher.in.ua/ | Live |
| 3 | Vocabulary Cards | # | Coming Soon (disabled) |

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

## Remaining TODOs

- Vocabulary Cards app — future project, card already stubbed as Coming Soon
- Verify DNS CNAME `app.englishpusher.in.ua` is pointed at GitHub Pages
