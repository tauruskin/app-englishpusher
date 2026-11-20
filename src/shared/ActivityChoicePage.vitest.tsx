import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CreditCard, Trophy } from "lucide-react";
import ActivityChoicePage, { type ActivityItem } from "./ActivityChoicePage.tsx";

const items: ActivityItem[] = [
  { id: 1, label: "Flash Cards", description: "Learn", cta: "Study now", href: "/b1-grammar-flashcards/", Icon: CreditCard, bgFrom: "#000", bgTo: "#111", accentColor: "#fff", disabled: false },
  { id: 2, label: "Grammar Test", description: "Test", cta: "Start test", href: "/b1-grammar/?view=topics", Icon: Trophy, bgFrom: "#000", bgTo: "#111", accentColor: "#fff", disabled: false },
  { id: 3, label: "Hidden", description: "x", cta: "x", href: "/x/", Icon: Trophy, bgFrom: "#000", bgTo: "#111", accentColor: "#fff", disabled: false, hidden: true },
];

describe("ActivityChoicePage", () => {
  it("links every visible activity and hides hidden ones", () => {
    render(<ActivityChoicePage headerTitle="B1 Grammar" badge="B1 Grammar" items={items} comingSoon={false} comingSoonText="" />);
    expect(screen.getByRole("link", { name: "Flash Cards" }).getAttribute("href")).toBe("/b1-grammar-flashcards/");
    expect(screen.getByRole("link", { name: "Grammar Test" }).getAttribute("href")).toBe("/b1-grammar/?view=topics");
    expect(screen.queryByText("Hidden")).toBeNull();
  });

  it("shows Coming soon instead of the cards", () => {
    render(<ActivityChoicePage headerTitle="C1 Grammar" badge="C1 Grammar" items={items} comingSoon comingSoonText="C1 grammar topics are being prepared. Check back soon!" />);
    expect(screen.getByText("Coming soon")).toBeTruthy();
    expect(screen.queryByRole("link", { name: "Flash Cards" })).toBeNull();
  });
});
