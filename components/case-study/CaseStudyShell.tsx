import Link from "next/link";
import { Rule } from "@/components/ui/Rule";
import { IndustryTag } from "@/components/ui/IndustryTag";
import { Button } from "@/components/ui/Button";
import type { WorkItem } from "@/content/work/_recent";

export function CaseStudyShell({
  meta,
  next,
  children,
}: {
  meta: WorkItem & {
    role?: string;
    scope?: string[];
  };
  next?: WorkItem;
  children: React.ReactNode;
}) {
  return (
    <article>
      {/* Cover */}
      <header className="border-b border-rule">
        <div className="mx-auto max-w-page px-6 md:px-10 pt-16 md:pt-24 pb-16">
          <div className="flex items-center gap-6">
            <Link
              href="/#work"
              className="smallcaps text-muted hover:text-ink transition"
            >
              ← Index
            </Link>
            <span className="smallcaps text-muted">{meta.index}</span>
          </div>

          <h1 className="mt-10 font-display text-display leading-[0.9] tracking-[-0.025em] max-w-[18ch]">
            {meta.title}
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <IndustryTag k={meta.audience} />
            <span className="smallcaps text-muted">{meta.year}</span>
            <span className="smallcaps text-muted">{meta.client}</span>
          </div>
        </div>

        {/* Hero image slot */}
        <div className="aspect-[16/9] w-full border-t border-rule bg-rule/40">
          <div className="grid h-full place-items-center text-muted">
            <span className="smallcaps">{meta.index} · hero image</span>
          </div>
        </div>
      </header>

      {/* Spec strip */}
      <div className="mx-auto max-w-page px-6 md:px-10 py-12 border-b border-rule">
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-4 text-body-sm">
          <div>
            <dt className="smallcaps text-muted">Client</dt>
            <dd className="mt-1 text-ink">{meta.client}</dd>
          </div>
          <div>
            <dt className="smallcaps text-muted">Year</dt>
            <dd className="mt-1 text-ink">{meta.year}</dd>
          </div>
          <div>
            <dt className="smallcaps text-muted">Role</dt>
            <dd className="mt-1 text-ink">{meta.role ?? "Design · Build"}</dd>
          </div>
          <div>
            <dt className="smallcaps text-muted">Scope</dt>
            <dd className="mt-1 text-ink">
              {(meta.scope ?? ["Brand", "Web"]).join(" · ")}
            </dd>
          </div>
        </dl>
      </div>

      {/* MDX body */}
      <div className="mx-auto max-w-page px-6 md:px-10 py-20 md:py-28">
        <div className="prose-editorial mx-auto max-w-prose text-body-lg text-ink/85">
          {children}
        </div>
      </div>

      {/* Up next */}
      {next && (
        <div className="border-t border-rule">
          <div className="mx-auto max-w-page px-6 md:px-10 py-16">
            <p className="smallcaps text-muted">Up next</p>
            <Link
              href={`/work/${next.slug}`}
              className="mt-6 group flex items-baseline justify-between gap-6"
            >
              <h3 className="font-display text-h2 leading-[1.05] tracking-[-0.02em] group-hover:text-ink/70 transition">
                {next.title}
              </h3>
              <span className="smallcaps text-muted shrink-0">{next.index}</span>
            </Link>
            <Rule className="mt-8" />
            <div className="mt-6 flex justify-end">
              <Button href={`/work/${next.slug}`} variant="outline">
                Read case →
              </Button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
