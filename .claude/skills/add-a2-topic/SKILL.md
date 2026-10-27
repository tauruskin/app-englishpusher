---
name: add-a2-topic
description: Use when the user wants to add a new A2 or A2+ vocabulary topic to the Englishpusher app — e.g. shares a list of everyday English words or phrases (as text, photo, screenshot, or CSV) and says "add A2 topic", "new A2+ topic", "A2 words", or names an A2 / A2+ lesson (Speakout A2.1, A2.2, A2+).
---

# Add A2 / A2+ Vocabulary Topic

Adds a vocabulary topic to the App's **A2** or **A2+** level. The level's data file feeds both its Flashcards and its Trivia page (the shared level pages in `src/levels/`), so words are written once.

## Step 0 — Pick the level

The level is named in the request (when the skill is run as a command, it is the first argument). Read the whole token: `A2+`, `A2plus` and `A2 plus` mean **A2+**; a plain `A2` (also written with a lesson number, like `A2.1` or `A2.2`) means **A2**.

- If the request names neither and you are in an interactive session: ask "A2 or A2+?" before doing anything else.
- If the request names neither and `APP_TOPIC_HEADLESS=1` is set: change no file, do not write `.topic-summary.json`, and stop (the bridge then reports that no summary was written).

| | A2 | A2+ |
|---|---|---|
| Data file — the ONLY file with word data | `src/a2-flashcards/data.ts` | `src/a2plus-flashcards/data.ts` |
| `triviaUrl` | `/a2-trivia/?topic=<id>` | `/a2plus-trivia/?topic=<id>` |
| Flashcards link | `https://app.englishpusher.in.ua/a2-flashcards/?topic=<id>` | `https://app.englishpusher.in.ua/a2plus-flashcards/?topic=<id>` |
| Trivia link | `https://app.englishpusher.in.ua/a2-trivia/?topic=<id>` | `https://app.englishpusher.in.ua/a2plus-trivia/?topic=<id>` |
| `CLAUDE.md` tables | **A2 Vocabulary Cards**, **A2 Vocabulary Trivia** | **A2+ Vocabulary Cards**, **A2+ Vocabulary Trivia** |

URLs always use `a2plus`, never `a2+`. Never write A2 / A2+ words into `src/b1-flashcards/data.ts`. A `triviaUrl` that points at another level sends students to the wrong quiz; `src/levels/data.test.ts` fails on it.

## Word and Topic shapes (`src/levels/types.ts`)

```ts
interface Word {
  word: string;           // English word or phrase
  translation: string;    // Ukrainian translation
  example: string;        // Sentence with ___ as placeholder for the word
  transcription?: string; // IPA — include for single words and short phrases
  similar?: string[];     // near-synonyms in this topic — trivia never offers them as wrong options for this word
}

interface Topic {
  id: string;             // kebab-case, stable — NEVER rename after publishing
  title: string;          // "Lesson N: Short Title" if a lesson number is given
  icon: string;           // single emoji representing the topic
  description: string;    // one-line description for the topic card
  words: Word[];
  triviaUrl: string;      // "/a2-trivia/?topic=<id>" or "/a2plus-trivia/?topic=<id>" (Step 0 table)
}
```

---

## Step 1 — Parse the word list

Accept any format the teacher provides: photo or screenshot of a table, plain text list, CSV / TSV, free-form notes. Extract the English word or phrase, a definition (if given) and an example sentence (if given). Fill in anything missing.

---

## Step 2 — Fill in translation, transcription, example

### Ukrainian translation (`translation`)

- Natural, modern Ukrainian.
- A2 and A2+ students need one clear meaning: give the most common one; add a second only when the word is really used both ways (`"кімната / номер"` for *room* in a hotel topic), separated by ` / `.
- Translate collocations as a whole (`"робити домашнє завдання"`, not word for word).

### IPA transcription (`transcription`)

- Include for single words and short phrases (up to about 5 words), wrapped in `/…/` (e.g. `"/ˈbrekfəst/"`).
- Omit for longer phrases.

### Example sentence (`example`)

The sentence is used in the "Fill in the sentence" trivia question.

**Rules (same as B1):**
1. Exactly ONE `___` per sentence, standing for the target word or phrase.
2. Replacing `___` with the word gives a grammatical sentence. Use the base form after `to` or a modal when the word is a verb phrase (`"We usually ___ at seven o'clock."`, `"You can ___ the bus to the city centre."`).
3. The sentence shows the meaning in context and is not trivially obvious.
4. Use the teacher's own example sentences for ideas; adapt them to the `___` format.

**A2 level:**
- Everyday, high-frequency topics: home, family, food, shopping, school, work, free time, travel, weather.
- 6–12 words. Present simple and continuous, past simple, `going to`, `can`, `have to`.
- Only the target word may be new to an A2 student: every other word in the sentence is basic.
- No idioms, no phrasal verbs unless the topic is about them.

**A2+ level:**
- Same topics, a step up: 8–15 words.
- Also present perfect, comparatives and superlatives, `will`, `should`, first conditional, common phrasal verbs (`get up`, `look for`).
- Still no rare words besides the target word.

**Patterns:**
- Noun: `"I have tea with my ___ every morning."`
- Verb: `"My brother likes to ___ in the park on Sundays."`
- Adjective: `"The soup is very ___, so be careful."`
- Collocation: `"I usually ___ after dinner."` (word: `"do my homework"`)

---

## Step 3 — Determine topic metadata

