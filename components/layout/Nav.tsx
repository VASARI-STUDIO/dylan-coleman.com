import Link from "next/link";
import { Coffee } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SOCIALS, BUY_ME_A_COFFEE } from "@/content/social";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Shop", href: "/#shop" },
  { label: "About", href: "/#about" },
];

const iconButton =
  "liquid-glass grid h-10 w-10 place-items-center rounded-full text-foreground/80 transition-colors hover:text-foreground";

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

        {/* Links — dot-separated */}
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

        {/* Action cluster — mirrors the hero links, in compact icon form */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={BUY_ME_A_COFFEE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy me a coffee"
            title="Buy me a coffee"
            className={iconButton}
          >
            <Coffee className="h-4 w-4" strokeWidth={1.5} />
          </a>
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className={iconButton}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
