"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BUY_ME_A_COFFEE } from "@/content/social";
import { BUSINESS } from "@/content/legal";

const sections = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/** Year of the most recent build — the floor for the copyright line. */
const BUILD_YEAR = new Date().getFullYear();

export function Footer() {
  // This is a static export, so a server-rendered year is frozen at build time
  // and goes stale the moment the calendar rolls over. Start from the build
  // year for markup parity, then correct it on the client.
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-page px-6 md:px-12 py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo size={24} />
              <span className="font-sans text-[1rem] font-semibold tracking-[-0.01em]">
                Dylan Coleman
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Brand identities and websites for businesses that need to be taken
              seriously. Based in {BUSINESS.location}, working remotely.
            </p>
            <a
              href={BUY_ME_A_COFFEE}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Coffee
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
              Buy me a coffee
            </a>
          </div>

          <nav className="md:col-span-4" aria-label="Footer">
            <h2 className="smallcaps">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {sections.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="smallcaps">Legal</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {legal.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {BUSINESS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border/40 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span suppressHydrationWarning>
            © {year} {BUSINESS.legalName} · Designed and built in-house
          </span>
          {BUSINESS.abn && <span>ABN {BUSINESS.abn}</span>}
        </div>
      </div>
    </footer>
  );
}
