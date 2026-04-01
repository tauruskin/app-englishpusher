import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shuffle, RotateCcw, ArrowLeft, ChevronRight, Lightbulb } from "lucide-react";
import { PUZZLES, DIFFICULTY_STYLES, type Puzzle, type Group } from "./data.ts";
import teacherThinking from "./assets/teacher-thinking.png";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GamePhase = "menu" | "playing" | "won" | "lost";

interface TileState {
  word: string;
  groupId: number;
  selected: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildTiles(puzzle: Puzzle): TileState[] {
  const tiles: TileState[] = puzzle.groups.flatMap((g) =>
    g.words.map((word) => ({ word, groupId: g.id, selected: false }))
  );
  return shuffleArray(tiles);
}

// ---------------------------------------------------------------------------
// Life dots
// ---------------------------------------------------------------------------

function LivesDots({ lives, max = 4 }: { lives: number; max?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={[
            "h-3 w-3 rounded-full transition-all duration-300",
            i < lives ? "bg-neutral-700 scale-100" : "bg-neutral-300 scale-90",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Solved group row
// ---------------------------------------------------------------------------

function SolvedRow({ group }: { group: Group }) {
  const style = DIFFICULTY_STYLES[group.difficulty];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={[
        "animate-pop-in rounded-xl px-4 py-3 flex flex-col gap-0.5",
        style.bg,
        style.text,
      ].join(" ")}
    >
      <span className="font-display font-bold text-sm uppercase tracking-wider">
        {group.category}
      </span>
      <span className="text-sm font-medium opacity-80">
        {group.words.join(" · ")}
      </span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Word tile
// ---------------------------------------------------------------------------

function WordTile({
  tile,
  shaking,
  onToggle,
}: {
  tile: TileState;
  shaking: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={[
        "relative h-20 rounded-xl font-display font-semibold text-base uppercase tracking-wide",
        "transition-all duration-150 select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        shaking ? "animate-shake" : "",
        tile.selected
          ? "bg-neutral-700 text-white shadow-md scale-[1.04]"
          : "bg-white text-neutral-800 border border-neutral-200 hover:border-neutral-400 hover:shadow-sm active:scale-95",
      ].join(" ")}
    >
      {tile.word}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Toast / feedback banner
// ---------------------------------------------------------------------------

function Toast({ message }: { message: string }) {
  return (
    <motion.div
      key={message}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none fixed top-20 left-1/2 -translate-x-1/2 z-50 rounded-full bg-neutral-800 px-5 py-2 text-sm font-semibold text-white shadow-lg"
    >
      {message}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Hint tooltip
// ---------------------------------------------------------------------------

function HintTooltip({
  categories,
  direction = "up",
}: {
  categories: string[];
  direction?: "up" | "down";
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onClick={(e) => { e.stopPropagation(); setVisible((v) => !v); }}
        className="flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand hover:bg-brand/20 transition-colors focus:outline-none"
        aria-label="Show hint"
      >
        <Lightbulb size={12} />
        Hint
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: direction === "down" ? -6 : 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: direction === "down" ? -6 : 6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={[
              "absolute right-0 z-20 w-56 rounded-xl bg-neutral-900 px-4 py-3 shadow-xl",
              direction === "down" ? "top-full mt-2" : "bottom-full mb-2",
            ].join(" ")}
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">
              Categories
            </p>
            <ul className="flex flex-col gap-1">
              {categories.map((cat) => (
                <li key={cat} className="text-xs text-white leading-snug">
                  · {cat}
                </li>
              ))}
            </ul>
            <div
              className={[
                "absolute right-4 h-3 w-3 rotate-45 bg-neutral-900",
                direction === "down" ? "-top-1.5" : "-bottom-1.5",
              ].join(" ")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Puzzle menu
// ---------------------------------------------------------------------------

function PuzzleMenu({ onSelect }: { onSelect: (puzzle: Puzzle) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col gap-6 w-full max-w-2xl"
    >
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-neutral-900">
          Choose a Puzzle
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Group 16 words into 4 categories
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PUZZLES.map((puzzle) => (
          <button
            key={puzzle.id}
            onClick={() => onSelect(puzzle)}
            className={[
              "group flex items-center justify-between rounded-xl bg-white",
              "border border-neutral-200 px-5 py-4 shadow-sm",
              "hover:border-brand/50 hover:shadow-md transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
            ].join(" ")}
          >
            <div className="text-left">
              <div className="font-display font-semibold text-neutral-800">
                Puzzle {puzzle.id}
              </div>
              <div className="text-sm text-neutral-500">{puzzle.title}</div>
            </div>
            <ChevronRight
              size={18}
              className="text-neutral-400 transition-transform duration-150 group-hover:translate-x-1"
            />
          </button>
        ))}
      </div>

      {/* Difficulty legend */}
      <div className="rounded-xl bg-white border border-neutral-200 px-4 py-3">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">
          Difficulty
        </p>
        <div className="flex flex-wrap gap-2">
          {([0, 1, 2, 3] as const).map((d) => {
            const s = DIFFICULTY_STYLES[d];
            return (
              <span
                key={d}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}
              >
                {s.label} — {d === 0 ? "easiest" : d === 3 ? "hardest" : ""}
                {d === 1 ? "medium" : ""}
                {d === 2 ? "tricky" : ""}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// End screen
// ---------------------------------------------------------------------------

function EndScreen({
  won,
  puzzle,
  solvedGroups,
  onReplay,
  onMenu,
}: {
  won: boolean;
  puzzle: Puzzle;
  solvedGroups: Group[];
  onReplay: () => void;
  onMenu: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col gap-5 w-full max-w-2xl"
    >
      <div className="text-center">
        <div className="text-4xl mb-2">{won ? "🎉" : "😔"}</div>
        <h2 className="font-display text-2xl font-bold text-neutral-900">
          {won ? "Brilliant!" : "Better luck next time"}
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          {won
            ? "You found all four connections!"
            : "Here are all the connections:"}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {puzzle.groups
          .slice()
          .sort((a, b) => a.difficulty - b.difficulty)
          .map((g) => {
            const solved = solvedGroups.some((s) => s.id === g.id);
            return (
              <div
                key={g.id}
                className={[
                  "rounded-xl px-4 py-3",
                  DIFFICULTY_STYLES[g.difficulty].bg,
                  DIFFICULTY_STYLES[g.difficulty].text,
                  !solved ? "opacity-60" : "",
                ].join(" ")}
              >
                <div className="font-display font-bold text-sm uppercase tracking-wider">
                  {g.category}
                </div>
                <div className="text-sm font-medium opacity-80 mt-0.5">
                  {g.words.join(" · ")}
                </div>
              </div>
            );
          })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReplay}
          className="flex-1 rounded-xl bg-brand text-white font-display font-semibold py-3 text-sm hover:bg-brand/90 transition-colors"
        >
          Play again
        </button>
        <button
          onClick={onMenu}
          className="flex-1 rounded-xl bg-white border border-neutral-200 text-neutral-700 font-display font-semibold py-3 text-sm hover:border-neutral-400 transition-colors"
        >
          All puzzles
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Game board
// ---------------------------------------------------------------------------

const MAX_LIVES = 4;

function GameBoard({
  puzzle,
  onBack,
}: {
  puzzle: Puzzle;
  onBack: () => void;
}) {
  const [tiles, setTiles] = useState<TileState[]>(() => buildTiles(puzzle));
  const [solvedGroups, setSolvedGroups] = useState<Group[]>([]);
  const [lives, setLives] = useState(MAX_LIVES);
  const [shaking, setShaking] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [phase, setPhase] = useState<GamePhase>("playing");

  const selected = tiles.filter((t) => t.selected);
  const remainingTiles = tiles.filter(
    (t) => !solvedGroups.some((g) => g.id === t.groupId)
  );

  const showToast = useCallback((msg: string, ms = 1800) => {
    setToast(msg);
    setTimeout(() => setToast(null), ms);
  }, []);

  function toggleTile(word: string) {
    if (phase !== "playing") return;
    setTiles((prev) =>
      prev.map((t) => {
        if (t.word !== word) return t;
        // Allow deselect always; allow select only when fewer than 4 selected
        if (!t.selected && selected.length >= 4) return t;
        return { ...t, selected: !t.selected };
      })
    );
  }

  function deselectAll() {
    setTiles((prev) => prev.map((t) => ({ ...t, selected: false })));
  }

  function shuffleRemaining() {
    setTiles((prev) => {
      const solved = prev.filter((t) =>
        solvedGroups.some((g) => g.id === t.groupId)
      );
      const unsolved = shuffleArray(
        prev.filter((t) => !solvedGroups.some((g) => g.id === t.groupId))
      );
      return [...solved, ...unsolved];
    });
  }

  function submitGuess() {
    if (selected.length !== 4 || phase !== "playing") return;

    const selectedGroupIds = selected.map((t) => t.groupId);
    const allSameGroup = selectedGroupIds.every(
      (id) => id === selectedGroupIds[0]
    );

    if (allSameGroup) {
      const solvedGroup = puzzle.groups.find(
        (g) => g.id === selectedGroupIds[0]
      )!;
      const newSolved = [...solvedGroups, solvedGroup];
      setSolvedGroups(newSolved);
      setTiles((prev) => prev.map((t) => ({ ...t, selected: false })));

      if (newSolved.length === puzzle.groups.length) {
        setTimeout(() => setPhase("won"), 400);
      }
    } else {
      // Check "one away" — 3 of 4 belong to same group
      const counts: Record<number, number> = {};
      for (const id of selectedGroupIds) {
        counts[id] = (counts[id] ?? 0) + 1;
      }
      const maxCount = Math.max(...Object.values(counts));
      if (maxCount === 3) {
        showToast("One away!");
      }

      // Shake and lose a life
      setShaking(true);
      setTimeout(() => setShaking(false), 600);

      const newLives = lives - 1;
      setLives(newLives);
      setTiles((prev) => prev.map((t) => ({ ...t, selected: false })));

      if (newLives === 0) {
        setTimeout(() => setPhase("lost"), 700);
      }
    }
  }

  if (phase === "won" || phase === "lost") {
    return (
      <EndScreen
        won={phase === "won"}
        puzzle={puzzle}
        solvedGroups={solvedGroups}
        onReplay={() => {
          setTiles(buildTiles(puzzle));
          setSolvedGroups([]);
          setLives(MAX_LIVES);
          setPhase("playing");
        }}
        onMenu={onBack}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-4 w-full max-w-2xl"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft size={15} />
          Puzzles
        </button>
        <div className="flex items-center gap-2">
          <span className="font-display font-semibold text-neutral-700 text-sm">
            {puzzle.title}
          </span>
          <HintTooltip
            categories={puzzle.groups.map((g) => g.category)}
            direction="down"
          />
        </div>
      </div>

      {/* Category list */}
      <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
        <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">
          Sort the words into these categories
        </p>
        <div className="flex flex-wrap gap-2">
          {puzzle.groups
            .slice()
            .sort((a, b) => a.difficulty - b.difficulty)
            .map((g) => {
              const solved = solvedGroups.some((s) => s.id === g.id);
              const style = DIFFICULTY_STYLES[g.difficulty];
              return (
                <span
                  key={g.id}
                  className={[
                    "rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300",
                    solved
                      ? `${style.bg} ${style.text} line-through opacity-50`
                      : "bg-neutral-100 text-neutral-600",
                  ].join(" ")}
                >
                  {g.category}
                </span>
              );
            })}
        </div>
      </div>

      {/* Solved rows */}
      <AnimatePresence>
        {solvedGroups
          .slice()
          .sort((a, b) => a.difficulty - b.difficulty)
          .map((g) => (
            <SolvedRow key={g.id} group={g} />
          ))}
      </AnimatePresence>

      {/* Tile grid */}
      <div className={`grid grid-cols-4 gap-3 ${shaking ? "animate-shake" : ""}`}>
        {remainingTiles.map((tile) => (
          <WordTile
            key={tile.word}
            tile={tile}
            shaking={false}
            onToggle={() => toggleTile(tile.word)}
          />
        ))}
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 font-medium">Mistakes:</span>
          <LivesDots lives={lives} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={shuffleRemaining}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:border-neutral-400 transition-colors"
          >
            <Shuffle size={13} />
            Shuffle
          </button>
          <button
            onClick={deselectAll}
            disabled={selected.length === 0}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:border-neutral-400 transition-colors disabled:opacity-40 disabled:cursor-default"
          >
            <RotateCcw size={13} />
            Deselect
          </button>
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={submitGuess}
        disabled={selected.length !== 4}
        className={[
          "w-full rounded-xl py-3 font-display font-bold text-sm transition-all duration-200",
          selected.length === 4
            ? "bg-neutral-800 text-white hover:bg-neutral-700 shadow-md"
            : "bg-neutral-200 text-neutral-400 cursor-default",
        ].join(" ")}
      >
        Submit ({selected.length}/4)
      </button>

      {/* Toast */}
      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Root App
// ---------------------------------------------------------------------------

export default function App() {
  const [activePuzzle, setActivePuzzle] = useState<Puzzle | null>(null);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-neutral-900 border-b border-neutral-700/50 px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Englishpusher logo" className="h-8 w-auto" />
            <div>
              <h1 className="font-display text-base font-bold leading-tight text-white">
                Word Connections
              </h1>
              <p className="text-xs text-neutral-400">by Englishpusher</p>
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
      <main className="flex flex-1 items-start justify-center px-6 py-10">
        <div className="flex w-full max-w-5xl items-start gap-8">

          {/* Teacher — left column, desktop only */}
          <div className="hidden lg:flex flex-col items-center gap-3 pt-16 shrink-0 w-44 select-none pointer-events-none">
            <AnimatePresence>
              {activePuzzle === null && (
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="relative rounded-2xl rounded-bl-none bg-white border border-neutral-200 px-4 py-2.5 shadow-sm">
                    <p className="font-display font-semibold text-neutral-800 text-sm">
                      What shall we play today? 🤔
                    </p>
                    <div className="absolute -bottom-1.5 left-4 h-3 w-3 rotate-45 bg-white border-r border-b border-neutral-200" />
                  </div>
                  <img src={teacherThinking} alt="Teacher thinking" className="h-44 w-auto" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {activePuzzle === null ? (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <PuzzleMenu onSelect={setActivePuzzle} />
            </motion.div>
          ) : (
            <motion.div
              key={`puzzle-${activePuzzle.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <GameBoard
                puzzle={activePuzzle}
                onBack={() => setActivePuzzle(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
          </div>{/* flex-1 content */}
        </div>{/* max-w-5xl row */}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-700/50 px-6 py-3">
        <div className="mx-auto max-w-lg text-center text-xs text-neutral-500">
          Copyright &copy; 2026 &mdash;{" "}
          <a
            href="https://englishpusher.in.ua"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:text-brand/80 transition-colors"
          >
            Englishpusher
          </a>
        </div>
      </footer>

    </div>
  );
}
