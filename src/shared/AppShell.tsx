import { type ReactNode } from "react";
import { Home } from "lucide-react";

// ---------------------------------------------------------------------------
// AppHeader — shared dark header for all activity apps (not the landing page)
//
// Props:
//   title        — app name displayed in header
//   subtitle     — secondary line (topic name, level badge, etc.)
//   onTitleClick — makes the title a clickable back button (goes to topic select)
//   controls     — app-specific right-side elements (score badge, mute, restart…)
//   onTopics     — callback for "← Topics" nav; pass when there is a topic screen
//   showTopics   — show the Topics button only when the student is actively playing
// ---------------------------------------------------------------------------

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onTitleClick?: () => void;
  controls?: ReactNode;
  onTopics?: () => void;
  showTopics?: boolean;
}

export function AppHeader({
  title, subtitle, onTitleClick, controls, onTopics, showTopics,
}: AppHeaderProps) {
  return (
    <header className="bg-neutral-900 border-b border-neutral-700/50 px-6 py-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
        {/* Left: logo + title */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Englishpusher logo" className="h-8 w-auto" />
          <div>
            {onTitleClick ? (
              <button
                onClick={onTitleClick}
                className="font-display text-base font-bold leading-tight text-white hover:text-neutral-300 transition-colors"
              >
                {title}
              </button>
            ) : (
              <h1 className="font-display text-base font-bold leading-tight text-white">{title}</h1>
            )}
            {subtitle && <p className="text-xs text-neutral-400">{subtitle}</p>}
          </div>
        </div>

        {/* Right: app-specific controls + desktop nav */}
        <div className="flex items-center gap-1.5">
          {controls}

          {/* Desktop nav — hidden on mobile (footer handles mobile nav) */}
          <div className="hidden md:flex items-center gap-1 ml-1">
            {showTopics && onTopics && (
              <button
                onClick={onTopics}
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                ← Topics
              </button>
            )}
            <a
              href="https://app.englishpusher.in.ua"
              className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
            >
              <Home size={14} />
              Home
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// AppFooter — shared dark footer for all activity apps (not the landing page)
//
// On mobile: shows "‹ Topics" (if showTopics + onTopics) on left, "Home" on right
// On desktop: footer shows only copyright; nav lives in the header
// ---------------------------------------------------------------------------

interface AppFooterProps {
  onTopics?: () => void;
  showTopics?: boolean;
}

export function AppFooter({ onTopics, showTopics }: AppFooterProps) {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-700/50 px-6 py-3">
      {/* Mobile nav — hidden on desktop */}
      <div className="md:hidden mx-auto max-w-4xl flex items-center justify-between gap-4 text-sm mb-3">
        {showTopics && onTopics ? (
          <button
            onClick={onTopics}
            className="flex items-center gap-1 font-medium text-neutral-300 hover:text-white transition-colors"
          >
            ‹ Topics
          </button>
        ) : (
          <span />
        )}
        <a
          href="https://app.englishpusher.in.ua"
          className="flex items-center gap-1.5 font-medium text-neutral-300 hover:text-white transition-colors"
        >
          <Home size={14} />
          Home
        </a>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-4xl text-center text-sm text-neutral-400">
        Copyright &copy; 2026 &mdash;{" "}
        <a
          href="https://englishpusher.in.ua"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand hover:text-brand/80 transition-colors"
        >
          Englishpusher
        </a>
      </div>
    </footer>
  );
}
