import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";

const destinations = [
  { label: "Selected work", href: "/#work", note: "Case studies and recent pieces" },
  { label: "Services", href: "/services", note: "How each engagement runs" },
  { label: "About", href: "/about", note: "Background, principles, practical details" },
  { label: "Contact", href: "/#contact", note: "Start a project" },
];

export default function NotFound() {
  return (
    <section className="mx-auto max-w-page px-6 md:px-12 py-28 md:py-40">
      <p className="smallcaps">404 · Page not found</p>
      <h1 className="mt-6 max-w-[14ch] font-sans text-h1 font-medium tight-tracking">
        This page is <span className="serif-italic">unwritten.</span>
      </h1>
      <p className="mt-8 max-w-prose text-body-lg text-muted-foreground">
        The address you followed leads nowhere on this site. It may have moved,
        or it may never have existed.
      </p>

      <div className="mt-10">
        <Button href="/" variant="solid">
          Return to the index
          <ArrowRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
        </Button>
      </div>

      <Rule className="my-12 md:my-16" />

      <h2 className="smallcaps">Or head somewhere useful</h2>
      <ul className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
        {destinations.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="group block border-b border-border/40 pb-4 transition-colors hover:border-foreground/50"
            >
              <span className="font-sans text-h5 font-medium tight-tracking">
                {d.label}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {d.note}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
