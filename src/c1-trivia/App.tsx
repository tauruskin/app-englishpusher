import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { WORDS, type C1Word } from "./data.ts";
import teacherThinking from "./teacher-thinking.png";
import teacherCorrect from "./teacher-correct.png";
import teacherSad from "./teacher-sad.png";
import teacherCelebrate from "./teacher-celebrate.png";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type QuestionType = "fill-blank" | "def-to-word" | "word-to-def" | "true-false";
type Phase = "start" | "playing" | "end";

interface Question {
  type: QuestionType;
  targetWord: C1Word;
  options: string[];
  correctAnswer: string;
  shownDefinition?: string; // for true-false, may be a wrong definition
}

interface QuestionResult {
  word: C1Word;
  wasCorrect: boolean;
  type: QuestionType;
}

const TYPE_LABEL: Record<QuestionType, string> = {
  "fill-blank":  "Fill in blank",
  "def-to-word": "Match definition",
  "word-to-def": "Match meaning",
  "true-false":  "True / False",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDistractors(all: C1Word[], exclude: C1Word, count: number): C1Word[] {
  return shuffle(all.filter((w) => w.word !== exclude.word)).slice(0, count);
}

function generateQuestion(word: C1Word, all: C1Word[], type: QuestionType): Question {
  const distractors = getDistractors(all, word, 3);

  switch (type) {
    case "fill-blank":
      return {
        type,
        targetWord: word,
        options: shuffle([word.word, ...distractors.map((d) => d.word)]),
        correctAnswer: word.word,
      };
    case "def-to-word":
      return {
        type,
        targetWord: word,
        options: shuffle([word.word, ...distractors.map((d) => d.word)]),
        correctAnswer: word.word,
      };
    case "word-to-def":
      return {
        type,
        targetWord: word,
        options: shuffle([word.definition, ...distractors.map((d) => d.definition)]),
        correctAnswer: word.definition,
      };
    case "true-false": {
      const isTrue = Math.random() > 0.5;
      const shownDefinition = isTrue ? word.definition : distractors[0].definition;
      return {
        type,
        targetWord: word,
        options: ["True", "False"],
        correctAnswer: isTrue ? "True" : "False",
        shownDefinition,
      };
    }
  }
}

const QUESTION_TYPES: QuestionType[] = ["fill-blank", "def-to-word", "word-to-def", "true-false"];
const QUESTIONS_PER_ROUND = 10;

function buildQuestions(): Question[] {
  const selected = shuffle(WORDS).slice(0, QUESTIONS_PER_ROUND);
  return selected.map((word) => {
    const type = QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)];
    return generateQuestion(word, WORDS, type);
  });
}

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
      <motion.div
        className="h-2 rounded-full bg-brand"
        initial={false}
        animate={{ width: `${(current / total) * 100}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Option button
// ---------------------------------------------------------------------------

function OptionButton({
  label,
  onClick,
  state,
}: {
  label: string;
  onClick: () => void;
  state: "default" | "correct" | "wrong" | "disabled";
}) {
  const base = "w-full rounded-xl px-4 py-3 text-sm font-semibold text-left transition-all duration-200 border focus:outline-none";
  const styles = {
    default: `${base} bg-white border-neutral-200 text-neutral-800 hover:border-brand/50 hover:shadow-sm cursor-pointer`,
    correct: `${base} bg-green-50 border-green-400 text-green-800 animate-pop-in`,
    wrong: `${base} bg-red-50 border-red-400 text-red-700 animate-shake`,
    disabled: `${base} bg-white border-neutral-200 text-neutral-400 cursor-default opacity-60`,
  };

  return (
    <button onClick={state === "default" ? onClick : undefined} className={styles[state]}>
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Question label helpers
// ---------------------------------------------------------------------------

function QuestionPrompt({ question }: { question: Question }) {
  const q = question;
  switch (q.type) {
    case "fill-blank":
      return (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            Complete the sentence
          </p>
          <p className="text-neutral-800 text-base leading-relaxed font-medium">
            {q.targetWord.example.replace("___", "______")}
          </p>
        </div>
      );
    case "def-to-word":
      return (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            Which word matches this definition?
          </p>
          <p className="text-neutral-800 text-base leading-relaxed italic">
            "{q.targetWord.definition}"
          </p>
        </div>
      );
    case "word-to-def":
      return (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            What does this word mean?
          </p>
          <p className="font-display font-bold text-2xl text-neutral-900">
            {q.targetWord.word}
            <span className="ml-2 text-sm font-normal text-neutral-400">
              ({q.targetWord.partOfSpeech})
            </span>
          </p>
        </div>
      );
    case "true-false":
      return (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
            True or False?
          </p>
          <p className="text-neutral-800 text-base leading-relaxed">
            <span className="font-display font-bold text-neutral-900">{q.targetWord.word}</span>
            {" "}means: <span className="italic">"{q.shownDefinition}"</span>
          </p>
        </div>
      );
  }
}

// ---------------------------------------------------------------------------
// Start screen
// ---------------------------------------------------------------------------

function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex gap-8 items-start w-full max-w-4xl"
    >
      {/* Teacher — desktop sidebar */}
      <div className="hidden md:flex flex-col items-center shrink-0 w-56 pt-2 select-none pointer-events-none">
        <div className="relative mb-2 rounded-2xl rounded-bl-none bg-white border border-neutral-200 px-5 py-3 shadow-sm self-start">
          <p className="font-display font-semibold text-neutral-800 text-sm">
            Ready to test your C1 vocabulary? 🧠
          </p>
          <div className="absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 bg-white border-r border-b border-neutral-200" />
        </div>
        <img
          src={teacherThinking}
          alt="Teacher"
          className="h-56 w-auto"
          draggable={false}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col gap-5">
        {/* Mobile teacher */}
        <div className="flex md:hidden justify-center">
          <img src={teacherThinking} alt="Teacher" className="h-36 w-auto select-none" draggable={false} />
        </div>

        <div className="flex flex-col gap-1">
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 uppercase tracking-wide w-fit">
            C1 Advanced
          </span>
          <h2 className="font-display text-3xl font-bold text-neutral-900 mt-2">
            Vocabulary Trivia
          </h2>
          <p className="text-neutral-500 text-sm mt-1">
            10 questions · 4 types · test your advanced English vocabulary
          </p>
        </div>

        <div className="rounded-xl bg-white border border-neutral-200 px-4 py-3">
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">
            Question types
          </p>
          <ul className="flex flex-col gap-1 text-sm text-neutral-600">
            <li>· Fill in the blank</li>
            <li>· Match word to definition</li>
            <li>· Match definition to word</li>
            <li>· True or False</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full rounded-xl bg-purple-600 text-white font-display font-bold py-3.5 text-base hover:bg-purple-700 transition-colors shadow-sm"
        >
          Start Quiz
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// End screen
// ---------------------------------------------------------------------------

function EndScreen({
  score,
  total,
  results,
  onReplay,
  onMenu,
  onPracticeWeak,
}: {
  score: number;
  total: number;
  results: QuestionResult[];
  onReplay: () => void;
  onMenu: () => void;
  onPracticeWeak: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const teacher = pct >= 90 ? teacherCelebrate : pct >= 50 ? teacherCorrect : teacherSad;
  const message = pct >= 90 ? "Outstanding! 🎉" : pct >= 70 ? "Well done! 👏" : pct >= 50 ? "Good effort! 💪" : "Keep practising! 📚";

  const correct = results.filter((r) => r.wasCorrect);
  const wrong = results.filter((r) => !r.wasCorrect);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex gap-8 items-start w-full max-w-3xl"
    >
      {/* Teacher — desktop sidebar */}
      <div className="hidden md:flex flex-col items-center shrink-0 w-40 pt-2 select-none pointer-events-none">
        <img src={teacher} alt="Teacher reaction" className="h-52 w-auto" draggable={false} />
        <p className="text-xs text-center text-neutral-500 mt-2 font-medium">{message}</p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-4">

        {/* Mobile teacher */}
        <div className="flex md:hidden justify-center">
          <img src={teacher} alt="Teacher reaction" className="h-32 w-auto select-none" draggable={false} />
        </div>

        {/* Score box */}
        <div className="rounded-2xl bg-white border border-neutral-200 px-6 py-5 text-center shadow-sm">
          <div className="font-display text-5xl font-bold text-purple-600">
            {pct}<span className="text-2xl font-normal text-neutral-400">%</span>
          </div>
          <div className="text-neutral-500 text-sm mt-1">
            <span className="font-semibold text-neutral-700">{score}</span> out of{" "}
            <span className="font-semibold text-neutral-700">{total}</span> correct
          </div>
        </div>

        {/* Words you know */}
        {correct.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-green-700 mb-2">
              ✅ Words you know ({correct.length})
            </p>
            <div className="max-h-44 overflow-y-auto rounded-xl border border-neutral-200 bg-white divide-y divide-neutral-100">
              {correct.map((r, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5">
                  <span className="font-semibold text-neutral-800 text-sm">{r.word.word}</span>
                  <span className="text-xs text-neutral-400">{TYPE_LABEL[r.type]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Words to practice */}
        {wrong.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-red-600 mb-2">
              ❌ Words to practise ({wrong.length})
            </p>
            <div className="max-h-44 overflow-y-auto rounded-xl border border-neutral-200 bg-white divide-y divide-neutral-100">
              {wrong.map((r, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2.5">
                  <span className="font-semibold text-neutral-800 text-sm">{r.word.word}</span>
                  <span className="text-xs text-neutral-400">{TYPE_LABEL[r.type]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          {wrong.length > 0 && (
            <button
              onClick={onPracticeWeak}
              className="flex-1 rounded-xl bg-red-500 text-white font-display font-semibold py-3 text-sm hover:bg-red-600 transition-colors shadow-sm"
            >
              Practice weak words
            </button>
          )}
          <button
            onClick={onReplay}
            className="flex-1 rounded-xl bg-purple-600 text-white font-display font-semibold py-3 text-sm hover:bg-purple-700 transition-colors"
          >
            <RotateCcw size={14} className="inline mr-1.5 -mt-0.5" />
            Play again
          </button>
          <button
            onClick={onMenu}
            className="flex-1 rounded-xl bg-white border border-neutral-200 text-neutral-700 font-display font-semibold py-3 text-sm hover:border-neutral-400 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Game screen
// ---------------------------------------------------------------------------

function GameScreen({
  questions,
  onFinish,
}: {
  questions: Question[];
  onFinish: (score: number, results: QuestionResult[]) => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const resultsRef = useRef<QuestionResult[]>([]);

  const question = questions[index];
  const isCorrect = selected !== null ? selected === question.correctAnswer : null;
  const teacher = isCorrect === true ? teacherCorrect : isCorrect === false ? teacherSad : teacherThinking;

  const handleAnswer = useCallback(
    (option: string) => {
      if (isAnswered) return;
      const correct = option === question.correctAnswer;
      setSelected(option);
      setIsAnswered(true);
      if (correct) setScore((s) => s + 1);
      resultsRef.current.push({ word: question.targetWord, wasCorrect: correct, type: question.type });
    },
    [isAnswered, question]
  );

  // Auto-advance after feedback
  useEffect(() => {
    if (!isAnswered) return;
    const timer = setTimeout(() => {
      if (index + 1 >= questions.length) {
        const finalScore = score + (selected === question.correctAnswer ? 1 : 0);
        onFinish(finalScore, resultsRef.current);
      } else {
        setIndex((i) => i + 1);
        setSelected(null);
        setIsAnswered(false);
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [isAnswered, index, questions.length, onFinish, score, selected, question.correctAnswer]);

  const currentScore = score;

  function getOptionState(option: string): "default" | "correct" | "wrong" | "disabled" {
    if (!isAnswered) return "default";
    if (option === question.correctAnswer) return "correct";
    if (option === selected) return "wrong";
    return "disabled";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl flex flex-col gap-5"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4">
        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
          C1 Advanced
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-500 font-medium">
            Score: <span className="font-bold text-neutral-800">{currentScore}</span>
          </span>
          <span className="text-sm text-neutral-400">
            {index + 1} / {questions.length}
          </span>
        </div>
      </div>

      <ProgressBar current={index + 1} total={questions.length} />

      {/* Main card */}
      <div className="flex gap-6 items-start">
        {/* Question + options */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
            className="flex-1 flex flex-col gap-4"
          >
            {/* Question card */}
            <div className="rounded-2xl bg-white border border-neutral-200 px-5 py-5 shadow-sm">
              <QuestionPrompt question={question} />
            </div>

            {/* Options */}
            <div className={`grid gap-2.5 ${question.type === "true-false" ? "grid-cols-2" : "grid-cols-1"}`}>
              {question.options.map((option) => (
                <OptionButton
                  key={option}
                  label={option}
                  onClick={() => handleAnswer(option)}
                  state={getOptionState(option)}
                />
              ))}
            </div>

            {/* Feedback banner */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={[
                    "rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-semibold",
                    isCorrect
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-700",
                  ].join(" ")}
                >
                  {isCorrect ? (
                    <>
                      <CheckCircle2 size={16} />
                      Correct!
                    </>
                  ) : (
                    <>
                      <XCircle size={16} />
                      The answer was: <span className="font-bold ml-1">{question.correctAnswer}</span>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Teacher character — desktop only */}
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
              className="h-56 w-auto"
              draggable={false}
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Root App
// ---------------------------------------------------------------------------

export default function App() {
  const [phase, setPhase] = useState<Phase>("start");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);

  function startGame() {
    setQuestions(buildQuestions());
    setPhase("playing");
  }

  function handleFinish(score: number, res: QuestionResult[]) {
    setFinalScore(score);
    setResults(res);
    setPhase("end");
  }

  function practiceWeakWords() {
    const weakWords = results.filter((r) => !r.wasCorrect).map((r) => r.word);
    const newQuestions = weakWords.map((word) => {
      const type = QUESTION_TYPES[Math.floor(Math.random() * QUESTION_TYPES.length)];
      return generateQuestion(word, WORDS, type);
    });
    setQuestions(newQuestions);
    setPhase("playing");
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-700/50 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Englishpusher logo" className="h-8 w-auto" />
            <div>
              <h1 className="font-display text-base font-bold leading-tight text-white">
                Vocabulary Trivia
              </h1>
              <p className="text-xs text-neutral-400">C1 Advanced · by Englishpusher</p>
            </div>
          </div>
          <a
            href="https://app.englishpusher.in.ua"
            className="text-xs text-neutral-400 hover:text-brand transition-colors"
          >
            ← All apps
          </a>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-start justify-center px-6 py-8">
        <AnimatePresence mode="wait">
          {phase === "start" && (
            <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <StartScreen onStart={startGame} />
            </motion.div>
          )}
          {phase === "playing" && (
            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center">
              <GameScreen questions={questions} onFinish={handleFinish} />
            </motion.div>
          )}
          {phase === "end" && (
            <motion.div key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EndScreen
                score={finalScore}
                total={questions.length}
                results={results}
                onReplay={startGame}
                onMenu={() => setPhase("start")}
                onPracticeWeak={practiceWeakWords}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-700/50 px-6 py-4">
        <div className="mx-auto max-w-4xl text-center text-sm text-neutral-400">
          Copyright &copy; 2026 &mdash;{" "}
          <a href="https://englishpusher.in.ua" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand/80 transition-colors">
            Englishpusher
          </a>
        </div>
      </footer>
    </div>
  );
}
