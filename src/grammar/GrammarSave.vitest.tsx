import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import type { GrammarAnswerRow } from "../shared/progress.ts";

const state = vi.hoisted(() => ({
  user: null as { id: string } | null,
  loading: false,
  save: vi.fn<(rows: GrammarAnswerRow[]) => Promise<string | null>>(),
}));

vi.mock("../shared/auth.tsx", () => ({ useSessionUser: () => ({ user: state.user, loading: state.loading }) }));
vi.mock("../shared/supabase.ts", () => ({ isSupabaseConfigured: true }));
vi.mock("../shared/progress.ts", () => ({ saveGrammarAnswers: state.save }));

import { GrammarSaveStatus } from "./GrammarSave.tsx";

const results = [
  { question: { id: "mod-gap-1", type: "gap-fill", sentence: "It was ___ cold." }, userAnswer: "such", correctAnswer: "so", correct: false },
];

beforeEach(() => {
  state.user = null;
  state.loading = false;
  state.save.mockReset();
  state.save.mockResolvedValue(null);
});

describe("GrammarSaveStatus", () => {
  it("shows a guest the sign-in hint and saves nothing", () => {
    render(<GrammarSaveStatus app="b1-grammar" topicId="modifiers" results={results} />);
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/account/");
    expect(state.save).not.toHaveBeenCalled();
  });

  it("saves a signed-in student's session once, even when rendered again", async () => {
    state.user = { id: "u1" };
    const view = render(<GrammarSaveStatus app="b1-grammar" topicId="modifiers" results={results} />);
    view.rerender(<GrammarSaveStatus app="b1-grammar" topicId="modifiers" results={results} />);
    await waitFor(() => expect(state.save).toHaveBeenCalledTimes(1));
    const rows = state.save.mock.calls[0][0];
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ app: "b1-grammar", topic_id: "modifiers", question_id: "mod-gap-1", correct: false });
    expect(rows[0].session_id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    expect(screen.queryByRole("link", { name: "Sign in" })).toBeNull();
  });

  it("waits for the session before deciding", () => {
    state.loading = true;
    const { container } = render(<GrammarSaveStatus app="b1-grammar" topicId="modifiers" results={results} />);
    expect(container).toBeEmptyDOMElement();
    expect(state.save).not.toHaveBeenCalled();
  });

  it("shows a notice that can be closed when saving fails", async () => {
    state.user = { id: "u1" };
    state.save.mockResolvedValue("Couldn't save — check your connection.");
    render(<GrammarSaveStatus app="b1-grammar" topicId="modifiers" results={results} />);
    expect(await screen.findByText("Couldn't save — check your connection.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(screen.queryByText("Couldn't save — check your connection.")).toBeNull();
  });
});
