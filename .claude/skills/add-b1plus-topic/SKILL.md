---
name: add-b1plus-topic
description: Use when the user wants to add a new B1+ vocabulary topic to the Englishpusher app — e.g. shares a list of English words, phrases, or collocations (as text, photo, screenshot, or CSV) and says "add B1+ topic", "new B1+ lesson", "B1+ words", or names a Speakout B1+ lesson.
---

# Add B1+ Vocabulary Topic

Adds a new vocabulary topic to the Englishpusher **B1+** level. One data file feeds Flashcards (`/b1plus-flashcards/`), Trivia (`/b1plus-trivia/`) and the B1+ Vocabulary page — no duplication needed. B1+ sits between B1 and C1; while its `TOPICS` list is empty, the App shows it as "Coming soon".

B1+ is not connected to @Englishpusher_bot or the Moodle "Practise more" card yet (planned later), so topics are added from Claude Code.

## Single source of truth

`src/b1plus-flashcards/data.ts` is the ONLY file that needs word data. The shared level pages in `src/levels/` read `TOPICS` from it through the B1+ level config (`src/b1plus-flashcards/level.ts`). Never copy words elsewhere, and never write B1+ words into `src/b1-flashcards/data.ts`.

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
  triviaUrl: string;      // always "/b1plus-trivia/?topic=<id>" (never "b1+" in a URL)
}
```

---

## Step 1 — Parse the wordlist

Accept any format the teacher provides: photo or screenshot of a table, plain text list, CSV / TSV, free-form notes. Extract the English word or phrase, a definition (if given) and an example sentence (if given). Fill in anything missing.

Use a dictionary form for `word` (base verb, singular noun) unless the item is a fixed form. Avoid slashes and "sth" inside `word` when it is used in a sentence: pick the form that reads naturally and mention the other in the translation (`"підключити до розетки (= plug something in)"`).

---

## Step 2 — Fill in translations, transcription, example

### Ukrainian translation (`translation`)

- Natural, modern Ukrainian — not overly literary.
- For multi-meaning words, include the most common meanings separated by ` / `.
- Translate collocations and idioms as a whole, not word for word.

### IPA transcription (`transcription`)

- Include for single words and short phrases (up to ~5 words), wrapped in `/…/`.
- British English (`/bɔːd/`, not `/bɔːrd/`). Omit for longer phrases.

### Example sentence (`example`)

The sentence is used in the "Fill in the sentence" trivia question.

1. Exactly ONE `___` per sentence, standing for the target word or phrase.
2. Replacing `___` with the word gives a grammatical sentence (use the base form after `to` or a modal for verb phrases).
3. The sentence shows the meaning in context and is not trivially obvious.
4. **B1+ level:** natural sentences of about 10–20 words, any tense, a clear context; no rare words besides the target.
5. Use the teacher's own example sentences for ideas; adapt them to the `___` format.

---

## Step 3 — Determine topic metadata

**Before choosing an `id`, read the `TOPICS` array in `src/b1plus-flashcards/data.ts` and list every existing `id` — the new one must not collide.** B1+ and B1 topics may share an `id` (they live on different pages).

```
id          → kebab-case slug of the topic name; for numbered lessons "lesson-N-<slug>"
title       → "Lesson N: Short Description" if a lesson number is given, otherwise descriptive
icon        → one emoji that fits the topic
description → one phrase, 5–10 words, shown under the title on the card
```

---

## Step 4 — Write the topic entry

Read the level's data file first. While it is empty it contains `export const TOPICS: Topic[] = [];` — replace `[]` with an array holding the new topic. Otherwise append before the closing `];` of `TOPICS`:

```ts
  {
    id: "<id>",
    title: "<title>",
    icon: "<icon>",
    description: "<description>",
    triviaUrl: "/b1plus-trivia/?topic=<id>",
    words: [
      { word: "…", translation: "…", transcription: "/…/", example: "… ___ …" },
      // one entry per word
    ],
  },
```

Publishing the first topic is what switches B1+ on in the App: its hub card stops saying "Coming soon" and moves between B1 and C1. Nothing else needs changing.

---

## Step 5 — Update CLAUDE.md

Add one row to **each** of the two B1+ tables under "Direct topic links" (**B1+ Vocabulary Cards** and **B1+ Vocabulary Trivia**):

```
| <title> | https://app.englishpusher.in.ua/b1plus-flashcards/?topic=<id> |
| <title> | https://app.englishpusher.in.ua/b1plus-trivia/?topic=<id> |
```

---

## Step 6 — Quality checklist

- [ ] The words went into `src/b1plus-flashcards/data.ts`, nowhere else
- [ ] Every `example` contains exactly one `___`
- [ ] Replacing `___` with the word gives a grammatical B1+ sentence
- [ ] **Each example fits ONLY its own word.** Trivia shows the sentence with 3 random other words from the same topic. Try every other word of the topic in the blank. If another word also fits, rewrite the sentence with a clear clue (a fixed phrase, a collocation, grammar, a number). If two words are true synonyms that no sentence can separate, add `similar: ["other word"]`
- [ ] `triviaUrl` is exactly `/b1plus-trivia/?topic=<id>`
- [ ] `id` is unique within the B1+ `TOPICS`
- [ ] `npm test` passes (it includes `src/levels/data.test.ts`)
- [ ] `npm run build` passes (exit 0)
- [ ] `CLAUDE.md` has both new links

---

## Step 7 — Finish

**Headless mode:** if the environment variable `APP_TOPIC_HEADLESS=1` is set, do not deploy, commit or push. Write `.topic-summary.json` at the repo root (`id`, `title`, `wordCount`, `sampleWords` with 3–5 `{ "word", "meaning" }` entries), leave the working tree uncommitted and stop.

**Interactive mode:** do **not** run `npm run deploy` (it would publish without a commit on `main`, and the next GitHub Actions deploy would remove the topic again). Instead:

```bash
git fetch origin
git switch -c app-topic/b1plus-<id> origin/main   # your uncommitted topic changes come along
git add src/b1plus-flashcards/data.ts CLAUDE.md
git commit -m "feat: add B1+ topic '<title>'"
git push -u origin app-topic/b1plus-<id>
```

If that branch name already exists, add `-2` to it. Then give the user the link `https://github.com/tauruskin/app-englishpusher/compare/main...app-topic/b1plus-<id>?expand=1`. Merging the pull request deploys the App (GitHub Actions, about 2 minutes). Never merge it yourself.

Show: topic title, ID, word count; the Flashcards and Trivia links (`https://app.englishpusher.in.ua/b1plus-flashcards/?topic=<id>`, `https://app.englishpusher.in.ua/b1plus-trivia/?topic=<id>`); the full word list with translations so the teacher can check it.

---

## Common mistakes

| Mistake | Consequence |
|---|---|
| Words written into `src/b1-flashcards/data.ts` | They show up as B1 words; B1+ stays "Coming soon" |
| `triviaUrl` with `b1-trivia` or `b1+` | Students land in another level's quiz or on a broken link; `npm test` fails |
| Example without `___` | Trivia silently falls back to a translation question |
| Two `___` in one example | Only the first is replaced; the sentence renders broken |
| Reusing an `id` within the level | `?topic=` links open the wrong topic |
| Renaming an `id` after publishing | The teacher's shared links break |
| Forgetting the `CLAUDE.md` rows | The teacher has no link to share |
