"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Stagger } from "@/components/motion/Stagger";
import type { Moto } from "@/lib/leboncoin-stock";

const INITIAL = 3;
const BATCH = 3;

type Props = {
  motos: readonly Moto[];
  leboncoinUrl: string;
};

export function MotosShowcase({ motos, leboncoinUrl }: Props) {
  const [visible, setVisible] = useState(INITIAL);
  const [animatingFrom, setAnimatingFrom] = useState(INITIAL);
  const canExpand = visible < motos.length;
  const remaining = motos.length - visible;
  const nextBatch = Math.min(BATCH, remaining);

  const handleExpand = () => {
    setAnimatingFrom(visible);
    setVisible((c) => Math.min(c + BATCH, motos.length));
  };

  return (
    <>
      <Stagger
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        stagger={90}
      >
        {motos.map((moto, i) => {
          const isHidden = i >= visible;
          const isJustRevealed = i >= animatingFrom && i < visible;
          return (
          <article
            key={moto.id}
            className={`${isHidden ? "hidden sm:flex" : "flex"} ${isJustRevealed ? "mh-fade-up-mount" : ""} relative bg-[var(--color-card)] border rounded-lg overflow-hidden flex-col ${
              moto.disponible
                ? "border-[var(--color-border)]"
                : "border-[var(--color-border)] opacity-50"
            }`}
            style={isJustRevealed ? { animationDelay: `${(i - animatingFrom) * 100}ms` } : undefined}
          >
            <div className="relative aspect-[4/3] bg-[var(--color-muted)]">
              <Image
                src={moto.photo}
                alt={`${moto.marque} ${moto.modele} ${moto.annee} — annonce dépôt-vente Mothome`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
              {!moto.disponible && (
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-[var(--color-chassis-noir)]/80 rounded text-xs font-heading font-semibold text-[var(--color-blanc-sec)] uppercase tracking-wide">
                  Vendue
                </div>
              )}
              {moto.disponible && (
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-[var(--color-bleu-logo)] rounded text-xs font-heading font-semibold text-white uppercase tracking-wide">
                  Disponible
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="mb-4">
                <h3 className="font-heading text-xl text-[var(--color-foreground)] uppercase">
                  {moto.marque} {moto.modele}
                </h3>
                <p className="font-sans text-sm text-[var(--color-muted-foreground)]">
                  {moto.annee} · {moto.km}
                </p>
              </div>

              <div className="flex items-end justify-between mt-auto">
                <div>
                  <span className="block font-sans text-xs text-[var(--color-muted-foreground)] mb-1">
                    {moto.cylindree}
                  </span>
                  <span className="font-heading text-2xl text-[var(--color-bleu-logo)]">
                    {moto.prix}
                  </span>
                </div>
                {moto.disponible && (
                  <div className="flex flex-col items-end gap-2">
                    <a
                      href={moto.lbcUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-heading font-semibold text-[var(--color-muted-foreground)] hover:text-[var(--color-bleu-logo)] uppercase tracking-wide transition-colors"
                      aria-label={`Voir l'annonce ${moto.marque} ${moto.modele} sur Leboncoin (ouvre un nouvel onglet)`}
                    >
                      Voir l&apos;annonce
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                    <Link
                      href="/contact"
                      className="text-xs font-heading font-semibold text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] uppercase tracking-wide transition-colors"
                    >
                      Me renseigner →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </article>
          );
        })}
      </Stagger>

      {canExpand && (
        <div className="sm:hidden text-center mb-6">
          <button
            type="button"
            onClick={handleExpand}
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] hover:border-[var(--color-bleu-logo)] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] font-heading font-semibold uppercase tracking-widest text-sm rounded transition-colors"
            aria-label={`Afficher ${nextBatch} motos supplémentaires`}
          >
            Voir plus ({nextBatch})
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="text-center">
        <a
          href={leboncoinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] hover:border-[var(--color-bleu-livery)] hover:text-[var(--color-bleu-livery)] text-[var(--color-muted-foreground)] font-accent uppercase tracking-[0.12em] text-sm rounded transition-colors duration-150"
          aria-label="Voir toutes les annonces Mothome sur Leboncoin (ouvre un nouvel onglet)"
        >
          Voir toutes les annonces sur Leboncoin
          <ExternalLink size={14} aria-hidden="true" />
        </a>
        <p className="font-sans text-sm text-[var(--color-muted-foreground)] mt-4">
          Stock mis à jour automatiquement.{" "}
          <Link
            href="/contact"
            className="text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] underline underline-offset-2 transition-colors"
          >
            Contactez-nous
          </Link>{" "}
          pour une demande spécifique.
        </p>
      </div>
    </>
  );
}
