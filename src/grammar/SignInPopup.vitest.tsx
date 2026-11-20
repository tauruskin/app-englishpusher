import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignInPopup, SIGNIN_POPUP_CLOSED_KEY } from "../shared/SignInPopup.tsx";

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("SignInPopup", () => {
  it("shows the heading, the given message and a Sign in link", async () => {
    render(<SignInPopup message="Custom message for this page." />);
    const popup = await screen.findByRole("status");
    expect(popup).toHaveTextContent("Keep your results");
    expect(popup).toHaveTextContent("Custom message for this page.");
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/account/");
  });

  it("uses one shared storage key", () => {
    expect(SIGNIN_POPUP_CLOSED_KEY).toBe("ep-signin-popup-closed");
  });

  it("Close hides it and remembers that for the session", async () => {
    render(<SignInPopup message="m" />);
    await screen.findByRole("status");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("status")).toBeNull();
    expect(sessionStorage.getItem("ep-signin-popup-closed")).toBe("1");
  });

  it("does not show when it was already closed this session", () => {
    sessionStorage.setItem("ep-signin-popup-closed", "1");
    render(<SignInPopup message="m" />);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("still shows and still closes when sessionStorage throws", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    render(<SignInPopup message="m" />);
    await screen.findByRole("status");
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("status")).toBeNull();
  });
});
