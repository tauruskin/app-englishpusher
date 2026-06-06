# Flashcard: Example on Front + Reverse Mode — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move example sentences to the front face of flashcards (both B1 and C1), simplify the back to show only the translation/definition, and add a Reverse Mode toggle that swaps card sides so students practise from translation → word.

**Architecture:** Approach A — single `FlashCard` component per app with a `reversed: boolean` prop added alongside the existing `isFlipped` prop. The four card faces (normal-front, normal-back, reversed-front, reversed-back) are four sibling JSX blocks conditionally rendered by `{!isFlipped && !reversed && …}` guards, avoiding nested ternaries. State lives in `App`; `FlashCard` is a pure renderer.

**Tech Stack:** React 18, TypeScript, Tailwind CSS 3, motion/react (AnimatePresence), lucide-react (ArrowLeftRight icon already available at v0.469)

---

## Files changed

| File | Change |
|---|---|
| `src/b1-flashcards/App.tsx` | Rewrite `FlashCard` component; add `reversed` state to `App`; add toggle button |
| `src/c1-flashcards/App.tsx` | Same pattern, C1 colours and definition/translation logic |

No other files change. No data file changes. No new dependencies.

---

## Task 1: B1 Flashcard — complete FlashCard + App update

**Files:**
- Modify: `src/b1-flashcards/App.tsx`

### Step 1: Add `ArrowLeftRight` to the lucide-react import

In `src/b1-flashcards/App.tsx`, line 3, change:

```tsx
import { Volume2, RotateCcw, Zap } from "lucide-react";
```

to:

```tsx
import { Volume2, RotateCcw, Zap, ArrowLeftRight } from "lucide-react";
```

### Step 2: Replace the `FlashCard` component entirely

Replace the entire `FlashCard` function (lines 154–259 in the original) with the following. This replaces the existing front/back ternary with four sibling blocks, moves the example to the normal front, simplifies the normal back, and adds reversed-front and reversed-back faces.

```tsx
function FlashCard({
  word,
  index,
  isFlipped,
  reversed,
  onFlip,
}: {
  word: B1Word;
  index: number;
  isFlipped: boolean;
  reversed: boolean;
  onFlip: () => void;
}) {
  const borderColors: [string, string, string] = isFlipped
    ? ["#1e3a5f", "#0ea5e9", "#0284c7"]
    : ["#78350f", "#f97316", "#f07c1a"];

  const exampleParts = word.example.split("___");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${index}-${isFlipped ? "back" : "front"}-${reversed ? "r" : "n"}`}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full"
      >
        <GradientBorder colors={borderColors}>
          {!isFlipped && !reversed && (
            /* Normal front: word + transcription + example */
            <div className="flex flex-col items-center gap-5 px-4 md:px-8 py-8 min-h-72 justify-between">
              <div className="self-end">
                <SpeakerButton word={word.word} />
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="font-display text-[2.4rem] md:text-5xl font-bold text-neutral-900 leading-tight">
                  {word.word}
                </h2>
                {word.transcription && (
                  <span className="font-mono text-neutral-400 tracking-wide" style={{ fontSize: "1.4rem" }}>
                    {word.transcription}
                  </span>
                )}
                <p className="text-neutral-600 text-sm leading-relaxed italic mt-2">
                  {exampleParts[0]}
                  <strong className="text-neutral-800 not-italic">{word.word}</strong>
                  {exampleParts[1]}
                </p>
              </div>
              <button
                onClick={onFlip}
                className="rounded-xl bg-brand text-white font-display font-bold px-10 py-3.5 text-base hover:bg-brand/90 transition-colors shadow-sm"
              >
                See Translation
              </button>
            </div>
          )}

          {!isFlipped && reversed && (
            /* Reversed front: translation only, no speaker */
            <div className="flex flex-col items-center gap-5 px-4 md:px-8 py-8 min-h-72 justify-center">
              <div className="flex flex-col gap-1 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  Translation
                </p>
                <p className="font-display font-bold text-3xl text-neutral-900 leading-tight">
                  {word.translation}
                </p>
              </div>
              <button
                onClick={onFlip}
                className="rounded-xl bg-brand text-white font-display font-bold px-10 py-3.5 text-base hover:bg-brand/90 transition-colors shadow-sm"
              >
                See Word
              </button>
            </div>
          )}

          {isFlipped && !reversed && (
            /* Normal back: translation only */
            <div className="flex flex-col items-center gap-5 px-4 md:px-8 py-8 min-h-72 justify-center">
              <div className="flex flex-col gap-1 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  Translation
                </p>
                <p className="font-display font-bold text-2xl text-brand leading-tight">
                  {word.translation}
                </p>
              </div>
              <button
                onClick={onFlip}
                className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <RotateCcw size={13} />
                Show word
              </button>
            </div>
          )}

          {isFlipped && reversed && (
            /* Reversed back: word + transcription + example + speaker */
            <div className="flex flex-col gap-5 px-4 md:px-8 py-7 min-h-72 justify-between">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col min-w-0">
                  <span className="font-display font-bold text-xl text-neutral-900">
                    {word.word}
                  </span>
                  {word.transcription && (
                    <span className="font-mono text-xs text-neutral-400 tracking-wide">
                      {word.transcription}
                    </span>
                  )}
                </div>
                <SpeakerButton word={word.word} />
              </div>
              <div className="border-t border-neutral-100" />
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  Example
                </p>
                <p className="text-neutral-600 text-sm leading-relaxed italic">
                  {exampleParts[0]}
                  <strong className="text-neutral-800 not-italic">{word.word}</strong>
                  {exampleParts[1]}
                </p>
              </div>
              <button
                onClick={onFlip}
                className="self-center flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <RotateCcw size={13} />
                Show translation
              </button>
            </div>
          )}
        </GradientBorder>
      </motion.div>
    </AnimatePresence>
  );
}
```

### Step 3: Add `reversed` state to the `App` function

Inside `export default function App()`, after the existing state declarations, add:

```tsx
const [reversed, setReversed] = useState(false);
```

### Step 4: Reset `reversed` in `handleSelectTopic`

Add `setReversed(false);` to `handleSelectTopic`:

```tsx
function handleSelectTopic(t: Topic) {
  setTopic(t);
  setIndex(0);
  setIsFlipped(false);
  setReversed(false);
  setPhase("studying");
  history.replaceState(null, "", `?topic=${t.id}`);
}
```

### Step 5: Replace the topic label + progress row with label + progress + toggle

Find this block in the studying section:

```tsx
{/* Topic label + progress */}
<div className="flex items-center gap-3">
  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand shrink-0">
    {topic.icon} {topic.title}
  </span>
  <div className="flex-1">
    <ProgressBar current={index + 1} total={topic.words.length} />
  </div>
