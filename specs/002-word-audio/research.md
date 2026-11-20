# Research: Recorded Word Pronunciation

All decisions below were checked against the real repo and the sample run on 2026-11-20.

## R1. Voice and service

- **Decision**: OpenRouter `POST https://openrouter.ai/api/v1/audio/speech`, model `mistralai/voxtral-mini-tts-2603`, voice `gb_jane_neutral`, `response_format: "mp3"`. Response body is raw MP3 bytes.
- **Rationale**: The owner picked Jane by ear from six voices (Microsoft Emily/Harry, ElevenLabs Alice, Mistral Jane, Kokoro Emma/George). Owner already has an OpenRouter account; no Google billing needed. Price $0.000016 per input character (OpenRouter models API, 2026-11-20).
- **Alternatives**: Google Cloud TTS (needs billing set up), ElevenLabs (~5x the price), Kokoro (cheapest, owner disliked it).

## R2. Volume and cost

- **Measured**: 2,436 word entries, 2,270 unique texts, 2,269 unique ignoring case, 23,318 characters in total.
- **Cost**: full run ≈ 23,318 × $0.000016 ≈ **$0.37**. A 20-word topic ≈ 200–300 characters ≈ $0.005.
- **Safety limit**: 5,000 characters per automatic run (≈ 20 normal topics at once, ≈ $0.08). Larger runs need `--all`.

## R3. File size and format

- **Measured**: Jane word clips average **6.2 KB** (20 sample words). 2,270 files ≈ 14 MB.
- **Decision**: store the MP3 exactly as returned; no re-encoding.
- **Rationale**: Already small; skipping ffmpeg keeps CI simple.

## R4. File naming

- **Decision**: `public/audio/jane/<slug>-<hash>.mp3`, where
  - `key = text.normalize("NFC").trim().replace(/\s+/g, " ").toLowerCase()`
  - `slug` = key → NFD, accents removed, every run of non-`[a-z0-9]` → `-`, trimmed of `-`, cut to 40 characters (fallback `w` if empty)
  - `hash` = FNV-1a 32-bit of `key` (UTF-8 bytes), 8 lowercase hex digits.
  - Example: `"get on with"` → `get-on-with-<8 hex>.mp3`.
- **Rationale**: Real words include `blond(e)`, `waiter/waitress`, `internet café`, `light (weight)` vs `light (colour)`, `from … to`, and long phrases like `to go/continue/walk straight on along the street`. A slug alone can collide (`TV/television` vs `TV television`) and gets long; the hash makes names unique and changes whenever the text changes, so corrected words automatically get a new recording (spec US3-2). Lowercase key = case variants share one file (FR-007). FNV-1a is synchronous and tiny, so the browser computes the same name with no lookup table and no async crypto.
- **Alternatives**: a manifest JSON mapping text → file (extra download, one more thing to keep in sync); SHA-1 (browser API is async); slug only (collisions).

## R5. Text sent to the voice

- **Decision**: send the word exactly as displayed (trimmed). No rewriting of `/`, brackets or "...".
- **Rationale**: Matches what the device voice reads today, so no regression; keeps names and text in one place. Rewriting rules can be added later without changing the design (a change of text → new hash).
- **Risk noted**: phrases like `blond(e)` may sound odd. Owner can listen after the first run; any fix is a later, separate change.

## R6. Running TypeScript data from the script

- **Decision**: the generator is `scripts/generate-audio.ts`, run with plain `node` (Node ≥ 22.18 strips types by default). It imports `TOPICS` from the six `src/*-flashcards/data.ts` files and the shared naming function from `src/shared/audioName.ts`.
- **Rationale**: The repo already runs `.ts` under plain Node (`node --test "src/**/*.test.ts"`, commit 1faa6df). Importing the data instead of parsing it respects constitution II (single source of truth). Local Node is 22.20.
- **Consequence**: `deploy.yml` moves from `node-version: 20` to `22`.

## R7. Deploy integration

- **Decision**: in `deploy.yml`, after `npm install` and before `npm run build`:
  1. `node scripts/generate-audio.ts` with `OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}`.
  2. If `public/audio` changed: commit as `github-actions[bot]` ("Audio: N new, M removed [skip ci]"), `git pull --rebase`, `git push`. A push failure only warns.
  3. Build and publish as today (`cname:` unchanged).
- **Rationale**: `main` is not protected and the repo ruleset is disabled (GitHub API, 2026-11-20), so the default `GITHUB_TOKEN` with the existing `contents: write` can push. Pushes made with `GITHUB_TOKEN` don't trigger workflows, so no loop; `[skip ci]` is extra insurance. The build step sees the new files either way because they are already on disk.
- **Missing secret**: if `OPENROUTER_API_KEY` is empty the script logs a notice and exits 0 (deploy unchanged).

## R8. Playback in the browser

- **Decision**: `src/shared/speakWord.ts` exports `speakWord(text, opts?)`. It keeps one module-level `HTMLAudioElement`; on each call it stops the current audio and any device speech, sets `src` to the computed URL (respecting `import.meta.env.BASE_URL`), and calls `play()`. On `error` event or rejected `play()` it falls back to `speechSynthesis` with the caller's settings (lang, rate, preferred voices). Returns nothing; never throws.
- **Rationale**: One element = only one word at a time (FR-004). Click handlers count as user gestures, so `play()` is allowed; trivia's auto-speak already waits for interaction. Missing files return 404 → `error` → fallback (FR-002).
- **Alternatives**: Web Audio API (more code, no benefit); `fetch` + HEAD check first (extra round trip).

## R9. Tests

- **Decision**:
  - `src/shared/audioName.test.ts` (`node --test`): fixed examples, case sharing, punctuation, accents, long phrases, collision of `TV/television` vs `TV television`, and a check that every word in the six lists produces a unique name per unique key.
  - `scripts/generate-audio` core logic is split into pure functions (plan: which to create, which to delete, over-limit) and tested in `scripts/generate-audio.test.ts` with no network.
  - Browser check (playwright-core + system Edge, per the project's verification recipe): a word with a file plays the MP3 (network request 200, no speechSynthesis call); a made-up word falls back to speechSynthesis.
- `npm test` glob gets `scripts/**/*.test.ts` added.
