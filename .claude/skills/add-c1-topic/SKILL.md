---
name: add-c1-topic
description: Use when the user wants to add a new C1 vocabulary topic, lesson, or unit to the Englishpusher app — e.g. pastes or shares a list of advanced/business English words, phrases, collocations, or idioms (as text, photo, screenshot, or CSV) and says "add C1 topic", "new C1 lesson", "add C1 words", or names a C1/advanced/business wordlist.
---

# Add C1 Vocabulary Topic

Adds a new vocabulary topic to the Englishpusher C1 apps. One data file feeds both Flash Cards (`/c1-flashcards/`) and Trivia (`/c1-trivia/`) — no duplication needed.

## Single source of truth

`src/c1-flashcards/data.ts` is the ONLY file that needs word data. `src/c1-trivia/App.tsx` imports `TOPICS` directly from it. Never copy words elsewhere.

## C1Word interface

```ts
interface C1Word {
  word: string;          // English word or phrase
  partOfSpeech: string;  // noun | verb | adjective | phrase | noun phrase | phrasal verb | idiom
  definition?: string;   // English definition — standard mode
  translation?: string;  // Ukrainian — used instead of definition for translation-mode topics
  example: string;       // Sentence with ___ as placeholder for the word
}
```

**Every word MUST have `definition` OR `translation` — never neither.** Both apps read the meaning as `definition ?? translation`; a word with neither renders blank cards and blank trivia questions.

## Topic interface

```ts
interface Topic {
  id: string;            // kebab-case, stable — NEVER rename after publishing
  title: string;
  description: string;   // one-line description for the topic card
  icon: string;          // single emoji representing the topic
  words: C1Word[];
  triviaUrl?: string;    // "/c1-trivia/?topic=<id>" — always include it
}
```

---

## Step 1 — Parse the wordlist and pick the mode

Accept any format the teacher provides: photo/screenshot, plain text, CSV/tsv, free-form notes.

**Pick ONE mode for the whole topic — never mix within a topic:**

| Mode | When | Meaning field |
|---|---|---|
| **Definition mode** (default) | Standard C1 vocabulary; teacher gave English definitions or none | `definition` — English, CEFR-style |
| **Translation mode** | Teacher explicitly wants Ukrainian translations (like `innovation-leadership`) | `translation` — Ukrainian |

If unsure, ask the teacher which mode she wants — it changes what students see on the card back.

---

## Step 2 — Fill in the fields

### `partOfSpeech`

Use the values already in `data.ts`: `noun`, `verb`, `adjective`, `phrase`, `noun phrase`, `phrasal verb`, `idiom`. Shown in brackets after the word in trivia and on cards.

### `definition` (definition mode)

- English, one sentence, C1-appropriate but clear (dictionary style, lowercase start, no trailing period needed — match existing entries)
- Must uniquely identify the word among the topic's other words — definitions are used as multiple-choice options and True/False statements, so two near-identical definitions make questions unanswerable

### `translation` (translation mode)

- Natural, modern Ukrainian; variants separated by ` / ` (e.g., `"мати вплив / впливати"`)
- Translate whole phrases naturally, not word-for-word

### `example` (required, both modes)

Used by the "Complete the sentence" trivia type and shown on the flash card.

**Rules:**
1. Exactly ONE `___` placeholder for the target word/phrase
2. The sentence must be grammatically correct when `___` is replaced by the word — use modal verbs or `to`-infinitives so base forms fit: `"It is easy to ___ when you are surrounded by curious, enthusiastic people."`
3. C1 register: professional/academic contexts (business, leadership, technology), richer sentence structure than B1
4. The context must make the word guessable but not trivially obvious
5. Adapt the teacher's own example sentences to the `___` format when she provides them

---

## Step 3 — Determine topic metadata

**Before choosing an `id`, read the `TOPICS` array in `src/c1-flashcards/data.ts` and list every existing `id` — the new one must not collide.** Do not rely on a memorised list.

```
id          → short kebab-case slug (e.g., "ceo-communication")
title       → descriptive title (e.g., "Leadership & Equality")
icon        → single emoji fitting the theme (💡 innovation, 🚀 growth,
              👥 leadership, ✍️ writing, 📈 business, 🌍 global)
description → one phrase, 5–10 words, shown on the topic card
triviaUrl   → "/c1-trivia/?topic=<id>" — must match id exactly
```

---

## Step 4 — Write the topic entry

Read the current end of `src/c1-flashcards/data.ts` first so you know exactly where to insert. Append before the closing `];` of the `TOPICS` array:

```ts
  {
    id: "<id>",
    title: "<title>",
    description: "<description>",
    icon: "<icon>",
    triviaUrl: "/c1-trivia/?topic=<id>",
    words: [
      { word: "…", partOfSpeech: "…", definition: "…", example: "… ___ …" },
      // one entry per word — use `translation:` instead of `definition:` in translation mode
    ],
  },
```

---

## Step 5 — Update CLAUDE.md

Read `CLAUDE.md` and add the new topic to **both** tables under "Direct topic links":

**C1 Flash Cards table:**
```
| <title> | https://app.englishpusher.in.ua/c1-flashcards/?topic=<id> |
```

**C1 Vocabulary Trivia table:**
```
| <title> | https://app.englishpusher.in.ua/c1-trivia/?topic=<id> |
```

---

## Step 6 — Quality checklist (BEFORE deploying)

- [ ] Every word has `definition` or `translation` (one mode per topic, never neither)
- [ ] Every `example` contains exactly one `___`
- [ ] Replacing `___` with the word produces a grammatical sentence
- [ ] Definitions are distinct enough to work as multiple-choice options
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
       { "word": "<word>", "meaning": "<translation or definition>" }
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
- Topic title, ID, word count, mode (definition or translation)
- Direct links for sharing:
  - Flash Cards: `https://app.englishpusher.in.ua/c1-flashcards/?topic=<id>`
  - Trivia: `https://app.englishpusher.in.ua/c1-trivia/?topic=<id>`
- The full word list with meanings, so the teacher can verify

---

## Common mistakes

| Mistake | Consequence |
|---|---|
| Word with neither `definition` nor `translation` | Blank card back and blank trivia questions |
| Mixing modes inside one topic | Card backs alternate English/Ukrainian — confusing for students |
| Example without `___` or with two `___` | Fill-blank trivia renders a broken sentence |
| Near-duplicate definitions in one topic | Multiple-choice questions have two "correct" answers |
| Reusing or renaming an `id` | `?topic=` deep links break or open the wrong topic |
| Forgetting CLAUDE.md tables | Teacher has no link to share |
