import { Send } from "lucide-react";
import { Card } from "../../teacher/ui.tsx";
import { hiLine, PRACTICE_URL } from "../shape.ts";
import { onTelegramLinkClick } from "../telegram.ts";

export const BUTTON = "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-display text-sm font-bold transition-colors";

export function GetStarted({ name }: { name: string | null }) {
  return (
    <Card>
      <h2 className="font-display text-2xl font-bold text-neutral-900">{hiLine(name)} 👋</h2>
      <p className="mt-2 font-body text-sm text-neutral-600">
        Your progress appears here after your first answers. Practise in the App or in the Quiz Bot: both count.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href="/" className={`${BUTTON} bg-brand text-white hover:bg-brand/90`}>Practise in the App</a>
        <a href={PRACTICE_URL} onClick={onTelegramLinkClick} target="_blank" rel="noopener noreferrer" className={`${BUTTON} border border-neutral-300 text-neutral-800 hover:border-neutral-400`}>
          <Send size={16} aria-hidden /> Open the Quiz Bot<span className="sr-only"> (opens Telegram)</span>
        </a>
      </div>
    </Card>
  );
}
