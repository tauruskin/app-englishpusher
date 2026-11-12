import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import GrammarLevelPage from "./GrammarLevelPage.tsx";
import { levelBySlug } from "./levels.ts";
import allTopics from "./topics/index.ts";
import type { GrammarTopic } from "./types.ts";

const b1Topics = allTopics.filter((t) => t.level === "B1");

describe("GrammarLevelPage", () => {
  beforeEach(() => document.body.replaceChildren());

  it("topics with cards: Flash Cards is an active link", () => {
    render(<GrammarLevelPage level={levelBySlug("b1")} topics={b1Topics} />);
    expect(screen.getByRole("link", { name: "Flash Cards" }).getAttribute("href")).toBe("/b1-grammar-flashcards/");
    expect(screen.getByRole("link", { name: "Grammar Test" })).toBeTruthy();
  });

  it("no topic with cards: Flash Cards is not a link, the test still is", () => {
    const withoutCards: GrammarTopic[] = b1Topics.map((t) => ({ ...t, cards: undefined }));
    render(<GrammarLevelPage level={levelBySlug("b1")} topics={withoutCards} />);
    expect(screen.queryByRole("link", { name: "Flash Cards" })).toBeNull();
    expect(screen.getByText("Flash Cards")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Grammar Test" })).toBeTruthy();
  });

  it("the Grammar Test description makes no question-count promise", () => {
    render(<GrammarLevelPage level={levelBySlug("b1")} topics={b1Topics} />);
    expect(screen.getByText("Gap-fill, error-spot, word order and more")).toBeTruthy();
  });
});
