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
    - Vocabulary Builder → Coming Soon (disabled)
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

### Pending / known TODOs

- [x] Vocabulary Trivia URL confirmed → https://trivia.englishpusher.in.ua/
- [ ] Vocabulary Builder app — future project, card already stubbed as Coming Soon
- [ ] Verify custom domain DNS (CNAME `app.englishpusher.in.ua`) is pointed at GitHub Pages
