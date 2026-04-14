"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <p className="font-accent text-6xl text-[var(--color-bleu-logo)]">Oops</p>
        <h2 className="font-heading text-2xl text-[var(--color-blanc-casse)] uppercase">
          Une erreur est survenue
        </h2>
        <button
          onClick={reset}
          className="font-sans text-sm text-[var(--color-or-mat)] underline underline-offset-4 hover:text-[var(--color-or-chaud)] transition-colors"
        >
          Réessayer
        </button>
      </div>
    </main>
  );
}
