import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

function Simple() {
  return <p>Hello World</p>;
}

describe("Debug render", () => {
  it("renders a simple paragraph", async () => {
    await render(<Simple />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
