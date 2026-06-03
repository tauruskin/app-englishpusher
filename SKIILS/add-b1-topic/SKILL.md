---
name: add-b1-topic
description: Add a new B1 vocabulary topic to the Englishpusher app — creates flashcards and trivia from a provided wordlist. Use this skill whenever the user provides a list of English words, phrases, or collocations and wants to add them as a new B1 lesson, topic, or unit. Triggers on phrases like "add new topic", "new lesson", "add words", "new wordlist", or any time the user pastes/shares a list of English vocabulary. Handles everything: Ukrainian translations, IPA transcriptions, example sentences, data.ts update, CLAUDE.md update, and deploy.
---

# Add B1 Vocabulary Topic

This skill adds a new vocabulary topic to the Englishpusher B1 apps. One data file feeds both Flashcards (`/b1-flashcards/`) and Trivia (`/b1-trivia/`) — no duplication needed.

## Single source of truth

`src/b1-flashcards/data.ts` is the ONLY file that needs word data. The B1 Trivia imports directly from it. Never copy words elsewhere.

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
1. Use `___` as the exact placeholder for the target word/phrase
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

```
id          → kebab-case version of the topic name (e.g., "collocations-get-make")
              If a lesson number is given, use "lesson-N-<slug>" format is fine
              but the existing topics don't use that — use a descriptive slug instead
              Keep it short and stable.

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

Append before the closing `];` of the `TOPICS` array in `src/b1-flashcards/data.ts`:

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

Read the current end of `data.ts` first so you know exactly where to insert.

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

## Step 6 — Build and deploy

```bash
npm run deploy
```

This runs TypeScript check → Vite build → image optimisation → publishes to GitHub Pages with CNAME.

Confirm build succeeds (exit 0) before declaring done.

---

## Step 7 — Report to user

After deploy, show:
- Topic title, ID, word count
- Direct links for sharing:
  - Flashcards: `https://app.englishpusher.in.ua/b1-flashcards/?topic=<id>`
  - Trivia: `https://app.englishpusher.in.ua/b1-trivia/?topic=<id>`
- The full word list with translations, so the teacher can verify

---

## Quality checklist (run before deploying)

- [ ] Every `example` contains exactly one `___`
- [ ] Replacing `___` with the word produces a grammatical sentence
- [ ] `triviaUrl` matches the `id` exactly
- [ ] `id` is unique — check existing TOPICS array
- [ ] TypeScript build passes (`npm run build`)
- [ ] CLAUDE.md updated with both flashcards + trivia links

---

## Reference — existing topic IDs (do not reuse)

- `adjectives-feelings`
- `stative-verbs`
- `personality-relationships`
- `adverbs-frequency`
- `jobs`
- `story-words`
- `collocations-get-make`
