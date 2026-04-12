"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const SERVICES_OPTIONS = [
  "Révision & entretien",
  "Réparation & diagnostic",
  "Contrôle technique",
  "Kit éthanol eFlexMoto",
  "Autre",
] as const;

export default function DevisForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const moto = data.get("moto") as string;
    const message = data.get("message") as string;

    if (!name || name.trim().length < 2) errs.name = "Nom requis (2 caractères min.)";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email invalide";
    if (!moto || moto.trim().length < 2) errs.moto = "Marque / modèle requis";
    if (!message || message.trim().length < 10) errs.message = "Description requise (10 caractères min.)";

    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setState("submitting");

    try {
      const motoStr = data.get("moto") as string;
      const [marque, ...modeleParts] = motoStr.trim().split(" ");
      const payload = {
        name: data.get("name") as string,
        email: data.get("email") as string,
        phone: data.get("phone") as string,
        marque: marque ?? motoStr,
        modele: modeleParts.join(" ") || undefined,
        typeIntervention: (data.get("service") as string) || "Autre",
        message: data.get("message") as string,
      };

      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setState("success");
        form.reset();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle size={48} className="text-[var(--color-bleu-logo)]" aria-hidden="true" />
        <h3 className="font-heading text-2xl text-[var(--color-blanc-casse)] uppercase">
          Demande envoyée !
        </h3>
        <p className="font-sans text-[var(--color-gris-moyen)] max-w-sm">
          Mael vous contacte sous 24h pour vous faire un devis. À très vite !
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-4 text-sm font-heading text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] uppercase tracking-wide transition-colors"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulaire de demande de devis"
      className="space-y-6"
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="devis-name"
            className="block text-sm font-heading font-semibold text-[var(--color-gris-clair)] uppercase tracking-wide mb-2"
          >
            Nom <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
          </label>
          <input
            id="devis-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Votre nom"
            aria-describedby={errors.name ? "devis-name-error" : undefined}
            aria-invalid={!!errors.name}
            className="w-full px-4 py-3 bg-[var(--color-noir-doux)] border border-[var(--color-border)] rounded-md text-[var(--color-blanc-casse)] placeholder-[var(--color-gris-moyen)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors"
          />
          {errors.name && (
            <p id="devis-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="devis-email"
            className="block text-sm font-heading font-semibold text-[var(--color-gris-clair)] uppercase tracking-wide mb-2"
          >
            Email <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
          </label>
          <input
            id="devis-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="votre@email.fr"
            aria-describedby={errors.email ? "devis-email-error" : undefined}
            aria-invalid={!!errors.email}
            className="w-full px-4 py-3 bg-[var(--color-noir-doux)] border border-[var(--color-border)] rounded-md text-[var(--color-blanc-casse)] placeholder-[var(--color-gris-moyen)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors"
          />
          {errors.email && (
            <p id="devis-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone + Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="devis-phone"
            className="block text-sm font-heading font-semibold text-[var(--color-gris-clair)] uppercase tracking-wide mb-2"
          >
            Téléphone{" "}
            <span className="text-[var(--color-gris-moyen)] font-sans normal-case tracking-normal text-xs font-normal">
              (optionnel)
            </span>
          </label>
          <input
            id="devis-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            className="w-full px-4 py-3 bg-[var(--color-noir-doux)] border border-[var(--color-border)] rounded-md text-[var(--color-blanc-casse)] placeholder-[var(--color-gris-moyen)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="devis-service"
            className="block text-sm font-heading font-semibold text-[var(--color-gris-clair)] uppercase tracking-wide mb-2"
          >
            Service souhaité
          </label>
          <select
            id="devis-service"
            name="service"
            className="w-full px-4 py-3 bg-[var(--color-noir-doux)] border border-[var(--color-border)] rounded-md text-[var(--color-blanc-casse)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors appearance-none"
          >
            {SERVICES_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Moto */}
      <div>
        <label
          htmlFor="devis-moto"
          className="block text-sm font-heading font-semibold text-[var(--color-gris-clair)] uppercase tracking-wide mb-2"
        >
          Votre moto{" "}
          <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
        </label>
        <input
          id="devis-moto"
          name="moto"
          type="text"
          required
          placeholder="Ex. : Honda CB650R 2021"
          aria-describedby={errors.moto ? "devis-moto-error" : undefined}
          aria-invalid={!!errors.moto}
          className="w-full px-4 py-3 bg-[var(--color-noir-doux)] border border-[var(--color-border)] rounded-md text-[var(--color-blanc-casse)] placeholder-[var(--color-gris-moyen)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors"
        />
        {errors.moto && (
          <p id="devis-moto-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.moto}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="devis-message"
          className="block text-sm font-heading font-semibold text-[var(--color-gris-clair)] uppercase tracking-wide mb-2"
        >
          Description de la demande{" "}
          <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
        </label>
        <textarea
          id="devis-message"
          name="message"
          required
          rows={5}
          placeholder="Décris ce que tu as besoin : symptômes, kilométrage, dernier entretien..."
          aria-describedby={errors.message ? "devis-message-error" : undefined}
          aria-invalid={!!errors.message}
          className="w-full px-4 py-3 bg-[var(--color-noir-doux)] border border-[var(--color-border)] rounded-md text-[var(--color-blanc-casse)] placeholder-[var(--color-gris-moyen)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors resize-y"
        />
        {errors.message && (
          <p id="devis-message-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Error state */}
      {state === "error" && (
        <div
          role="alert"
          className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-800/40 rounded-md"
        >
          <AlertCircle size={16} className="text-red-400 shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-300">
            Une erreur s'est produite. Réessayez ou contactez Mael directement.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] disabled:opacity-60 disabled:cursor-not-allowed text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
        aria-label={state === "submitting" ? "Envoi en cours..." : "Envoyer la demande de devis"}
      >
        {state === "submitting" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send size={15} aria-hidden="true" />
            Envoyer la demande
          </>
        )}
      </button>

      <p className="text-xs text-[var(--color-gris-moyen)] text-center">
        Réponse sous 24h · Devis gratuit sans engagement
      </p>
    </form>
  );
}
