import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
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

const POPUP_CLOSED_KEY = "ep-grammar-signin-popup-closed";

// sessionStorage can throw (private mode, blocked site data): on error behave as "not closed".
function readPopupClosed(): boolean {
  try {
    return sessionStorage.getItem(POPUP_CLOSED_KEY) === "1";
  } catch {
    return false;
  }
}

function SignInPopup() {
  const [closed, setClosed] = useState(readPopupClosed);
  if (closed) return null;

  const close = () => {
    setClosed(true);
    try {
      sessionStorage.setItem(POPUP_CLOSED_KEY, "1");
    } catch {
      /* hide for now only */
    }
  };

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.3 }}
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 z-50 bg-card border-2 border-primary/40 rounded-2xl shadow-lg p-4"
    >
      <button
        onClick={close}
        aria-label="Close"
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X size={16} />
      </button>
      <p className="pr-6 font-display font-semibold text-foreground">Keep your results</p>
      <p className="mt-1 text-sm text-foreground/80">
        Sign in and your grammar answers are saved to My progress, so you can see what to practise next.
      </p>
      <a
        href="/account/"
        className="mt-3 inline-block bg-primary text-primary-foreground rounded-lg px-4 py-2 font-display font-semibold"
      >
        Sign in
      </a>
    </motion.div>
  );
}

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
      <>
        <p className="text-center text-xs text-muted-foreground">
          <a href="/account/" className="underline hover:text-primary transition-colors">
            Sign in
          </a>{" "}
          to save your progress
        </p>
        <SignInPopup />
      </>
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
