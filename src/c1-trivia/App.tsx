import { useState, useCallback } from "react";
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
  question: Question;
  selectedAnswer: string;
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

const QUESTIONS_PER_ROUND = 10;

// Difficulty order: easiest → hardest
const DIFFICULTY_ORDER: QuestionType[] = ["true-false", "def-to-word", "fill-blank", "word-to-def"];

// Spread n questions evenly across difficulty tiers, always easy → hard
function assignOrderedTypes(count: number): QuestionType[] {
  return Array.from({ length: count }, (_, i) =>
    DIFFICULTY_ORDER[Math.floor((i / count) * DIFFICULTY_ORDER.length)]
  );
}

function buildQuestions(): Question[] {
  const selected = shuffle(WORDS).slice(0, QUESTIONS_PER_ROUND);
  const types = assignOrderedTypes(QUESTIONS_PER_ROUND);
  return selected.map((word, i) => generateQuestion(word, WORDS, types[i]));
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
            C1 Business
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
      className="flex gap-8 items-start w-full max-w-4xl"
    >
      {/* Teacher — desktop sidebar */}
      <div className="hidden md:flex flex-col items-center shrink-0 w-56 pt-2 select-none pointer-events-none">
        <img src={teacher} alt="Teacher reaction" className="h-56 w-auto max-w-none" draggable={false} />
        <p className="text-sm text-center text-neutral-500 mt-3 font-semibold">{message}</p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-5">

        {/* Mobile teacher */}
        <div className="flex md:hidden justify-center flex-col items-center gap-2">
          <img src={teacher} alt="Teacher reaction" className="h-36 w-auto select-none" draggable={false} />
          <p className="text-sm text-neutral-500 font-semibold">{message}</p>
        </div>

        {/* Score box */}
        <div className="rounded-2xl bg-white border border-neutral-200 px-8 py-6 text-center shadow-sm">
          <div className="font-display text-6xl font-bold text-purple-600">
            {pct}<span className="text-3xl font-normal text-neutral-400">%</span>
          </div>
          <div className="text-neutral-600 text-base mt-2">
            <span className="font-bold text-neutral-800">{score}</span> out of{" "}
            <span className="font-bold text-neutral-800">{total}</span> correct
          </div>
        </div>

        {/* Word lists — side by side */}
        <div className={`grid gap-4 ${correct.length > 0 && wrong.length > 0 ? "md:grid-cols-2" : "grid-cols-1"}`}>
          {correct.length > 0 && (
            <div>
              <p className="text-base font-bold text-green-700 mb-3">
                ✅ Words you know ({correct.length})
              </p>
              <div className="rounded-xl border border-green-100 bg-white divide-y divide-neutral-100 shadow-sm">
                {correct.map((r, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3.5">
                    <span className="font-semibold text-neutral-800">{r.word.word}</span>
                    <span className="text-xs text-neutral-400 shrink-0 ml-3">{TYPE_LABEL[r.type]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {wrong.length > 0 && (
            <div>
              <p className="text-base font-bold text-red-600 mb-3">
                ❌ Words to practise ({wrong.length})
              </p>
              <div className="rounded-xl border border-red-100 bg-white divide-y divide-neutral-100 shadow-sm">
                {wrong.map((r, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3.5">
                    <span className="font-semibold text-neutral-800">{r.word.word}</span>
                    <span className="text-xs text-neutral-400 shrink-0 ml-3">{TYPE_LABEL[r.type]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 pt-1">
          {wrong.length > 0 && (
            <button
              onClick={onPracticeWeak}
              className="flex-1 rounded-xl bg-red-500 text-white font-display font-bold py-4 text-base hover:bg-red-600 transition-colors shadow-sm"
            >
              Practice weak words
            </button>
          )}
          <button
            onClick={onReplay}
            className="flex-1 rounded-xl bg-purple-600 text-white font-display font-bold py-4 text-base hover:bg-purple-700 transition-colors"
          >
            <RotateCcw size={16} className="inline mr-2 -mt-0.5" />
            Play again
          </button>
          <button
            onClick={onMenu}
            className="flex-1 rounded-xl bg-white border-2 border-neutral-200 text-neutral-700 font-display font-bold py-4 text-base hover:border-neutral-400 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Fill-blank text input
// ---------------------------------------------------------------------------

function FillBlankInput({
  isAnswered,
  onSubmit,
}: {
  isAnswered: boolean;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim() || isAnswered) return;
    onSubmit(value.trim());
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        disabled={isAnswered}
        placeholder="Type the missing word…"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-800 placeholder:font-normal placeholder:text-neutral-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 disabled:opacity-60 transition-colors"
      />
      <button
        onClick={submit}
        disabled={isAnswered || !value.trim()}
        className="rounded-xl bg-purple-600 text-white px-5 py-3 text-sm font-semibold hover:bg-purple-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Check
      </button>
    </div>
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
  const [viewIndex, setViewIndex] = useState(0);
  // Indexed by question position; null = not yet answered
  const [results, setResults] = useState<(QuestionResult | null)[]>(
    () => Array(questions.length).fill(null)
  );

  const question = questions[viewIndex];
  const viewedResult = results[viewIndex];
  const isAnswered = viewedResult !== null;
  const isCorrect = viewedResult ? viewedResult.wasCorrect : null;
  const teacher = isCorrect === true ? teacherCorrect : isCorrect === false ? teacherSad : teacherThinking;
  const score = results.filter((r) => r?.wasCorrect).length;

  const normalize = (s: string) => s.trim().toLowerCase();

  const handleAnswer = useCallback(
    (option: string) => {
      if (results[viewIndex] !== null) return; // already answered
      const correct = question.type === "fill-blank"
        ? normalize(option) === normalize(question.correctAnswer)
        : option === question.correctAnswer;
      setResults((prev) => {
        const next = [...prev];
        next[viewIndex] = { word: question.targetWord, wasCorrect: correct, type: question.type, question, selectedAnswer: option };
        return next;
      });
    },
    [results, viewIndex, question]
  );

  function handleNext() {
    if (viewIndex + 1 >= questions.length) {
      onFinish(score, results as QuestionResult[]);
    } else {
      setViewIndex((i) => i + 1);
    }
  }

  function getOptionState(option: string): "default" | "correct" | "wrong" | "disabled" {
    if (!isAnswered) return "default";
    if (option === question.correctAnswer) return "correct";
    if (option === viewedResult!.selectedAnswer) return "wrong";
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
          C1 Business
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-500 font-medium">
            Score: <span className="font-bold text-neutral-800">{score}</span>
          </span>
          <span className="text-sm text-neutral-400">
            {viewIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      <ProgressBar current={viewIndex + 1} total={questions.length} />

      {/* Main card */}
      <div className="flex gap-6 items-start">
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

        {/* Question + options */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewIndex}
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

            {/* Options / Input */}
            {question.type === "fill-blank" ? (
              isAnswered ? (
                <div className="flex flex-col gap-2.5">
                  <div className={[
                    "rounded-xl px-5 py-3.5 border text-sm",
                    isCorrect ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-700",
                  ].join(" ")}>
                    <span className="text-xs font-semibold uppercase tracking-wide opacity-60 block mb-0.5">Your answer</span>
                    <span className="font-semibold">{viewedResult!.selectedAnswer}</span>
                  </div>
                  {!isCorrect && (
                    <div className="rounded-xl px-5 py-3.5 border bg-green-50 border-green-300 text-green-800 text-sm">
                      <span className="text-xs font-semibold uppercase tracking-wide opacity-60 block mb-0.5">Correct answer</span>
                      <span className="font-semibold">{question.correctAnswer}</span>
                    </div>
                  )}
                </div>
              ) : (
                <FillBlankInput isAnswered={false} onSubmit={handleAnswer} />
              )
            ) : (
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
            )}

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
                    <><CheckCircle2 size={16} /> Correct!</>
                  ) : (
                    <><XCircle size={16} /> The answer was: <span className="font-bold ml-1">{question.correctAnswer}</span></>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back / Next navigation */}
            {(viewIndex > 0 || isAnswered) && (
              <div className="flex gap-3">
                {viewIndex > 0 && (
                  <button
                    onClick={() => setViewIndex((i) => i - 1)}
                    className="flex-1 rounded-xl bg-white border-2 border-neutral-200 text-neutral-700 font-display font-bold py-3.5 text-sm hover:border-neutral-400 transition-colors"
                  >
                    ← Back
                  </button>
                )}
                {isAnswered && (
                  <button
                    onClick={handleNext}
                    className="flex-1 rounded-xl bg-purple-600 text-white font-display font-bold py-3.5 text-sm hover:bg-purple-700 transition-colors"
                  >
                    {viewIndex + 1 >= questions.length ? "Finish ✓" : "Next →"}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
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
    const types = assignOrderedTypes(weakWords.length);
    const newQuestions = weakWords.map((word, i) => generateQuestion(word, WORDS, types[i]));
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
              <p className="text-xs text-neutral-400">C1 Business · by Englishpusher</p>
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
      <main className="flex flex-1 items-start justify-center px-6 py-14">
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
