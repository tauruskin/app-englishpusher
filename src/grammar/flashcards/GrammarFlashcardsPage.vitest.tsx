import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
vi.mock("../../shared/progress.ts", () => ({ logStudyEvent: vi.fn(async () => null) }));
import { logStudyEvent } from "../../shared/progress.ts";
import GrammarFlashcardsPage from "./GrammarFlashcardsPage.tsx";
import { levelBySlug } from "../levels.ts";
import type { GrammarTopic } from "../types.ts";

const cards = [1, 2, 3, 4, 5, 6].map((i) => ({
  id: `zz-card-${i}`, rule: `Rule ${i}`, example: `Example ${i} is ___ here.`, answer: `ans${i}`,
  explanation: `Explanation ${i}.`, examples: [`One ${i}.`, `Two ${i}.`] as [string, string], ua: `UA ${i}`,
}));
const withCards: GrammarTopic = { id: "zz-mod", level: "B1", name: "ZZ Modifiers", description: "d", icon: "📏", cards, rules: [] };
const noCards: GrammarTopic = { id: "zz-none", level: "B1", name: "ZZ Empty", description: "d", icon: "⏳", rules: [] };

function open(search: string) {
  window.history.replaceState({}, "", `/b1-grammar-flashcards/${search}`);
  render(<GrammarFlashcardsPage level={levelBySlug("b1")} topics={[withCards, noCards]} />);
}

describe("grammar flashcards", () => {
  beforeEach(() => { document.body.replaceChildren(); vi.mocked(logStudyEvent).mockClear(); });

  it("lists topics with card counts and Coming soon", () => {
    open("");
    expect(screen.getByText("6 cards")).toBeTruthy();
    expect(screen.getByText("Coming soon")).toBeTruthy();
  });

  it("opening a topic logs one study event with the grammar flashcards app id", async () => {
    open("");
    fireEvent.click(screen.getByText("ZZ Modifiers"));
    expect(await screen.findByText("Rule 1")).toBeTruthy();
    expect(logStudyEvent).toHaveBeenCalledOnce();
    expect(logStudyEvent).toHaveBeenCalledWith("b1-grammar-flashcards", "zz-mod");
  });

  it("flipping shows the full sentence, explanation, examples and Ukrainian", async () => {
    open("?topic=zz-mod");
    fireEvent.click(screen.getByRole("button", { name: /show the rule/i }));
    // the card fades out before the back fades in (AnimatePresence mode="wait"), so wait for it
    expect(await screen.findByText("ans1")).toBeTruthy();
    expect(screen.getByText("Explanation 1.")).toBeTruthy();
    expect(screen.getByText("One 1.")).toBeTruthy();
    expect(screen.getByText("UA 1")).toBeTruthy();
  });

  it("tapping the card itself flips it", async () => {
    open("?topic=zz-mod");
    fireEvent.click(screen.getByText("Rule 1"));
    expect(await screen.findByText("Explanation 1.")).toBeTruthy();
  });

  it("the last card invites the topic's test", () => {
    open("?topic=zz-mod");
    for (let i = 0; i < 5; i++) fireEvent.click(screen.getByText("Next →"));
    expect(screen.getByText("Ready to test yourself?").closest("a")!.getAttribute("href")).toBe("/b1-grammar/?topic=zz-mod");
  });

  it("a deep link to a topic without cards falls back to the list", () => {
    open("?topic=zz-none");
    expect(screen.getByText("6 cards")).toBeTruthy();
  });
});
