import type { ReactNode } from "react";
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

function renderNav(index: number, extra: { tapToFlip?: boolean; card?: ReactNode } = {}) {
  const onPrev = vi.fn(), onNext = vi.fn(), onFlip = vi.fn();
  render(
    <>
      <input aria-label="search" />
      <DeckLayout badge="b" index={index} total={3} teacherFlipped={false}
        onPrev={onPrev} onNext={onNext} onFlip={onFlip} tapToFlip={extra.tapToFlip}>
        {extra.card ?? <div>CARD <button>Speak</button></div>}
      </DeckLayout>
    </>,
  );
  return { onPrev, onNext, onFlip };
}

describe("DeckLayout keyboard", () => {
  it("→ goes to the next card, ← to the previous one", () => {
    const { onPrev, onNext } = renderNav(1);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(onNext).toHaveBeenCalledOnce();
    expect(onPrev).toHaveBeenCalledOnce();
  });

  it("does not go past the first or last card", () => {
    const first = renderNav(0);
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(first.onPrev).not.toHaveBeenCalled();
  });

  it("Space flips the card", () => {
    const { onFlip } = renderNav(1);
    fireEvent.keyDown(document.body, { key: " " });
    expect(onFlip).toHaveBeenCalledOnce();
  });

  it("ignores keys while typing, with modifiers, or when a dialog is open", () => {
    const { onNext, onFlip } = renderNav(1);
    const input = screen.getByLabelText("search");
    fireEvent.keyDown(input, { key: "ArrowRight" });
    fireEvent.keyDown(input, { key: " " });
    fireEvent.keyDown(window, { key: "ArrowRight", ctrlKey: true });
    const dialog = document.createElement("div");
    dialog.setAttribute("role", "dialog");
    document.body.appendChild(dialog);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    dialog.remove();
    expect(onNext).not.toHaveBeenCalled();
    expect(onFlip).not.toHaveBeenCalled();
  });

  it("Space on a focused button is left to the button", () => {
    const { onFlip } = renderNav(1);
    fireEvent.keyDown(screen.getByText("Speak"), { key: " " });
    expect(onFlip).not.toHaveBeenCalled();
  });
});

describe("DeckLayout tap to flip", () => {
  it("tapping the card flips it", () => {
    const { onFlip } = renderNav(1);
    fireEvent.click(screen.getByText(/CARD/));
    expect(onFlip).toHaveBeenCalledOnce();
  });

  it("tapping a button on the card does not flip it", () => {
    const { onFlip } = renderNav(1);
    fireEvent.click(screen.getByText("Speak"));
    expect(onFlip).not.toHaveBeenCalled();
  });

  it("tapToFlip={false} leaves taps to the card (grammar), Space still flips", () => {
    const { onFlip } = renderNav(1, { tapToFlip: false });
    fireEvent.click(screen.getByText(/CARD/));
    expect(onFlip).not.toHaveBeenCalled();
    fireEvent.keyDown(document.body, { key: " " });
    expect(onFlip).toHaveBeenCalledOnce();
  });
});
