import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormsDisabledCTA } from "./FormsDisabledCTA";

describe("FormsDisabledCTA", () => {
  it("rend le titre et l'intro par défaut", () => {
    render(<FormsDisabledCTA />);
    expect(
      screen.getByRole("heading", { name: /Appelez-nous directement/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Le plus rapide pour nous joindre/i),
    ).toBeInTheDocument();
  });

  it("accepte un titre, une intro et un label custom", () => {
    render(
      <FormsDisabledCTA
        title="Appelez pour un devis"
        intro="Phrase d'intro personnalisée."
        ctaLabel="Appeler pour un devis"
      />,
    );
    expect(
      screen.getByRole("heading", { name: /Appelez pour un devis/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Phrase d'intro personnalisée\./i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Appeler Mot'Home/i }),
    ).toHaveTextContent(/Appeler pour un devis/i);
  });

  it("rend le PhoneCta avec le bon numéro et href tel:", () => {
    render(<FormsDisabledCTA />);
    const phoneLink = screen.getByRole("link", { name: /Appeler Mot'Home/i });
    expect(phoneLink).toHaveAttribute("href", "tel:+33450733808");
    expect(phoneLink).toHaveTextContent("04 50 73 38 08");
  });

  it("rend les 3 lignes d'horaires (lun-ven, samedi, dimanche)", () => {
    render(<FormsDisabledCTA />);
    const list = screen.getByRole("list", { name: /Horaires d'ouverture/i });
    expect(list).toBeInTheDocument();
    expect(screen.getByText(/Lundi – Vendredi/i)).toBeInTheDocument();
    expect(screen.getByText(/Samedi/i)).toBeInTheDocument();
    expect(screen.getByText(/Dimanche/i)).toBeInTheDocument();
    expect(screen.getByText(/8h00 – 18h00/)).toBeInTheDocument();
    expect(screen.getByText(/Fermé/)).toBeInTheDocument();
  });

  it("rend le lien adresse Maps en target=_blank avec rel noopener", () => {
    render(<FormsDisabledCTA />);
    const mapLink = screen.getByRole("link", {
      name: /Voir l'adresse sur Google Maps/i,
    });
    expect(mapLink).toHaveAttribute("target", "_blank");
    expect(mapLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(mapLink).toHaveAttribute(
      "href",
      "https://maps.google.com/?q=6+Chemin+de+Marclaz+Dessus,+74200+Thonon-les-Bains",
    );
  });

  it("ne promet pas de réponse 'sous 24h' (canal email retiré)", () => {
    render(
      <FormsDisabledCTA
        intro="Le plus rapide pour nous joindre : un coup de fil pendant les horaires."
      />,
    );
    expect(screen.queryByText(/sous 24h/i)).not.toBeInTheDocument();
  });
});
