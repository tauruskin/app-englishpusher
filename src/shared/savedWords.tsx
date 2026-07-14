import { useCallback, useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { useSessionUser } from "./auth.tsx";
import {
  listSavedWords,
  saveWord,
  unsaveWord,
  type Level,
  type SavedWord,
} from "./progress.ts";

// ---------------------------------------------------------------------------
// Saved words ("My Words") — shared by flashcards, trivia, and the account
// page. Toggles are optimistic: flip immediately, revert on failure.
// ---------------------------------------------------------------------------

export const MY_WORDS_TOPIC_ID = "my-words"; // reserved — never use in data.ts

export function useSavedWords(level: Level) {
  const { user, loading: authLoading } = useSessionUser();
  const [list, setList] = useState<SavedWord[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setList([]);
      setReady(true);
      return;
    }
    listSavedWords(level).then((ws) => {
      setList(ws);
      setReady(true);
    });
  }, [user, authLoading, level]);

  const savedSet = useMemo(() => new Set(list.map((w) => w.word)), [list]);

  const toggle = useCallback(
    (word: string, topicId: string, source: "flashcards" | "trivia") => {
      if (!user) return;
      if (savedSet.has(word)) {
        setList((l) => l.filter((w) => w.word !== word));
        unsaveWord(word, level).then((err) => {
          if (err) setList((l) => [{ word, level, topicId, source }, ...l]);
        });
      } else {
        const w: SavedWord = { word, level, topicId, source };
        setList((l) => [w, ...l]);
        saveWord(w).then((err) => {
          if (err) setList((l) => l.filter((x) => x.word !== word));
        });
      }
    },
    [user, savedSet, level],
  );

  return { enabled: user !== null, ready, savedWords: list, savedSet, toggle };
}

// Resolve saved word references against an app's TOPICS content: exact
// topic_id + word match; unresolvable references are dropped silently.
export function resolveSavedWords<W extends { word: string }>(
  saved: SavedWord[],
  topics: ReadonlyArray<{ id: string; words: W[] }>,
): W[] {
  const out: W[] = [];
  for (const s of saved) {
    const topic = topics.find((t) => t.id === s.topicId);
    const word = topic?.words.find((w) => w.word === s.word);
    if (word) out.push(word);
  }
  return out;
}

// The topic a word originally belongs to — used when toggling from inside
// the virtual My Words deck, where the deck's own id must not be stored.
export function findOriginTopicId<W extends { word: string }>(
  word: string,
  topics: ReadonlyArray<{ id: string; words: W[] }>,
): string {
  return topics.find((t) => t.words.some((w) => w.word === word))?.id ?? "";
}

export function StarButton({
  active,
  onToggle,
  size = 18,
  className = "",
}: {
  active: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={active ? "Remove from My Words" : "Save to My Words"}
      title={active ? "Remove from My Words" : "Save to My Words"}
      className={`rounded-full p-1.5 transition-colors hover:bg-amber-50 ${className}`}
    >
      <Star
        size={size}
        className={active ? "text-amber-400" : "text-neutral-300 hover:text-amber-400"}
        fill={active ? "currentColor" : "none"}
      />
    </button>
  );
}
