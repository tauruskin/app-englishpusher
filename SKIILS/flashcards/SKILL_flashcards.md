---
name: flashcards
description: Build an interactive flash card app for educational/vocabulary purposes using Vite + React + TypeScript + Tailwind CSS + motion/react. Use this skill whenever the user wants to create flash cards, study cards, vocabulary cards, word flip cards, or any card-based learning component — even if they don't say "flash cards" explicitly. Covers all critical UI patterns, mobile layout pitfalls, animation techniques, and image optimization learned in production.
---

# Flash Card App — Build Guide

This skill captures every hard-won pattern from building a production flash card app. Follow these guidelines to avoid the common pitfalls.

## Stack

- Vite 6 + React 18 + TypeScript
- Tailwind CSS 3 (no shadcn)
- `motion/react` for animations (NOT `framer-motion`)
- `lucide-react` for icons
- `vite-plugin-image-optimizer` + `sharp` for image compression

---

## 1. Viewport & Layout (critical for mobile)

### Root div
```tsx
<div className="relative h-viewport flex flex-col">
```

**Never** use `h-[100dvh]` or `min-h-screen`. Use a CSS utility:
```css
/* In your shared CSS file */
.h-viewport {
  height: 100vh; /* fallback */
  height: 100svh; /* small viewport — footer always visible on iOS/Android */
}
```

`100svh` = viewport height when browser chrome is fully visible. Footer is always shown without scrolling on iPhone/Android.

**Never put `overflow-hidden` on the root div.** It blocks touch scroll on iOS. The flex layout alone keeps header/footer pinned.

### Header + Footer pinning
```tsx
<header className="bg-neutral-900 shrink-0 px-6 py-4">...</header>
<main className="flex-1 overflow-y-auto pb-4">...</main>
<footer className="bg-neutral-900 shrink-0 px-6 py-4">...</footer>
```

- `shrink-0` on header/footer = they never compress
- `flex-1 overflow-y-auto` on main = scrollable content area
- `pb-4` on main = 16px breathing room above footer when scrolled to bottom

---

## 2. Flash Card Component

### Structure
```
TopicSelectScreen → StudyingScreen
                      ├── ProgressBar
                      ├── TeacherSidebar (desktop only)
                      └── FlashCard
                            ├── Front (word)
                            └── Back (definition, example, collocations)
```

### Card flip with AnimatePresence
```tsx
<AnimatePresence mode="wait">
  {!isFlipped ? (
    <motion.div key="front"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.98 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <GradientBorder colors={["#4c1d95", "#a78bfa", "#7c3aed"]}>
        <FrontFace />
      </GradientBorder>
    </motion.div>
  ) : (
    <motion.div key="back" ...>
      <GradientBorder colors={["#1e3a5f", "#60a5fa", "#3b82f6"]}>
        <BackFace />
      </GradientBorder>
    </motion.div>
  )}
</AnimatePresence>
```

**Critical:** `GradientBorder` must be INSIDE `motion.div`, never wrapping it. If GradientBorder wraps AnimatePresence, the gradient flashes full color as the card exits (the gradient div stays visible while the inner content fades).

### Front face classes
```tsx
<div className="flex flex-col items-center gap-6 justify-between px-4 md:px-8 py-8 min-h-72">
  <span className="font-display text-[2.4rem] md:text-5xl font-bold leading-tight text-center">
    {word}
  </span>
</div>
```

- Mobile font: `text-[2.4rem]` (38px) — large enough to read, small enough not to overflow
- `md:truncate` on long phrases — wraps naturally on mobile, truncates on desktop

### Back face classes (scrollable)
```tsx
<div className="flex flex-col gap-5 px-4 md:pl-8 md:pr-10 py-7
  min-h-72 max-h-[calc(100svh-300px)]
  overflow-y-auto scroll-thin [scrollbar-gutter:stable]">
```

- `max-h-[calc(100svh-300px)]` caps height on mobile so back face never overflows viewport
- `md:pr-10` extra right padding on desktop to avoid content under the scrollbar
- `[scrollbar-gutter:stable]` prevents layout shift when scrollbar appears/disappears
- `scroll-thin` = custom thin scrollbar (see CSS section)

---

## 3. Animated Gradient Border

### CSS (in shared CSS file)
```css
@property --gradient-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes gradient-rotate {
  to { --gradient-angle: 360deg; }
}

.gradient-border-rotate {
  animation: gradient-rotate 3s linear infinite;
}
```

### React component
```tsx
function GradientBorder({
  children,
  colors,
}: {
  children: ReactNode;
  colors: [string, string, string];
}) {
  return (
    <div
      className="gradient-border-rotate rounded-2xl p-[2px] shadow-sm"
      style={{
        background: `conic-gradient(from var(--gradient-angle), ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[0]})`,
      }}
    >
      <div className="rounded-[14px] bg-white h-full">
        {children}
      </div>
    </div>
  );
}
```

- The `h-full` on the inner white div is required — without it the white background won't fill the rounded container correctly
- Change `colors` to signal state: orange = neutral, green = correct, red = wrong
- Requires CSS Houdini (`@property`) — supported in Chrome 85+, Firefox 128+, Safari 16.4+

---

## 4. Topic Selection Screen

