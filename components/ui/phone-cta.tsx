import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneCtaProps {
  phone?: string;
  tel?: string;
  label?: string;
  variant?: "primary" | "ghost";
  className?: string;
}

export function PhoneCta({
  phone = "04 50 73 38 08",
  tel = "+33450733808",
  label = "Appeler l'atelier",
  variant = "primary",
  className,
}: PhoneCtaProps) {
  return (
    <a
      href={`tel:${tel}`}
      aria-label={`Appeler Mot'Home au ${phone}`}
      className={cn(
        "group inline-flex flex-col items-center gap-1 rounded px-8 py-4 transition-[colors,transform] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-bleu-livery)] focus-visible:ring-offset-2",
        variant === "primary" && [
          "bg-[var(--color-bleu-livery)] text-[var(--color-blanc-sec)]",
          "hover:bg-[var(--color-bleu-rapide)]",
          "shadow-[var(--shadow-bleu)]",
        ],
        variant === "ghost" && [
          "border border-[var(--color-bleu-livery)] text-[var(--color-bleu-livery)]",
          "hover:bg-[rgba(0,80,160,0.08)]",
        ],
        className
      )}
    >
      <span className="flex items-center gap-2">
        <span className="inline-flex group-hover:motion-safe:[animation:mh-wiggle_500ms_var(--ease-out-quart)_both]">
          <Phone size={18} aria-hidden="true" />
        </span>
        <span
          className="font-heading font-bold uppercase leading-none"
          style={{ fontSize: "1.5rem", letterSpacing: "0.01em" }}
        >
          {phone}
        </span>
      </span>
      <span
        className="font-accent uppercase"
        style={{ fontSize: "0.75rem", letterSpacing: "0.12em" }}
      >
        {label}
      </span>
    </a>
  );
}
