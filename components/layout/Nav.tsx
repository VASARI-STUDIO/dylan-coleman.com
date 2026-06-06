import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Shop", href: "/#shop" },
  { label: "About", href: "/#about" },
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
      </div>
    </header>
  );
}