```tsx
<div className="w-full max-w-3xl flex flex-col gap-6">
  <h1 className="font-display text-3xl font-bold">Choose a Topic</h1>
  <div className="grid gap-4 sm:grid-cols-2">
    {TOPICS.map((topic) => (
      <button key={topic.id} onClick={() => onSelect(topic)}
        className="rounded-2xl bg-white border-2 border-neutral-200 px-6 py-5
          text-left hover:border-purple-300 hover:shadow-md
          transition-all duration-200 group">
        <div className="text-2xl mb-2">{topic.icon}</div>
        <div className="font-display font-bold text-lg group-hover:text-purple-700 transition-colors">
          {topic.title}
        </div>
        <div className="text-sm text-neutral-500 mt-1">{topic.description}</div>
        <div className="text-xs text-neutral-400 mt-3">{topic.words.length} cards</div>
      </button>
    ))}
  </div>
</div>
```

---

## 5. Data Structure

```ts
// src/<app>/data.ts
export interface C1Word {
  word: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  collocations?: string[];
  phrasalVerbs?: string[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  words: C1Word[];
}

export const TOPICS: Topic[] = [
  {
    id: "innovation",
    title: "Innovation",
    icon: "💡",
    description: "Vocabulary for discussing new ideas and technology",
    words: [
      {
        word: "disruptive innovation",
        partOfSpeech: "noun phrase",
        definition: "A new product or service that significantly changes an industry",
        example: "Smartphones were a disruptive innovation that transformed communication.",
        collocations: ["drive disruptive innovation", "embrace disruption"],
      },
      // ...
    ],
  },
];
```

**If data is shared between a Flash Cards app and a Trivia app:** put it in the flash cards data file (`src/c1-flashcards/data.ts`) and import it from there in the trivia app. Don't duplicate.

---

## 6. Image Optimization

### Install
```bash
npm install -D vite-plugin-image-optimizer sharp
```

### vite.config.ts
```ts
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [react(), ViteImageOptimizer({ png: { quality: 80 } })],
});
```

Typical result: **79–83% reduction** on PNGs. 500 KB → ~100 KB per teacher image.

### Preload images on mount
Images for teacher character states (thinking, correct, sad, celebrate) only load when needed — causing a visible delay when switching states. Preload on app mount:

```tsx
useEffect(() => {
  [teacherThinking, teacherCorrect, teacherSad, teacherCelebrate].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}, []);
```

### Asset organisation
All shared images go in `src/assets/`. Use consistent hyphen naming (`teacher-correct.png`, not `teacher_correct.png` or `teacher_sad-2.png`). Never duplicate images across module folders.

---

## 7. Shared CSS Patterns

Put in a shared CSS file (e.g., `src/c1-shared.css`) imported by all sub-apps.

```css
/* Thin scrollbar for word lists and card backs */
.scroll-thin {
  scrollbar-width: thin;
  scrollbar-color: rgb(0 0 0 / 0.15) transparent;
}
.scroll-thin::-webkit-scrollbar { width: 4px; }
.scroll-thin::-webkit-scrollbar-track { background: transparent; }
.scroll-thin::-webkit-scrollbar-thumb {
  background-color: rgb(0 0 0 / 0.15);
  border-radius: 2px;
}

/* Accessibility: disable all animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Vite MPA Entry Point

HTML files at root level define public URL paths. Source in `src/`.

```
c1-flashcards/index.html   → URL: /c1-flashcards/
src/c1-flashcards/main.tsx → source entry
```

```ts
// vite.config.ts
build: {
  rollupOptions: {
    input: {
      main: resolve(__dirname, "index.html"),
      c1Flashcards: resolve(__dirname, "c1-flashcards/index.html"),
      // add more entry points here
    },
  },
},
```

---

## 9. Teacher Character Sidebar

```tsx
{/* Desktop only — hidden on mobile */}
<div className="hidden md:flex flex-col items-center shrink-0 w-56 pt-2 select-none pointer-events-none">
  <AnimatePresence mode="wait">
    <motion.img
      key={isFlipped ? "correct" : "thinking"}
      src={isFlipped ? teacherCorrect : teacherThinking}
      alt=""
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="h-56 w-auto"
      draggable={false}
    />
  </AnimatePresence>
</div>
```

- `aria-hidden="true"` — decorative image, screen readers skip it
- `select-none pointer-events-none` — prevents accidental selection/drag
- `w-56` (224px) fixed width so layout doesn't shift

---

## 10. Progress Bar

```tsx
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-400 tabular-nums shrink-0">
        {current} / {total}
      </span>
      <div className="flex-1 bg-neutral-200 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-1.5 rounded-full bg-purple-500"
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
```

---

## 11. Navigation Buttons

```tsx
<div className="flex gap-3">
  <button onClick={handlePrev} disabled={index === 0}
    className="flex-1 rounded-xl bg-white border-2 border-neutral-200
      text-neutral-700 font-display font-bold py-3.5 text-sm
      hover:border-neutral-400 transition-colors
      disabled:opacity-30 disabled:cursor-not-allowed">
    ← Back
  </button>
  <button onClick={handleNext}
    className="flex-1 rounded-xl bg-purple-600 text-white
      font-display font-bold py-3.5 text-sm
      hover:bg-purple-700 transition-colors">
    {index + 1 >= total ? "Finish ✓" : "Next →"}
  </button>
</div>
```

---

## Common Mistakes to Avoid

| Mistake | Fix |
|---|---|
| `overflow-hidden` on root div | Remove it — blocks touch scroll on iOS |
| `100dvh` or `100vh` for full height | Use `100svh` via `.h-viewport` utility |
| GradientBorder wrapping AnimatePresence | GradientBorder must be INSIDE motion.div |
| Images only load when needed | Preload all in `useEffect` on mount |
| Duplicate images in multiple folders | Single `src/assets/` folder, import from there |
| No `pb-4` on scrollable main | Content sticks to footer when scrolled down |
| Missing `scrollbar-gutter: stable` on scrollable cards | Layout shifts when scrollbar appears |
