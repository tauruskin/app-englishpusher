import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RuleCardView from "./RuleCardView.tsx";

const card = {
  id: "zz-card-1", rule: "he/she/it + -s", example: "My brother ___ (go) to the gym.", answer: "goes",
  explanation: "e", examples: ["A.", "B."] as [string, string], ua: "u",
};

describe("RuleCardView", () => {
  it("the front keeps the verb hint after the gap", () => {
    const { container } = render(<RuleCardView card={card} isFlipped={false} onFlip={() => {}} index={0} uaRule="short" />);
    expect(container.textContent).toContain("(go) to the gym.");
  });

  it("the back shows the full sentence without the hint", () => {
    const { container } = render(<RuleCardView card={card} isFlipped onFlip={() => {}} index={0} uaRule="short" />);
    expect(container.textContent).toContain("My brother goes to the gym.");
    expect(container.textContent).not.toContain("(go)");
  });
});
