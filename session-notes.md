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
