import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LiveryStripes } from "@/components/motion/LiveryStripes";

describe("LiveryStripes", () => {
  it("renders an SVG wrapper marked aria-hidden", () => {
    const { container } = render(<LiveryStripes />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("is hors flow interactive (pointer-events none, absolute)", () => {
    const { container } = render(<LiveryStripes />);
    const svg = container.querySelector("svg");
    expect(svg?.className.baseVal).toContain("pointer-events-none");
    expect(svg?.className.baseVal).toContain("absolute");
  });

  it("contient exactement 5 stripes (rect.moto-stripe)", () => {
    const { container } = render(<LiveryStripes />);
    const stripes = container.querySelectorAll("rect.moto-stripe");
    expect(stripes).toHaveLength(5);
  });

  it("flagge 3 stripes data-mobile-hide=true (densité réduite mobile)", () => {
    const { container } = render(<LiveryStripes />);
    const hidden = container.querySelectorAll(
      "rect.moto-stripe[data-mobile-hide='true']",
    );
    const shown = container.querySelectorAll(
      "rect.moto-stripe[data-mobile-hide='false']",
    );
    expect(hidden).toHaveLength(3);
    expect(shown).toHaveLength(2);
  });

  it("applique fill=var(--color-bleu-livery) sur chaque stripe", () => {
    const { container } = render(<LiveryStripes />);
    const stripes = container.querySelectorAll("rect.moto-stripe");
    stripes.forEach((stripe) => {
      expect(stripe.getAttribute("fill")).toBe("var(--color-bleu-livery)");
    });
  });

  it("applique opacity via var(--stripe-op-N) sur chaque stripe", () => {
    const { container } = render(<LiveryStripes />);
    const stripes = container.querySelectorAll("rect.moto-stripe");
    stripes.forEach((stripe, i) => {
      const style = (stripe as SVGRectElement).getAttribute("style") ?? "";
      expect(style).toContain(`var(--stripe-op-${i + 1})`);
    });
  });

  it("regroupe les stripes dans un <g> rotaté 20°", () => {
    const { container } = render(<LiveryStripes />);
    const group = container.querySelector("svg > g");
    expect(group).toBeInTheDocument();
    expect(group?.getAttribute("transform")).toBe("rotate(20 50 50)");
  });
});
