import { StrictMode, createContext, useContext, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import "../c1-shared.css";
import type { LevelConfig } from "./types.ts";
import { isComingSoon, pageUrl } from "./level.ts";

const LevelContext = createContext<LevelConfig | null>(null);

// The level the current page shows (A2, A2+, B1, B1+ or B2+). Only valid on pages started by mountLevelPage.
export function useLevel(): LevelConfig {
  const level = useContext(LevelContext);
  if (!level) throw new Error("useLevel() used outside mountLevelPage");
  return level;
}

// Entry point for every level page. Flashcards and Trivia of a level without topics yet send the
// student to that level's Vocabulary page, which says the topics are coming soon.
export function mountLevelPage(Page: ComponentType, level: LevelConfig, opts: { needsTopics: boolean }) {
  if (opts.needsTopics && isComingSoon(level)) {
    window.location.replace(pageUrl(level, "vocabulary"));
    return;
  }
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <LevelContext.Provider value={level}>
        <Page />
      </LevelContext.Provider>
    </StrictMode>,
  );
}
