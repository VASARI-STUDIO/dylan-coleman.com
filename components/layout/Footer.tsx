import Link from "next/link";
import { Coffee } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { BUY_ME_A_COFFEE } from "@/content/social";

const links = [
  { label: "Privacy", href: "/" },
  { label: "Terms", href: "/" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-page px-6 md:px-12 py-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Logo size={20} />
          <span>© {year} Dylan Coleman · Designed and built in-house</span>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
          <a
            href={BUY_ME_A_COFFEE}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Coffee
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
            Buy me a coffee
          </a>

          <ul className="flex items-center gap-6 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-foreground transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
