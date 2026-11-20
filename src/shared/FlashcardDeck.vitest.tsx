import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeckLayout } from "./FlashcardDeck.tsx";

function renderDeck(index: number, onPrev = vi.fn(), onNext = vi.fn()) {
  render(
    <DeckLayout badge="📏 Modifiers" index={index} total={3} teacherFlipped={false} onPrev={onPrev} onNext={onNext}
      prompt={{ title: "Ready to test yourself?", subtitle: "Take the Modifiers test", cta: "Take Test", href: "/b1-grammar/?topic=modifiers" }}>
      <div>CARD</div>
    </DeckLayout>,
  );
}

describe("DeckLayout", () => {
  it("shows progress and disables Previous on the first card", () => {
    renderDeck(0);
    expect(screen.getByText("1 / 3")).toBeTruthy();
    expect((screen.getByText("← Previous") as HTMLButtonElement).disabled).toBe(true);
    expect(screen.queryByText("Ready to test yourself?")).toBeNull();
  });

  it("shows the test prompt only on the last card, linking to the test", () => {
    renderDeck(2);
    expect((screen.getByText("Next →") as HTMLButtonElement).disabled).toBe(true);
    expect(screen.getByText("Ready to test yourself?").closest("a")!.getAttribute("href")).toBe("/b1-grammar/?topic=modifiers");
  });

  it("calls onNext", () => {
    const onNext = vi.fn();
    renderDeck(1, vi.fn(), onNext);
    fireEvent.click(screen.getByText("Next →"));
    expect(onNext).toHaveBeenCalledOnce();
  });
});
