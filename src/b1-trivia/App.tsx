import {
  useState, useCallback, useEffect, useRef, useMemo,
  type ReactNode, type CSSProperties,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";
import { AppHeader, AppFooter } from "../shared/AppShell.tsx";
import { TriviaSaveStatus } from "../shared/TriviaSave.tsx";
import confetti from "canvas-confetti";
import { TOPICS, type Topic, type B1Word } from "../b1-flashcards/data.ts";
import teacherThinking from "../assets/teacher-thinking.png";
import teacherCorrect from "../assets/teacher-correct.png";
import teacherSad from "../assets/teacher-sad.png";
import teacherCelebrate from "../assets/teacher-celebrate.png";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type QuestionType =
  | "en-to-native"
  | "native-to-en"
  | "type-word"
  | "true-false"
  | "matching"
  | "sentence-completion";

type Phase = "select" | "playing" | "end";

interface Question {
  type: QuestionType;
  words: B1Word[];        // matching: 5 words; others: [targetWord]
  options: string[];       // MC options; empty for type-word / matching
  correctAnswer: string;
  shownTranslation?: string; // true-false only
}

interface AnswerResult {
  word: B1Word;
  questionType: QuestionType;
  correct: boolean;
  answer: string;
}

const TYPE_LABEL: Record<QuestionType, string> = {
  "en-to-native":        "En → Ua",
  "native-to-en":        "Ua → En",
  "type-word":           "Type the Word",
  "true-false":          "True / False",
  "matching":            "Match the Pairs",
  "sentence-completion": "Complete Sentence",
};

// ---------------------------------------------------------------------------
// Web Audio API — synthesised sounds
// ---------------------------------------------------------------------------

let _audioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext {
  if (!_audioCtx) _audioCtx = new AudioContext();
  return _audioCtx;
}

function playTone(
  freq: number, startOffset: number, duration: number,
  type: OscillatorType = "sine", volume = 0.25,
) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime + startOffset);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startOffset + duration);
    osc.start(ctx.currentTime + startOffset);
    osc.stop(ctx.currentTime + startOffset + duration);
  } catch { /* silently ignore — AudioContext may not be available */ }
}

function playCorrectSound() {
  playTone(523.25, 0,    0.12, "sine", 0.25); // C5
  playTone(659.25, 0.13, 0.22, "sine", 0.25); // E5
}

function playWrongSound() {
  playTone(220, 0,    0.15, "sawtooth", 0.15); // A3
  playTone(180, 0.12, 0.25, "sawtooth", 0.12); // ~F#3
}

// ---------------------------------------------------------------------------
// Web Speech API — TTS
// ---------------------------------------------------------------------------

const PREFERRED_VOICES = ["Daniel", "Karen", "Samantha"];

function getEnVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  for (const name of PREFERRED_VOICES) {
    const v = voices.find(v => v.name.includes(name) && v.lang.startsWith("en"));
    if (v) return v;
  }
  return voices.find(v => v.lang === "en-US") ?? voices.find(v => v.lang.startsWith("en")) ?? null;
}

