import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppHeader, AppFooter } from "../../shared/AppShell.tsx";
import { logStudyEvent } from "../../shared/progress.ts";
import { WordList } from "../../shared/WordList.tsx";
import TopicTileGrid from "../../shared/TopicTileGrid.tsx";
import { DeckLayout } from "../../shared/FlashcardDeck.tsx";
import type { GrammarTopic, RuleCard } from "../types.ts";
import { cardCountLabel, uaRuleForLevel } from "../cards.ts";
import { grammarFlashcardsAppId, grammarUrl, type GrammarLevel } from "../levels.ts";
import RuleCardView from "./RuleCardView.tsx";
import teacherThinking from "../../assets/teacher-thinking.png";
import teacherCorrect from "../../assets/teacher-correct.png";

type Phase = "select" | "studying";

const cardsOf = (t: GrammarTopic): RuleCard[] => t.cards ?? [];

// /<level>-grammar-flashcards/: topic list, then one rule card at a time (same flow as the vocabulary flash cards).
export default function GrammarFlashcardsPage({ level, topics }: { level: GrammarLevel; topics: GrammarTopic[] }) {
  // ?topic=<id> opens the deck only when that topic has cards; otherwise the list.
  const initialTopic = (() => {
    const id = new URLSearchParams(window.location.search).get("topic");
    const found = id ? topics.find((t) => t.id === id) : undefined;
    return found && cardsOf(found).length > 0 ? found : null;
  })();

  const [phase, setPhase] = useState<Phase>(initialTopic ? "studying" : "select");
  const [topic, setTopic] = useState<GrammarTopic | null>(initialTopic);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Study log: one event per topic open (list selection or deep link); no-ops for guests.
  const loggedTopicRef = useRef<string | null>(null);
  useEffect(() => {
    if (phase !== "studying" || !topic) return;
    if (loggedTopicRef.current === topic.id) return;
    loggedTopicRef.current = topic.id;
    logStudyEvent(grammarFlashcardsAppId(level), topic.id);
  }, [phase, topic]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    [teacherThinking, teacherCorrect].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  function handleSelectTopic(t: GrammarTopic) {
    setTopic(t);
    setIndex(0);
    setIsFlipped(false);
    setPhase("studying");
    history.replaceState(null, "", `?topic=${t.id}`);
  }

  function handleBackToSelect() {
    setPhase("select");
    history.replaceState(null, "", window.location.pathname);
  }

  const cards = topic ? cardsOf(topic) : [];

  function goNext() {
    setIsFlipped(false);
    setIndex((i) => Math.min(i + 1, cards.length - 1));
  }

  function goPrev() {
    setIsFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  }

  return (
    <div className="relative h-viewport flex flex-col">
      <AppHeader
        title="Grammar Cards"
        subtitle={`${level.id} · by Englishpusher`}
        onTopics={handleBackToSelect}
        showTopics={phase === "studying"}
      />

      <main className="flex flex-1 items-start justify-center px-6 py-5 overflow-y-auto">
        <AnimatePresence mode="wait">
          {phase === "select" && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
              <TopicTileGrid
                variant="flashcards"
                badge={`${level.id} Grammar`}
                heading="Flash Cards"
                subtitle="Choose a topic to learn its rules"
                tiles={topics.map((t) => ({
                  id: t.id,
                  icon: t.icon ?? "📘",
                  title: t.name,
                  description: t.description,
                  count: cardCountLabel(t),
                }))}
                onSelect={(id) => handleSelectTopic(topics.find((t) => t.id === id)!)}
              />
            </motion.div>
          )}

          {phase === "studying" && topic && cards.length > 0 && (
            <motion.div key="studying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
              <DeckLayout
                badge={`${topic.icon ?? "📘"} ${topic.name}`}
                index={index}
                total={cards.length}
                teacherFlipped={isFlipped}
                onPrev={goPrev}
                onNext={goNext}
                prompt={{
                  title: "Ready to test yourself?",
                  subtitle: `Take the ${topic.name} test`,
                  cta: "Take Test",
                  href: grammarUrl(level, topic.id),
                }}
              >
                <RuleCardView
                  card={cards[index]}
                  index={index}
                  isFlipped={isFlipped}
                  onFlip={() => setIsFlipped((f) => !f)}
                  uaRule={uaRuleForLevel(level.id)}
                />
              </DeckLayout>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {phase === "studying" && topic && cards.length > 0 && (
        <WordList
          noun="rule"
          nounPlural="rules"
          items={cards.map((c) => ({ word: c.rule, hint: c.explanation }))}
          current={index}
          onJump={(i) => { setIsFlipped(false); setIndex(i); }}
        />
      )}

      <AppFooter onTopics={handleBackToSelect} showTopics={phase === "studying"} />
    </div>
  );
}
