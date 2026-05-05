import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Shop", href: "/#shop" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", Icon: Twitter },
];

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-4">
      <div className="mx-auto flex max-w-page items-center justify-between gap-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Logo size={28} />
          <span className="font-sans font-semibold text-[1rem] tracking-[-0.01em]">
            Dylan Coleman
          </span>
        </Link>

        {/* Center links — dot-separated */}
        <nav className="hidden md:flex items-center gap-2 text-sm">
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

        {/* Socials */}
        <div className="flex items-center gap-2">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="liquid-glass grid h-10 w-10 place-items-center rounded-full text-foreground/80 hover:text-foreground transition-colors"
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
