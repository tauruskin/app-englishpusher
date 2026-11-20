import type { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap } from "lucide-react";
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
  /** Right of the progress bar (vocabulary: Reverse toggle). */
  toolbar?: ReactNode;
  /** Shown on the last card only. */
  prompt?: TestPrompt;
  /** The card (and anything layered on it, e.g. the star button). */
  children: ReactNode;
}

export function DeckLayout({
  badge, index, total, teacherFlipped, onPrev, onNext, toolbar, prompt, children,
}: DeckLayoutProps) {
  const teacher = teacherFlipped ? teacherCorrect : teacherThinking;

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
            {children}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onPrev}
              disabled={index === 0}
              className="flex-1 rounded-xl bg-white border-2 border-neutral-200 text-neutral-700 font-display font-bold py-3.5 text-sm hover:border-neutral-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>
            <button
              onClick={onNext}
              disabled={index === total - 1}
              className="flex-1 rounded-xl bg-brand text-white font-display font-bold py-3.5 text-sm hover:bg-brand/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>

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