</div>
```

Replace it with:

```tsx
{/* Topic label + progress + reverse toggle */}
<div className="flex items-center gap-3">
  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand shrink-0">
    {topic.icon} {topic.title}
  </span>
  <div className="flex-1">
    <ProgressBar current={index + 1} total={topic.words.length} />
  </div>
  <button
    onClick={() => { setReversed(r => !r); setIsFlipped(false); }}
    title="Reverse mode"
    className={[
      "shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border-2 transition-all duration-200",
      reversed
        ? "bg-brand text-white border-brand"
        : "bg-white text-neutral-500 border-neutral-200 hover:border-brand/50 hover:text-brand",
    ].join(" ")}
  >
    <ArrowLeftRight size={12} />
    <span className="hidden sm:inline">Reverse</span>
  </button>
</div>
```

### Step 6: Pass `reversed` to `FlashCard`

Find the existing `<FlashCard …/>` call and add the `reversed` prop:

```tsx
<FlashCard
  word={topic.words[index]}
  index={index}
  isFlipped={isFlipped}
  reversed={reversed}
  onFlip={() => setIsFlipped((f) => !f)}
/>
```

### Step 7: Run the dev server and verify B1 manually

```
npm run dev
```

Open `http://localhost:5173/b1-flashcards/` and check:

- [ ] Front of card shows word + transcription + example sentence (word bolded)
- [ ] "See Translation" button flips to back; back shows only translation (orange, large) + "Show word" link
- [ ] "Show word" link flips back to front
- [ ] Clicking **Reverse** button highlights it orange; card now shows Ukrainian translation on front
- [ ] Flipping reversed card shows English word + transcription + example + speaker button
- [ ] "Show translation" link flips back to translation front
- [ ] Toggling Reverse off returns to normal mode
- [ ] Navigating to a new topic resets reversed to off
- [ ] Previous / Next navigation still works; progress bar advances
- [ ] "Test yourself" prompt still appears on last card (if topic has triviaUrl)
- [ ] Teacher image switches correctly (thinking ↔ correct) on flip

