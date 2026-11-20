# Tasks: Recorded Word Pronunciation

**Input**: Design documents from `specs/002-word-audio/`
**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/interfaces.md](contracts/interfaces.md), [quickstart.md](quickstart.md)

**Tests**: Requested in the plan (R9): unit tests with `node --test`, plus one browser check.

**Format**: `- [ ] [ID] [P?] [Story] Description`. [P] = can run in parallel (different files, no unfinished dependency).

## Phase 1: Setup

- [X] T001 Add `"scripts/**/*.test.ts"` to the `node --test` glob in the `test` script of `package.json` (keep the existing `src/**` and `supabase/**` globs and the `&& vitest run` part)
- [X] T002 [P] Create empty folder `public/audio/jane/` with a `.gitkeep` file so the path exists before the first run

---

## Phase 2: Foundational (blocks every story)

**Purpose**: the one naming function both the app and the script use (research R4, contract §1).

- [X] T003 Write failing tests in `src/shared/audioName.test.ts` (node:test + node:assert/strict): `audioKey` trims, collapses spaces, lowercases, NFC-normalises; `audioFileName` matches `/^[a-z0-9-]{1,40}-[0-9a-f]{8}\.mp3$/`; `"Wednesday"` and `" wednesday "` give the same name; `"TV/television"` and `"TV television"` give different names; `"internet café"` slug starts `internet-cafe-`; a 60-character phrase keeps the slug ≤ 40 chars; `"..."` (no letters) gives slug `w`; and: importing `TOPICS` from all six `src/{a2,a2plus,b1,b1plus,b2plus,c1}-flashcards/data.ts`, every distinct `audioKey` maps to a distinct `audioFileName`
- [X] T004 Implement `src/shared/audioName.ts`: export `AUDIO_VOICE_DIR = "audio/jane"`, `audioKey(word)`, `audioFileName(word)` = `<slug>-<fnv1a32(utf8(key)) as 8 hex>.mp3` (use `TextEncoder` for UTF-8 bytes; no DOM or Node-only APIs). Run `npm test` until T003 passes

**Checkpoint**: names are stable and collision-free for all 2,270 real words.

---

## Phase 3: User Story 1 — Same professional voice everywhere (P1) 🎯 MVP

**Goal**: speaker buttons play `/audio/jane/<name>.mp3`.
**Independent test**: with one MP3 placed in `public/audio/jane/` for a known word, tapping that word's speaker in flashcards and trivia plays the file (network 200, no device speech).

- [X] T005 [US1] Create `src/shared/speakWord.ts` per contract §2: module-level single `HTMLAudioElement`; `stopSpeaking()` pauses it and calls `speechSynthesis.cancel()` when available; `speakWord(word, opts)` calls `stopSpeaking()`, sets `src` to `` `${import.meta.env.BASE_URL}${AUDIO_VOICE_DIR}/${audioFileName(word)}` `` and calls `play()`. Never throws (guard `typeof window`/`Audio`)
- [X] T006 [P] [US1] In `src/levels/FlashcardsPage.tsx` delete the local `speak()` function and call `speakWord(word)` from `SpeakerButton`
- [X] T007 [P] [US1] In `src/c1-flashcards/App.tsx` delete the local `speak()` function and call `speakWord(word)` where it was used
- [X] T008 [P] [US1] In `src/levels/TriviaPage.tsx` replace `speakText`/`getEnVoice`/`PREFERRED_VOICES` with `speakWord(text, { rate: 0.85, preferredVoices: ["Daniel", "Karen", "Samantha"] })`, keeping the `muted` check and the `hasInteracted` guard in the existing `speak`/`speakIfInteracted` callbacks; when mute is switched on, call `stopSpeaking()`
- [X] T009 [US1] Run `npm run build` (type checks) and `npm test`; both must pass

**Checkpoint**: MVP: recorded voice plays wherever a file exists.

---

## Phase 4: User Story 2 — Nothing breaks without a recording (P1)

**Goal**: missing/unloadable file → device voice (FR-002).
**Independent test**: tapping a word with no MP3 is read by the device voice.

- [X] T010 [US2] In `src/shared/speakWord.ts` add the fallback: on the audio element's `error` event for the current request, or a rejected `play()` promise (except `AbortError` caused by a newer call), speak the word with `speechSynthesis` (`lang "en-US"`, `rate` default 0.9, first available voice whose name contains one of `preferredVoices` and whose lang starts with `en`, else first `en-US`, else first `en*`). Ignore late events from an older request (track a request counter)
- [X] T011 [US2] Browser check with playwright-core + system Edge (project recipe in memory `project_browser_verification`), script in the session scratchpad, not committed: `npm run dev`; (a) put a sample Jane MP3 at the computed name for `"bored"`, open `/b1-flashcards/?topic=adjectives-feelings`, click the speaker → request to `/audio/jane/bored-*.mp3` returns 200 and `speechSynthesis.speak` is not called; (b) for a word with no file → 404 and `speechSynthesis.speak` is called with that word; (c) same two checks on a level trivia page. Remove the sample MP3 afterwards

**Checkpoint**: US1 + US2 = shippable app change, safe with zero audio files.

---

## Phase 5: User Story 4 — Spending stays small (P2)

*(Built before US3 because the generator must have the limit from its first line of network code.)*

