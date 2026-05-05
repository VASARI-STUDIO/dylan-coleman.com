import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

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
          <span>© {year} Dylan Coleman. All rights reserved.</span>
        </div>
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
    </footer>
  );
}
