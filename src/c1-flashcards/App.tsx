import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, RotateCcw } from "lucide-react";
import { TOPICS, type Topic, type C1Word } from "./data.ts";
import teacherThinking from "../c1-trivia/teacher-thinking.png";
import teacherCorrect from "../c1-trivia/teacher-correct.png";

type Phase = "select" | "studying";

// ---------------------------------------------------------------------------
// Speech synthesis
// ---------------------------------------------------------------------------

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}

// ---------------------------------------------------------------------------
// Animated gradient border wrapper
// ---------------------------------------------------------------------------

function GradientBorder({
  children,
  colors,
}: {
  children: ReactNode;
  colors: [string, string, string];
}) {
  return (
    <div
      className="gradient-border-rotate w-full rounded-2xl p-[2px] shadow-md"
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
// Speaker button
// ---------------------------------------------------------------------------

function SpeakerButton({ word }: { word: string }) {
  const [active, setActive] = useState(false);

  function handleClick() {
    speak(word);
    setActive(true);
    setTimeout(() => setActive(false), 800);
  }

  return (
    <button
      onClick={handleClick}
      title="Pronounce"
      className={[
        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200",
        active
          ? "border-purple-400 bg-purple-50 text-purple-600"
          : "border-neutral-200 bg-white text-neutral-500 hover:border-purple-300 hover:text-purple-500",
      ].join(" ")}
    >
      <Volume2 size={17} />
    </button>
  );
}

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-400 font-medium tabular-nums shrink-0">
        {current} / {total}
      </span>
      <div className="flex-1 bg-neutral-200 rounded-full h-1.5 overflow-hidden">
        <motion.div
          className="h-1.5 rounded-full bg-purple-500"
          initial={false}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Topic selection screen
// ---------------------------------------------------------------------------

function TopicSelectScreen({ onSelect }: { onSelect: (topic: Topic) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-3xl flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 uppercase tracking-wide w-fit">
          C1 Business
        </span>
        <h2 className="font-display text-3xl font-bold text-neutral-900 mt-2">
          Flash Cards
        </h2>
        <p className="text-neutral-500 text-sm mt-1">
          Choose a topic to start practising
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelect(topic)}
            disabled={topic.words.length === 0}
            className="rounded-2xl bg-white border-2 border-neutral-200 px-6 py-5 text-left hover:border-purple-300 hover:shadow-md transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-3xl mb-3">{topic.icon}</div>
            <h3 className="font-display font-bold text-lg text-neutral-900 group-hover:text-purple-700 transition-colors">
              {topic.title}
            </h3>
            <p className="text-sm text-neutral-500 mt-1 leading-snug">
              {topic.description}
            </p>
            <p className="text-xs text-neutral-400 mt-3 font-medium">
              {topic.words.length > 0 ? `${topic.words.length} words` : "Coming soon"}
            </p>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Flash card
// ---------------------------------------------------------------------------

function FlashCard({
  word,
  index,
  isFlipped,
  onFlip,
}: {
  word: C1Word;
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
}) {
  const borderColors: [string, string, string] = isFlipped
    ? ["#1e3a5f", "#60a5fa", "#3b82f6"]
    : ["#4c1d95", "#a78bfa", "#7c3aed"];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${index}-${isFlipped ? "back" : "front"}`}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full"
      >
        <GradientBorder colors={borderColors}>
          {!isFlipped ? (
            /* ── Front face ── */
            <div className="flex flex-col items-center gap-6 px-8 py-10 min-h-72 justify-between">
              <div className="self-end">
                <SpeakerButton word={word.word} />
              </div>

              <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="font-display text-5xl font-bold text-neutral-900 leading-tight">
                  {word.word}
                </h2>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                  {word.partOfSpeech}
                </span>
              </div>

              <button
                onClick={onFlip}
                className="rounded-xl bg-purple-600 text-white font-display font-bold px-10 py-3.5 text-base hover:bg-purple-700 transition-colors shadow-sm"
              >
                See Definition
              </button>
            </div>
          ) : (
            /* ── Back face ── */
            <div className="flex flex-col gap-5 pl-8 pr-10 py-7 min-h-72 max-h-[calc(100svh-300px)] overflow-y-auto scroll-thin [scrollbar-gutter:stable]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-display font-bold text-xl text-neutral-900 truncate">
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
                  Definition
                </p>
                <p className="text-neutral-800 text-base leading-relaxed">
                  {word.definition}
                </p>
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  Example
                </p>
                <p className="text-neutral-600 text-sm leading-relaxed italic">
                  {word.example.replace("___", `<b>${word.word}</b>`).split(/(<b>.*?<\/b>)/).map((part, i) =>
                    part.startsWith("<b>") ? (
                      <strong key={i} className="text-neutral-800 not-italic">
                        {word.word}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              </div>

              <button
                onClick={onFlip}
                className="mt-auto self-center flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <RotateCcw size={13} />
                Show word
              </button>
            </div>
          )}
        </GradientBorder>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const [phase, setPhase] = useState<Phase>("select");
  const [topic, setTopic] = useState<Topic | null>(null);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  function handleSelectTopic(t: Topic) {
    setTopic(t);
    setIndex(0);
    setIsFlipped(false);
    setPhase("studying");
  }

  function goNext() {
    if (!topic) return;
    setIsFlipped(false);
    setIndex((i) => Math.min(i + 1, topic.words.length - 1));
  }

  function goPrev() {
    setIsFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  }

  const teacher = isFlipped ? teacherCorrect : teacherThinking;

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-700/50 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Englishpusher logo" className="h-8 w-auto" />
            <div>
              <h1 className="font-display text-base font-bold leading-tight text-white">
                Flash Cards
              </h1>
              <p className="text-xs text-neutral-400">C1 Business · by Englishpusher</p>
            </div>
          </div>
          {phase === "studying" ? (
            <button
              onClick={() => setPhase("select")}
              className="text-xs text-neutral-400 hover:text-brand transition-colors"
            >
              ← Topics
            </button>
          ) : (
            <a
              href="/c1-business/"
              className="text-xs text-neutral-400 hover:text-brand transition-colors"
            >
              ← C1 Business
            </a>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-start justify-center px-6 py-5">
        <AnimatePresence mode="wait">
          {phase === "select" && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
              <TopicSelectScreen onSelect={handleSelectTopic} />
            </motion.div>
          )}

          {phase === "studying" && topic && (
            <motion.div key="studying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
              <div className="w-full max-w-4xl flex flex-col gap-6">
                {/* Topic label + progress */}
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 shrink-0">
                    {topic.icon} {topic.title}
                  </span>
                  <div className="flex-1">
                    <ProgressBar current={index + 1} total={topic.words.length} />
                  </div>
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
                    <FlashCard
                      word={topic.words[index]}
                      index={index}
                      isFlipped={isFlipped}
                      onFlip={() => setIsFlipped((f) => !f)}
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={goPrev}
                        disabled={index === 0}
                        className="flex-1 rounded-xl bg-white border-2 border-neutral-200 text-neutral-700 font-display font-bold py-3.5 text-sm hover:border-neutral-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={goNext}
                        disabled={index === topic.words.length - 1}
                        className="flex-1 rounded-xl bg-purple-600 text-white font-display font-bold py-3.5 text-sm hover:bg-purple-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-700/50 px-6 py-4">
        <div className="mx-auto max-w-4xl text-center text-sm text-neutral-400">
          Copyright &copy; 2026 &mdash;{" "}
          <a
            href="https://englishpusher.in.ua"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:text-brand/80 transition-colors"
          >
            Englishpusher
          </a>
        </div>
      </footer>
    </div>
  );
}
