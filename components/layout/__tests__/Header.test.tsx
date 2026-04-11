import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "../Header";

const mockPathname = vi.hoisted(() => vi.fn(() => "/"));

vi.mock("next/navigation", () => ({
  usePathname: mockPathname,
}));

describe("Header", () => {
  beforeEach(() => {
    mockPathname.mockReturnValue("/");
  });

  it("renders the banner landmark", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders the logo link", () => {
    render(<Header />);
    expect(screen.getByLabelText("Mothome — Accueil")).toBeInTheDocument();
  });

  it("renders the desktop navigation with all links", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: "Navigation principale" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /L'Atelier/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Service à domicile/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Le Bar/i })).toBeInTheDocument();
  });

  it("renders the CTA link with correct href", () => {
    render(<Header />);
    const ctaLinks = screen.getAllByRole("link", { name: /Prendre RDV/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
    expect(ctaLinks[0]).toHaveAttribute("href", "/contact#rdv");
  });

  it("renders the hamburger button", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: "Ouvrir le menu" })).toBeInTheDocument();
  });

  it("opens the mobile menu on hamburger click", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));

    expect(
      screen.getByRole("navigation", { name: "Navigation mobile" })
    ).toBeInTheDocument();
  });

  it("closes the mobile menu on close button click", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Ouvrir le menu" }));
    await user.click(screen.getByRole("button", { name: "Fermer le menu" }));

    expect(
      screen.queryByRole("navigation", { name: "Navigation mobile" })
    ).not.toBeInTheDocument();
  });

  it("marks the active nav link with aria-current=page", () => {
    mockPathname.mockReturnValue("/contact");
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Navigation principale" });
    const contactLink = desktopNav.querySelector('[href="/contact"]');
    expect(contactLink).toHaveAttribute("aria-current", "page");
  });
});
