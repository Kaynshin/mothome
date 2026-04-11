import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";

function SimpleFooter() {
  return <footer role="contentinfo"><p>Hello</p></footer>;
}

describe("debug2", () => {
  it("renders simple component", () => {
    const { container } = render(<SimpleFooter />);
    console.log("Simple:", container.innerHTML);
  });

  it("renders Footer import", async () => {
    const { default: Footer } = await import("./components/layout/Footer");
    console.log("Footer fn:", Footer.toString().substring(0, 100));
    const { container } = render(<Footer />);
    console.log("Footer HTML:", container.innerHTML.substring(0, 500) || "EMPTY");
  });
});
