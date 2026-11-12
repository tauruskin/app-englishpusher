import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Volume2, VolumeX } from "lucide-react";
import { AppHeader, AppFooter } from "../shared/AppShell.tsx";
import GrammarLevelPage from "./GrammarLevelPage.tsx";
import TopicTileGrid from "../shared/TopicTileGrid.tsx";
import allTopics from "./topics/index.ts";
import type { GrammarQuestion, GrammarTopic } from "./types.ts";
import { grammarAppId, grammarView, topicsForLevel, type GrammarLevel } from "./levels.ts";
import { GrammarSaveStatus } from "./GrammarSave.tsx";
import { useGrammarGame } from "./useGrammarGame.ts";
import { useTTS } from "./useTTS.ts";
import ProgressBar from "./components/ProgressBar.tsx";
import GrammarQuestionCard from "./components/GrammarQuestionCard.tsx";
import EndScreen from "./components/EndScreen.tsx";

const HEADER_BUTTON =
  "w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white";

export default function GrammarPage({ level }: { level: GrammarLevel }) {
  const topics = useMemo(() => topicsForLevel(allTopics, level.id), [level.id]);

  if (topics.length === 0) return <ComingSoon level={level} />;

  // no query = the level page; ?view=topics = the test topic list; ?topic=<id> = straight into the test
  const view = grammarView(
    window.location.search,
    topics.map((t) => t.id),
  );
  if (view.kind === "level") return <GrammarLevelPage level={level} topics={topics} />;
  return <GrammarGame level={level} topics={topics} initialTopicId={view.kind === "test" ? view.topicId : null} />;
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

function GrammarGame({
  level,
  topics,
  initialTopicId,
}: {
  level: GrammarLevel;
  topics: GrammarTopic[];
  initialTopicId: string | null; // null = start on the topic list
}) {
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic>(
    () => topics.find((t) => t.id === initialTopicId) ?? topics[0],
  );
  const [showLanding, setShowLanding] = useState(initialTopicId === null);
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

  // "Topics" goes back to the topic list (?view=topics), not to the level page.
  const handleGoToLanding = () => {
    setShowLanding(true);
    window.history.pushState({}, "", `${window.location.pathname}?view=topics`);
  };

  // Browser Back/Forward between the topic list and a test keeps the screen in step with the URL.
  useEffect(() => {
    const onPopState = () => {
      const view = grammarView(window.location.search, topics.map((t) => t.id));
      if (view.kind === "test") {
        setSelectedTopic(topics.find((t) => t.id === view.topicId) ?? topics[0]);
        setShowLanding(false);
      } else {
        setShowLanding(true);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [topics]);

  const handlePracticeWeak = (weakQuestions: GrammarQuestion[]) => {
    game.restart(weakQuestions);
  };

  const playing = !showLanding;

  return (
    <div className="relative min-h-screen flex flex-col">
      <AppHeader
        title={playing ? `${level.id} Grammar` : "Grammar Test"}
        subtitle={playing ? selectedTopic.name : `${level.id} · by Englishpusher`}
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

      <main
        className={`grammar-app flex-1 flex items-start justify-center px-6 ${
          // the topic list keeps the page background, like the vocabulary lists
          showLanding ? "py-10" : "py-6 md:pt-20 bg-background"
        }`}
      >
        {showLanding ? (
          <TopicTileGrid
            variant="quiz"
            badge={`${level.id} Grammar`}
            heading="Grammar Test"
            subtitle="Choose a topic to start the test"
            tiles={topics.map((t) => ({
              id: t.id,
              icon: t.icon ?? "📘",
              title: t.name,
              description: t.description,
              count: `${t.rules.length} questions`,
            }))}
            onSelect={(id) => handleSelectTopic(topics.find((t) => t.id === id)!)}
          />
        ) : (
          <div key={selectedTopic.id} className="w-full max-w-3xl space-y-8">
            {game.gameOver ? (
              <div className="space-y-4">
                <EndScreen
                  score={game.score}
                  total={game.totalQuestions}
                  results={game.results}
                  onRestart={() => game.restart()}
                  onPracticeWeak={handlePracticeWeak}
                />
                <GrammarSaveStatus app={grammarAppId(level)} topicId={selectedTopic.id} results={game.results} />
              </div>
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
