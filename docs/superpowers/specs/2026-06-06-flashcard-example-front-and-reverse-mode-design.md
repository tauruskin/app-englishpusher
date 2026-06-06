# Flashcard: Example on Front + Reverse Mode

**Date:** 2026-06-06  
**Scope:** `src/b1-flashcards/App.tsx`, `src/c1-flashcards/App.tsx`  
**Approach:** Approach A — single `FlashCard` component with `reversed` prop

---

## Problem

Teacher requested two UX improvements to both the B1 and C1 flashcard apps:

1. Move the example sentence from the back of the card to the front, so students see context alongside the word before flipping.
2. Add a "Reverse mode" that flips the card direction — students see the translation/definition first and must recall the English word.

---

## Feature 1 — Example moves to front

### B1 FlashCard

| Side | Content (new) | Removed from back |
|---|---|---|
| Front | Word (large) + transcription + example sentence (word bolded) + "See Translation" button | — |
| Back | "Translation" label + Ukrainian translation (large, brand orange) + "Show word" link | Word repeat, transcription, example |

### C1 FlashCard

| Side | Content (new) | Removed from back |
|---|---|---|
| Front | Word (large) + part-of-speech badge + example sentence (word bolded) + "See Definition" button | — |
| Back | Definition OR translation label + definition/translation text + "Show word" link | Word repeat, part-of-speech, example |

**C1 back logic:** show `definition` if present, else show `translation`. Label adapts: "Definition" or "Translation". No change to the `C1Word` data type.

The example sentence rendering (split on `___`, bold the word) is unchanged — just moves to the front face.

The `SpeakerButton` stays on the front face only (where the English word is visible).

---

## Feature 2 — Reverse mode

### State

- `reversed: boolean` — added to `App` state in both apps, initialised `false`.
- Toggling `reversed` also resets `isFlipped` to `false`.
- `reversed` resets to `false` inside `handleSelectTopic` (fresh per topic).

### B1 FlashCard — reverse mode

| Side | Content |
|---|---|
| Front | Ukrainian translation (large) + "See Word" button — no speaker, no transcription |
| Back | Word (large) + transcription + example sentence (word bolded) + speaker button + "Show translation" link |

### C1 FlashCard — reverse mode

| Side | Content |
|---|---|
| Front | Definition OR translation text (same precedence as normal back) + "See Word" button — no speaker |
| Back | Word (large) + part-of-speech badge + example sentence (word bolded) + speaker button + "Show meaning" link |

### Toggle button

**Placement:** right end of the topic badge + progress bar row (no extra vertical space).

```
[🏷 Topic title]  [────── 3 / 20 ──────]  [⇄ Reverse]
```

**Styling:**
- Icon: `ArrowLeftRight` from lucide-react (already a dependency)
- B1: inactive = white border pill; active = `bg-brand text-white` pill
- C1: inactive = white border pill; active = `bg-purple-600 text-white` pill
- Label "Reverse" visible on desktop; icon-only acceptable on narrow mobile

**Gradient border colors:** unchanged — warm (orange/purple) for front face, blue for back face, regardless of mode.

**Teacher image:** unchanged — `teacherThinking` on front face, `teacherCorrect` on back face, regardless of mode.

**FlashCard prop signature change:**

```tsx
// added to both B1 and C1 FlashCard
reversed: boolean;
```

---

## What does NOT change

- `AppHeader`, `AppFooter`, `AppShell.tsx`
- `ProgressBar`
- Navigation buttons (← Previous / Next →)
- "Test yourself" prompt (last card)
- `TopicSelectScreen`
- All data files (`data.ts`) — no schema changes
- `GradientBorder`, `SpeakerButton` components
- Flip animation (`AnimatePresence mode="wait"`, `key` pattern)
- URL deep-link logic (`?topic=`)
- Deploy scripts and Vite config

---

## Implementation notes

- The `exampleParts` split (`word.example.split("___")`) currently lives inside `FlashCard`. It stays there — just renders in the front face now.
- C1 already has an inline map for bold rendering. Keep that logic, move it to the front face.
- No new dependencies required (`ArrowLeftRight` is already in lucide-react v0.x bundled with the project).
- Both apps are independent files — apply the same pattern to each; do not attempt to share a single generic `FlashCard`.
