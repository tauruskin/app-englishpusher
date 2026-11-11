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
  sessionStorage.clear();
});

describe("GrammarSaveStatus", () => {
  it("shows a guest the sign-in hint and saves nothing", () => {
    render(<GrammarSaveStatus app="b1-grammar" topicId="modifiers" results={results} />);
    expect(screen.getAllByRole("link", { name: "Sign in" })[0]).toHaveAttribute("href", "/account/");
    expect(state.save).not.toHaveBeenCalled();
  });

  it("shows a guest a sign-in popup as well as the small line", async () => {
    render(<GrammarSaveStatus app="b1-grammar" topicId="modifiers" results={results} />);
    const popup = await screen.findByRole("status");
    expect(popup).toHaveTextContent("Keep your results");
    const links = screen.getAllByRole("link", { name: "Sign in" });
    expect(links).toHaveLength(2);
    links.forEach((l) => expect(l).toHaveAttribute("href", "/account/"));
    expect(popup).toContainElement(links[1]);
  });

  it("closing the popup hides it, remembers that for the session and keeps the small line", async () => {
    render(<GrammarSaveStatus app="b1-grammar" topicId="modifiers" results={results} />);
    await screen.findByRole("status");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("status")).toBeNull();
    expect(sessionStorage.getItem("ep-grammar-signin-popup-closed")).toBe("1");
    expect(screen.getAllByRole("link", { name: "Sign in" })).toHaveLength(1);
  });

  it("does not show the popup when it was already closed this session", async () => {
    sessionStorage.setItem("ep-grammar-signin-popup-closed", "1");
    render(<GrammarSaveStatus app="b1-grammar" topicId="modifiers" results={results} />);
    await new Promise((r) => setTimeout(r, 100));
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getAllByRole("link", { name: "Sign in" })).toHaveLength(1);
  });

  it("never shows the popup to a signed-in user", async () => {
    state.user = { id: "u1" };
    render(<GrammarSaveStatus app="b1-grammar" topicId="modifiers" results={results} />);
    await waitFor(() => expect(state.save).toHaveBeenCalled());
    await new Promise((r) => setTimeout(r, 100));
    expect(screen.queryByRole("status")).toBeNull();
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
