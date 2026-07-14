import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useSessionUser } from "./auth.tsx";
import { isSupabaseConfigured } from "./supabase.ts";
import { saveTriviaResult, type TriviaResultInput } from "./progress.ts";

// ---------------------------------------------------------------------------
// TriviaSaveStatus — drop into a trivia end screen. Saves the finished
// session exactly once (after the auth session resolves), then renders:
//   guest          → subtle "sign in to save" hint
//   save failed    → small dismissible notice (never blocks anything)
//   saved / idle   → nothing
// "My Words" sessions are not saved: their topic id doesn't resolve to a
// real topic, and the words already belong to their original topics.
// ---------------------------------------------------------------------------

export function TriviaSaveStatus({ input }: { input: TriviaResultInput }) {
  const { user, loading } = useSessionUser();
  const [error, setError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (loading || firedRef.current) return;
    firedRef.current = true; // one save per end-screen mount (StrictMode-safe)
    if (!user || input.topicId === "my-words") return;
    saveTriviaResult(input).then(setError);
  }, [loading, user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isSupabaseConfigured || loading) return null;

  if (!user) {
    return (
      <p className="text-center text-xs text-neutral-400 shrink-0">
        <a href="/account/" className="underline hover:text-brand transition-colors">
          Sign in
        </a>{" "}
        to save your progress
      </p>
    );
  }

  if (error && !dismissed) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700 shrink-0">
        <span>{error}</span>
        <button onClick={() => setDismissed(true)} aria-label="Dismiss" className="hover:text-amber-900">
          <X size={12} />
        </button>
      </div>
    );
  }

  return null;
}
