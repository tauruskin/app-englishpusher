import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import type { TriviaResultInput } from "../shared/progress.ts";

const state = vi.hoisted(() => ({
  user: null as { id: string } | null,
  loading: false,
  save: vi.fn<(input: TriviaResultInput) => Promise<string | null>>(),
}));

vi.mock("../shared/auth.tsx", () => ({ useSessionUser: () => ({ user: state.user, loading: state.loading }) }));
vi.mock("../shared/supabase.ts", () => ({ isSupabaseConfigured: true }));
vi.mock("../shared/progress.ts", () => ({ saveTriviaResult: state.save }));

import { TriviaSaveStatus } from "../shared/TriviaSave.tsx";

const input: TriviaResultInput = {
  app: "b1-trivia",
  topicId: "travel",
  scorePct: 80,
  correctWords: ["a"],
  missedWords: ["b"],
};

beforeEach(() => {
  state.user = null;
  state.loading = false;
  state.save.mockReset();
  state.save.mockResolvedValue(null);
  sessionStorage.clear();
});

describe("TriviaSaveStatus", () => {
  it("shows a guest the small line and the sign-in popup", async () => {
    render(<TriviaSaveStatus input={input} />);
    const popup = await screen.findByRole("status");
    expect(popup).toHaveTextContent("Keep your results");
    expect(popup).toHaveTextContent("which words to practise");
    const links = screen.getAllByRole("link", { name: "Sign in" });
    expect(links).toHaveLength(2);
    links.forEach((l) => expect(l).toHaveAttribute("href", "/account/"));
    expect(state.save).not.toHaveBeenCalled();
  });

  it("shows a signed-in user no popup and saves the result", async () => {
    state.user = { id: "u1" };
    render(<TriviaSaveStatus input={input} />);
    await waitFor(() => expect(state.save).toHaveBeenCalledTimes(1));
    await new Promise((r) => setTimeout(r, 100));
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.queryByRole("link", { name: "Sign in" })).toBeNull();
  });
});
