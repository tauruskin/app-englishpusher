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
| Vocabulary Builder | Coming Soon — not yet built |

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
- Dark header background: `bg-neutral-900`
- Page background: `bg-neutral-50`

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
  main.tsx                  ← React entry point
  Index.tsx                 ← entire landing page (single file)
```

## Architecture decisions

- Everything lives in a **single `Index.tsx`** — no routing, no sub-pages.
- Cards link out to external URLs with `target="_blank"`.
- Teacher character is **hidden on mobile** (`hidden md:flex`).
- App cards data lives in the `APP_CARDS` array at the top of `Index.tsx` — easy to update.

## Animations (motion/react)

- Page: fade + slide up (`opacity 0→1`, `y 20→0`, 0.35 s ease-out)
- Cards: stagger from left (`x -24→0`, spring, staggerChildren 0.1 s, delayChildren 0.15 s)
- Speech bubble: spring pop-in (scale 0.8→1, delay 0.3 s)
- Teacher idle: CSS `animate-character-idle` (translateY 0→-8 px, 3 s infinite)
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

- Vocabulary Builder app — future project, card already stubbed as Coming Soon
- Verify DNS CNAME `app.englishpusher.in.ua` is pointed at GitHub Pages
