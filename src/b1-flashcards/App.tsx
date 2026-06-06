import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, RotateCcw, Zap, ArrowLeftRight } from "lucide-react";
import { AppHeader, AppFooter } from "../shared/AppShell.tsx";
import { TOPICS, type Topic, type B1Word } from "./data.ts";
import teacherThinking from "../assets/teacher-thinking.png";
import teacherCorrect from "../assets/teacher-correct.png";

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
          ? "border-brand bg-orange-50 text-brand"
          : "border-neutral-200 bg-white text-neutral-500 hover:border-brand/50 hover:text-brand",
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
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-brand uppercase tracking-wide w-fit">
          B1 Vocabulary
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
            className="rounded-2xl bg-white border-2 border-neutral-200 px-6 py-5 text-left hover:border-orange-300 hover:shadow-md transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-3xl mb-3">{topic.icon}</div>
            <h3 className="font-display font-bold text-lg text-neutral-900 group-hover:text-brand transition-colors">
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
                  {exampleParts[1] ?? ""}
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
                  {exampleParts[1] ?? ""}
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

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

export default function App() {
  const initialTopic = (() => {
    const id = new URLSearchParams(window.location.search).get("topic");
    return id ? (TOPICS.find((t) => t.id === id) ?? null) : null;
  })();

  const [phase, setPhase] = useState<Phase>(initialTopic ? "studying" : "select");
  const [topic, setTopic] = useState<Topic | null>(initialTopic);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reversed, setReversed] = useState(false);

  useEffect(() => {
    [teacherThinking, teacherCorrect].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  function handleSelectTopic(t: Topic) {
    setTopic(t);
    setIndex(0);
    setIsFlipped(false);
    setReversed(false);
    setPhase("studying");
    history.replaceState(null, "", `?topic=${t.id}`);
  }

  function handleBackToSelect() {
    setPhase("select");
    history.replaceState(null, "", window.location.pathname);
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
    <div className="relative h-viewport flex flex-col">
      {/* Header */}
      <AppHeader
        title="Vocabulary Cards"
        subtitle="B1 · by Englishpusher"
        onTopics={handleBackToSelect}
        showTopics={phase === "studying"}
      />

      {/* Main */}
      <main className="flex flex-1 items-start justify-center px-6 py-5 overflow-y-auto">
        <AnimatePresence mode="wait">
          {phase === "select" && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
              <TopicSelectScreen onSelect={handleSelectTopic} />
            </motion.div>
          )}

          {phase === "studying" && topic && (
            <motion.div key="studying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
              <div className="w-full max-w-4xl flex flex-col gap-6">
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
                      reversed={reversed}
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
                        className="flex-1 rounded-xl bg-brand text-white font-display font-bold py-3.5 text-sm hover:bg-brand/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Next →
                      </button>
                    </div>

                    {/* Test yourself prompt — shown on last card */}
                    <AnimatePresence>
                      {index === topic.words.length - 1 && topic.triviaUrl && (
                        <motion.a
                          href={topic.triviaUrl}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
                          className="flex items-center justify-between gap-4 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50 px-5 py-4 hover:border-orange-400 hover:bg-orange-100 transition-all duration-200 group"
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="font-display font-bold text-sm text-brand">
                              Ready to test yourself?
                            </span>
                            <span className="text-xs text-orange-400">
                              Take the trivia quiz for this topic
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 rounded-xl bg-brand text-white font-display font-bold px-4 py-2.5 text-sm group-hover:bg-brand/90 transition-colors shrink-0">
                            <Zap size={14} />
                            Take Quiz
                          </div>
                        </motion.a>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AppFooter onTopics={handleBackToSelect} showTopics={phase === "studying"} />
    </div>
  );
}