function speakText(text: string, muted: boolean) {
  if (muted || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.85;
  const voice = getEnVoice();
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

// ---------------------------------------------------------------------------
// Question generation
// ---------------------------------------------------------------------------

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDistractors(pool: B1Word[], exclude: B1Word[], count: number): B1Word[] {
  return shuffle(pool.filter(w => !exclude.some(e => e.word === w.word))).slice(0, count);
}

function makeQuestion(word: B1Word, pool: B1Word[], type: QuestionType): Question {
  const dist = getDistractors(pool, [word], 3);
  switch (type) {
    case "en-to-native":
      return { type, words: [word], options: shuffle([word.translation, ...dist.map(d => d.translation)]), correctAnswer: word.translation };
    case "native-to-en":
      return { type, words: [word], options: shuffle([word.word, ...dist.map(d => d.word)]), correctAnswer: word.word };
    case "type-word":
      return { type, words: [word], options: [], correctAnswer: word.word };
    case "true-false": {
      const isTrue = Math.random() > 0.5;
      return { type, words: [word], options: ["true", "false"], correctAnswer: isTrue ? "true" : "false", shownTranslation: isTrue ? word.translation : dist[0].translation };
    }
    case "sentence-completion":
      if (!word.example?.includes("___")) return makeQuestion(word, pool, "en-to-native");
      return { type, words: [word], options: shuffle([word.word, ...dist.map(d => d.word)]), correctAnswer: word.word };
    case "matching":
      return { type, words: [word], options: [], correctAnswer: "matched" }; // handled in batch
  }
}

function generateQuestions(pool: B1Word[]): Question[] {
  const shuffled = shuffle([...pool]);
  const result: Question[] = [];

  // Matching first — 25% of pool, groups of 5
  const matchCount = Math.max(5, Math.round(shuffled.length * 0.25 / 5) * 5);
  const matchWords = shuffled.slice(0, Math.min(matchCount, shuffled.length));
  const rest = shuffled.slice(matchWords.length);

  for (let i = 0; i < matchWords.length; i += 5) {
    const group = matchWords.slice(i, i + 5);
    if (group.length >= 2) {
      result.push({ type: "matching", words: group, options: [], correctAnswer: "matched" });
    } else {
      rest.unshift(...group);
    }
  }

  // Remaining — 4 difficulty zones
  const zones: QuestionType[] = ["en-to-native", "true-false", "type-word", "sentence-completion"];
  const zoneSize = Math.ceil(rest.length / 4);
  rest.forEach((word, i) => {
    const zone = Math.min(Math.floor(i / zoneSize), 3);
    result.push(makeQuestion(word, pool, zones[zone]));
  });

  return result;
}

function checkAnswer(question: Question, answer: string): boolean {
  if (question.type === "matching") return answer === "matched";
  if (question.type === "type-word") return answer.trim().toLowerCase() === question.correctAnswer.toLowerCase();
  return answer === question.correctAnswer;
}

function getAdvanceDelay(type: QuestionType, correct: boolean): number {
  if (type === "matching") return 2000;
  if (type === "type-word") return correct ? 2000 : 3000;
  if (type === "sentence-completion") return correct ? 2000 : 4000;
  return 1000;
}

// ---------------------------------------------------------------------------
// Small components
// ---------------------------------------------------------------------------

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between items-center font-display text-sm">
        <span className="text-neutral-400">
          Question <span className="text-neutral-800 font-semibold">{Math.min(current + 1, total)}</span> of {total}
        </span>
        <span className="text-blue-600 font-semibold">{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

type Pose = "idle" | "thinking" | "happy" | "sad" | "celebrate";

const POSE_MAP: Record<Pose, { src: string; cls: string }> = {
  idle:      { src: teacherThinking,  cls: "animate-character-idle" },
  thinking:  { src: teacherThinking,  cls: "animate-character-think" },
  happy:     { src: teacherCorrect,   cls: "animate-character-jump" },
  sad:       { src: teacherSad,       cls: "animate-shake" },
  celebrate: { src: teacherCelebrate, cls: "animate-character-celebrate" },
};

function TeacherCharacter({ pose }: { pose: Pose }) {
  const { src, cls } = POSE_MAP[pose];
  return (
    <div className={`hidden md:flex items-end justify-center shrink-0 w-52 select-none pointer-events-none ${cls}`}>
      <img src={src} alt="" width={270} height={405} className="object-contain max-w-full h-56 w-auto" draggable={false} />
    </div>
  );
}

function SpeakerButton({ word, onSpeak }: { word: string; onSpeak: (w: string) => void }) {
  return (
    <button onClick={e => { e.stopPropagation(); onSpeak(word); }}
      className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 text-neutral-400 hover:text-blue-500 transition-colors shrink-0"
      aria-label={`Pronounce ${word}`}>
      <Volume2 size={13} className="md:hidden" />
      <Volume2 size={16} className="hidden md:block" />
    </button>
  );
}

// Gradient border with variable speed
function GradientBorder({ children, state = "neutral" }: { children: ReactNode; state?: "neutral" | "correct" | "wrong" }) {
  const cfg = {
    neutral: { c1: "#c06010", c2: "#f07c1a", c3: "#fcc870", speed: 6 },
    correct: { c1: "#1a7040", c2: "#34b268", c3: "#7dd4a0", speed: 1.5 },
    wrong:   { c1: "#8b1a1a", c2: "#d54242", c3: "#e88888", speed: 4 },
  }[state];
  return (
    <div
      className="gradient-border-auto rounded-2xl relative"
      style={{
        "--animation-duration": `${cfg.speed}s`,
        border: "2px solid transparent",
        backgroundImage: `linear-gradient(#ffffff, #ffffff), conic-gradient(from var(--gradient-angle, 0deg), ${cfg.c1}, ${cfg.c2}, ${cfg.c3}, ${cfg.c1})`,
        backgroundClip: "padding-box, border-box",
        backgroundOrigin: "padding-box, border-box",
      } as CSSProperties}
    >
      <div className="rounded-[14px] px-3 py-4 md:px-6 md:py-8">{children}</div>
    </div>
  );
}

function OptionButton({ label, onClick, state, centered }: { label: string; onClick: () => void; state: "default" | "correct" | "wrong" | "disabled"; centered?: boolean }) {
  const cls = {
    default:  "bg-white border-neutral-200 text-neutral-800 hover:border-blue-400/60 hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
    correct:  "bg-green-50 border-green-400 text-green-800 animate-bounce-once",
    wrong:    "bg-red-50 border-red-400 text-red-700 animate-shake",
    disabled: "bg-white border-neutral-200 text-neutral-400 cursor-default opacity-50",
  }[state];
  return (
    <button onClick={state === "default" ? onClick : undefined}
      className={`w-full rounded-xl px-4 py-3 md:py-5 text-sm font-semibold transition-all duration-200 border focus:outline-none ${centered ? "text-center" : "text-left"} ${cls}`}>
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Matching Card
// ---------------------------------------------------------------------------

function MatchingCard({
  words, onSubmit, isReviewing, onSpeak, onMistake,
}: {
  words: B1Word[]; onSubmit: (a: string) => void; isReviewing: boolean; onSpeak: (w: string) => void; onMistake?: (wordKey: string) => void;
}) {
  const shuffledUa = useMemo(() => shuffle(words.map(w => w.translation)), []);
  const initPairs = isReviewing ? new Set(words.map(w => w.word)) : new Set<string>();
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [correctPairs, setCorrectPairs] = useState<Set<string>>(initPairs);
  const [shakingItems, setShakingItems] = useState<Set<string>>(new Set());
  const [allDone, setAllDone] = useState(isReviewing);

  useEffect(() => {
    if (allDone && !isReviewing) {
      onSubmit("matched");
    }
  }, [allDone, isReviewing, onSubmit]);

  function handleEnClick(word: B1Word) {
    if (correctPairs.has(word.word) || allDone || isReviewing) return;
    setSelectedEn(prev => prev === word.word ? null : word.word);
  }

  function handleUaClick(translation: string) {
    if (!selectedEn || allDone || isReviewing) return;
    const target = words.find(w => w.word === selectedEn);
    if (!target) return;
    if (target.translation === translation) {
      const next = new Set([...correctPairs, selectedEn]);
      setCorrectPairs(next);
      setSelectedEn(null);
      if (next.size === words.length) setAllDone(true);
    } else {
      onMistake?.(selectedEn);
      setShakingItems(new Set([selectedEn, translation]));
      setSelectedEn(null);
      setTimeout(() => setShakingItems(new Set()), 500);
    }
  }

  return (
    <div className="relative">
      {allDone && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="text-7xl animate-emoji-correct">🎉</span>
        </div>
      )}
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 mb-4">
        Click an English word, then click its Ukrainian translation
      </p>
      <div className="grid grid-cols-[1fr_1.15fr] gap-2 md:gap-4">
        {/* English words */}
        <div className="flex flex-col gap-2 md:gap-4">
          {words.map(word => {
            const matched = correctPairs.has(word.word);
            const selected = selectedEn === word.word;
            const shaking = shakingItems.has(word.word);
            return (
              <div key={word.word} className="flex items-center gap-1">
                <button
                  onClick={() => handleEnClick(word)}
                  className={[
                    "flex-1 rounded-xl px-2.5 py-3 md:px-4 md:py-5 text-xs md:text-sm font-semibold text-left border transition-all duration-150",
                    matched  ? "bg-green-50 border-green-400 text-green-800 animate-bounce-once" :
                    selected ? "bg-[#f07c1a]/10 border-[#f07c1a] text-neutral-800" :
                               "bg-white border-neutral-200 text-neutral-800 hover:border-blue-400/60 cursor-pointer",
                    shaking ? "animate-shake" : "",
                  ].join(" ")}
                >
                  {word.word}
                </button>
                {!matched && <SpeakerButton word={word.word} onSpeak={onSpeak} />}
              </div>
            );
          })}
        </div>
        {/* Ukrainian translations */}
        <div className="flex flex-col gap-2 md:gap-4">
          {shuffledUa.map(translation => {
            const matchedWord = words.find(w => correctPairs.has(w.word) && w.translation === translation);
            const matched = !!matchedWord;
            const shaking = shakingItems.has(translation);
            return (
              <button
                key={translation}
                onClick={() => handleUaClick(translation)}
                className={[
                  "rounded-xl px-2.5 py-3 md:px-3 md:py-5 text-xs md:text-sm font-semibold text-left border transition-all duration-150 leading-snug",
                  matched     ? "bg-green-50 border-green-400 text-green-800 animate-bounce-once" :
                  selectedEn  ? "bg-white border-neutral-200 text-neutral-800 hover:border-blue-400/60 cursor-pointer" :
                                "bg-white border-neutral-200 text-neutral-400 cursor-default",
                  shaking ? "animate-shake" : "",
                ].join(" ")}
              >
                {translation}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Question prompt (non-matching types)
// ---------------------------------------------------------------------------

function QuestionPrompt({ question, onSpeak }: { question: Question; onSpeak: (w: string) => void }) {
  const word = question.words[0];
  switch (question.type) {
    case "en-to-native":
      return (
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">What does this word mean?</p>
          <div className="flex items-center gap-2">
            <p className="font-display font-bold text-3xl text-neutral-900">{word.word}</p>
            <SpeakerButton word={word.word} onSpeak={onSpeak} />
          </div>
        </div>
      );
    case "native-to-en":
      return (
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Which English word matches?</p>
          <div className="flex items-center gap-2">
            <p className="font-display font-bold text-3xl text-neutral-900">{word.translation}</p>
            <SpeakerButton word={word.word} onSpeak={onSpeak} />
          </div>
        </div>
      );
    case "type-word":
      return (
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Type the English word:</p>
          <div className="flex items-center gap-2">
            <p className="font-display font-bold text-3xl text-neutral-900">{word.translation}</p>
            <SpeakerButton word={word.word} onSpeak={onSpeak} />
          </div>
        </div>
      );
    case "true-false":
      return (
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Does this translation match the word?</p>
          <div className="flex items-center gap-2">
            <p className="font-display font-bold text-3xl text-neutral-900">{word.word}</p>
            <SpeakerButton word={word.word} onSpeak={onSpeak} />
          </div>
          <p className="text-neutral-600 text-base">= <span className="italic">{question.shownTranslation}</span></p>
        </div>
      );
    case "sentence-completion": {
      const parts = word.example?.split("___") ?? [word.example ?? "", ""];
      return (
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Fill in the missing word:</p>
          <p className="text-neutral-800 text-base leading-relaxed font-medium">
            {parts[0]}
            <span className="inline-block mx-1 border-b-2 border-blue-500 min-w-[80px] text-center font-bold text-blue-500">&nbsp;</span>
            {parts[1]}
          </p>
        </div>
      );
    }
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Type-word input
// ---------------------------------------------------------------------------

function TypeWordInput({
  correctAnswer, answered, selectedAnswer, isCorrect, onSubmit,
}: {
  correctAnswer: string; answered: boolean; selectedAnswer: string; isCorrect: boolean | null; onSubmit: (v: string) => void;
}) {
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim() || answered) return;
    onSubmit(value.trim());
  }

  if (answered) {
    return (
      <div className="flex flex-col gap-2.5">
        <div className={`rounded-xl px-5 py-4 border text-sm ${isCorrect ? "bg-green-50 border-green-300 text-green-800" : "bg-red-50 border-red-300 text-red-700"}`}>
          <span className="text-xs font-semibold uppercase tracking-wide opacity-60 block mb-0.5">Your answer</span>
          <span className={`font-semibold ${isCorrect ? "animate-bounce-once" : "animate-shake"}`}>
            {isCorrect ? "✅" : "❌"} {selectedAnswer}
          </span>
        </div>
        {!isCorrect && (
          <div className="rounded-xl px-5 py-4 border bg-green-50 border-green-300 text-green-800 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wide opacity-60 block mb-0.5">Correct answer</span>
            <span className="font-semibold">✅ {correctAnswer}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text" value={value} onChange={e => setValue(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") submit(); }}
        placeholder="Type the English word…"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-4 text-sm font-semibold text-neutral-800 placeholder:font-normal placeholder:text-neutral-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
      />
      <button onClick={submit} disabled={!value.trim()}
        className="rounded-xl bg-blue-600 text-white px-5 py-4 text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
        Submit
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Topic selection screen
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
};

function TopicSelectScreen({ onSelect }: { onSelect: (topic: Topic) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-4xl flex flex-col gap-8"
    >
      {/* Hero row */}
      <div className="flex items-end gap-6">
        <div className="flex-1">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 uppercase tracking-wide">
            B1 Vocabulary
          </span>
          <h2 className="font-display text-3xl font-bold text-neutral-900 mt-3 mb-1">Vocabulary Trivia</h2>
          <p className="text-neutral-500 text-base">Choose a topic to start the quiz</p>
        </div>
        <div className="hidden md:block shrink-0 select-none pointer-events-none">
          <img src={teacherThinking} alt="" className="h-36 w-auto animate-character-idle" draggable={false} />
        </div>
      </div>

      {/* Topic cards */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-2">
        {TOPICS.map(topic => (
          <motion.button
            key={topic.id} variants={itemVariants} whileHover={{ scale: 1.02 }}
            onClick={() => onSelect(topic)}
            disabled={topic.words.length === 0}
            className="rounded-2xl bg-white border-2 border-neutral-200 px-6 py-5 text-left hover:border-blue-300 hover:shadow-md transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="text-3xl mb-3">{topic.icon}</div>
            <h3 className="font-display font-bold text-lg text-neutral-900 group-hover:text-blue-700 transition-colors">{topic.title}</h3>
            <p className="text-sm text-neutral-500 mt-1 leading-snug">{topic.description}</p>
            <p className="text-xs text-neutral-400 mt-3 font-medium">
              {topic.words.length > 0 ? `${topic.words.length} words` : "Coming soon"}
            </p>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// End screen
// ---------------------------------------------------------------------------

function EndScreen({
  score, total, results, topicId, onReplay, onPracticeWeak,
}: {
  score: number; total: number; results: AnswerResult[]; topicId: string; onReplay: () => void; onPracticeWeak: (words: B1Word[]) => void;
}) {
  const pct = Math.round((score / total) * 100);
  const isPerfect = score === total;
  const isGreat = pct >= 70;
  const teacher: Pose = isPerfect ? "celebrate" : isGreat ? "happy" : "thinking";
  const [emoji, message] = isPerfect
    ? ["🏆", "PERFECT!"] : isGreat ? ["🎉", "Excellent work!"] : pct >= 50 ? ["👍", "Good effort!"] : ["💪", "Keep practicing!"];

  // Deduplicate results by word
  const seen = new Set<string>();
  const deduped = results.filter(r => {
    if (seen.has(r.word.word)) return false;
    seen.add(r.word.word);
    return true;
  });
  const correct = deduped.filter(r => r.correct);
  const wrong = deduped.filter(r => !r.correct);

  // Confetti on mount
  useEffect(() => {
    if (!isGreat) return;
    const duration = isPerfect ? 3000 : 1500;
    const end = Date.now() + duration;
    const colors = ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6"];
    const frame = () => {
      confetti({ particleCount: isPerfect ? 8 : 4, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors });
      confetti({ particleCount: isPerfect ? 8 : 4, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}
      className="flex gap-8 items-start w-full max-w-4xl flex-1 min-h-0">
      {/* Teacher */}
      <div className="hidden md:flex flex-col items-center shrink-0 w-52 pt-2 select-none pointer-events-none">
        <TeacherCharacter pose={teacher} />
        <p className="text-sm text-center text-neutral-500 mt-3 font-semibold">{message}</p>
      </div>

      <div className="flex-1 flex flex-col min-h-0 gap-4">
        {/* Mobile teacher */}
        <div className="flex md:hidden justify-center items-center gap-3 shrink-0">
          <img src={POSE_MAP[teacher].src} alt="" className={`h-16 w-auto select-none ${POSE_MAP[teacher].cls}`} draggable={false} />
          <p className="text-sm text-neutral-500 font-semibold">{message}</p>
        </div>

        {/* Score */}
        <div className="rounded-2xl bg-white border border-neutral-200 px-8 py-4 text-center shadow-sm shrink-0">
          <div className="text-4xl font-display font-bold text-blue-600 flex items-center justify-center gap-2">
            <span className={isPerfect ? "animate-bounce" : isGreat ? "animate-emoji-correct" : ""}>{emoji}</span>
            {pct}<span className="text-2xl font-normal text-neutral-400">%</span>
          </div>
          <p className="text-neutral-600 text-sm mt-1">
            <span className="font-bold text-neutral-800">{score}</span> out of{" "}
            <span className="font-bold text-neutral-800">{total}</span> correct
          </p>
        </div>

        {/* Progress save (signed-in) / sign-in hint (guest) */}
        <TriviaSaveStatus
          input={{
            app: "b1-trivia",
            topicId,
            scorePct: pct,
            correctWords: correct.map(r => r.word.word),
            missedWords: wrong.map(r => r.word.word),
          }}
        />

        {/* Word lists */}
        <div className="flex gap-4 flex-1 min-h-0">
          {correct.length > 0 && (
            <div className="flex-1 min-h-0 flex flex-col gap-2">
              <p className="text-sm font-bold text-green-700 shrink-0">✅ Words you know ({correct.length})</p>
              <div className="overflow-y-auto scroll-thin rounded-xl border border-green-100 bg-white divide-y divide-neutral-100 shadow-sm" style={{ maxHeight: "calc(100vh - 440px)" }}>
                {correct.map((r, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2.5">
                    <span className="font-semibold text-neutral-800 text-sm">{r.word.word}</span>
                    <span className="text-xs text-neutral-400 shrink-0 ml-2">{r.word.translation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {wrong.length > 0 && (
            <div className="flex-1 min-h-0 flex flex-col gap-2">
              <p className="text-sm font-bold text-red-600 shrink-0">❌ Words to practice ({wrong.length})</p>
              <div className="overflow-y-auto scroll-thin rounded-xl border border-red-100 bg-white divide-y divide-neutral-100 shadow-sm" style={{ maxHeight: "calc(100vh - 440px)" }}>
                {wrong.map((r, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2.5">
                    <div>
                      <span className="font-semibold text-neutral-800 text-sm">{r.word.word}</span>
                      <span className="text-xs text-neutral-500 ml-2">— {r.word.translation}</span>
                    </div>
                    <span className="text-xs text-neutral-400 shrink-0 ml-2">{TYPE_LABEL[r.questionType]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 shrink-0">
          {wrong.length > 0 && (
            <button onClick={() => onPracticeWeak(wrong.map(r => r.word))}
              className="flex-1 min-w-[160px] px-6 py-3 rounded-xl bg-red-500 text-white font-display font-semibold text-sm hover:bg-red-600 hover:scale-105 active:scale-95 transition-all shadow-sm">
              Practice weak words 🎯
            </button>
          )}
          <button onClick={onReplay}
            className="flex-1 min-w-[120px] px-6 py-3 rounded-xl bg-blue-600 text-white font-display font-semibold text-sm hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all">
            Play Again 🔄
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Root App
// ---------------------------------------------------------------------------

export default function App() {
  // ── Topic / phase ──────────────────────────────────────────────────────────
  const initialTopic = (() => {
    const id = new URLSearchParams(window.location.search).get("topic");
    return id ? (TOPICS.find(t => t.id === id) ?? null) : null;
  })();

  const [phase, setPhase] = useState<Phase>(initialTopic ? "playing" : "select");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(initialTopic);

  // ── Game state ─────────────────────────────────────────────────────────────
  const [questions, setQuestions] = useState<Question[]>(() =>
    initialTopic ? generateQuestions(initialTopic.words) : []
  );
  const [currentIndex, setCurrentIndex] = useState(0); // furthest reached
  const [viewIndex, setViewIndex] = useState(0);
  const [resultsMap, setResultsMap] = useState<Record<number, { answer: string; correct: boolean }>>({});
  const [score, setScore] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameKey, setGameKey] = useState(0); // increments on every restart to force card remount

  // ── Audio / interaction state ──────────────────────────────────────────────
  const [muted, setMuted] = useState(false);
  const hasInteracted = useRef(false);
  const advanceTimer = useRef<number>();
  const matchingMistakesRef = useRef<Set<string>>(new Set());

  // Mark first interaction
  useEffect(() => {
    const mark = () => { hasInteracted.current = true; };
    window.addEventListener("click", mark, { once: true });
    window.addEventListener("touchstart", mark, { once: true });
    return () => {
      window.removeEventListener("click", mark);
      window.removeEventListener("touchstart", mark);
    };
  }, []);

  // Preload teacher images
  useEffect(() => {
    [teacherThinking, teacherCorrect, teacherSad, teacherCelebrate].forEach(src => {
      const img = new Image(); img.src = src;
    });
  }, []);

  // ── Derived values ─────────────────────────────────────────────────────────
  const isReviewing = viewIndex < currentIndex;
  const question = questions[viewIndex];
  const viewResult = resultsMap[viewIndex];
  const answered = viewResult !== undefined;
  const isCorrect = viewResult?.correct ?? null;
  const selectedAnswer = viewResult?.answer ?? "";

  // Teacher pose
  const teacherPose: Pose = (() => {
    if (phase === "select") return "idle";
    if (question?.type === "matching") return answered ? "celebrate" : "thinking";
    if (!answered) return "thinking";
    return isCorrect ? "happy" : "sad";
  })();

  // ── Speak helper (respects mute + interaction guard) ─────────────────────
  const speak = useCallback((word: string) => {
    speakText(word, muted);
  }, [muted]);

  const speakIfInteracted = useCallback((word: string) => {
    if (hasInteracted.current) speakText(word, muted);
  }, [muted]);

  // Auto-TTS on question mount for en-to-native and true-false
  useEffect(() => {
    if (phase !== "playing" || !question) return;
    if (question.type === "en-to-native" || question.type === "true-false") {
      const t = window.setTimeout(() => speakIfInteracted(question.words[0].word), 500);
      return () => clearTimeout(t);
    }
  }, [viewIndex, phase, question?.type]);

  // ── Submit answer ──────────────────────────────────────────────────────────
  const submitAnswer = useCallback((answer: string) => {
    if (answered || isReviewing || !question) return;

    const correct = checkAnswer(question, answer);

    setResultsMap(prev => ({ ...prev, [viewIndex]: { answer, correct } }));
    if (correct) { setScore(s => s + 1); setStreakCount(s => s + 1); }
    else { setStreakCount(0); }

    if (!muted) { if (correct) playCorrectSound(); else playWrongSound(); }

    // Record results for end screen
    const wordResults: AnswerResult[] = question.type === "matching"
      ? question.words.map(w => ({ word: w, questionType: question.type, correct, answer }))
      : [{ word: question.words[0], questionType: question.type, correct, answer }];
    void wordResults; // collected at end

    // Auto-advance
    const delay = getAdvanceDelay(question.type, correct);
    clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => {
      const nextIdx = viewIndex + 1;
      if (nextIdx >= questions.length) {
        setGameOver(true);
      } else {
        setCurrentIndex(nextIdx);
        setViewIndex(nextIdx);
      }
    }, delay);
  }, [answered, isReviewing, question, viewIndex, questions.length, muted]);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    clearTimeout(advanceTimer.current);
    if (viewIndex < currentIndex) {
      setViewIndex(v => v + 1);
    } else if (answered) {
      const next = viewIndex + 1;
      if (next >= questions.length) { setGameOver(true); }
      else { setCurrentIndex(next); setViewIndex(next); }
    }
  }, [viewIndex, currentIndex, answered, questions.length]);

  const goPrev = useCallback(() => {
    clearTimeout(advanceTimer.current);
    if (viewIndex > 0) setViewIndex(v => v - 1);
  }, [viewIndex]);

  // Trigger end phase when gameOver flips
  useEffect(() => {
    if (gameOver) setPhase("end");
  }, [gameOver]);

  // ── Game control ───────────────────────────────────────────────────────────
  function startGame(topic: Topic, wordPool?: B1Word[]) {
    const pool = wordPool ?? topic.words;
    const qs = generateQuestions(pool);
    setQuestions(qs);
    setCurrentIndex(0);
    setViewIndex(0);
    setResultsMap({});
    setScore(0);
    setStreakCount(0);
    setGameOver(false);
    setGameKey(k => k + 1);
    matchingMistakesRef.current = new Set();
    setPhase("playing");
    setSelectedTopic(topic);
    history.replaceState(null, "", `?topic=${topic.id}`);
  }

  function handleSelectTopic(topic: Topic) {
    startGame(topic);
  }

  function handleBackToSelect() {
    clearTimeout(advanceTimer.current);
    setPhase("select");
    history.replaceState(null, "", window.location.pathname);
  }

  function handleRestart() {
    if (selectedTopic) startGame(selectedTopic);
  }

  function handlePracticeWeak(words: B1Word[]) {
    if (selectedTopic) startGame(selectedTopic, words);
  }

  // ── Build end screen results ───────────────────────────────────────────────
  const endResults: AnswerResult[] = questions.flatMap((q, qi) => {
    const r = resultsMap[qi];
    if (!r) return [];
    return q.words.map(w => ({
      word: w,
      questionType: q.type,
      // For matching: a word is "wrong" if the user clicked a wrong pair for it at any point
      correct: q.type === "matching" ? !matchingMistakesRef.current.has(w.word) : r.correct,
      answer: r.answer,
    }));
  });

  // ── Render ─────────────────────────────────────────────────────────────────
  const showRestart = phase === "playing" && !gameOver;
  const showScore = phase === "playing" && !gameOver;
  const attempted = currentIndex + (answered && !gameOver ? 1 : 0);

  const canGoPrev = viewIndex > 0;
  const canGoNext = viewIndex < currentIndex || (answered && !gameOver);

  return (
    <div className="relative h-viewport flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <AppHeader
        title="Vocabulary Trivia"
        subtitle={phase !== "select" && selectedTopic ? selectedTopic.title : "B1 · by Englishpusher"}
        onTitleClick={phase !== "select" ? handleBackToSelect : undefined}
        onTopics={handleBackToSelect}
        showTopics={phase !== "select"}
        controls={
          <>
            {showScore && (
              <div className="flex items-center gap-1 bg-neutral-800 px-2.5 py-1.5 rounded-lg font-display">
                <span className="text-blue-400 font-bold text-sm">{score}/{attempted}</span>
              </div>
            )}
            {showRestart && (
              <button onClick={handleRestart}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
                title="Restart quiz">
                <RotateCcw size={17} />
              </button>
            )}
            <button
              onClick={() => { if (!muted) window.speechSynthesis?.cancel(); setMuted(m => !m); }}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-white"
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </>
        }
      />

      {/* ── Main ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col overflow-y-auto pb-4">
        <AnimatePresence mode="wait">
          {/* Topic select */}
          {phase === "select" && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex items-start justify-center px-6 py-10">
              <TopicSelectScreen onSelect={handleSelectTopic} />
            </motion.div>
          )}

          {/* Playing */}
          {phase === "playing" && question && (
            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex items-start justify-center px-4 py-4 md:px-6 md:py-8 w-full">
              <div className="w-full max-w-4xl flex flex-col gap-3 md:gap-6">
                {/* Progress */}
                <ProgressBar current={currentIndex} total={questions.length} />

                {/* Top label */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    {TYPE_LABEL[question.type]}
                  </span>
                  {isReviewing && (
                    <span className="text-xs font-bold text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full">
                      ← Reviewing
                    </span>
                  )}
                  {!isReviewing && streakCount >= 2 && (
                    <span className={`text-sm font-bold bg-[#f07c1a] text-white px-3 py-1 rounded-full font-display ${streakCount >= 3 ? "animate-pulse" : ""}`}>
                      🔥 {streakCount} in a row!
                    </span>
                  )}
                </div>

                {/* Card row */}
                <div className="flex gap-6 items-start">
                  {/* Teacher */}
                  <TeacherCharacter pose={teacherPose} />

                  {/* Question card */}
                  <AnimatePresence mode="wait">
                    <motion.div key={`${gameKey}-${viewIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}
                      className="flex-1 flex flex-col gap-2 md:gap-4">

                      <GradientBorder state={isCorrect === true ? "correct" : isCorrect === false ? "wrong" : "neutral"}>
                        {/* Emoji overlay — skip for matching (MatchingCard has its own) */}
                        {answered && isCorrect !== null && question.type !== "matching" && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                            <span className={`text-7xl ${isCorrect ? "animate-emoji-correct" : "animate-emoji-wrong"}`}>
                              {isCorrect ? "🎉" : "😬"}
                            </span>
                          </div>
                        )}

                        {/* Prompt */}
                        {question.type === "matching" ? (
                          <MatchingCard
                            words={question.words}
                            onSubmit={submitAnswer}
                            isReviewing={isReviewing || answered}
                            onSpeak={speak}
                            onMistake={(wordKey) => { matchingMistakesRef.current.add(wordKey); }}
                          />
                        ) : (
                          <QuestionPrompt question={question} onSpeak={speak} />
                        )}
                      </GradientBorder>

                      {/* Options / input (non-matching) */}
                      {question.type !== "matching" && (
                        question.type === "type-word" ? (
                          <TypeWordInput
                            correctAnswer={question.correctAnswer}
                            answered={answered}
                            selectedAnswer={selectedAnswer}
                            isCorrect={isCorrect}
                            onSubmit={submitAnswer}
                          />
                        ) : (
                          <div className={`grid gap-2 md:gap-4 ${question.type === "true-false" ? "grid-cols-2" : "grid-cols-1"}`}>
                            {question.options.map(option => {
                              const state = !answered ? "default"
                                : option === question.correctAnswer ? "correct"
                                : option === selectedAnswer ? "wrong"
                                : "disabled";
                              const label = question.type === "true-false"
                                ? (option === "true" ? "✅ True" : "❌ False")
                                : option;
                              return (
                                <OptionButton key={option} label={label}
                                  onClick={() => submitAnswer(option)} state={state}
                                  centered={question.type === "true-false"} />
                              );
                            })}
                          </div>
                        )
                      )}

                      {/* Feedback banner (non-type-word) */}
                      {question.type !== "type-word" && question.type !== "matching" && (
                        <AnimatePresence>
                          {answered && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                              className={`rounded-xl px-4 py-3 flex items-center gap-2 text-sm font-semibold border ${isCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-700"}`}>
                              {isCorrect
                                ? "✅ Correct!"
                                : `❌ The answer was: ${question.correctAnswer}`}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}

                      {/* Back / Next navigation */}
                      {(canGoPrev || canGoNext) && (
                        <div className="flex gap-3">
                          {canGoPrev && (
                            <button onClick={goPrev}
                              className="flex-1 rounded-xl bg-white border-2 border-neutral-200 text-neutral-700 font-display font-bold py-3.5 text-sm hover:border-neutral-400 transition-colors">
                              ← Back
                            </button>
                          )}
                          {canGoNext && (
                            <button onClick={goNext}
                              className="flex-1 rounded-xl bg-blue-600 text-white font-display font-bold py-3.5 text-sm hover:bg-blue-700 transition-colors">
                              {viewIndex + 1 >= questions.length ? "Finish ✓" : "Next →"}
                            </button>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          {/* End screen */}
          {phase === "end" && (
            <motion.div key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex-1 flex flex-col min-h-0 px-6 py-6 items-center">
              <EndScreen
                score={score}
                total={endResults.length > 0 ? endResults.length : questions.reduce((a, q) => a + q.words.length, 0)}
                results={endResults}
                topicId={selectedTopic?.id ?? ""}
                onReplay={handleRestart}
                onPracticeWeak={handlePracticeWeak}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <AppFooter onTopics={handleBackToSelect} showTopics={phase !== "select"} />
    </div>
  );
}
