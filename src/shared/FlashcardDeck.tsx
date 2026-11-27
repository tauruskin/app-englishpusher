import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, AnimatePresence, animate, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { Pointer, Zap } from "lucide-react";
import teacherThinking from "../assets/teacher-thinking.png";
import teacherCorrect from "../assets/teacher-correct.png";

// ---------------------------------------------------------------------------
// Animated gradient border wrapper
// ---------------------------------------------------------------------------

export function GradientBorder({
  children,
  colors,
}: {
  children: ReactNode;
  colors: [string, string, string];
}) {
  return (
    <div
      className="gradient-border-rotate rounded-2xl p-[2px] shadow-md"
      style={{
        background: `conic-gradient(from var(--gradient-angle), ${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[0]})`,
      }}
    >
      <div className="rounded-[14px] bg-white overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

export function DeckProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-400 font-medium tabular-nums shrink-0">
        {current} / {total}
      </span>
      <div className="flex-1 bg-neutral-200 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-1.5 rounded-full bg-brand"
          initial={false}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Swipe + tap + keyboard navigation (all flash card decks)
// ---------------------------------------------------------------------------

const SWIPE_LEARNED_KEY = "ep-swipe-learned";
/** A swipe counts when the finger travels this far, or flicks this fast (px/s). */
const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 400;

function media(query: string): boolean {
  return typeof window !== "undefined" && !!window.matchMedia?.(query).matches;
}

function readLearned(): boolean {
  try { return localStorage.getItem(SWIPE_LEARNED_KEY) === "1"; } catch { return false; }
}

/** Has this student swiped a card before? Until then phones show the swipe hint. */
export function useSwipeLearned(): [boolean, () => void] {
  const [learned, setLearned] = useState(readLearned);
  const markLearned = () => {
    if (learned) return;
    setLearned(true);
    try { localStorage.setItem(SWIPE_LEARNED_KEY, "1"); } catch { /* private mode */ }
  };
  return [learned, markLearned];
}

/** Clicks on these inside a card do their own job and never flip it. */
const INTERACTIVE = "button, a, input, textarea, select, label, [role='button']";

function isTyping(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  return el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
}

/**
 * Desktop keys: ← / → move between cards, Space flips. Ignored while typing,
 * with a modifier key held, or while a dialog (the word list) is open.
 * Space on a focused button is left to the button.
 */
export function useDeckKeys(opts: {
  canPrev: boolean; canNext: boolean; onPrev: () => void; onNext: () => void; onFlip?: () => void;
}) {
  const ref = useRef(opts);
  ref.current = opts;
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const o = ref.current;
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTyping(e.target) || document.querySelector("[role='dialog']")) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (o.canNext) o.onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (o.canPrev) o.onPrev();
      } else if (e.key === " " && o.onFlip) {
        if (e.target instanceof HTMLElement && e.target.closest(INTERACTIVE)) return;
        e.preventDefault();
        o.onFlip();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

/** Keeps a mouse click from leaving focus on Previous/Next (so Space flips the card, not the button). Tab focus still works. */
export const keepFocusOff = (e: MouseEvent) => e.preventDefault();

const slide = {
  enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
  exit: (dir: number) => ({ x: dir * -240, opacity: 0, transition: { duration: 0.16, ease: "easeIn" } }),
};

function DraggableCard({
  canPrev, canNext, onPrev, onNext, onFlip, wiggle, onSwiped, children,
}: {
  canPrev: boolean; canNext: boolean; onPrev: () => void; onNext: () => void;
  onFlip?: () => void; wiggle: boolean; onSwiped: () => void; children: ReactNode;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-5, 5]);
  const dragged = useRef(false);
  const nudge = useRef<{ stop: () => void } | null>(null);

  // First card for a student who never swiped: the card nudges left twice, in step with the hand hint.
  useEffect(() => {
    if (!wiggle) return;
    nudge.current = animate(x, [0, 0, -28, 0], { ...HAND_TIMING, times: [0, 0.2, 0.6, 1] });
    return () => nudge.current?.stop();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function onDragEnd(_: unknown, info: PanInfo) {
    const { offset, velocity } = info;
    if (canNext && (offset.x < -SWIPE_DISTANCE || (velocity.x < -SWIPE_VELOCITY && offset.x < -20))) {
      onSwiped();
      onNext();
    } else if (canPrev && (offset.x > SWIPE_DISTANCE || (velocity.x > SWIPE_VELOCITY && offset.x > 20))) {
      onSwiped();
      onPrev();
    }
  }

  return (
    <motion.div
      variants={slide}
      initial="enter"
      animate="center"
      exit="exit"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      // At the first/last card the card only stretches a little and springs back.
      dragElastic={{ left: canNext ? 0.8 : 0.12, right: canPrev ? 0.8 : 0.12 }}
      onDragStart={() => { dragged.current = true; }}
      onDragEnd={onDragEnd}
      onPointerDownCapture={() => { dragged.current = false; nudge.current?.stop(); }}
      // A drag ends with a click on whatever was under the finger; swallow it.
      onClickCapture={(e) => {
        if (dragged.current) { e.stopPropagation(); e.preventDefault(); dragged.current = false; }
      }}
      onClick={(e) => {
        if (!onFlip || (e.target as HTMLElement).closest(INTERACTIVE)) return;
        onFlip();
      }}
      className={`relative ${onFlip ? "cursor-pointer" : ""}`}
      data-testid="swipe-card"
    >
      {children}
    </motion.div>
  );
}

/** One pass = hand appears on the right, slides left, fades. Two passes. */
const HAND_TIMING = { duration: 1.3, delay: 0.6, repeat: 1, repeatDelay: 0.35, ease: "easeInOut" } as const;

/** Phones, first card, until the first swipe: a "Swipe" hand slides across the card. */
function SwipeHandHint({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[58%] z-20 flex justify-center"
      initial={{ opacity: 0, x: 56 }}
      animate={{ opacity: [0, 1, 1, 0], x: [56, 56, -56, -56] }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ ...HAND_TIMING, times: [0, 0.2, 0.75, 1] }}
      onAnimationComplete={onDone}
      data-testid="swipe-hand"
    >
      <div className="flex items-center gap-1.5 rounded-full bg-neutral-900/85 px-4 py-2 text-sm font-semibold text-white shadow-lg">
        <Pointer size={18} className="-rotate-12" />
        Swipe
      </div>
    </motion.div>
  );
}

/**
 * The card slot of a deck: swipe left/right to move (phones and mouse drag),
 * tap the card to flip (when `onFlip` is given), and a direction-aware slide
 * whenever the card changes, also from the buttons or keys.
 */
export function SwipeCard({
  index, total, onPrev, onNext, onFlip, learned, onSwiped, children,
}: {
  index: number; total: number; onPrev: () => void; onNext: () => void;
  /** Tap-anywhere flip. Leave out when the card handles taps itself (grammar cards). */
  onFlip?: () => void;
  /** From useSwipeLearned(), shared with DeckHint. */
  learned: boolean;
  onSwiped: () => void;
  children: ReactNode;
}) {
  const prevIndex = useRef(index);
  const dir = index > prevIndex.current ? 1 : index < prevIndex.current ? -1 : 0;
  useEffect(() => { prevIndex.current = index; }, [index]);

  const canPrev = index > 0;
  const canNext = index < total - 1;
  // Decided once when the deck opens; reduced-motion devices keep only the text hint.
  const [hintOnOpen] = useState(
    () => !learned && index === 0 && total > 1 && media("(pointer: coarse)") && !media("(prefers-reduced-motion: reduce)"),
  );
  const [handVisible, setHandVisible] = useState(hintOnOpen);
  const wiggle = handVisible && index === 0 && !learned;

  return (
    <div className="relative" onPointerDownCapture={() => setHandVisible(false)}>
    <AnimatePresence>
      {wiggle && <SwipeHandHint key="hand" onDone={() => setHandVisible(false)} />}
    </AnimatePresence>
    <AnimatePresence mode="wait" initial={false} custom={dir}>
      <DraggableCard
        key={index}
        canPrev={canPrev}
        canNext={canNext}
        onPrev={onPrev}
        onNext={onNext}
        onFlip={onFlip}
        wiggle={wiggle}
        onSwiped={onSwiped}
      >
        {children}
      </DraggableCard>
    </AnimatePresence>
    </div>
  );
}

/** Small grey line under the buttons: the swipe hint on phones (until the first swipe), the keys on desktop. */
export function DeckHint({ canFlip, learned }: { canFlip: boolean; learned: boolean }) {
  return (
    <>
      {!learned && (
        <p className="hidden [@media(pointer:coarse)]:block text-center text-xs text-neutral-400 -mt-1">
          Swipe the card to move · tap it to flip
        </p>
      )}
      <p className="hidden [@media(hover:hover)_and_(pointer:fine)]:block text-center text-xs text-neutral-400 -mt-1">
        <kbd className="font-sans">←</kbd> <kbd className="font-sans">→</kbd> to move{canFlip ? " · Space to flip" : ""}
      </p>
    </>
  );
}

// ---------------------------------------------------------------------------
// Study layout: badge + progress, teacher column, card slot, Previous/Next, test prompt
// ---------------------------------------------------------------------------

export interface TestPrompt { title: string; subtitle: string; cta: string; href: string }

export interface DeckLayoutProps {
  badge: string;
  index: number;
  total: number;
  teacherFlipped: boolean;
  onPrev: () => void;
  onNext: () => void;
  /** Flips the card: Space on desktop, and a tap anywhere on the card unless `tapToFlip` is false. */
  onFlip?: () => void;
  /** False when the card handles taps itself (grammar cards). Default true. */
  tapToFlip?: boolean;
  /** Right of the progress bar (vocabulary: Reverse toggle). */
  toolbar?: ReactNode;
  /** Shown on the last card only. */
  prompt?: TestPrompt;
  /** The card (and anything layered on it, e.g. the star button). */
  children: ReactNode;
}

export function DeckLayout({
  badge, index, total, teacherFlipped, onPrev, onNext, onFlip, tapToFlip = true, toolbar, prompt, children,
}: DeckLayoutProps) {
  const teacher = teacherFlipped ? teacherCorrect : teacherThinking;
  const [swipeLearned, markSwiped] = useSwipeLearned();
  useDeckKeys({ canPrev: index > 0, canNext: index < total - 1, onPrev, onNext, onFlip });

  return (
    <div className="w-full max-w-4xl flex flex-col gap-6">
      {/* Topic label + progress + toolbar */}
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand shrink-0">
          {badge}
        </span>
        <div className="flex-1">
          <DeckProgressBar current={index + 1} total={total} />
        </div>
        {toolbar}
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8 items-start">

        {/* Teacher — desktop only */}
        <div className="hidden md:flex flex-col items-center shrink-0 w-56 pt-2 select-none pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={teacher}
              src={teacher}
              alt="Teacher"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="h-56 w-auto max-w-none"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Card + navigation */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative">
            <SwipeCard
              index={index}
              total={total}
              onPrev={onPrev}
              onNext={onNext}
              onFlip={tapToFlip ? onFlip : undefined}
              learned={swipeLearned}
              onSwiped={markSwiped}
            >
              {children}
            </SwipeCard>
          </div>

          <div className="flex gap-3">
            <button
              onMouseDown={keepFocusOff}
              onClick={onPrev}
              disabled={index === 0}
              className="flex-1 rounded-xl bg-white border-2 border-neutral-200 text-neutral-700 font-display font-bold py-3.5 text-sm hover:border-neutral-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <button
              onMouseDown={keepFocusOff}
              onClick={onNext}
              disabled={index === total - 1}
              className="flex-1 rounded-xl bg-brand text-white font-display font-bold py-3.5 text-sm hover:bg-brand/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>

          <DeckHint canFlip={!!onFlip} learned={swipeLearned} />

          {/* Test yourself prompt — shown on last card */}
          <AnimatePresence>
            {index === total - 1 && prompt && (
              <motion.a
                href={prompt.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
                className="flex items-center justify-between gap-4 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 px-5 py-4 hover:border-orange-400 hover:bg-orange-100 transition-all duration-200 group"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-display font-bold text-sm text-brand">
                    {prompt.title}
                  </span>
                  <span className="text-xs text-orange-400">
                    {prompt.subtitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-xl bg-brand text-white font-display font-bold px-4 py-2.5 text-sm group-hover:bg-brand/90 transition-colors shrink-0">
                  <Zap size={14} />
                  {prompt.cta}
                </div>
              </motion.a>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
