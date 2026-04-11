"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_LINKS, CTA } from "./nav-config";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--color-noir-mat)]/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-[var(--shadow-orange)]"
          : "bg-gradient-to-b from-[var(--color-noir-profond)]/80 to-transparent"
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-[var(--spacing-container)] h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="Mothome — Accueil"
        >
          <span className="font-accent text-2xl md:text-3xl text-[var(--color-brand)] tracking-widest leading-none uppercase">
            Mothome
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-sans font-medium rounded-md transition-colors duration-200 uppercase tracking-wide whitespace-nowrap",
                pathname === link.href
                  ? "text-[var(--color-orange-brule)] bg-[var(--color-orange-brule)]/10"
                  : "text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] hover:bg-white/5"
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop + burger mobile */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden sm:inline-flex bg-[var(--color-orange-brule)] hover:bg-[var(--color-orange-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest text-sm px-5 h-9 transition-colors duration-200"
          >
            <Link href={CTA.href}>{CTA.label}</Link>
          </Button>

          {/* Hamburger mobile */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          id="mobile-menu"
          side="right"
          className="w-72 bg-[var(--color-noir-mat)] border-l border-[var(--color-border)] flex flex-col"
        >
          <SheetHeader className="flex flex-row items-center justify-between pb-4 border-b border-[var(--color-border)]">
            <SheetTitle className="font-accent text-2xl text-[var(--color-brand)] tracking-widest uppercase">
              Mothome
            </SheetTitle>
            <SheetClose asChild>
              <button
                type="button"
                className="p-1 rounded text-[var(--color-gris-moyen)] hover:text-[var(--color-blanc-casse)] transition-colors"
                aria-label="Fermer le menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </SheetClose>
          </SheetHeader>

          <nav
            className="flex flex-col gap-1 py-4 flex-1"
            aria-label="Navigation mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "px-4 py-3 text-base font-sans font-medium rounded-md transition-colors duration-200 uppercase tracking-wide",
                  pathname === link.href
                    ? "text-[var(--color-orange-brule)] bg-[var(--color-orange-brule)]/10"
                    : "text-[var(--color-gris-clair)] hover:text-[var(--color-blanc-casse)] hover:bg-white/5"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-[var(--color-border)]">
            <Button
              asChild
              className="w-full bg-[var(--color-orange-brule)] hover:bg-[var(--color-orange-vif)] text-[var(--color-blanc-casse)] font-heading font-semibold uppercase tracking-widest"
            >
              <Link href={CTA.href} onClick={() => setMobileOpen(false)}>
                {CTA.label}
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