### Step 8: Commit

```bash
git add src/b1-flashcards/App.tsx
git commit -m "feat(b1-flashcards): example on front, simplified back, reverse mode"
```

---

## Task 2: C1 Flashcard — complete FlashCard + App update

**Files:**
- Modify: `src/c1-flashcards/App.tsx`

### Step 1: Add `ArrowLeftRight` to the lucide-react import

In `src/c1-flashcards/App.tsx`, line 3, change:

```tsx
import { Volume2, RotateCcw, Zap } from "lucide-react";
```

to:

```tsx
import { Volume2, RotateCcw, Zap, ArrowLeftRight } from "lucide-react";
```

### Step 2: Replace the `FlashCard` component entirely

Replace the entire `FlashCard` function (lines 154–271 in the original) with the following. Key differences from B1: uses `partOfSpeech` badge instead of transcription on the normal front; derives `meaning` and `meaningLabel` from `word.definition ?? word.translation` for the back and reversed-front; uses purple colour scheme.

```tsx
function FlashCard({
  word,
  index,
  isFlipped,
  reversed,
  onFlip,
}: {
  word: C1Word;
  index: number;
  isFlipped: boolean;
  reversed: boolean;
  onFlip: () => void;
}) {
  const borderColors: [string, string, string] = isFlipped
    ? ["#1e3a5f", "#60a5fa", "#3b82f6"]
    : ["#4c1d95", "#a78bfa", "#7c3aed"];

  const exampleParts = word.example.split("___");
  const meaning = word.definition ?? word.translation ?? "";
  const meaningLabel = word.definition ? "Definition" : "Translation";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${index}-${isFlipped ? "back" : "front"}-${reversed ? "r" : "n"}`}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full"
      >
        <GradientBorder colors={borderColors}>
          {!isFlipped && !reversed && (
            /* Normal front: word + partOfSpeech + example */
            <div className="flex flex-col items-center gap-5 px-4 md:px-8 py-8 min-h-72 justify-between">
              <div className="self-end">
                <SpeakerButton word={word.word} />
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="font-display text-[2.4rem] md:text-5xl font-bold text-neutral-900 leading-tight">
                  {word.word}
                </h2>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                  {word.partOfSpeech}
                </span>
                <p className="text-neutral-600 text-sm leading-relaxed italic mt-2">
                  {exampleParts[0]}
                  <strong className="text-neutral-800 not-italic">{word.word}</strong>
                  {exampleParts[1]}
                </p>
              </div>
              <button
                onClick={onFlip}
                className="rounded-xl bg-purple-600 text-white font-display font-bold px-10 py-3.5 text-base hover:bg-purple-700 transition-colors shadow-sm"
              >
                See Definition
              </button>
            </div>
          )}

          {!isFlipped && reversed && (
            /* Reversed front: definition or translation, no speaker */
            <div className="flex flex-col items-center gap-5 px-4 md:px-8 py-8 min-h-72 justify-center">
              <div className="flex flex-col gap-1 text-center max-w-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  {meaningLabel}
                </p>
                <p className="text-neutral-800 text-base leading-relaxed">
                  {meaning}
                </p>
              </div>
              <button
                onClick={onFlip}
                className="rounded-xl bg-purple-600 text-white font-display font-bold px-10 py-3.5 text-base hover:bg-purple-700 transition-colors shadow-sm"
              >
                See Word
              </button>
            </div>
          )}

          {isFlipped && !reversed && (
            /* Normal back: definition or translation only */
            <div className="flex flex-col items-center gap-5 px-4 md:px-8 py-8 min-h-72 justify-center">
              <div className="flex flex-col gap-1 text-center max-w-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  {meaningLabel}
                </p>
                <p className="text-neutral-800 text-base leading-relaxed">
                  {meaning}
                </p>
              </div>
              <button
                onClick={onFlip}
                className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <RotateCcw size={13} />
                Show word
              </button>
            </div>
          )}

          {isFlipped && reversed && (
            /* Reversed back: word + partOfSpeech + example + speaker */
            <div className="flex flex-col gap-5 px-4 md:px-8 py-7 min-h-72 justify-between">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-display font-bold text-xl text-neutral-900">
                    {word.word}
                  </span>
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700 shrink-0">
                    {word.partOfSpeech}
                  </span>
                </div>
                <SpeakerButton word={word.word} />
              </div>
              <div className="border-t border-neutral-100" />
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  Example
                </p>
                <p className="text-neutral-600 text-sm leading-relaxed italic">
                  {exampleParts[0]}
                  <strong className="text-neutral-800 not-italic">{word.word}</strong>
                  {exampleParts[1]}
                </p>
              </div>
              <button
                onClick={onFlip}
                className="self-center flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <RotateCcw size={13} />
                Show meaning
              </button>
            </div>
          )}
        </GradientBorder>
      </motion.div>
    </AnimatePresence>
  );
}
```

### Step 3: Add `reversed` state to the `App` function

Inside `export default function App()`, after the existing state declarations, add:

```tsx
const [reversed, setReversed] = useState(false);
```

### Step 4: Reset `reversed` in `handleSelectTopic`

```tsx
function handleSelectTopic(t: Topic) {
  setTopic(t);
  setIndex(0);
  setIsFlipped(false);
  setReversed(false);
  setPhase("studying");
  history.replaceState(null, "", `?topic=${t.id}`);
}
```

### Step 5: Replace the topic label + progress row with label + progress + toggle

Find:

```tsx
{/* Topic label + progress */}
<div className="flex items-center gap-3">
  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 shrink-0">
    {topic.icon} {topic.title}
  </span>
  <div className="flex-1">
    <ProgressBar current={index + 1} total={topic.words.length} />
  </div>
