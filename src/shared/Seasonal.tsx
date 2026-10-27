import { useEffect, useRef } from "react";
import { activeTheme, pageLevel, THEMES } from "./seasonal/themes.ts";
import { showSeasonFact, startSeasonal } from "./seasonal/decorations.ts";

// Holiday decorations for the current page, switched on by date (src/shared/seasonal/themes.ts).
// Rendered once per page, from AppFooter and from the hub's footer.
export function Seasonal() {
  useEffect(() => {
    let stop: (() => void) | undefined;
    // Started a tick later: React StrictMode mounts twice in dev, and the first mount is cancelled
    // here before it can use up the once-a-day flight or the once-a-visit card.
    const t = window.setTimeout(() => {
      stop = startSeasonal(activeTheme(window.location.search), pageLevel(window.location.pathname));
    }, 0);
    return () => {
      window.clearTimeout(t);
      stop?.();
    };
  }, []);
  return null;
}

// "Happy Halloween!" chip next to the hub's hero badge; a click opens the "Did you know?" card.
export function SeasonalGreeting() {
  const ref = useRef<HTMLButtonElement>(null);
  const art = THEMES[activeTheme(window.location.search)];
  if (!art) return null;
  return (
    <button
      ref={ref}
      type="button"
      title={art.fact ? `What does "${art.fact.title}" mean?` : undefined}
      onClick={(e) => {
        e.stopPropagation();
        if (ref.current) showSeasonFact(ref.current);
      }}
      className="inline-flex w-fit items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800 hover:bg-purple-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
    >
      <span className="block w-4" aria-hidden="true" dangerouslySetInnerHTML={{ __html: art.ground }} />
      {art.greeting}
    </button>
  );
}
