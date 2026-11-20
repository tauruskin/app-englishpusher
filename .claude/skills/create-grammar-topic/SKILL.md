---
name: create-grammar-topic
description: Create a new grammar topic (25 interactive exercises) for a level's grammar page in the Englishpusher App (`/<level>-grammar/`), register it and validate it. Use this whenever the user pastes a photo or scan of a textbook page (Speakout) and wants exercises made from it, names a grammar point ("let's add conditionals", "make a topic for used to"), mentions a lesson number from the book, or asks for a new topic, more questions, a new test, or more practice material for the grammar app — even if they never say the word "topic". If an image of a book page appears with little or no accompanying text, assume they want a full topic built from it.
---

# Create a Grammar Topic

Build a complete 25-question grammar topic for the Englishpusher App (React/TypeScript SPA, live at
`https://app.englishpusher.in.ua/<slug>-grammar/`), from source material to a registered, validated topic.

**Project root:** this repo root (the folder with `package.json`). All paths below are relative to it.

**Source of truth:** `src/grammar/types.ts`. If CLAUDE.md or older docs disagree with it, trust
`types.ts` — in particular, older docs still describe a `sentence-reorder` type and a
`title`/`questions` topic shape. Both are gone. **Never create `sentence-reorder` questions**;
the type was removed from the app entirely.

**Gold-standard examples:** `src/grammar/topics/stative-dynamic-verbs.ts` (standard mix, shows the
verification-comment technique) and `src/grammar/topics/starting-ending-conversations.ts`
(includes sentence-match). Skim one before writing.

## Level

The topic's level is one of `A2, A2+, B1, B1+, B2+, C1` (`src/grammar/levels.ts`; URL slugs
`a2, a2plus, b1, b1plus, b2plus, c1`). In headless mode it is in the environment variable
`GRAMMAR_TOPIC_LEVEL` and in the prompt; in an interactive session ask if it was not given. Write the
content for that level (the Speakout <level> textbook). Wherever this skill says "B1", it means
"the topic's level".

## Source material

