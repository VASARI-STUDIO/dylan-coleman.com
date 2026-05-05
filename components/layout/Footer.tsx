import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { Monogram } from "./Monogram";
import { Rule } from "@/components/ui/Rule";

const socials = [
  { label: "Email", href: "mailto:hello@dylan-coleman.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t border-rule">
      <div className="mx-auto max-w-page px-6 md:px-10 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Monogram size={32} className="text-ink/70" />
            <p className="mt-6 font-display text-h4 leading-[1.1] tracking-[-0.01em] max-w-[18ch]">
              Building considered, premium digital identities.
            </p>
            <p className="mt-4 text-body-sm text-muted max-w-prose">
              Available for select projects. Currently booking late-2026.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="smallcaps text-muted">Index</p>
            <ul className="mt-4 space-y-2 text-body-sm">
              <li><Link href="/#work" className="hover:text-ink/100 text-ink/80">Work</Link></li>
              <li><Link href="/#services" className="hover:text-ink/100 text-ink/80">Services</Link></li>
              <li><Link href="/#shop" className="hover:text-ink/100 text-ink/80">Shop</Link></li>
              <li><Link href="/#about" className="hover:text-ink/100 text-ink/80">About</Link></li>
              <li><Link href="/#contact" className="hover:text-ink/100 text-ink/80">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="smallcaps text-muted">Elsewhere</p>
            <ul className="mt-4 space-y-2 text-body-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-ink/80 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Rule className="mt-16" />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="smallcaps text-muted">
            <Wordmark className="text-[0.75rem] tracking-smallcaps uppercase font-sans" /> &nbsp;·&nbsp; © {year}
          </p>
          <p className="smallcaps text-muted">
            Designed &amp; built in-house
          </p>
        </div>
      </div>
    </footer>
  );
}
