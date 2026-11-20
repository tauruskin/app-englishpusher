# Contracts: Recorded Word Pronunciation

## 1. `src/shared/audioName.ts` (used by the app and the generator)

```ts
export const AUDIO_VOICE_DIR = "audio/jane";
export function audioKey(word: string): string;      // normalised lowercase key
export function audioFileName(word: string): string;  // "<slug>-<8 hex>.mp3"
```

- Pure, synchronous, no DOM or Node APIs.
- Same input → same output in browser and Node.

## 2. `src/shared/speakWord.ts` (app)

```ts
export interface SpeakOptions {
  rate?: number;                 // device-voice fallback rate (default 0.9)
  preferredVoices?: string[];    // device-voice names to prefer, e.g. ["Daniel","Karen","Samantha"]
}
export function speakWord(word: string, opts?: SpeakOptions): void;
export function stopSpeaking(): void;
```

- Plays `${import.meta.env.BASE_URL}${AUDIO_VOICE_DIR}/${audioFileName(word)}`.
- Stops any previous recording or device speech first.
- On load error or rejected `play()` → device voice (`en-US`, given rate/voices).
- Never throws. Mute and interaction checks stay with the caller (trivia).

**Callers replaced**
| File | Old | New |
|---|---|---|
| `src/levels/FlashcardsPage.tsx` | local `speak()` | `speakWord(word)` |
| `src/c1-flashcards/App.tsx` | local `speak()` | `speakWord(word)` |
| `src/levels/TriviaPage.tsx` | `speakText()` + `getEnVoice()` | `if (!muted) speakWord(word, { rate: 0.85, preferredVoices: [...] })` |

## 3. `scripts/generate-audio.ts` (CLI)

```
node scripts/generate-audio.ts [--all] [--dry-run]
env: OPENROUTER_API_KEY
```

| Situation | Behaviour | Exit code |
|---|---|---|
| No key | notice "no OPENROUTER_API_KEY, skipping"; still deletes orphans unless `--dry-run` | 0 |
| Nothing missing | "0 new, M removed" | 0 |
| Missing chars ≤ 5,000, or `--all` | voices missing words, writes files, deletes orphans | 0 |
| Missing chars > 5,000 without `--all` | voices nothing, warns with count and char total; still deletes orphans | 0 |
| API error on a word | warns, continues with the next word; stops after 5 errors in a row | 0 |
| Bug in the script (e.g. data won't load) | error | 1 |
| `--dry-run` | prints the plan only, writes and deletes nothing | 0 |

Last line printed: `Audio: N new, M removed, K skipped, C characters (~$X)`.

Pure helpers exported for tests: `planAudio(words, existingFiles, { all, limit })` → `{ create: {file, text}[], remove: string[], chars, overLimit }`.

## 4. `deploy.yml` step contract

- Runs before `npm run build`, after `npm install`, on `node-version: 22`.
- Secret: `OPENROUTER_API_KEY`.
- Commits only `public/audio/jane/**`, author `github-actions[bot]`, message ending `[skip ci]`.
- `cname: app.englishpusher.in.ua` stays (constitution IV).
