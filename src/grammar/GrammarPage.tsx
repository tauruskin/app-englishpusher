import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { AppHeader, AppFooter } from "../shared/AppShell.tsx";
import allTopics from "./topics/index.ts";
import type { GrammarQuestion, GrammarTopic } from "./types.ts";
import { topicsForLevel, type GrammarLevel } from "./levels.ts";
import { useGrammarGame } from "./useGrammarGame.ts";
import { useTTS } from "./useTTS.ts";
import ProgressBar from "./components/ProgressBar.tsx";
import GrammarQuestionCard from "./components/GrammarQuestionCard.tsx";
import GameCharacter from "./components/GameCharacter.tsx";
import EndScreen from "./components/EndScreen.tsx";
import TopicMenu from "./components/TopicMenu.tsx";

const HEADER_BUTTON =
  "w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white";

export default function GrammarPage({ level }: { level: GrammarLevel }) {
  const topics = useMemo(() => topicsForLevel(allTopics, level.id), [level.id]);

  if (topics.length === 0) return <ComingSoon level={level} />;
  return <GrammarGame level={level} topics={topics} />;
}

function ComingSoon({ level }: { level: GrammarLevel }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <AppHeader title={`${level.id} Grammar`} subtitle="by Englishpusher" />
      <main className="grammar-app flex-1 flex items-center justify-center px-6 py-10 bg-background">
        <div className="text-center space-y-3">
          <h2 className="font-display text-2xl font-bold">Coming soon</h2>
          <p className="text-muted-foreground">Grammar topics for {level.id} are on their way.</p>
          <a href="/" className="inline-block text-primary font-medium underline">
            Back to all activities
          </a>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

function GrammarGame({ level, topics }: { level: GrammarLevel; topics: GrammarTopic[] }) {
  // ?topic=<id> opens that topic; an unknown or missing id opens the topic list.
  const initial = useMemo(() => {
    const topicId = new URLSearchParams(window.location.search).get("topic");
    const found = topics.find((t) => t.id === topicId);
    return { topic: found ?? topics[0], showLanding: !found };
  }, [topics]);

  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic>(initial.topic);
  const [showLanding, setShowLanding] = useState(initial.showLanding);
  const game = useGrammarGame(selectedTopic.rules, selectedTopic.id);
  const tts = useTTS();

  // Sound feedback when an answer is submitted
  const prevAnsweredRef = useRef(false);
  useEffect(() => {
    if (game.answered && !prevAnsweredRef.current && game.isCorrect !== null) {
      if (game.isCorrect) tts.playCorrect();
      else tts.playWrong();
    }
    prevAnsweredRef.current = game.answered;
  }, [game.answered, game.isCorrect, tts.playCorrect, tts.playWrong]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectTopic = (topic: GrammarTopic) => {
    setSelectedTopic(topic);
    setShowLanding(false);
    window.history.pushState({}, "", `?topic=${topic.id}`);
  };

  const handleGoToLanding = () => {
    setShowLanding(true);
    window.history.pushState({}, "", window.location.pathname);
  };

  const handlePracticeWeak = (weakQuestions: GrammarQuestion[]) => {
    game.restart(weakQuestions);
  };

  const playing = !showLanding;

  return (
    <div className="relative min-h-screen flex flex-col">
      <AppHeader
        title={`${level.id} Grammar`}
        subtitle={playing ? selectedTopic.name : "by Englishpusher"}
        onTitleClick={playing ? handleGoToLanding : undefined}
        onTopics={handleGoToLanding}
        showTopics={playing}
        controls={
          <>
            {playing && !game.gameOver && (
              <div className="flex items-center gap-1 bg-neutral-800 px-2.5 py-1.5 rounded-lg font-display">
                <span className="text-blue-400 font-bold text-sm">
                  {game.score}/{game.currentIndex + (game.answered ? 1 : 0)}
                </span>
              </div>
            )}
            {playing && !game.gameOver && (
              <button onClick={() => game.restart()} className={HEADER_BUTTON} aria-label="Restart" title="Restart">
                <RotateCcw size={17} />
              </button>
            )}
            <button
              onClick={tts.toggleMute}
              className={HEADER_BUTTON}
              aria-label={tts.muted ? "Unmute pronunciation" : "Mute pronunciation"}
              title={tts.muted ? "Unmute" : "Mute"}
            >
              {tts.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </>
        }
      />

      <main className="grammar-app flex-1 flex items-start justify-center px-6 py-6 md:pt-20 bg-background">
        {showLanding ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-4xl flex items-start gap-10"
          >
            {/* Teacher + speech bubble, desktop only */}
            <div className="hidden md:flex flex-col items-center gap-4 flex-shrink-0 mt-32">
              <motion.div
                className="relative bg-card border-2 border-border rounded-2xl px-5 py-3 shadow-sm max-w-[200px] text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
              >
                <p className="font-body text-sm text-foreground leading-snug">What shall we practise today? 😊</p>
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-[10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-border" />
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-[8px] w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[9px] border-t-card" />
              </motion.div>
              <GameCharacter pose="idle" className="w-[180px]" />
            </div>

            <div className="flex-1 topic-scroll md:overflow-y-auto md:max-h-[calc(100dvh-15rem)] md:overscroll-contain px-1 py-1">
              <TopicMenu
                title="Choose a Topic"
                subtitle="Pick a grammar topic to start practising"
                items={topics.map((t) => ({
                  label: t.name,
                  lesson: t.lesson,
                  description: `${t.rules.length} questions`,
                  onClick: () => handleSelectTopic(t),
                }))}
              />
            </div>
          </motion.div>
        ) : (
          <div key={selectedTopic.id} className="w-full max-w-3xl space-y-8">
            {game.gameOver ? (
              <EndScreen
                score={game.score}
                total={game.totalQuestions}
                results={game.results}
                onRestart={() => game.restart()}
                onPracticeWeak={handlePracticeWeak}
              />
            ) : (
              <>
                <ProgressBar current={game.currentIndex} total={game.totalQuestions} />
                {game.totalQuestions === 0 || !game.displayedQuestion ? (
                  <div className="text-center text-muted-foreground">Loading...</div>
                ) : (
                  <GrammarQuestionCard
                    key={game.viewIndex}
                    question={game.displayedQuestion}
                    answered={game.displayedAnswered}
                    selectedAnswer={game.displayedSelectedAnswer}
                    isCorrect={game.displayedIsCorrect}
                    streak={game.isReviewing ? 0 : game.streak}
                    transitioning={game.isReviewing ? false : game.transitioning}
                    isReview={game.isReviewing}
                    onSubmit={game.submitAnswer}
                    canGoNext={game.canGoNext}
                    canGoPrev={game.canGoPrev}
                    onNext={game.goNext}
                    onPrev={game.goPrev}
                  />
                )}
              </>
            )}
          </div>
        )}
      </main>

      <AppFooter onTopics={handleGoToLanding} showTopics={playing} />
    </div>
  );
}
