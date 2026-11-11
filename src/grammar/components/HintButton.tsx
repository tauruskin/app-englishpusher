import { useEffect, useRef } from "react";

interface HintButtonProps {
  rule: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// "hint" pill next to the question type. A tap or click shows the grammar rule in a small bubble
// below it; a tap anywhere else, or Escape, closes it. (The grammar site used a Radix tooltip.)
const HintButton = ({ rule, open, onOpenChange }: HintButtonProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) onOpenChange(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <span ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-label="Show grammar hint"
        className="text-muted-foreground/50 hover:text-primary transition-colors leading-none font-display text-[10px] uppercase tracking-wider border border-current rounded px-1 py-0.5"
      >
        hint
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-md border border-border bg-card px-3 py-2 text-center font-display text-sm normal-case tracking-normal text-foreground shadow-md"
        >
          {rule}
        </span>
      )}
    </span>
  );
};

export default HintButton;
