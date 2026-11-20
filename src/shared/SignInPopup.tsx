import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

// ---------------------------------------------------------------------------
// SignInPopup — closable "Keep your results" card shown to guests on the grammar
// and vocabulary trivia end screens. Closing it once hides it on every page
// until the browser session ends (one shared sessionStorage key).
// ---------------------------------------------------------------------------

export const SIGNIN_POPUP_CLOSED_KEY = "ep-signin-popup-closed";

// sessionStorage can throw (private mode, blocked site data): on error behave as "not closed".
function readPopupClosed(): boolean {
  try {
    return sessionStorage.getItem(SIGNIN_POPUP_CLOSED_KEY) === "1";
  } catch {
    return false;
  }
}

export function SignInPopup({ message }: { message: string }) {
  const [closed, setClosed] = useState(readPopupClosed);
  if (closed) return null;

  const close = () => {
    setClosed(true);
    try {
      sessionStorage.setItem(SIGNIN_POPUP_CLOSED_KEY, "1");
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
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-80 z-50 bg-white border-2 border-brand/40 rounded-2xl shadow-lg p-4"
    >
      <button
        onClick={close}
        aria-label="Close"
        className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-700 transition-colors"
      >
        <X size={16} />
      </button>
      <p className="pr-6 font-display font-semibold text-neutral-900">Keep your results</p>
      <p className="mt-1 text-sm text-neutral-700">{message}</p>
      <a
        href="/account/"
        className="mt-3 inline-block bg-brand text-white rounded-lg px-4 py-2 font-display font-semibold hover:opacity-90"
      >
        Sign in
      </a>
    </motion.div>
  );
}
