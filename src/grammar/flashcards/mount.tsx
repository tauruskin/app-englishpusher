import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../c1-shared.css";
import allTopics from "../topics/index.ts";
import GrammarFlashcardsPage from "./GrammarFlashcardsPage.tsx";
import { grammarUrl, levelBySlug, topicsForLevel, type GrammarLevelSlug } from "../levels.ts";

// Entry point of every /<slug>-grammar-flashcards/ page. A level without grammar topics sends the
// student to /<slug>-grammar/, which says the topics are coming soon.
export function mountGrammarFlashcardsPage(slug: GrammarLevelSlug) {
  const level = levelBySlug(slug);
  const topics = topicsForLevel(allTopics, level.id);
  if (topics.length === 0) {
    window.location.replace(grammarUrl(level));
    return;
  }
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <GrammarFlashcardsPage level={level} topics={topics} />
    </StrictMode>,
  );
}
