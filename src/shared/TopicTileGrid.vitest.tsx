import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TopicTileGrid, { type TopicTile } from "./TopicTileGrid.tsx";

const tiles: TopicTile[] = [
  { id: "modifiers", icon: "📏", title: "Modifiers", description: "quite, fairly", count: "8 cards" },
  { id: "empty", icon: "⏳", title: "Narrative Tenses", description: "past", count: null },
];

describe("TopicTileGrid", () => {
  it("shows every tile with its count, and Coming soon for a tile without content", () => {
    render(<TopicTileGrid variant="flashcards" badge="B1 Grammar" heading="Flash Cards" subtitle="Choose a topic" tiles={tiles} onSelect={() => {}} />);
    expect(screen.getByText("Modifiers")).toBeTruthy();
    expect(screen.getByText("8 cards")).toBeTruthy();
    expect(screen.getByText("Coming soon")).toBeTruthy();
    expect(screen.getByText("B1 Grammar")).toBeTruthy();
  });

  it("calls onSelect with the tile id and never for a Coming soon tile", () => {
    const onSelect = vi.fn();
    render(<TopicTileGrid variant="quiz" badge="B1" heading="Grammar Test" subtitle="Pick" tiles={tiles} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Modifiers"));
    fireEvent.click(screen.getByText("Narrative Tenses"));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith("modifiers");
  });
});