**Goal**: pure planning with a 5,000-character cap.
**Independent test**: `planAudio` with > 5,000 missing characters and no `--all` returns `overLimit: true` and no creations.

- [X] T012 [US4] Write failing tests in `scripts/generate-audio.test.ts` for `planAudio(words, existingFiles, { all, limit })` (contract §3): duplicates and case variants voiced once using the first-met text; existing files are kept and not re-voiced; files with no matching word are in `remove`; non-`.mp3` files (e.g. `.gitkeep`) are never removed; `chars` sums only the texts to create; over the limit without `all` → `create: []`, `overLimit: true`, `remove` still filled; with `all` → everything created
- [X] T013 [US4] Create `scripts/generate-audio.ts` exporting `planAudio` (pure; uses `audioKey`/`audioFileName` from `src/shared/audioName.ts`) and a guarded `main` that runs only when the file is executed directly (`import.meta.url` vs `process.argv[1]`). Run `npm test` until T012 passes

---

## Phase 6: User Story 3 — New topics get recordings automatically (P2)

**Goal**: the generator voices missing words and the deploy publishes them.
**Independent test**: add a fake word locally, run the script → 1 new file; remove the word, run again → 1 removed.

- [X] T014 [US3] Implement `main` in `scripts/generate-audio.ts`: collect words from `TOPICS` of the six `data.ts` files in order a2, a2plus, b1, b1plus, b2plus, c1; list `public/audio/jane/`; call `planAudio` with `limit: 5000` and `all` from `--all`; print the plan; with `--dry-run` stop here; delete `remove` files; if no `OPENROUTER_API_KEY` print a notice and skip voicing; otherwise for each item `POST https://openrouter.ai/api/v1/audio/speech` with `{ model: "mistralai/voxtral-mini-tts-2603", voice: "gb_jane_neutral", input: text, response_format: "mp3" }` and `Authorization: Bearer`, write the bytes to the file, warn on a failed word and continue, stop after 5 failures in a row; exit 0 in all those cases; final line `Audio: N new, M removed, K skipped, C characters (~$X)` at $0.000016/char. Never print the key
- [X] T015 [US3] Local check (free): `node scripts/generate-audio.ts --dry-run` → about 2,270 to create, about 23,300 characters, over limit
- [X] T016 [US3] Edit `.github/workflows/deploy.yml`: `node-version: 22`; after `npm install` add step "Generate word audio" running `node scripts/generate-audio.ts` with `env: OPENROUTER_API_KEY: ${{ secrets.OPENROUTER_API_KEY }}`; then step "Commit new audio" that, if `git status --porcelain public/audio` is non-empty, sets user `github-actions[bot]` / `41898283+github-actions[bot]@users.noreply.github.com`, `git add public/audio`, commits `"Audio: update word recordings [skip ci]"`, `git pull --rebase origin main` and `git push`, and on any failure only prints a `::warning::`. Keep the build step and `peaceiris/actions-gh-pages` step with `cname: app.englishpusher.in.ua` unchanged

**Checkpoint**: every deploy keeps the library complete.

---

## Phase 7: Polish & rollout

- [X] T017 [P] Update `CLAUDE.md`: new section "Recorded word pronunciation" (voice, `public/audio/jane/`, `src/shared/audioName.ts` + `speakWord.ts`, generator flags, deploy step, `OPENROUTER_API_KEY` secret, 5,000-char limit, how to switch voice = new folder + `--all`); add the files to the file-structure block
- [X] T018 [P] Delete the sample `scripts/tts-sample.mjs` and the `tts-sample/` folder, and remove the `tts-sample/` line from `.gitignore` (never committed)
- [X] T019 Commit code; open a PR from `feat/word-audio` to `main`
- [X] T020 Owner: create a separate OpenRouter key with a ~$3 limit and add it as repo secret `OPENROUTER_API_KEY` (Settings → Secrets and variables → Actions)
- [X] T021 First full run, after merge: GitHub → Actions → Deploy to GitHub Pages → Run workflow on `main` with "full run" ticked (equivalent to `node scripts/generate-audio.ts --all`; button added in `.github/workflows/deploy.yml` via `workflow_dispatch`, job limited to `main`) → ~2,270 files, ~14 MB; run again → `0 new`; spot-listen to `blond(e)`, `waiter/waitress`, `light (weight)`; commit `public/audio/jane/` to the PR
- [X] T022 After merge: confirm the deploy run on GitHub Actions, then a speaker button on the live site loads `/audio/jane/*.mp3`; merge `main` into `beta`

---

## Dependencies

```
T001,T002 → T003 → T004 → T005 → (T006 ∥ T007 ∥ T008) → T009 → T010 → T011
T004 → T012 → T013 → T014 → T015 → T016
T009..T016 → T017,T018 → T019 → T020 → T021 → T022
```

- US1 needs only the Foundational phase. US2 extends US1's module.
- US4 and US3 need only the Foundational phase and can be built in parallel with US1/US2.

## Parallel examples

- After T005: T006, T007, T008 (three different files).
- After T004: the app track (T005–T011) and the script track (T012–T016) are independent.
- T017 and T018 together.

## Implementation strategy

1. **MVP** = Phases 1–4: app plays recordings and falls back safely; can ship with zero files.
2. Phases 5–6: generator with the spending cap, then the deploy step.
3. Phase 7: docs, PR, owner adds the secret, one full run (~$0.37), merge, verify live.
