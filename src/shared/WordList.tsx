import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Star, X } from "lucide-react";
import teacherSearch from "../assets/teacher-search.png";

// ---------------------------------------------------------------------------
// Word list: a floating teacher button that opens a searchable list of the
// topic's words. Tapping a word jumps to its card. Same idea as the Moodle
// lesson search (moodle-task-builder/moodle-snippets/lesson-search.html).
// ---------------------------------------------------------------------------

export interface WordListItem {
  word: string;
  hint: string; // translation or definition shown under the word
}

function clean(s: string) {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}

function escapeRe(w: string) {
  return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Wraps every matched word in <mark>, like Ctrl+F.
function Highlight({ text, words }: { text: string; words: string[] }) {
  if (!words.length) return <>{text}</>;
  const re = new RegExp(`(${words.map(escapeRe).join("|")})`, "gi");
  const parts: ReactNode[] = text.split(re).map((part, i) =>
    i % 2 === 1 ? <mark key={i} className="bg-yellow-200 rounded-sm px-0">{part}</mark> : part,
  );
  return <>{parts}</>;
}

export function WordList({
  items,
  current,
  saved,
  onJump,
}: {
  items: WordListItem[];
  current: number;
  saved?: Set<string>;
  onJump: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const currentRef = useRef<HTMLButtonElement>(null);

  const words = useMemo(() => clean(query).split(" ").filter(Boolean), [query]);
  const shown = useMemo(
    () =>
      items
        .map((item, index) => ({ ...item, index }))
        .filter((it) => {
          const hay = `${it.word} ${it.hint}`.toLowerCase();
          return words.every((w) => hay.includes(w));
        }),
    [items, words],
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    // Focus the search box and bring the current card's word into view.
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      currentRef.current?.scrollIntoView({ block: "center" });
    });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function jump(index: number) {
    onJump(index);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        title="Find a word"
        aria-label="Find a word"
        className="fixed right-4 bottom-20 sm:right-6 sm:bottom-24 z-40 h-14 w-14 rounded-full bg-neutral-800 shadow-lg overflow-hidden transition-transform duration-200 ease-out hover:scale-125 focus-visible:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <img src={teacherSearch} alt="" className="h-full w-full object-cover object-top pt-1" draggable={false} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop: dims the page on phones, invisible click-catcher on desktop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 sm:bg-transparent"
            />
            <motion.div
              key="panel"
              role="dialog"
              aria-label="Words in this topic"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={[
                "fixed z-50 flex flex-col bg-white shadow-2xl border border-neutral-200",
                // Phone: bottom sheet. Desktop: panel above the button.
                "inset-x-0 bottom-0 max-h-[75vh] rounded-t-2xl",
                "sm:inset-x-auto sm:right-6 sm:bottom-40 sm:w-96 sm:max-h-[65vh] sm:rounded-2xl",
              ].join(" ")}
            >
              <div className="flex items-center gap-2 p-3 border-b border-neutral-100">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && shown.length) jump(shown[0].index);
                    }}
                    placeholder={`Find a word (${items.length})…`}
                    aria-label="Find a word"
                    className="w-full rounded-xl border-2 border-neutral-200 pl-9 pr-3 py-2 text-base focus:outline-none focus:border-brand"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="shrink-0 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                >
                  <X size={18} />
                </button>
              </div>

              <ul className="overflow-y-auto py-1">
                {shown.map((it) => {
                  const isCurrent = it.index === current;
                  return (
                    <li key={it.index}>
                      <button
                        type="button"
                        ref={isCurrent ? currentRef : undefined}
                        onClick={() => jump(it.index)}
                        className={[
                          "w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors",
                          isCurrent ? "bg-orange-50 border-l-4 border-brand" : "border-l-4 border-transparent hover:bg-neutral-50",
                        ].join(" ")}
                      >
                        <span className="w-6 shrink-0 pt-0.5 text-xs font-semibold text-neutral-400 tabular-nums">
                          {it.index + 1}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="flex items-center gap-1.5 font-display font-semibold text-neutral-800">
                            <span><Highlight text={it.word} words={words} /></span>
                            {saved?.has(it.word) && <Star size={13} className="shrink-0 fill-amber-400 text-amber-400" />}
                          </span>
                          {it.hint && (
                            <span className="block text-sm text-neutral-500 line-clamp-2">
                              <Highlight text={it.hint} words={words} />
                            </span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
                {!shown.length && <li className="px-4 py-3 text-sm text-neutral-500">Nothing found</li>}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