**Before choosing an `id`, read the `TOPICS` array in the level's data file (Step 0 table) and list every existing `id` — the new one must not collide.** A2 and B1 topics may share an `id` (they live on different pages), but two topics of one level may not.

```
id          → kebab-case slug of the topic name (e.g., "food-and-drinks").
              For numbered lessons: "lesson-N-<slug>" (e.g., "lesson-3-daily-routine"). Short and stable.
title       → If the teacher gave a lesson number: "Lesson N: Short Description"
              Otherwise: a descriptive title (e.g., "Food and Drinks")
icon        → One emoji: 🍎 food  🏠 home  👨‍👩‍👧 family  🛒 shopping  🏫 school  💼 work
              ⚽ free time  ✈️ travel  ☀️ weather  🗓️ daily routine
description → 5–10 words, shown under the title (e.g., "Everyday words for meals and drinks")
```

---

## Step 4 — Write the topic entry

Read the level's data file first.

- **First topic of the level:** the file contains `export const TOPICS: Topic[] = [];`. Replace `[]` with an array holding the new topic:

  ```ts
  export const TOPICS: Topic[] = [
    {
      id: "<id>",
      …
    },
  ];
  ```

- **Otherwise:** append the new topic before the closing `];` of `TOPICS`.

The topic block:

```ts
  {
    id: "<id>",
    title: "<title>",
    icon: "<icon>",
    description: "<description>",
    triviaUrl: "/a2-trivia/?topic=<id>", // A2+: "/a2plus-trivia/?topic=<id>"
    words: [
      { word: "…", translation: "…", transcription: "/…/", example: "… ___ …" },
      // one entry per word
    ],
  },
```

Publishing the first topic of a level is what switches that level on in the App: its hub card stops saying "Coming soon" and moves to the front. Nothing else needs changing.

---

## Step 5 — Update CLAUDE.md

In `CLAUDE.md`, under "Direct topic links", add one row to **each** of the level's two tables (Step 0 table):

```
| <title> | https://app.englishpusher.in.ua/a2-flashcards/?topic=<id> |
```

```
| <title> | https://app.englishpusher.in.ua/a2-trivia/?topic=<id> |
```

For A2+ use `a2plus-flashcards` and `a2plus-trivia`.

---

## Step 6 — Quality checklist (before Step 7)

- [ ] The words went into the level's own data file (Step 0 table), nowhere else
- [ ] Every `example` contains exactly one `___`
- [ ] Replacing `___` with the word gives a grammatical sentence at the level's difficulty (Step 2)
- [ ] **Each example fits ONLY its own word.** Trivia shows the sentence with 3 random other words from the same topic. Try every other word of the topic in the blank. If another word also fits, rewrite the sentence with a clear clue (a fixed phrase, a collocation, `a`/`an`, a number). If two words are true synonyms that no sentence can separate, add `similar: ["other word"]` to one of them
- [ ] `triviaUrl` is exactly the level's pattern with this `id`
- [ ] `id` is unique within the level's `TOPICS`
- [ ] `npm test` passes (it includes `src/levels/data.test.ts`)
- [ ] `npm run build` passes (exit 0)
- [ ] If a check fails and you cannot fix it: in headless mode do NOT write `.topic-summary.json` (the bridge then reports the build as failed); in interactive mode tell the user what failed
- [ ] `CLAUDE.md` has both new links

---

## Step 7 — Finish

**Headless mode (orchestrator bridge):** if the environment variable `APP_TOPIC_HEADLESS=1` is set, do not deploy, commit or push. Instead:

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
   Include 3–5 entries in `sampleWords`, picked to represent the topic.
2. Leave the working tree as it is (uncommitted). The caller handles branching, committing and pushing.
3. Stop here. Do not run Step 8.

**Interactive mode (normal Claude Code session):** do **not** run `npm run deploy` (it would publish without a commit on `main`, and the next GitHub Actions deploy would remove the topic again). Instead:

```bash
git fetch origin
git switch -c app-topic/<a2 or a2plus>-<id> origin/main   # your uncommitted topic changes come along
git add src/a2-flashcards/data.ts CLAUDE.md   # A2+: src/a2plus-flashcards/data.ts
git commit -m "feat: add <A2 or A2+> topic '<title>'"
git push -u origin app-topic/<a2 or a2plus>-<id>
```

If that branch name already exists, add `-2` to it.

Then give the user the link `https://github.com/tauruskin/app-englishpusher/compare/main...app-topic/<a2 or a2plus>-<id>?expand=1`. Merging the pull request deploys the App (GitHub Actions, about 2 minutes). Never merge it yourself.

---

## Step 8 — Report (interactive mode only)

Show:
- Level, topic title, ID, word count
- Links for sharing once merged: Flashcards and Trivia (Step 0 table)
- The full word list with translations, so the teacher can check it

---

## Common mistakes

| Mistake | Consequence |
|---|---|
| Words written into `src/b1-flashcards/data.ts` | They show up as B1 words; A2 stays "Coming soon" |
| `triviaUrl` with `b1-trivia` or `a2+` | Students land in another level's quiz or on a broken link; `npm test` fails |
| Example without `___` | Trivia silently falls back to a translation question |
| Two `___` in one example | Only the first is replaced; the sentence renders broken |
| B1-style sentences for A2 (long, rare words) | Students cannot understand the clue, so the question tests reading, not the word |
| Reusing an `id` within the level | `?topic=` links open the wrong topic |
| Renaming an `id` after publishing | The teacher's shared links break |
| Forgetting the `CLAUDE.md` rows | The teacher has no link to share |