Topics almost always come from a **photo of a Speakout textbook page** (the topic's level). The content must match
that curriculum — the user teaches these exact pages in class. From the image, extract:

- the grammar rules and their exact framing (the way the book explains it is the way students saw it)
- the example sentences (reuse their vocabulary and situations; write fresh sentences in the same spirit)
- the lesson number if visible — goes into the topic's `lesson` field ("Lesson 4"). If no lesson
  number is available, omit the field; the user adds them later from the book.

If the user only names a grammar point with no image, build the topic from the standard
treatment of that point at the topic's level and say so.

## Workflow

1. Pick a kebab-case topic id (e.g. `stative-dynamic-verbs`) and a short question-id prefix (e.g. `sdv`).
   The id must match `^[a-z0-9-]{1,80}$`, every question id `^[A-Za-z0-9_-]{1,80}$`, and the topic id
   must not already exist in the registry (the database checks refuse anything else).
2. Write `src/grammar/topics/<topic-id>.ts` with 25 questions (mix below), an `icon` and 6-10 rule
   `cards` (see "Rule cards").
3. Register it in `src/grammar/topics/index.ts` — add the import (with the `.ts` extension) and append
   to the `topics` array. The level page lists it automatically
   (`/<slug>-grammar/?topic=<topic-id>`).
4. Validate: `npx vitest run src/grammar/topics/topics-validation.vitest.ts`, then
   `node --test src/grammar/topics/plain-node.test.ts`, then `npx tsc -p tsconfig.app.json --noEmit`.
   The first covers every registered topic automatically (unique ids, one `___` per blank,
   error-spot index matches the wrong word, options consistent, etc.) and now also the cards and
   the icon (card count, unique card ids, one `___` per card, Ukrainian by level, no card sentence
   equal to a test question). Fix everything they flag — fix every card error too.
5. Commit on a branch and open a pull request **(interactive mode only)**. **Never** run
   `npm run deploy` and never push to `main` — the App deploys from `main` through GitHub Actions
   after a merge. In headless mode, skip this step — see "Headless mode" below.

## Headless mode (orchestrator bridge)

If the environment variable `GRAMMAR_TOPIC_HEADLESS=1` is set, Step 5 above is replaced
with:

1. Write `.topic-summary.json` at the repo root (the folder with `package.json`) with exactly these fields:
   ```json
   {
     "id": "<topic-id>",
     "title": "<name>",
     "level": "<A2|A2+|B1|B1+|B2+|C1>",
     "lesson": "<Lesson N>",
     "questionCount": <number>
   }
   ```
   Omit `lesson` if the topic has no lesson number.
2. Write the preview to `docs/grammar-previews/<topic-id>.html` (create the folder if needed) — a static, read-only page for the teacher to
   review before approving. No JavaScript, no interactivity (this is not a mini version of the
   app). Group questions in this order: Gap Fill, Error Spot, Multiple Choice, Word Transform,
   then a final Flashcards section with one block per rule card (the topic icon goes next to the
   topic name in the header).
   For each question show only the sentence (blank/error visually marked), the correct answer,
   and the `tip` — omit the distractor `options`, `explanation`, and `difficulty`. Use this
   template, filling in the real content already written into `src/grammar/topics/<id>.ts` moments
   ago (don't regenerate content, just reformat it) — repeat the `.question` block once per
   question in each section, and omit the `<div class="meta">` lesson segment entirely if the
   topic has no `lesson` field:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>REPLACE WITH TOPIC NAME — Preview</title>
   <style>
     body { font-family: -apple-system, "Segoe UI", Roboto, sans-serif; max-width: 700px;
       margin: 0 auto; padding: 16px; background: #fdf6ec; color: #2b2b2b; line-height: 1.5; }
     h1 { color: #c0392b; font-size: 1.4rem; margin-bottom: 4px; }
     .meta { color: #6b6b6b; font-size: 0.9rem; margin-bottom: 24px; }
     h2 { color: #e67e22; font-size: 1.1rem; border-bottom: 2px solid #e67e22;
       padding-bottom: 4px; margin-top: 32px; }
     .question { background: #fff; border-radius: 8px; padding: 12px 16px; margin: 12px 0;
       box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
     .sentence { margin: 0 0 8px; }
     .blank, .wrong { color: #c0392b; font-weight: bold; text-decoration: underline; }
     .answer { color: #27ae60; font-weight: bold; }
     .tip { color: #6b6b6b; font-size: 0.9rem; margin-top: 8px; }
     .tip::before { content: "💡 "; }
   </style>
   </head>
   <body>
   <h1>REPLACE WITH THE TOPIC ICON EMOJI and TOPIC NAME</h1>
   <div class="meta">REPLACE WITH "Lesson N — " IF PRESENT, ELSE OMIT THIS DIV ENTIRELY<!--
     -->REPLACE WITH QUESTION COUNT questions · REPLACE WITH CARD COUNT cards</div>

   <h2>Gap Fill</h2>
   <div class="question">
     <p class="sentence">I <span class="blank">___</span> to the gym every morning.</p>
     <p>Answer: <span class="answer">go</span></p>
     <p class="tip">Present simple for daily routines.</p>
   </div>
   <!-- repeat this .question block once per gap-fill question -->

   <h2>Error Spot</h2>
   <div class="question">
     <p class="sentence">She <span class="wrong">knowing</span> French and Italian.</p>
     <p>Correction: <span class="answer">knows</span></p>
     <p class="tip">...</p>
   </div>
   <!-- repeat this .question block once per error-spot question -->

   <h2>Multiple Choice</h2>
   <div class="question">
     <p class="sentence">REPLACE WITH question prompt</p>
     <p>Answer: <span class="answer">REPLACE WITH correctOption</span></p>
     <p class="tip">...</p>
   </div>
   <!-- repeat this .question block once per multiple-choice question -->

   <h2>Word Transform</h2>
   <div class="question">
     <p class="sentence">By next year, she <span class="blank">___</span> (finish) her degree.</p>
     <p>Answer: <span class="answer">will have finished</span></p>
     <p class="tip">...</p>
   </div>
   <!-- repeat this .question block once per word-transform question -->

   <h2>Flashcards</h2>
   <div class="question">
     <p class="sentence"><strong>REPLACE WITH rule</strong></p>
     <p class="sentence">REPLACE WITH example, with the ___ as <span class="blank">___</span></p>
     <p>Back: REPLACE WITH the full sentence (without the bracket hint), answer as <span class="answer">answer</span></p>
     <p class="tip">REPLACE WITH explanation</p>
     <p>REPLACE WITH examples[0] · REPLACE WITH examples[1]</p>
     <p>REPLACE WITH ua (omit this line when there is no ua)</p>
   </div>
   <!-- repeat this .question block once per card -->

   </body>
   </html>
   ```
3. Leave the working tree as-is (uncommitted) — the caller (the orchestrator bridge) handles
   branching, committing, and pushing.
4. Stop here.

Step 4 (validation) still runs unconditionally before this branch — headless mode must not skip it.

## Question mix

25 questions: **6 gap-fill, 6 error-spot, 7 multiple-choice, 6 word-transform.**

For topics about functional language / fixed phrases (conversations, apologies) rather than verb
grammar, you may add **2 sentence-match** questions on top (27 total) — matching beginnings to
endings suits fixed phrases well.

Difficulty per type block: start with 1–2 `beginner`, mostly `intermediate`, end with 1 `advanced`.
Question ids: `<prefix>-gap-1`, `<prefix>-error-1`, `<prefix>-mc-1`, `<prefix>-wt-1`, `<prefix>-match-1`.

Every question needs: `id`, `topic` (= topic id), `type`, `difficulty`, `sentence`, `grammarRule`
(short rule title — the end screen groups results by it), `explanation` (why the answer is right —
shown after answering), `tip` (a memorable rule of thumb the student can carry away).

## Per-type rules — the gotchas that caused real bugs

### gap-fill
- The sentence must contain **exactly ONE `___`**. The renderer splits on `___`, so two blanks
  render the same answer twice (a real shipped bug).
- 4 distinct `options`, `correctAnswer` among them, `correctOptionIndex` pointing at it.
  Options are shuffled at render time, so their order in the file doesn't matter.
- `gapIndex` = index of the blank in `sentence.split(" ")`. (The renderer doesn't read it, but keep it right.)

### error-spot
The strictest type. Every error is **exactly one word**, and replacing `wrongWord` with
`correction` must produce a 100% grammatically correct sentence — no leftover second error.

Verify each index by writing the split as a comment above the question, exactly like the
existing topics do:

```typescript
// split(" ") → [0=She, 1=knowing, 2=French, 3=and, 4=Italian.]
// words[1]="knowing" ✅  corrected: "She knows French and Italian." ✅
```

`errorWordIndex` counts tokens of `sentence.split(" ")` — punctuation sticks to its word.
Give 4 `correctionOptions` including the correction; `reason` states the fix in one sentence.

### multiple-choice
- `question` is the actual prompt; `sentence` carries the framing ("Choose the sentence that…").
- 4 distinct `options`, `correctOption` must match one of them **character for character**.
- `optionExplanations` (one per option — why it's right/wrong) keyed by the full option text.

### word-transform
The classic "put the verb in brackets into the correct form". The UI shows the sentence with the
blank, the `baseWord` as an orange hint, and a free text input.

- Sentence contains exactly one `___`; `baseWord` is the infinitive; `correctAnswer` the target form.
- The engine already normalizes case, whitespace, apostrophe variants, and contracted 'be' forms
  (`'re`→are, `'m`→am, `'s`→is) — **don't** add contractions as alternatives.
- **Do** add `alternativeAnswers` for genuine spelling variants (British/American:
  `travelling`/`traveling`) or equally correct forms.

### sentence-match
- 4 `pairs` of `{ beginning, ending }`. Each beginning must match **exactly one** ending —
  check that no ending could plausibly complete a different beginning, or the question is ambiguous.

## Content quality

Written for **adult learners at the topic's level**. Natural, everyday adult situations (work, travel, family,
appointments) — not childish or textbook-stilted. Wrong options should be the errors learners at that level
actually make (wrong tense, missing -s, -ing on a stative verb), not random words. Explanations
teach the rule, not just "correct!". Keep sentences short enough to scan on a phone.

## Rule cards

Besides the 25 questions, every topic has an `icon` (one emoji) and **6-10 rule `cards`** — flashcards
the student flips to review the rules. Type (`src/grammar/types.ts`):

```ts
export interface RuleCard {
  id: string;                  // unique within the topic, e.g. "mod-card-1"
  rule: string;                // front title, e.g. "quite + adjective"
  example: string;             // front sentence with exactly one ___
  answer: string;              // fills the ___; the back shows the full sentence
  explanation: string;         // English, 1-3 short sentences
  examples: [string, string];  // two more full example sentences
  ua?: string;                 // Ukrainian: A2/A2+ full explanation, B1/B1+ one short line, B2+/C1 none
}
```

Rules:

- **Cards teach exactly the rules the 25 questions test** — one rule per card, simplest first.
- Ids are `<prefix>-card-N` (same prefix as the questions); they must be unique across all topics.
- The card goes between `lesson` (or `description`) and `rules` in the topic object.
- **Ukrainian (`ua`) by level:**
  - A2 / A2+: a full explanation of the rule in natural Ukrainian, up to ~3 sentences, at most 400 characters.
  - B1 / B1+: one short line, at most 120 characters — a translation of the key word or a contrast with Ukrainian.
  - B2+ / C1: no `ua` field at all.
  - Natural Ukrainian, no Russianisms; use « » quotes for translations and quoted words.
- **Never copy or lightly edit a test sentence.** Cards must not give away answers; the validator rejects
  a card sentence (`example`, `examples`, or the filled-in example) equal to a test question sentence.
- **Every gap must have exactly one correct answer in context** (students argue). Add enough context,
  and for verb forms put the base verb in brackets after the gap: `I really enjoy ___ (cook)` — the app
  hides the bracket hint on the card back. If the rule's key words are interchangeable (quite / fairly /
  pretty), gap a structural part of the pattern instead (the article, `to`, the verb form), not the
  interchangeable word.
- When the key word has near-synonyms, put the choice in brackets after the gap, e.g.
  `___ (quite / very)`; the app hides the bracket on the card back.
- Adult everyday situations, like the questions.
- `icon` = one simple emoji pictograph (no flags, no keycaps), e.g. `"📏"`.

## File skeleton

```typescript
import type { GrammarQuestion, GrammarTopic } from "../types.ts";

export const myTopicQuestions: GrammarQuestion[] = [
  // ===== GAP FILL (6) =====
  // ...
];

export const myTopicTopic: GrammarTopic = {
  id: "my-topic",
  level: "A2+",              // the topic's level
  name: "My Topic",          // 1-120 characters
  description: "One or two sentences shown on the level page card.",
  lesson: "Lesson 4",        // omit if there is no lesson number
  icon: "📏",                // one emoji
  cards: [                   // 6-10 rule cards, between lesson and rules
    {
      id: "mt-card-1",
      rule: "quite + adjective",
      example: "The hotel was ___ (quite / very) nice: not bad, but not great either.",
      answer: "quite",
      explanation: "Quite makes an adjective weaker than very. Something is true, but not strongly.",
      examples: ["The hotel was quite small, but the rooms were clean.", "My new neighbours seem quite friendly."],
      ua: "quite ≈ «досить» (слабше, ніж very): quite small — «досить маленький».",
    },
    // ...
  ],
  rules: myTopicQuestions,   // the field is `rules`, not `questions`
};
```

## After publishing

**Interactive mode only.** The user often wants the same content or feature mirrored in their other Englishpusher apps
(trivia, vocabulary). After finishing, offer to prepare a paste-ready prompt for those projects —
without being asked.
