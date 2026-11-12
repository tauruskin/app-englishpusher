import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, RotateCcw, ArrowLeftRight } from "lucide-react";
import { AppHeader, AppFooter } from "../shared/AppShell.tsx";
import {
  useSavedWords, resolveSavedWords, findOriginTopicId, StarButton, MY_WORDS_TOPIC_ID,
} from "../shared/savedWords.tsx";
import { logStudyEvent } from "../shared/progress.ts";
import { WordList } from "../shared/WordList.tsx";
import TopicTileGrid, { type TopicTile } from "../shared/TopicTileGrid.tsx";
import { DeckLayout, GradientBorder } from "../shared/FlashcardDeck.tsx";
import type { Topic, Word } from "./types.ts";
import { useLevel } from "./mount.tsx";
import { flashcardsAppId, pageUrl } from "./level.ts";
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
// Topic tile (shared TopicTileGrid)
// ---------------------------------------------------------------------------

const toTile = (t: Topic): TopicTile => ({
  id: t.id, icon: t.icon, title: t.title, description: t.description,
  count: t.words.length > 0 ? `${t.words.length} words` : null,
});

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
  word: Word;
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

export default function FlashcardsPage() {
  const level = useLevel();
  const TOPICS = level.topics;
  const initialTopic = (() => {
    const id = new URLSearchParams(window.location.search).get("topic");
    return id ? (TOPICS.find((t) => t.id === id) ?? null) : null;
  })();

  const [phase, setPhase] = useState<Phase>(initialTopic ? "studying" : "select");
  const [topic, setTopic] = useState<Topic | null>(initialTopic);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reversed, setReversed] = useState(false);

  // Saved words / My Words virtual topic
  const { enabled: starsEnabled, savedWords, savedSet, toggle } = useSavedWords(level.id);
  const myWordsTopic = useMemo<Topic | null>(() => {
    const words = resolveSavedWords(savedWords, TOPICS);
    if (words.length === 0) return null;
    return {
      id: MY_WORDS_TOPIC_ID,
      title: "My Words",
      icon: "⭐",
      description: "Words you saved for later practice",
      triviaUrl: `${pageUrl(level, "trivia")}?topic=my-words`,
      words,
    };
  }, [savedWords]);

  // ?topic=my-words deep link: enter once the saved words resolve (signed-in
  // with ≥1 word); guests simply stay on the topic list.
  const wantMyWords = useRef(
    new URLSearchParams(window.location.search).get("topic") === MY_WORDS_TOPIC_ID,
  );
  useEffect(() => {
    if (wantMyWords.current && phase === "select" && myWordsTopic) {
      wantMyWords.current = false;
      handleSelectTopic(myWordsTopic);
    }
  }, [myWordsTopic, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Study log: one event per topic open (list selection or deep link);
  // no-ops for guests. My Words opens count too — it's real study.
  const loggedTopicRef = useRef<string | null>(null);
  useEffect(() => {
    if (phase !== "studying" || !topic) return;
    if (loggedTopicRef.current === topic.id) return;
    loggedTopicRef.current = topic.id;
    logStudyEvent(flashcardsAppId(level), topic.id);
  }, [phase, topic]);

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

  return (
    <div className="relative h-viewport flex flex-col">
      {/* Header */}
      <AppHeader
        title="Vocabulary Cards"
        subtitle={`${level.id} · by Englishpusher`}
        onTopics={handleBackToSelect}
        showTopics={phase === "studying"}
      />

      {/* Main */}
      <main className="flex flex-1 items-start justify-center px-6 py-5 overflow-y-auto">
        <AnimatePresence mode="wait">
          {phase === "select" && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
              <TopicTileGrid
                variant="flashcards"
                badge={`${level.id} Vocabulary`}
                heading="Flash Cards"
                subtitle="Choose a topic to start practising"
                tiles={(myWordsTopic ? [myWordsTopic, ...TOPICS] : TOPICS).map(toTile)}
                onSelect={(id) => handleSelectTopic((myWordsTopic ? [myWordsTopic, ...TOPICS] : TOPICS).find((t) => t.id === id)!)}
              />
            </motion.div>
          )}

          {phase === "studying" && topic && (
            <motion.div key="studying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
              <DeckLayout
                badge={`${topic.icon} ${topic.title}`}
                index={index}
                total={topic.words.length}
                teacherFlipped={isFlipped}
                onPrev={goPrev}
                onNext={goNext}
                toolbar={
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
                }
                prompt={topic.triviaUrl ? {
                  title: "Ready to test yourself?",
                  subtitle: "Take the trivia quiz for this topic",
                  cta: "Take Quiz",
                  href: topic.triviaUrl,
                } : undefined}
              >
                {starsEnabled && (
                  <div className="absolute top-3 left-3 z-10">
                    <StarButton
                      active={savedSet.has(topic.words[index].word)}
                      onToggle={() =>
                        toggle(
                          topic.words[index].word,
                          topic.id === MY_WORDS_TOPIC_ID
                            ? findOriginTopicId(topic.words[index].word, TOPICS)
                            : topic.id,
                          "flashcards",
                        )
                      }
                    />
                  </div>
                )}
                <FlashCard
                  word={topic.words[index]}
                  index={index}
                  isFlipped={isFlipped}
                  reversed={reversed}
                  onFlip={() => setIsFlipped((f) => !f)}
                />
              </DeckLayout>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {phase === "studying" && topic && (
        <WordList
          items={topic.words.map((w) => ({ word: w.word, hint: w.translation }))}
          current={index}
          saved={starsEnabled ? savedSet : undefined}
          onJump={(i) => { setIsFlipped(false); setIndex(i); }}
        />
      )}

      <AppFooter onTopics={handleBackToSelect} showTopics={phase === "studying"} />
    </div>
  );
}
