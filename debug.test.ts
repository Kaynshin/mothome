import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import React from "react";

describe("debug", () => {
  it("renders Footer with error boundary", async () => {
    const Footer = (await import("./components/layout/Footer")).default;
    try {
      const jsx = Footer();
      console.log("Footer JSX type:", typeof jsx, jsx === null ? "NULL" : "not null");
      if (jsx) console.log("Footer JSX:", JSON.stringify(jsx).substring(0, 200));
    } catch (e) {
      console.error("Footer() threw:", e);
    }
    
    const { container } = render(React.createElement(Footer));
    console.log("container childNodes:", container.childNodes.length);
    console.log("container HTML:", container.innerHTML || "(empty)");
  });
});
