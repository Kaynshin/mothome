"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";
type FieldErrors = Record<string, string[]>;

const TYPES_INTERVENTION = [
  "Service à domicile",
  "Révision & entretien",
  "Réparation & diagnostic",
  "Contrôle technique",
  "Kit éthanol eFlexMoto",
  "Autre",
] as const;

function getMinDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1); // au plus tôt demain
  return d.toISOString().split("T")[0];
}

function getMaxDate(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().split("T")[0];
}

function clientValidate(data: FormData): Record<string, string> {
  const errs: Record<string, string> = {};
  const name = (data.get("name") as string) ?? "";
  const email = (data.get("email") as string) ?? "";
  const phone = (data.get("phone") as string) ?? "";
  const date = (data.get("dateSouhaitee") as string) ?? "";

  if (name.trim().length < 2) errs.name = "Nom requis (2 caractères min.)";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email invalide";
  if (!/^(\+33|0)[1-9](\d{8})$/.test(phone.replace(/\s/g, "")))
    errs.phone = "Numéro invalide (ex. : 06 12 34 56 78)";
  if (!date) errs.dateSouhaitee = "Date requise";

  return errs;
}

export default function ReservationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMessage, setServerMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const errs = clientValidate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setState("submitting");

    try {
      const rawPhone = (data.get("phone") as string).replace(/\s/g, "");
      const payload = {
        name: data.get("name") as string,
        email: data.get("email") as string,
        phone: rawPhone,
        dateSouhaitee: data.get("dateSouhaitee") as string,
        typeIntervention: (data.get("typeIntervention") as string) || "Service à domicile",
        message: (data.get("message") as string) || "",
      };

      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok) {
        setState("success");
        form.reset();
      } else if (res.status === 422) {
        // Field-level errors from server
        const fieldErrors: FieldErrors = json.fieldErrors ?? {};
        const mapped: Record<string, string> = {};
        for (const [field, msgs] of Object.entries(fieldErrors)) {
          mapped[field] = Array.isArray(msgs) ? msgs[0] : String(msgs);
        }
        setErrors(mapped);
        setState("idle");
      } else {
        setServerMessage(json.error ?? "Une erreur est survenue.");
        setState("error");
      }
    } catch {
      setServerMessage("Une erreur réseau est survenue. Réessayez.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle size={48} className="text-[var(--color-bleu-logo)]" aria-hidden="true" />
        <h3 className="font-heading text-2xl text-[var(--color-foreground)] uppercase">
          Demande envoyée !
        </h3>
        <p className="font-sans text-[var(--color-muted-foreground)] max-w-sm">
          Mael vous recontacte sous 24h pour confirmer l&apos;intervention. À très vite !
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-4 text-sm font-heading text-[var(--color-bleu-logo)] hover:text-[var(--color-bleu-vif)] uppercase tracking-wide transition-colors"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulaire de réservation d'intervention à domicile"
      className="space-y-6"
    >
      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="rdv-name"
            className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
          >
            Nom <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
          </label>
          <input
            id="rdv-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Votre nom"
            aria-describedby={errors.name ? "rdv-name-error" : undefined}
            aria-invalid={!!errors.name}
            className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors"
          />
          {errors.name && (
            <p id="rdv-name-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="rdv-email"
            className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
          >
            Email <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
          </label>
          <input
            id="rdv-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="votre@email.fr"
            aria-describedby={errors.email ? "rdv-email-error" : undefined}
            aria-invalid={!!errors.email}
            className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors"
          />
          {errors.email && (
            <p id="rdv-email-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone + Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="rdv-phone"
            className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
          >
            Téléphone <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
          </label>
          <input
            id="rdv-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            aria-describedby={errors.phone ? "rdv-phone-error" : undefined}
            aria-invalid={!!errors.phone}
            className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors"
          />
          {errors.phone && (
            <p id="rdv-phone-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="rdv-date"
            className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
          >
            Date souhaitée <span className="text-[var(--color-bleu-logo)]" aria-hidden="true">*</span>
          </label>
          <input
            id="rdv-date"
            name="dateSouhaitee"
            type="date"
            required
            min={getMinDate()}
            max={getMaxDate()}
            aria-describedby={errors.dateSouhaitee ? "rdv-date-error" : undefined}
            aria-invalid={!!errors.dateSouhaitee}
            className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors [color-scheme:dark]"
          />
          {errors.dateSouhaitee && (
            <p id="rdv-date-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.dateSouhaitee}
            </p>
          )}
        </div>
      </div>

      {/* Type d'intervention */}
      <div>
        <label
          htmlFor="rdv-type"
          className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
        >
          Type d&apos;intervention
        </label>
        <select
          id="rdv-type"
          name="typeIntervention"
          className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors appearance-none"
        >
          {TYPES_INTERVENTION.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="rdv-message"
          className="block text-sm font-heading font-semibold text-[var(--color-muted-foreground)] uppercase tracking-wide mb-2"
        >
          Détails de l&apos;intervention{" "}
          <span className="text-[var(--color-muted-foreground)] font-sans normal-case tracking-normal text-xs font-normal">
            (optionnel)
          </span>
        </label>
        <textarea
          id="rdv-message"
          name="message"
          rows={4}
          placeholder="Décris le problème, ton adresse d'intervention, la marque et le modèle de ta moto..."
          className="w-full px-4 py-3 bg-[var(--color-muted)] border border-[var(--color-border)] rounded-md text-[var(--color-foreground)] placeholder-[var(--color-muted-foreground)] font-sans text-sm focus:outline-none focus:border-[var(--color-bleu-logo)] transition-colors resize-y"
        />
      </div>

      {/* Error state */}
      {state === "error" && (
        <div
          role="alert"
          className="flex items-center gap-3 p-4 bg-red-900/20 border border-red-800/40 rounded-md"
        >
          <AlertCircle size={16} className="text-red-400 shrink-0" aria-hidden="true" />
          <p className="text-sm text-red-300">
            {serverMessage || "Une erreur s'est produite. Réessayez ou contactez Mael directement."}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-bleu-logo)] hover:bg-[var(--color-bleu-vif)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-heading font-semibold uppercase tracking-widest text-sm rounded-md transition-colors duration-200"
        aria-label={state === "submitting" ? "Envoi en cours..." : "Réserver une intervention"}
      >
        {state === "submitting" ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send size={15} aria-hidden="true" />
            Réserver une intervention
          </>
        )}
      </button>

      <p className="text-xs text-[var(--color-muted-foreground)] text-center">
        Confirmation sous 24h · Devis gratuit · Intervention sur devis
      </p>
    </form>
  );
}
