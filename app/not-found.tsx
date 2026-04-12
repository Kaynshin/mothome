import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <p className="font-accent text-8xl text-[var(--color-bleu-logo)]">404</p>
        <h1 className="font-heading text-3xl text-[var(--color-blanc-casse)] uppercase">
          Page introuvable
        </h1>
        <Link
          href="/"
          className="inline-block font-sans text-sm text-[var(--color-or-mat)] underline underline-offset-4 hover:text-[var(--color-or-chaud)] transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
