import { describe, it, expect } from "vitest";

describe("vitest in the App", () => {
  it("runs with jsdom", () => {
    expect(typeof window.matchMedia).toBe("function");
  });
});
