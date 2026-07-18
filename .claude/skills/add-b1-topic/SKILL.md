---
name: add-b1-topic
description: Use when the user wants to add a new B1 vocabulary topic, lesson, or unit to the Englishpusher app — e.g. pastes or shares a list of English words, phrases, or collocations (as text, photo, screenshot, or CSV) and says "add new topic", "new lesson", "add words", "new wordlist", or names a B1 lesson number.
---

# Add B1 Vocabulary Topic

Adds a new vocabulary topic to the Englishpusher B1 apps. One data file feeds both Flashcards (`/b1-flashcards/`) and Trivia (`/b1-trivia/`) — no duplication needed.

## Single source of truth

`src/b1-flashcards/data.ts` is the ONLY file that needs word data. `src/b1-trivia/App.tsx` imports `TOPICS` directly from it. Never copy words elsewhere.

## B1Word interface

```ts
interface B1Word {
  word: string;          // English word or phrase
  translation: string;   // Ukrainian translation
  example: string;       // Sentence with ___ as placeholder for the word
  transcription?: string; // IPA — include for single words and short phrases
}
```

## Topic interface

```ts
interface Topic {
  id: string;            // kebab-case, stable — NEVER rename after publishing
  title: string;         // "Lesson N: Short Title" if lesson number given
  icon: string;          // single emoji representing the topic
  description: string;   // one-line description for the topic card
  words: B1Word[];
  triviaUrl: string;     // always "/b1-trivia/?topic=<id>"
}
```

---

## Step 1 — Parse the wordlist

Accept any format the teacher provides:
- Photo / screenshot of a table
- Plain text list
- CSV / tsv
- Free-form notes

Extract: English word/phrase, definition (if given), example sentence (if given). Fill in anything missing.

---

## Step 2 — Fill in translations, transcription, example

For each word, generate:

### Ukrainian translation (`translation`)

- Use natural, modern Ukrainian — not overly literary
- For multi-meaning words, include the most common B1-level meanings separated by ` / ` (e.g., `"заблукати / загубитися"`)
- For collocations, translate the whole phrase naturally (e.g., `"зробити помилку"`, not word-for-word)

### IPA transcription (`transcription`)

- Include for single words and short phrases (up to ~5 words)
- Wrap in `/…/` (e.g., `"/ɡet ˈheld ʌp/"`)
- For collocations, stress the key syllable of the main content word
- Omit for very long phrases (more than ~5 words) — the field is optional

### Example sentence (`example`)

This is the most important field. The sentence is used in the "Fill in the sentence" trivia question type.

**Rules:**
1. Use `___` as the exact placeholder for the target word/phrase — exactly ONE `___` per sentence
2. The sentence must be grammatically correct when `___` is replaced by the word
3. Use modal verbs or infinitives after `to` for collocations/phrases so the base form fits naturally:
   - ✅ `"Traffic can sometimes ___ for hours on the motorway."`
   - ✅ `"It is easy to ___ in a new city without a map."`
   - ❌ `"He got lost on the way."` (no blank, no base form)
4. The sentence should illustrate the meaning in context — not be trivially obvious
5. Target B1 reading level: clear vocabulary, moderate sentence length
6. Look at the teacher's original example sentences for inspiration — adapt them to fit the `___` format rather than copying verbatim

**Pattern for different word types:**
- Adjective: `"She felt completely ___ after running the marathon."`
- Noun: `"A ___ practises for many hours every day to perfect their skills."`
- Verb/stative: `"I ___ that she passed the exam without studying at all."`
- Collocation (verb phrase): `"Always check your calendar so you do not ___."`
- Multi-word expression: `"The manager had to ___ quickly under a lot of pressure."`

---

## Step 3 — Determine topic metadata

**Before choosing an `id`, read the `TOPICS` array in `src/b1-flashcards/data.ts` and list every existing `id` — the new one must not collide.** Do not rely on a memorised list; topics are added regularly.

