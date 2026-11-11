import { useState, useEffect, useRef, useCallback } from "react";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
import type { GrammarQuestion } from "../types.ts";
import GameCharacter, { type CharacterPose } from "./GameCharacter.tsx";
import { BorderRotate } from "./BorderRotate.tsx";
import HintButton from "./HintButton.tsx";

interface GrammarQuestionCardProps {
  question: GrammarQuestion;
  answered: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  streak: number;
  transitioning: boolean;
  isReview?: boolean;
  onSubmit: (answer: string) => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
}

// --- Gap Fill ---
const GapFillView = ({
  question,
  answered,
  selectedAnswer,
  isCorrect,
  onSubmit,
}: {
  question: GrammarQuestion;
  answered: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  onSubmit: (a: string) => void;
}) => {
  const data = question.gapFill!;
  const correct = data.correctAnswer;
  const [options] = useState(() => shuffleArray(data.options));

  const getOptionStyle = (option: string) => {
    if (!answered)
      return "bg-secondary hover:bg-muted border-border hover:border-primary/50 text-foreground hover:scale-[1.02] active:scale-[0.98]";
    if (option === correct)
      return "bg-success/20 border-success text-success animate-bounce-once";
    if (option === selectedAnswer && !isCorrect)
      return "bg-destructive/20 border-destructive text-destructive animate-shake";
    return "bg-secondary border-border text-muted-foreground opacity-50";
  };

  return (
    <div className="space-y-5">
      {/* Sentence with blank */}
      <div className="text-center">
        <p className="font-body text-lg md:text-xl text-foreground leading-relaxed">
          {question.sentence.split("___").map((part, idx, arr) => (
            <span key={idx}>
              {part}
              {idx < arr.length - 1 && (
                <span
                  className={`inline-block mx-1 min-w-[110px] text-center font-bold border-b-2 ${
                    answered
                      ? isCorrect
                        ? "border-success text-success"
                        : "border-destructive text-destructive"
                      : "border-primary text-primary"
                  }`}
                >
                  {answered ? correct : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* Answer options */}
      <div className="grid gap-2.5">
        {options.map((option, i) => (
          <button
            key={option}
            onClick={() => !answered && onSubmit(option)}
            disabled={answered}
            style={{ animationDelay: `${i * 60}ms` }}
            className={`w-full text-left px-5 py-3 rounded-xl border-2 font-body transition-all duration-200 ${getOptionStyle(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Error Spot ---
const ErrorSpotView = ({
  question,
  answered,
  selectedAnswer,
  isCorrect,
  onSubmit,
}: {
  question: GrammarQuestion;
  answered: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  onSubmit: (a: string) => void;
}) => {
  const data = question.errorSpot!;
  const words = question.sentence.split(" ");
  const [options] = useState(() => shuffleArray(data.correctionOptions ?? [data.correction]));

  return (
    <div className="space-y-5">
      {/* Instruction */}
      <p className="text-center text-muted-foreground text-sm font-body">
        Find and correct the mistake in the sentence:
      </p>

      {/* Sentence with clickable words */}
      <div className="flex flex-wrap gap-2 justify-center">
        {words.map((word, idx) => {
          const wrongWordCount = data.wrongWord.split(" ").length;
          const isPrimaryError = idx === data.errorWordIndex;
          const isInErrorRange = idx >= data.errorWordIndex && idx < data.errorWordIndex + wrongWordCount;
          
          if (answered && isCorrect && isInErrorRange && !isPrimaryError) {
            return null; // Remove extra words in the phrase when corrected
          }

          const displayWord = (answered && isCorrect && isPrimaryError) ? data.correction : word;
          
          let style = "px-3 py-1.5 rounded-lg border-2 font-body text-base transition-all duration-200 ";
          
          if (isPrimaryError) {
            if (answered) {
              style += isCorrect
                ? "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400 font-bold"
                : "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400 font-bold line-through";
            } else {
              style += "bg-red-50 dark:bg-red-900/10 border-red-500/50 text-red-600 dark:text-red-400 font-bold";
            }
          } else {
            style += "bg-secondary border-transparent text-foreground opacity-90 cursor-default";
          }
          
          return (
            <span key={idx} className={style}>
              {displayWord}
            </span>
          );
        })}
      </div>

      {/* Choose the correct replacement */}
      {!answered && (
        <div>
          <p className="text-center text-xs font-display text-muted-foreground uppercase tracking-widest mb-3">
            Choose the correct word:
          </p>
          <div className="grid gap-2.5">
            {options.map((option, i) => (
              <button
                key={option}
                onClick={() => !answered && onSubmit(option)}
                disabled={answered}
                style={{ animationDelay: `${i * 60}ms` }}
                className="w-full text-left px-5 py-3 rounded-xl border-2 bg-secondary hover:bg-muted border-border hover:border-primary/50 text-foreground hover:scale-[1.02] active:scale-[0.98] font-body transition-all duration-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* After answering — show correction */}
      {answered && (
        <div className={`text-center space-y-2 p-4 rounded-xl border-2 ${isCorrect ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"}`}>
          {!isCorrect && (
            <p className="text-sm font-display font-semibold text-red-600">
              Your answer: <span className="line-through">{selectedAnswer}</span>
            </p>
          )}
          <p className="text-lg font-display font-bold text-green-600">
            ✅ Correct replacement: <em>{data.correction}</em>
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 italic">{data.reason}</p>
        </div>
      )}
    </div>
  );
};

// --- Multiple Choice ---
const MultipleChoiceView = ({
  question,
  answered,
  selectedAnswer,
  isCorrect,
  onSubmit,
}: {
  question: GrammarQuestion;
  answered: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  onSubmit: (a: string) => void;
}) => {
  const data = question.multipleChoice!;
  const correct = data.correctOption;
  const [options] = useState(() => shuffleArray(data.options));

  // Most items carry the stem in `question.sentence` and use
  // `multipleChoice.question` purely as a prompt ("Which option completes...").
  // The stem has to be rendered or the learner has nothing to complete.
  //
  // This view adapts to whatever shape the data is in, because the same topic
  // files are also consumed by the Telegram Quiz Bot, which renders them
  // differently. Fix display problems HERE — never by editing the shared data.
  //
  // Two cases where showing `sentence` would be wrong:
  //  1. It restates the correct answer. Some items use it as an authoring note
  //     (harmless back when this view never showed it, a giveaway now). A gapped
  //     stem is always safe — the gap is where the answer was removed; a gapless
  //     one only if it doesn't spell out an option.
  //  2. The prompt already quotes the sentence, so showing both prints it twice.
  const norm = (s: string) => s.replace(/['‘’ʼ`´]/g, "'").replace(/\s+/g, " ").trim();
  const hasGap = question.sentence.includes("___");
  const revealsAnAnswer =
    !hasGap &&
    data.options.some((opt) =>
      new RegExp(`(^|\\W)${escapeRegExp(opt.trim())}(\\W|$)`, "i").test(question.sentence),
    );
  const promptRepeatsStem = norm(data.question).includes(norm(question.sentence));
  const stemParts =
    revealsAnAnswer || promptRepeatsStem ? null : question.sentence.split("___");

  const getOptionStyle = (option: string) => {
    if (!answered)
      return "bg-secondary hover:bg-muted border-border hover:border-primary/50 text-foreground hover:scale-[1.02] active:scale-[0.98]";
    if (option === correct)
      return "bg-success/20 border-success text-success animate-bounce-once";
    if (option === selectedAnswer && !isCorrect)
      return "bg-destructive/20 border-destructive text-destructive animate-shake";
    return "bg-secondary border-border text-muted-foreground opacity-50";
  };

  return (
    <div className="space-y-5">
      {/* Reference sentence with blank */}
      {stemParts && (
        <div className="text-center">
          <p
            data-testid="mc-stem"
            className="font-body text-lg md:text-xl text-foreground leading-relaxed"
          >
            {stemParts.map((part, idx, arr) => (
              <span key={idx}>
                {part}
                {idx < arr.length - 1 && (
                  <span
                    className={`inline-block mx-1 min-w-[110px] text-center font-bold border-b-2 ${
                      answered
                        ? isCorrect
                          ? "border-success text-success"
                          : "border-destructive text-destructive"
                        : "border-primary text-primary"
                    }`}
                  >
                    {answered ? correct : "\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0"}
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>
      )}

      <p className="text-center font-body text-base text-muted-foreground">
        {data.question}
      </p>
      <div className="grid gap-2.5">
        {options.map((option, i) => (
          <button
            key={option}
            onClick={() => !answered && onSubmit(option)}
            disabled={answered}
            style={{ animationDelay: `${i * 60}ms` }}
            className={`w-full text-left px-5 py-3 rounded-xl border-2 font-body transition-all duration-200 text-sm ${getOptionStyle(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Word Transform ---
const WordTransformView = ({
  question,
  answered,
  selectedAnswer,
  isCorrect,
  onSubmit,
}: {
  question: GrammarQuestion;
  answered: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  onSubmit: (a: string) => void;
}) => {
  const data = question.wordTransform!;
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!answered) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [answered, question.id]);

  const handleSubmit = useCallback(() => {
    if (!answered && typed.trim()) {
      onSubmit(typed.trim());
    }
  }, [answered, typed, onSubmit]);

  const parts = question.sentence.split("___");
  const displayInBlank = answered ? (selectedAnswer ?? "") : (typed || null);

  return (
    <div className="space-y-5">
      <p className="text-center text-muted-foreground text-sm font-body">
        Put the verb in brackets into the correct form:
      </p>
      {/* Sentence with blank */}
      <div className="text-center space-y-2">
        <p className="font-body text-lg md:text-xl text-foreground leading-relaxed">
          {parts[0]}
          <span
            className={`inline-block mx-1 px-2 min-w-[120px] text-center font-bold border-b-2 transition-colors ${
              answered
                ? isCorrect
                  ? "border-success text-success"
                  : "border-destructive text-destructive"
                : "border-primary text-primary/60"
            }`}
          >
            {displayInBlank ?? "        "}
          </span>
          {parts[1]}
        </p>
        <p className="text-sm font-display font-semibold text-accent tracking-wide">
          ({data.baseWord})
        </p>
      </div>

      {/* Text input */}
      {!answered && (
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type your answer…"
            className="flex-1 px-4 py-3 rounded-xl border-2 border-border bg-secondary font-body text-foreground focus:outline-none focus:border-primary transition-colors"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            onClick={handleSubmit}
            disabled={!typed.trim()}
            className="px-5 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold disabled:opacity-40 hover:brightness-110 active:scale-95 transition-all"
          >
            Check
          </button>
        </div>
      )}

      {/* Answer reveal on wrong */}
      {answered && !isCorrect && (
        <div className="text-center p-3 rounded-xl border-2 border-success/40 bg-success/10">
          <p className="text-xs text-muted-foreground mb-1 font-display uppercase tracking-widest">
            Correct answer
          </p>
          <p className="font-body font-semibold text-success text-lg">{data.correctAnswer}</p>
        </div>
      )}
    </div>
  );
};

// --- Sentence Match ---

const MATCH_COLORS = [
  { bg: "bg-orange-100",  border: "border-orange-400",  text: "text-orange-700",  badge: "bg-orange-400  text-white" },
  { bg: "bg-blue-100",    border: "border-blue-400",    text: "text-blue-700",    badge: "bg-blue-400    text-white" },
  { bg: "bg-emerald-100", border: "border-emerald-400", text: "text-emerald-700", badge: "bg-emerald-400 text-white" },
  { bg: "bg-violet-100",  border: "border-violet-400",  text: "text-violet-700",  badge: "bg-violet-400  text-white" },
  { bg: "bg-pink-100",    border: "border-pink-400",    text: "text-pink-700",    badge: "bg-pink-400    text-white" },
];

const SentenceMatchView = ({
  question,
  answered,
  selectedAnswer,
  isCorrect,
  onSubmit,
}: {
  question: GrammarQuestion;
  answered: boolean;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  onSubmit: (a: string) => void;
}) => {
  const data = question.sentenceMatch!;
  const pairs = data.pairs;

  const [shuffledEndingIndices] = useState<number[]>(() =>
    shuffleArray(pairs.map((_, i) => i))
  );
  // matches[beginningIndex] = endingIndex paired with it, or null
  const [matches, setMatches] = useState<(number | null)[]>(() =>
    new Array(pairs.length).fill(null)
  );
  const [activeBeginning, setActiveBeginning] = useState<number | null>(null);

  // Decode selectedAnswer string back to matches array for review mode
  const reviewMatches: (number | null)[] | null = (() => {
    if (!answered || !selectedAnswer) return null;
    return selectedAnswer.split("||").map((endingStr) =>
      pairs.findIndex(
        (p) => p.ending.trim().toLowerCase() === endingStr.trim().toLowerCase()
      )
    );
  })();

  const displayMatches = answered ? reviewMatches : matches;

  const getPairCorrect = (beginIdx: number): boolean | null => {
    if (!answered || !displayMatches) return null;
    const matched = displayMatches[beginIdx];
    return matched !== null && matched !== -1 ? matched === beginIdx : false;
  };

  const handleBeginningClick = (idx: number) => {
    if (answered) return;
    setActiveBeginning((prev) => (prev === idx ? null : idx));
  };

  const handleEndingClick = (endingIdx: number) => {
    if (answered) return;
    if (activeBeginning !== null) {
      const next = [...matches];
      // Clear any beginning previously matched to this ending
      const prevBeginning = next.findIndex((m) => m === endingIdx);
      if (prevBeginning !== -1) next[prevBeginning] = null;
      // Assign
      next[activeBeginning] = endingIdx;
      setMatches(next);
      setActiveBeginning(null);
      // Auto-submit when all matched
      if (next.every((m) => m !== null)) {
        onSubmit(next.map((i) => pairs[i!].ending).join("||"));
      }
    } else {
      // Tap already-matched ending → un-match and re-select its beginning
      const prevBeginning = matches.findIndex((m) => m === endingIdx);
      if (prevBeginning !== -1) {
        const next = [...matches];
        next[prevBeginning] = null;
        setMatches(next);
        setActiveBeginning(prevBeginning);
      }
    }
  };


  return (
    <div className="space-y-4">
      <p className="text-center text-muted-foreground text-sm font-body">
        {activeBeginning !== null
          ? "Now tap the correct ending →"
          : "Tap a beginning, then tap its matching ending:"}
      </p>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* ── LEFT: Beginnings ── */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground text-center pb-0.5 border-b border-border">
            Beginning
          </p>
          {pairs.map((pair, i) => {
            const matchedEndingIdx = displayMatches ? displayMatches[i] : null;
            const isMatched = matchedEndingIdx !== null && matchedEndingIdx !== -1;
            const isActive = activeBeginning === i;
            const color = MATCH_COLORS[i % MATCH_COLORS.length];
            const correct = getPairCorrect(i);

            let cls =
              "relative text-left w-full px-3 py-2.5 rounded-xl border-2 font-body text-sm transition-all duration-200 flex items-start gap-2 ";
            if (answered) {
              cls += correct
                ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                : "bg-red-50 border-red-300 text-red-800";
            } else if (isActive) {
              cls += "ring-2 ring-primary ring-offset-1 border-primary bg-primary/10 shadow-sm scale-[1.02]";
            } else if (isMatched) {
              cls += `${color.bg} ${color.border} ${color.text}`;
            } else {
              cls += "bg-secondary border-border text-foreground hover:border-primary/60 hover:bg-primary/5";
            }

            return (
              <button key={i} onClick={() => handleBeginningClick(i)} disabled={answered} className={cls}>
                <span
                  className={`flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold mt-0.5 ${
                    answered
                      ? correct
                        ? "bg-emerald-400 text-white"
                        : "bg-red-400 text-white"
                      : isMatched
                      ? color.badge
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="leading-snug">{pair.beginning}</span>
              </button>
            );
          })}
        </div>

        {/* ── RIGHT: Shuffled Endings ── */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground text-center pb-0.5 border-b border-border">
            Ending
          </p>
          {shuffledEndingIndices.map((endingIdx) => {
            const matchedByBeginning = displayMatches
              ? displayMatches.findIndex((m) => m === endingIdx)
              : -1;
            const isMatched = matchedByBeginning !== -1;
            const color = isMatched ? MATCH_COLORS[matchedByBeginning % MATCH_COLORS.length] : null;
            const correct = isMatched ? getPairCorrect(matchedByBeginning) : null;
            const isHighlighted = activeBeginning !== null && !isMatched;

            let cls =
              "relative text-left w-full px-3 py-2.5 rounded-xl border-2 font-body text-sm transition-all duration-200 flex items-start gap-2 ";
            if (answered) {
              if (isMatched && correct === true)  cls += "bg-emerald-50 border-emerald-400 text-emerald-800";
              else if (isMatched && correct === false) cls += "bg-red-50 border-red-300 text-red-800";
              else cls += "bg-secondary border-border text-muted-foreground opacity-50";
            } else if (isMatched && color) {
              cls += `${color.bg} ${color.border} ${color.text}`;
            } else if (isHighlighted) {
              cls += "bg-secondary border-border text-foreground hover:border-primary hover:bg-primary/5 hover:scale-[1.02] cursor-pointer";
            } else {
              cls += "bg-secondary border-border text-foreground hover:border-primary/50";
            }

            return (
              <button key={endingIdx} onClick={() => handleEndingClick(endingIdx)} disabled={answered} className={cls}>
                {isMatched && color ? (
                  <span
                    className={`flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold mt-0.5 ${
                      answered
                        ? correct
                          ? "bg-emerald-400 text-white"
                          : "bg-red-400 text-white"
                        : color.badge
                    }`}
                  >
                    {matchedByBeginning + 1}
                  </span>
                ) : (
                  <span className="flex-shrink-0 w-5 mt-0.5" />
                )}
                <span className="leading-snug">{pairs[endingIdx].ending}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Correct pairs reveal on wrong answer */}
      {answered && !isCorrect && (
        <div className="p-3 rounded-xl border-2 border-success/40 bg-success/5 space-y-1.5">
          <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground">
            Correct matches:
          </p>
          {pairs.map((pair, i) => (
            <p key={i} className="text-sm font-body text-foreground leading-snug">
              <span className="font-semibold text-success">✓</span>{" "}
              <span className="text-foreground/80">{pair.beginning}</span>{" "}
              <span className="text-muted-foreground">→</span>{" "}
              <span className="font-medium">{pair.ending}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Explanation Panel ---
const ExplanationPanel = ({
  question,
  isCorrect,
}: {
  question: GrammarQuestion;
  isCorrect: boolean | null;
}) => (
  <div
    className={`mt-4 p-4 rounded-xl border-2 text-sm space-y-1 ${
      isCorrect
        ? "border-success/30 bg-success/5"
        : "border-primary/30 bg-primary/5"
    }`}
  >
    <p className="font-display font-semibold text-foreground text-xs uppercase tracking-widest">
      📚 {question.grammarRule}
    </p>
    <p className="font-body text-foreground">{question.explanation}</p>
    {question.tip && (
      <p className="font-body text-muted-foreground italic">💡 {question.tip}</p>
    )}
  </div>
);

// --- Question Type Labels ---

const questionTypeLabel: Record<string, string> = {
  "gap-fill": "Fill the Gap",
  "error-spot": "Spot the Error",
  "multiple-choice": "Multiple Choice",
  "word-transform": "Word Transform",
  "sentence-match": "Match the Halves",
};

// --- Main Card ---
const GrammarQuestionCard = ({
  question,
  answered,
  selectedAnswer,
  isCorrect,
  streak,
  transitioning,
  isReview = false,
  onSubmit,
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
}: GrammarQuestionCardProps) => {
  const [hintOpen, setHintOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll buttons into view after answering (fixes Mac viewport clipping)
  useEffect(() => {
    if (answered && navRef.current) {
      navRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [answered]);

  const characterPose: CharacterPose = !answered
    ? "thinking"
    : isCorrect
    ? "happy"
    : "sad";

  // Gradient border colors change based on answer state
  const getBorderColors = () => {
    if (!answered) return { primary: '#c06010', secondary: '#f07c1a', accent: '#fcc870' };
    if (isCorrect)  return { primary: '#1a7040', secondary: '#34b268', accent: '#7dd4a0' };
    return           { primary: '#8b1a1a', secondary: '#d54242', accent: '#e88888' };
  };

  const getBorderSpeed = () => {
    if (!answered) return 6;
    if (isCorrect)  return 1.5; // fast celebratory spin
    return 4;
  };

  const renderQuestionBody = () => {
    switch (question.type) {
      case "gap-fill":
        return (
          <GapFillView
            key={question.id}
            question={question}
            answered={answered}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            onSubmit={onSubmit}
          />
        );
      case "error-spot":
        return (
          <ErrorSpotView
            key={question.id}
            question={question}
            answered={answered}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            onSubmit={onSubmit}
          />
        );
      case "multiple-choice":
        return (
          <MultipleChoiceView
            key={question.id}
            question={question}
            answered={answered}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            onSubmit={onSubmit}
          />
        );
      case "word-transform":
        return (
          <WordTransformView
            key={question.id}
            question={question}
            answered={answered}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            onSubmit={onSubmit}
          />
        );
      case "sentence-match":
        return (
          <SentenceMatchView
            key={question.id}
            question={question}
            answered={answered}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            onSubmit={onSubmit}
          />
        );
    }
  };

  return (
    <div className="flex items-start gap-6 w-full">
      <GameCharacter pose={characterPose} className="flex-shrink-0 mt-4" />

      <div className="flex-1 flex flex-col gap-3">
      <BorderRotate
        gradientColors={getBorderColors()}
        backgroundColor="#ffffff"
        borderRadius={16}
        borderWidth={2}
        animationSpeed={getBorderSpeed()}
        className={`flex-1 w-full max-w-[48rem] mx-auto space-y-2.5 p-6 md:p-8 shadow-md relative overflow-hidden transition-all duration-300 ${
          transitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0 animate-slide-up"
        }`}
      >
        {/* Reaction emoji overlay */}
        {answered && isCorrect !== null && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <span
              className={`text-7xl ${isCorrect ? "animate-emoji-correct" : "animate-emoji-wrong"}`}
            >
              {isCorrect ? "🎉" : "😬"}
            </span>
          </div>
        )}

        {/* Review badge or streak badge */}
        {isReview ? (
          <div className="absolute top-0 right-0 !mt-0 bg-muted text-muted-foreground px-3 py-1 rounded-bl-xl rounded-tr-2xl font-display text-xs font-bold">
            ← Reviewing
          </div>
        ) : streak >= 2 && (
          <div
            className={`absolute top-0 right-0 !mt-0 bg-primary text-primary-foreground px-3 py-1 rounded-bl-xl rounded-tr-2xl font-display text-sm font-bold ${
              streak >= 3 ? "animate-pulse" : ""
            }`}
          >
            🔥 {streak} in a row!
          </div>
        )}

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base uppercase tracking-widest text-accent font-display font-bold">
              {questionTypeLabel[question.type]}
            </h2>
            {!answered && (
              <HintButton rule={question.grammarRule} open={hintOpen} onOpenChange={setHintOpen} />
            )}
          </div>
          {answered && !isCorrect && (
            <p className="text-sm uppercase tracking-wider text-muted-foreground font-display font-medium leading-tight">
              {question.grammarRule}
            </p>
          )}
        </div>

        {/* Question body */}
        {renderQuestionBody()}

        {/* Explanation panel — shown only on wrong answer */}
        {answered && !isCorrect && question.type !== "error-spot" && (
          <ExplanationPanel question={question} isCorrect={isCorrect} />
        )}
      </BorderRotate>

      {/* Navigation buttons — outside card, aligned with card (skips teacher column) */}
      {(canGoPrev || canGoNext) && (
        <div ref={navRef} className="flex gap-3">
          {canGoPrev && (
            <button
              onClick={onPrev}
              className="flex-1 py-2.5 rounded-xl font-display text-sm font-semibold transition-all duration-200 border-2 border-border bg-card text-foreground hover:border-primary hover:text-primary hover:scale-[1.02] active:scale-[0.98]"
            >
              ← Back
            </button>
          )}
          {canGoNext && (
            <button
              onClick={onNext}
              className="flex-1 py-2.5 rounded-xl font-display text-sm font-semibold transition-all duration-200 bg-primary text-primary-foreground shadow-md hover:brightness-110 hover:scale-[1.03] active:scale-[0.97]"
            >
              Next →
            </button>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default GrammarQuestionCard;