</div>
```

Replace with:

```tsx
{/* Topic label + progress + reverse toggle */}
<div className="flex items-center gap-3">
  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 shrink-0">
    {topic.icon} {topic.title}
  </span>
  <div className="flex-1">
    <ProgressBar current={index + 1} total={topic.words.length} />
  </div>
  <button
    onClick={() => { setReversed(r => !r); setIsFlipped(false); }}
    title="Reverse mode"
    className={[
      "shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border-2 transition-all duration-200",
      reversed
        ? "bg-purple-600 text-white border-purple-600"
        : "bg-white text-neutral-500 border-neutral-200 hover:border-purple-300 hover:text-purple-600",
    ].join(" ")}
  >
    <ArrowLeftRight size={12} />
    <span className="hidden sm:inline">Reverse</span>
  </button>
</div>
```

### Step 6: Pass `reversed` to `FlashCard`

```tsx
<FlashCard
  word={topic.words[index]}
  index={index}
  isFlipped={isFlipped}
  reversed={reversed}
  onFlip={() => setIsFlipped((f) => !f)}
/>
```

### Step 7: Run the dev server and verify C1 manually

Open `http://localhost:5173/c1-flashcards/` and check:

- [ ] Normal front shows word + part-of-speech badge + example sentence (word bolded)
- [ ] "See Definition" button flips to back; back shows definition or translation text (no word, no example) + "Show word" link
- [ ] For a topic that uses `translation` (e.g., Innovation & Leadership), the label reads "Translation"
- [ ] For a topic that uses `definition` (e.g., Innovation), the label reads "Definition"
- [ ] Clicking **Reverse** button highlights it purple; front now shows definition/translation text
- [ ] Flipping reversed card shows English word + part-of-speech badge + example + speaker
- [ ] "Show meaning" link flips back to meaning front
- [ ] Toggling Reverse off returns to normal mode
- [ ] Navigating to a new topic resets reversed to off
- [ ] All existing topics load and display without errors

### Step 8: Commit

```bash
git add src/c1-flashcards/App.tsx
git commit -m "feat(c1-flashcards): example on front, simplified back, reverse mode"
```

---

## Self-review

**Spec coverage:**
- ✅ Example moves to front (B1 normal front, C1 normal front)
- ✅ Back simplified to translation/definition only (B1 normal back, C1 normal back)
- ✅ Reversed mode: front shows translation (B1) / definition-or-translation (C1)
- ✅ Reversed mode: back shows word + transcription/partOfSpeech + example + speaker
- ✅ Toggle button in topic+progress row, orange for B1 / purple for C1
- ✅ `reversed` resets on topic select
- ✅ Toggling reversed resets `isFlipped` to false
- ✅ C1 uses definition preferentially over translation (option A from brainstorming)
- ✅ No changes to AppShell, data files, ProgressBar, nav buttons, test-yourself prompt, topic select, animations, URL logic

**Placeholder scan:** None found.

**Type consistency:** `reversed: boolean` prop used consistently across FlashCard signature and all four JSX blocks. `meaning`/`meaningLabel` variables defined once, used in both C1 reversed-front and normal-back blocks.