```
id          → kebab-case slug of the topic name (e.g., "collocations-get-make")
              For numbered lessons the existing pattern is "lesson-N-<slug>"
              (e.g., "lesson-19-facts-figures"). Keep it short and stable.

title       → If teacher gave a lesson number: "Lesson N: Short Description"
              Otherwise: descriptive title matching the words (e.g., "Adjectives for Feelings")

icon        → Pick a single emoji that fits the topic:
              😊 emotions  🧠 mental/thinking  💼 jobs  🎬 stories
              🤝 collocations/pairs  📞 communication  🏠 daily life
              🗣️ speaking  📝 writing  🔤 grammar patterns

description → One phrase, 5–10 words, shown under the topic title on the card
              (e.g., "Common collocations with get and make")
```

---

## Step 4 — Write the topic entry

Read the current end of `src/b1-flashcards/data.ts` first so you know exactly where to insert. Append before the closing `];` of the `TOPICS` array:

```ts
  {
    id: "<id>",
    title: "<title>",
    icon: "<icon>",
    description: "<description>",
    triviaUrl: "/b1-trivia/?topic=<id>",
    words: [
      { word: "…", translation: "…", transcription: "/…/", example: "… ___ …" },
      // one entry per word
    ],
  },
```

---

## Step 5 — Update CLAUDE.md

Read `CLAUDE.md` and add the new topic to **both** tables under "Direct topic links":

**B1 Vocabulary Cards table:**
```
| <title> | https://app.englishpusher.in.ua/b1-flashcards/?topic=<id> |
```

**B1 Vocabulary Trivia table:**
```
| <title> | https://app.englishpusher.in.ua/b1-trivia/?topic=<id> |
```

---

## Step 6 — Quality checklist (BEFORE deploying)

- [ ] Every `example` contains exactly one `___`
- [ ] Replacing `___` with the word produces a grammatical sentence
- [ ] `triviaUrl` matches the `id` exactly
- [ ] `id` is unique — checked against the current `TOPICS` array in `data.ts`
- [ ] TypeScript build passes: `npm run build` (exit 0)
- [ ] CLAUDE.md updated with both flashcards + trivia links

---

## Step 7 — Build and deploy

**Headless mode (orchestrator bridge):** if the environment variable
`APP_TOPIC_HEADLESS=1` is set, skip `npm run deploy` entirely. Instead:

1. Write `.topic-summary.json` at the repo root with exactly these fields:
   ```json
   {
     "id": "<id>",
     "title": "<title>",
     "wordCount": <number>,
     "sampleWords": [
       { "word": "<word>", "meaning": "<translation>" }
     ]
   }
   ```
   Include 3-5 entries in `sampleWords`, picked to represent the topic.
2. Leave the working tree as-is (uncommitted) — the caller handles
   branching, committing, and pushing.
3. Stop here. Do not run Step 8.

**Interactive mode (normal Claude Code session):** run

```bash
npm run deploy
```

This runs TypeScript check → Vite build → publishes to GitHub Pages with CNAME (`predeploy` handles the build). **Never strip the `--cname` flag from the deploy script.**

Confirm the deploy command succeeds (exit 0) before declaring done, then continue to Step 8.

---

## Step 8 — Report to user (interactive mode only — headless mode stops at Step 7)

After deploy, show:
- Topic title, ID, word count
- Direct links for sharing:
  - Flashcards: `https://app.englishpusher.in.ua/b1-flashcards/?topic=<id>`
  - Trivia: `https://app.englishpusher.in.ua/b1-trivia/?topic=<id>`
- The full word list with translations, so the teacher can verify

---

## Common mistakes

| Mistake | Consequence |
|---|---|
| Example without `___` | Trivia silently falls back to a translation question — the fill-blank type is lost |
| Two `___` in one example | Only the first is replaced; the sentence renders broken |
| Reusing an existing `id` | `?topic=` deep links open the wrong topic |
| Renaming an `id` after publishing | Teacher's shared links break for students |
| Forgetting CLAUDE.md tables | Teacher has no link to share |
