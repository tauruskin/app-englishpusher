import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import GrammarPage from "./GrammarPage.tsx";
import { levelBySlug } from "./levels.ts";
import allTopics from "./topics/index.ts";

const modifiers = allTopics.find((t) => t.id === "modifiers")!;

function at(search: string) {
  window.history.replaceState({}, "", `/b1-grammar/${search}`);
  render(<GrammarPage level={levelBySlug("b1")} />);
}

describe("/b1-grammar/ routing", () => {
  beforeEach(() => document.body.replaceChildren());

  it("no query: the level page with Flash Cards and Grammar Test", () => {
    at("");
    expect(screen.getByRole("link", { name: "Flash Cards" }).getAttribute("href")).toBe("/b1-grammar-flashcards/");
    expect(screen.getByRole("link", { name: "Grammar Test" }).getAttribute("href")).toBe("/b1-grammar/?view=topics");
  });

  it("?view=topics: the topic tiles with question counts", () => {
    at("?view=topics");
    expect(screen.getByText("Modifiers")).toBeTruthy();
    expect(screen.getAllByText(`${modifiers.rules.length} questions`).length).toBeGreaterThan(0);
    expect(screen.getByText("Choose a topic to start the test")).toBeTruthy();
  });

  it("?topic=<id>: straight into the test (old Moodle links)", () => {
    at("?topic=modifiers");
    expect(screen.queryByRole("link", { name: "Flash Cards" })).toBeNull();
    expect(screen.queryByText("Choose a topic to start the test")).toBeNull();
    expect(screen.getByText(/Question/)).toBeTruthy();
  });

  it("C1 without topics: Coming soon", () => {
    window.history.replaceState({}, "", "/c1-grammar/");
    render(<GrammarPage level={levelBySlug("c1")} />);
    expect(screen.getByText("Coming soon")).toBeTruthy();
  });
});
