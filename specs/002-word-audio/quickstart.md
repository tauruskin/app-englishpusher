# Quickstart / Validation: Recorded Word Pronunciation

## Prerequisites
- Node 22.18+ (`node -v`).
- An OpenRouter key with a small limit, set in the shell as `OPENROUTER_API_KEY` (never committed).

## 1. Unit tests
```
npm test
```
Expect: `audioName` and `generate-audio` plan tests pass, including "all real words get unique file names".

## 2. Dry run (free)
```
node scripts/generate-audio.ts --dry-run
```
Expect: ~2,270 to create, ~23,300 characters, "over limit" because > 5,000.

## 3. First full run (≈ $0.37, once)
```
node scripts/generate-audio.ts --all
```
Expect: ~2,270 files in `public/audio/jane/`, ~14 MB, last line `Audio: 2270 new, 0 removed ...`. Run again: `0 new`.

## 4. App check
```
npm run dev
```
- Open `/b1-flashcards/?topic=stative-verbs`, tap the speaker: Jane's voice; the network tab shows `/audio/jane/....mp3` 200.
- Open level trivia (e.g. `/a2-trivia/`), answer one question, tap a speaker: Jane; mute: silence.
- Temporarily rename one MP3, tap that word: device voice. Rename back.

## 5. New-topic simulation
- Add a fake word to a topic locally, run `node scripts/generate-audio.ts`: `1 new`. Remove it, run again: `1 removed`.

## 6. Deploy check (after merge)
- GitHub → Actions → the deploy run shows the audio step; if new words existed, a `github-actions[bot]` commit "Audio: …" appears on `main`.
- On the live site, a speaker button loads `/audio/jane/....mp3`.
