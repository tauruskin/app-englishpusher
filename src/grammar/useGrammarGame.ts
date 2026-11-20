import { useState, useCallback, useEffect, useRef } from "react";
import type { GrammarQuestion } from "./types.ts";

export interface GrammarAnswerResult {
  question: GrammarQuestion;
  userAnswer: string;
  correctAnswer: string;
  correct: boolean;
}

/** Returns the correct answer string for any GrammarQuestion type */
export function getCorrectAnswer(q: GrammarQuestion): string {
  switch (q.type) {
    case "gap-fill":
      return q.gapFill?.correctAnswer ?? "";
    case "error-spot":
      return q.errorSpot?.correction ?? "";
    case "multiple-choice":
      return q.multipleChoice?.correctOption ?? "";
    case "word-transform":
      return q.wordTransform?.correctAnswer ?? "";
    case "sentence-match": {
      const data = q.sentenceMatch;
      if (!data) return "";
      return data.pairs.map(p => p.ending).join("||");
    }
    case "sentence-reorder": {
      const data = q.sentenceReorder;
      if (!data) return "";
      return data.correctOrders[0]?.map(i => data.words[i]).join(" ") ?? "";
    }
    default:
      return "";
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Normalize apostrophe variants (curly, backtick, etc.) to a plain apostrophe */
function normalizeApostrophes(text: string): string {
  return text.replace(/['‘’ʼ`´]/g, "'");
}

/** Expand contracted 'be' forms so student answers like "'re having" match "are having" */
function expandBeContractions(text: string): string {
  const normalized = normalizeApostrophes(text);
  return normalized
    .replace(/'re\b/gi, "are")
    .replace(/'m\b/gi, "am")
    .replace(/'s\b/gi, "is");
}

// Group questions by type in difficulty order, shuffle within each group
const TYPE_ORDER = ["multiple-choice", "gap-fill", "error-spot", "word-transform", "sentence-match"];

function shuffleGrouped(questions: GrammarQuestion[]): GrammarQuestion[] {
  const groups = TYPE_ORDER.map(type => shuffle(questions.filter(q => q.type === type)));
  const rest = shuffle(questions.filter(q => !TYPE_ORDER.includes(q.type)));
  return [...groups.flat(), ...rest];
}

export function useGrammarGame(questions: GrammarQuestion[], topicId?: string) {
  const [shuffledQuestions, setShuffledQuestions] = useState<GrammarQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewIndex, setViewIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [results, setResults] = useState<GrammarAnswerResult[]>([]);

  // Ref to cancel the pending auto-advance timeout
  const pendingAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref to read viewIndex inside timeouts without stale closures
  const viewIndexRef = useRef(0);

  const syncViewRef = (v: number) => {
    viewIndexRef.current = v;
    setViewIndex(v);
  };

  const clearPending = () => {
    if (pendingAdvanceRef.current) {
      clearTimeout(pendingAdvanceRef.current);
      pendingAdvanceRef.current = null;
    }
  };

  // Initialize/reset when topic changes
  useEffect(() => {
    const q = shuffleGrouped(questions);
    setShuffledQuestions(q);
    setCurrentIndex(0);
    syncViewRef(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameOver(false);
    setStreak(0);
    setTransitioning(false);
    setResults([]);
    clearPending();
  }, [topicId]); // eslint-disable-line react-hooks/exhaustive-deps

  const totalQuestions = shuffledQuestions.length;

  const advanceGame = useCallback(
    (fromIndex: number) => {
      setTransitioning(true);
      setTimeout(() => {
        const nextIdx = fromIndex + 1;
        if (nextIdx >= totalQuestions) {
          setGameOver(true);
        } else {
          setCurrentIndex(nextIdx);
          // Only follow auto-advance if the user is still watching the current slide
          if (viewIndexRef.current === fromIndex) {
            syncViewRef(nextIdx);
          }
        }
        setAnswered(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setTransitioning(false);
      }, 300);
    },
    [totalQuestions]
  );

  const currentQuestion = shuffledQuestions[currentIndex] ?? null;

  const submitAnswer = useCallback(
    (answer: string) => {
      if (answered || !currentQuestion) return;

      let correct = false;
      let correct_answer = "";

      if (currentQuestion.type === "word-transform" && currentQuestion.wordTransform) {
        const data = currentQuestion.wordTransform;
        const userTrimmed = answer.trim().toLowerCase();
        const userExpanded = expandBeContractions(userTrimmed);
        const allAnswers = [data.correctAnswer, ...(data.alternativeAnswers ?? [])].map(a => a.trim().toLowerCase());
        correct = allAnswers.includes(userTrimmed) || allAnswers.includes(userExpanded);
        correct_answer = data.correctAnswer;
      } else if (currentQuestion.type === "sentence-reorder" && currentQuestion.sentenceReorder) {
        const data = currentQuestion.sentenceReorder;
        const userAnswer = normalizeApostrophes(answer.trim()).toLowerCase();
        const validAnswers = data.correctOrders.map(order =>
          order.map(i => data.words[i]).join(" ").toLowerCase()
        );
        correct = validAnswers.includes(userAnswer);
        correct_answer = validAnswers[0] ?? "";
      } else {
        correct_answer = getCorrectAnswer(currentQuestion);
        correct = answer.trim().toLowerCase() === correct_answer.trim().toLowerCase();
      }

      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setAnswered(true);

      if (correct) {
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }

      setResults((prev) => [
        ...prev,
        { question: currentQuestion, userAnswer: answer, correctAnswer: correct_answer, correct },
      ]);
    },
    [answered, currentQuestion, currentIndex, advanceGame]
  );

  // Derived display state — what the UI should show (current or reviewed past question)
  const isReviewing = viewIndex < currentIndex;
  const reviewResult = isReviewing ? results[viewIndex] ?? null : null;
  const displayedQuestion = shuffledQuestions[viewIndex] ?? null;
  const displayedAnswered = isReviewing ? true : answered;
  const displayedSelectedAnswer = isReviewing ? (reviewResult?.userAnswer ?? null) : selectedAnswer;
  const displayedIsCorrect = isReviewing ? (reviewResult?.correct ?? null) : isCorrect;

  const canGoNext = isReviewing || (answered && !gameOver);
  const canGoPrev = viewIndex > 0;

  const goNext = useCallback(() => {
    if (isReviewing) {
      // Advance view through already-answered questions
      const next = Math.min(viewIndexRef.current + 1, currentIndex);
      syncViewRef(next);
    } else if (answered) {
      // Skip the auto-advance delay
      clearPending();
      advanceGame(currentIndex);
    }
  }, [isReviewing, answered, currentIndex, advanceGame]);

  const goPrev = useCallback(() => {
    if (viewIndexRef.current > 0) {
      syncViewRef(viewIndexRef.current - 1);
    }
  }, []);

  const restart = useCallback((newQuestions?: GrammarQuestion[]) => {
    const q = shuffleGrouped(newQuestions ?? questions);
    setShuffledQuestions(q);
    setCurrentIndex(0);
    syncViewRef(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameOver(false);
    setStreak(0);
    setTransitioning(false);
    setResults([]);
    clearPending();
  }, [questions]);

  return {
    currentQuestion,
    currentIndex,
    viewIndex,
    totalQuestions,
    score,
    answered,
    selectedAnswer,
    isCorrect,
    gameOver,
    streak,
    transitioning,
    results,
    // Derived display state
    displayedQuestion,
    displayedAnswered,
    displayedSelectedAnswer,
    displayedIsCorrect,
    isReviewing,
    canGoNext,
    canGoPrev,
    submitAnswer,
    goNext,
    goPrev,
    restart,
  };
}
