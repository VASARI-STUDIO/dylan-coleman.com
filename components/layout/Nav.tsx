"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SOCIALS } from "@/content/social";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Shop", href: "/#shop" },
  { label: "About", href: "/#about" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-4">
      <div className="relative mx-auto flex max-w-page items-center justify-between gap-6">
        {/* Brand — left */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Logo size={28} />
          <span className="font-sans font-semibold text-[1rem] tracking-[-0.01em]">
            Dylan Coleman
          </span>
        </Link>

        {/* Navigation menu — centered */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 text-sm md:flex">
          {links.map((l, i) => (
            <span key={l.href} className="flex items-center gap-2">
              <Link
                href={l.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
              {i < links.length - 1 && (
                <span aria-hidden className="text-muted-foreground/50">
                  •
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* Contact + socials — top right (shared links from content/social) */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/#contact"
            className="liquid-glass inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm text-foreground/90 transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            Contact
          </Link>

          <span
            aria-hidden
            className="mx-1 hidden h-5 w-px bg-foreground/15 lg:block"
          />

          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="liquid-glass hidden h-9 w-9 place-items-center rounded-full text-foreground/80 transition-colors hover:text-foreground lg:grid"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </a>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="liquid-glass grid h-9 w-9 place-items-center rounded-full text-foreground/90 transition-colors hover:text-foreground md:hidden"
        >
          {open ? (
            <X className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <Menu className="h-4 w-4" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav
          id="mobile-nav"
          className="liquid-glass mx-6 mt-3 flex flex-col gap-1 rounded-2xl p-4 text-sm md:hidden"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {l.label}
            </Link>
          ))}

          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-foreground/90 hover:text-foreground transition-colors py-2"
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
            Contact
          </Link>

          <span aria-hidden className="my-2 h-px w-full bg-foreground/15" />

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={() => setOpen(false)}
                className="liquid-glass grid h-9 w-9 place-items-center rounded-full text-foreground/80 transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
