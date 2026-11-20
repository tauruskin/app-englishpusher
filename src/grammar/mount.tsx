import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../c1-shared.css";
import "./grammar.css";
import GrammarPage from "./GrammarPage.tsx";
import { levelBySlug, type GrammarLevelSlug } from "./levels.ts";

// Entry point of every /<slug>-grammar/ page.
export function mountGrammarPage(slug: GrammarLevelSlug) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <GrammarPage level={levelBySlug(slug)} />
    </StrictMode>,
  );
}
