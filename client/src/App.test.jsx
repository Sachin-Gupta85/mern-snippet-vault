import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App.jsx";

describe("Snippet Vault App", () => {
  beforeEach(() => vi.restoreAllMocks());
  it("renders a snippet with language and code", async () => {
    globalThis.fetch = vi.fn(() => Promise.resolve({
      ok: true, status: 200,
      json: async () => [{ id: "1", title: "Debounce", language: "javascript", code: "const x=1", tags: [] }],
    }));
    render(<App />);
    await waitFor(() => expect(screen.getByText("Debounce")).toBeInTheDocument());
    expect(screen.getByText("const x=1")).toBeInTheDocument();
  });
});
