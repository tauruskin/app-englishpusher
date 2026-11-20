# Implementation Plan: Recorded Word Pronunciation

**Branch**: `feat/word-audio` | **Date**: 2026-11-20 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/002-word-audio/spec.md`

## Summary

Speaker buttons in flashcards (A2–C1) and level trivia play a pre-recorded MP3 in the Jane voice instead of the device voice, falling back to the device voice when a file is missing. A Node script voices only missing words through OpenRouter, deletes orphans and caps spending; the GitHub Pages deploy runs it before every build and commits new files back to `main`. Details: [research.md](research.md).

## Technical Context

**Language/Version**: TypeScript 5.7; React 18 (app); Node 22 (script and CI, plain `node` with type stripping)
**Primary Dependencies**: none new (built-in `fetch`, `HTMLAudioElement`, `speechSynthesis`)
**Storage**: static files `public/audio/jane/*.mp3` in the repo (~2,270 files, ~14 MB)
**Testing**: `node --test` for `src/shared/audioName.test.ts` and `scripts/generate-audio.test.ts`; browser check with playwright-core + system Edge
**Target Platform**: browsers (GitHub Pages, Cloudflare beta); GitHub Actions `ubuntu-latest`
**Project Type**: Vite MPA web app + build-time script
**Performance Goals**: sound starts < 1 s after tap on mobile (6 KB file)
**Constraints**: spend ≤ 5,000 characters per automatic run; deploy never fails because of the voice service; no secret in the repo or site
**Scale/Scope**: 3 call sites, 2 new shared modules, 1 script, 1 workflow change

## Constitution Check

| Principle | Status |
|---|---|
| I. Shared shell | ✅ No header/footer change; no visual change at all. |
| II. Single source of truth | ✅ Script imports `TOPICS` from the six `data.ts` files; no copied word lists. File names derive from the word text, not a second list. |
| III. MPA boundaries | ✅ No new app/entry. Shared code goes in `src/shared/`. |
| IV. Deploy safety | ✅ `cname: app.englishpusher.in.ua` kept in `deploy.yml`; `package.json` `deploy` script untouched. |
| V. Rendering pitfalls | ✅ Not touched. |
| VI. Topic skills | ✅ Skills unchanged; audio is created at deploy for any topic however it was added. Skill docs get one line noting this. |

Post-design re-check: still all ✅. No complexity exceptions.

## Project Structure

### Documentation (this feature)

```text
specs/002-word-audio/
├── spec.md
├── plan.md              # this file
├── research.md
├── data-model.md
├── contracts/interfaces.md
├── quickstart.md
├── checklists/requirements.md
└── tasks.md             # next: /speckit-tasks
```

### Source Code

```text
src/shared/
├── audioName.ts          # NEW  word → file name (shared by app + script)
├── audioName.test.ts     # NEW
└── speakWord.ts          # NEW  play MP3, fall back to device voice
src/levels/FlashcardsPage.tsx   # EDIT use speakWord
src/levels/TriviaPage.tsx       # EDIT use speakWord (mute/interaction kept)
src/c1-flashcards/App.tsx       # EDIT use speakWord
scripts/
├── generate-audio.ts     # NEW  CLI
└── generate-audio.test.ts# NEW  pure planning tests
public/audio/jane/*.mp3   # NEW  generated (first full run, then by CI)
.github/workflows/deploy.yml    # EDIT node 22 + audio step + commit-back
package.json              # EDIT test glob adds scripts/**/*.test.ts
CLAUDE.md                 # EDIT document the feature
scripts/tts-sample.mjs, tts-sample/   # REMOVE sample (never committed)
```

**Structure Decision**: Follow existing patterns: shared browser code in `src/shared/`, Node scripts in `scripts/` (like `check-private-pages.mjs`), tests next to code with `node --test`.

## Rollout

1. Merge code with the fallback in place (works with zero audio files).
2. Owner adds `OPENROUTER_API_KEY` repo secret (separate key, ~$3 limit).
3. First full run `--all` (locally by Claude with the owner's key in the shell, or the owner runs it) and commit the ~2,270 files.
4. From then on, each deploy voices new words automatically.
5. Merge `main` into `beta` as usual.

## Complexity Tracking

None.
