import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useSessionUser } from "../shared/auth.tsx";
import { isSupabaseConfigured } from "../shared/supabase.ts";
import { saveGrammarAnswers, type GrammarAppId } from "../shared/progress.ts";
import { buildGrammarAnswerRows, type AnsweredQuestion } from "./answers.ts";

// ---------------------------------------------------------------------------
// GrammarSaveStatus — sits under the grammar end screen. Saves the finished
// session exactly once (after the auth session resolves), then renders:
//   guest          → subtle "sign in to save" hint
//   save failed    → small dismissible notice (never blocks anything)
//   saved / idle   → nothing
// Each mount is one session: "Play Again" and "Retry wrong" unmount the end
// screen, so the next end screen is a new session with a new id.
// Same contract as shared/TriviaSave.tsx.
// ---------------------------------------------------------------------------

export function GrammarSaveStatus({ app, topicId, results }: {
  app: GrammarAppId;
  topicId: string;
  results: AnsweredQuestion[];
}) {
  const { user, loading } = useSessionUser();
  const [error, setError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const firedRef = useRef(false);
  const sessionIdRef = useRef<string>(crypto.randomUUID());

  useEffect(() => {
    if (loading || firedRef.current) return;
    firedRef.current = true; // one save per end-screen mount (StrictMode-safe)
    if (!user) return;
    saveGrammarAnswers(buildGrammarAnswerRows(results, { app, topicId, sessionId: sessionIdRef.current })).then(setError);
  }, [loading, user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isSupabaseConfigured || loading) return null;

  if (!user) {
    return (
      <p className="text-center text-xs text-muted-foreground">
        <a href="/account/" className="underline hover:text-primary transition-colors">
          Sign in
        </a>{" "}
        to save your progress
      </p>
    );
  }

  if (error && !dismissed) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700">
        <span>{error}</span>
        <button onClick={() => setDismissed(true)} aria-label="Dismiss" className="hover:text-amber-900">
          <X size={12} />
        </button>
      </div>
    );
  }

  return null;
}
