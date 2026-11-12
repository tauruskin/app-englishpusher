import type { MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw } from "lucide-react";
import { GradientBorder } from "../../shared/FlashcardDeck.tsx";
import type { RuleCard } from "../types.ts";
import type { UaRule } from "../cards.ts";

// The blank of the front sentence: a dashed orange slot, as in the approved mockup.
function Gap() {
  return (
    <span
      className="inline-block align-[-0.25em] w-20 h-[1.35em] mx-1 rounded-md bg-orange-50 border-b-[3px] border-dashed border-brand"
      aria-label="gap"
    />
  );
}

function UkrainianBlock({ ua, uaRule }: { ua: string | undefined; uaRule: UaRule }) {
  if (!ua || uaRule === "none") return null;
  if (uaRule === "full") {
    return (
      <div className="rounded-xl bg-sky-50 border border-sky-100 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 mb-1">Українською</p>
        <p className="text-sm text-sky-900 leading-relaxed">{ua}</p>
      </div>
    );
  }
  return (
    <p className="rounded-xl bg-sky-50 border border-sky-100 px-4 py-2.5 text-sm text-sky-900 leading-relaxed">
      <span className="mr-1.5 text-[10px] font-bold uppercase tracking-wide text-sky-600">UA</span>
      {ua}
    </p>
  );
}

/** One rule card: front = rule + gapped sentence, back = full sentence, explanation, examples, Ukrainian. */
export default function RuleCardView({
  card,
  isFlipped,
  onFlip,
  index,
  uaRule,
}: {
  card: RuleCard;
  isFlipped: boolean;
  onFlip: () => void;
  index: number;
  uaRule: UaRule;
}) {
  const borderColors: [string, string, string] = isFlipped
    ? ["#1e3a5f", "#0ea5e9", "#0284c7"]
    : ["#78350f", "#f97316", "#f07c1a"];
  const [before, ...rest] = card.example.split("___");
  const after = rest.join("___");
  // The back shows the full sentence, so the hint after the gap ("(go)") is dropped there.
  const afterOnBack = after.replace(/^\s*\([^)]*\)/, "");

  // The buttons flip on their own; stopping the click keeps the tap-anywhere handler from flipping back.
  const flipButton = (e: MouseEvent) => {
    e.stopPropagation();
    onFlip();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${index}-${isFlipped ? "back" : "front"}`}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full"
      >
        {/* Tapping anywhere on the card flips it. Keyboard users use the button inside. */}
        <div onClick={onFlip} className="cursor-pointer">
          <GradientBorder colors={borderColors}>
            {!isFlipped ? (
              <div className="flex flex-col items-center gap-5 px-4 md:px-8 py-8 min-h-72 justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Grammar rule</p>
                <div className="flex flex-col items-center gap-4 text-center">
                  <h2 className="font-display text-[2rem] md:text-[2.6rem] font-bold text-neutral-900 leading-tight">
                    {card.rule}
                  </h2>
                  <p className="text-neutral-700 text-lg md:text-xl leading-relaxed">
                    {before}
                    <Gap />
                    {after}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={flipButton}
                    className="rounded-xl bg-brand text-white font-display font-bold px-10 py-3.5 text-base hover:bg-brand/90 transition-colors shadow-sm"
                  >
                    Show the rule
                  </button>
                  <span className="text-xs text-neutral-400">or tap the card to flip</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 px-4 md:px-8 py-7 min-h-72 justify-between">
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">{card.rule}</p>
                  <p className="font-display font-bold text-xl md:text-2xl text-neutral-900 leading-snug">
                    {before}
                    <span className="rounded-md bg-orange-100 px-1.5 text-brand">{card.answer}</span>
                    {afterOnBack}
                  </p>
                  <p className="text-neutral-700 text-[15px] leading-relaxed">{card.explanation}</p>
                </div>
                <div className="border-t border-neutral-100" />
                <div className="flex flex-col gap-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Examples</p>
                  <ul className="flex flex-col gap-1.5">
                    {card.examples.map((example, i) => (
                      <li key={i} className="flex gap-2 text-neutral-600 text-sm leading-relaxed italic">
                        <span className="not-italic text-sky-500">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <UkrainianBlock ua={card.ua} uaRule={uaRule} />
                <button
                  type="button"
                  onClick={flipButton}
                  className="self-center flex items-center gap-1.5 text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <RotateCcw size={13} />
                  Show the front
                </button>
              </div>
            )}
          </GradientBorder>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
