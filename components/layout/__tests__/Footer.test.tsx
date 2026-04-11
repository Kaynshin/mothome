import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../Footer";

// next/link is mocked globally in vitest.setup.ts

describe("Footer", () => {
  it("renders the contentinfo landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the logo link", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Mothome — Accueil")).toBeInTheDocument();
  });

  it("renders secondary navigation links", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: "Navigation secondaire" });
    expect(nav).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: /L'Atelier/i })).toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: /Contact/i })).toBeInTheDocument();
  });

  it("renders opening hours section", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Horaires d'ouverture")).toBeInTheDocument();
    expect(screen.getByText(/Lundi – Vendredi/i)).toBeInTheDocument();
    expect(screen.getByText(/Samedi/i)).toBeInTheDocument();
    expect(screen.getByText(/Fermé/i)).toBeInTheDocument();
  });

  it("renders social media links", () => {
    render(<Footer />);
    const social = screen.getByLabelText("Réseaux sociaux");
    expect(social).toBeInTheDocument();
    expect(within(social).getByLabelText("Instagram")).toBeInTheDocument();
    expect(within(social).getByLabelText("Facebook")).toBeInTheDocument();
    expect(within(social).getByLabelText("YouTube")).toBeInTheDocument();
  });

  it("renders social links with external rel attributes", () => {
    render(<Footer />);
    const instagramLink = screen.getByLabelText("Instagram");
    expect(instagramLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(instagramLink).toHaveAttribute("target", "_blank");
  });

  it("renders the CTA link pointing to contact RDV", () => {
    render(<Footer />);
    const ctaLinks = screen.getAllByRole("link", { name: /Prendre RDV/i });
    expect(ctaLinks.length).toBeGreaterThan(0);
    expect(ctaLinks[0]).toHaveAttribute("href", "/contact#rdv");
  });

  it("renders phone link with tel: protocol", () => {
    render(<Footer />);
    const phoneLink = screen.getByRole("link", { name: /\+33/i });
    expect(phoneLink.getAttribute("href")).toMatch(/^tel:/);
  });

  it("renders email link with mailto: protocol", () => {
    render(<Footer />);
    const mailLink = screen.getByRole("link", { name: /contact@mothome\.fr/i });
    expect(mailLink.getAttribute("href")).toMatch(/^mailto:/);
  });

  it("renders the current year in copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders legal links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /Mentions légales/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Confidentialité/i })).toBeInTheDocument();
  });
});
