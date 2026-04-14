"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

const DEMANDE_TYPES = [
  "Prendre rendez-vous",
  "Demande de devis",
  "Renseignement",
  "Service à domicile",
  "Autre",
] as const;

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData): Record<string, string> {
    const errs: Record<string, string> = {};
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    if (!name || name.trim().length < 2) errs.name = "Nom requis (2 caractères min.)";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email invalide";
    if (!message || message.trim().length < 10) errs.message = "Message requis (10 caractères min.)";

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
      const rawPhone = (data.get("phone") as string) ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: rawPhone.replace(/\s/g, ""),
          subject: data.get("type") || "Contact Mothome",
          message: data.get("message"),
        }),
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
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle size={44} className="text-[var(--color-bleu-logo)]" aria-hidden="true" />
        <h3 className="font-heading text-2xl text-[var(--color-foreground)] uppercase">
          Message envoyé !
        </h3>
        <p className="font-sans text-[var(--color-muted-foreground)] max-w-sm">
          Mael vous répond sous 24h. À très bientôt chez Mothome !
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-2 text-sm font-heading text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] uppercase tracking-wide transition-colors"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulaire de contact"
      className="space-y-5"
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
          >
            Nom <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Votre nom"
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            aria-invalid={!!errors.name}
            className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors"
          />
          {errors.name && (
            <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
          >
            Email <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="votre@email.fr"
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            aria-invalid={!!errors.email}
            className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors"
          />
          {errors.email && (
            <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone + Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-phone"
            className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
          >
            Téléphone{" "}
            <span className="text-[var(--color-muted-foreground)] font-sans normal-case tracking-normal text-xs font-normal">
              (optionnel)
            </span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="contact-type"
            className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
          >
            Type de demande
          </label>
          <select
            id="contact-type"
            name="type"
            className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors appearance-none"
          >
            {DEMANDE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
        >
          Message <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Votre message..."
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          aria-invalid={!!errors.message}
          className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors resize-y"
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Error */}
      {state === "error" && (
        <div
          role="alert"
          className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-800/40 rounded-md"
        >
          <AlertCircle size={16} className="text-red-400 shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-300">
            Une erreur s&apos;est produite. Réessayez ou appelez directement.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] disabled:opacity-60 disabled:cursor-not-allowed text-[var(--color-primary-foreground)] font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
        aria-label={state === "submitting" ? "Envoi en cours..." : "Envoyer le message"}
      >
        {state === "submitting" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send size={15} aria-hidden="true" />
            Envoyer le message
          </>
        )}
      </button>
    </form>
  );
}
