import { useState } from "react";
import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import RuleCardView from "./RuleCardView.tsx";

function Stateful() {
  const [flipped, setFlipped] = useState(false);
  return <RuleCardView card={card} isFlipped={flipped} onFlip={() => setFlipped((f) => !f)} index={0} uaRule="short" />;
}

const card = {
  id: "zz-card-1", rule: "he/she/it + -s", example: "My brother ___ (go) to the gym.", answer: "goes",
  explanation: "e", examples: ["A.", "B."] as [string, string], ua: "u",
};

describe("RuleCardView", () => {
  it("the front keeps the verb hint after the gap", () => {
    const { container } = render(<RuleCardView card={card} isFlipped={false} onFlip={() => {}} index={0} uaRule="short" />);
    expect(container.textContent).toContain("(go) to the gym.");
  });

  it("the gap is announced to screen readers as a blank", () => {
    const { container } = render(<RuleCardView card={card} isFlipped={false} onFlip={() => {}} index={0} uaRule="short" />);
    expect(container.querySelector(".sr-only")?.textContent).toBe("blank");
  });

  it("focus moves to the other face's button after a button flip", async () => {
    render(<Stateful />);
    const show = screen.getByRole("button", { name: "Show the rule" });
    show.focus();
    fireEvent.click(show);
    const back = await screen.findByRole("button", { name: "Show the front" });
    expect(document.activeElement).toBe(back);
    fireEvent.click(back);
    const front = await screen.findByRole("button", { name: "Show the rule" });
    expect(document.activeElement).toBe(front);
  });

  it("tapping the card (not a button) does not move focus", async () => {
    const { container } = render(<Stateful />);
    fireEvent.click(container.querySelector(".cursor-pointer")!);
    const back = await screen.findByRole("button", { name: "Show the front" });
    expect(document.activeElement).not.toBe(back);
  });

  it("the back shows the full sentence without the hint", () => {
    const { container } = render(<RuleCardView card={card} isFlipped onFlip={() => {}} index={0} uaRule="short" />);
    expect(container.textContent).toContain("My brother goes to the gym.");
    expect(container.textContent).not.toContain("(go)");
  });
});
