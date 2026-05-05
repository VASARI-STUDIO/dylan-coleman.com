import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Rule } from "@/components/ui/Rule";
import { IndustryTag } from "@/components/ui/IndustryTag";
import { FadeUp } from "@/components/ui/FadeUp";
import type { WorkItem, GalleryImage } from "@/content/work/_recent";

const ratioClass: Record<NonNullable<GalleryImage["ratio"]>, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/9]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

function ImageSlot({ img }: { img: GalleryImage }) {
  const ratio = ratioClass[img.ratio ?? "landscape"];
  return (
    <figure className={`w-full ${ratio} bg-card overflow-hidden`}>
      <div className="grid h-full place-items-center text-muted-foreground">
        <span className="smallcaps">{img.alt}</span>
      </div>
    </figure>
  );
}

export function CaseStudyShell({
  meta,
  next,
}: {
  meta: WorkItem;
  next?: WorkItem;
}) {
  return (
    <article>
      {/* Top utility row */}
      <div className="mx-auto max-w-page px-6 md:px-12 pt-6 md:pt-10">
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Index
          </Link>
          <span className="smallcaps">{meta.index}</span>
        </div>
      </div>

      {/* Full-bleed hero image */}
      <div className="mt-10 md:mt-16">
        <FadeUp>
          <div className="aspect-[21/10] w-full bg-card overflow-hidden">
            <div className="grid h-full place-items-center text-muted-foreground">
              <span className="smallcaps">{meta.index} · hero</span>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Title block */}
      <div className="mx-auto max-w-page px-6 md:px-12 pt-16 md:pt-24 pb-10 md:pb-14">
        <FadeUp>
          <h1 className="font-sans text-display font-medium tight-tracking max-w-[18ch]">
            {meta.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 text-sm">
            <IndustryTag k={meta.audience} />
            {meta.location && (
              <span className="smallcaps">{meta.location}</span>
            )}
            <span className="smallcaps">{meta.status ?? meta.year}</span>
          </div>
        </FadeUp>
      </div>

      {/* Spec table — small-caps labels, sparse */}
      <div className="border-t border-border/40">
        <FadeUp>
          <dl className="mx-auto grid max-w-page grid-cols-2 gap-y-8 gap-x-8 px-6 md:px-12 py-12 md:grid-cols-4 md:py-16 text-sm">
            <div>
              <dt className="smallcaps">Client</dt>
              <dd className="mt-2 text-foreground">{meta.client}</dd>
            </div>
            <div>
              <dt className="smallcaps">Year</dt>
              <dd className="mt-2 text-foreground">{meta.year}</dd>
            </div>
            <div>
              <dt className="smallcaps">Role</dt>
              <dd className="mt-2 text-foreground">
                {meta.role ?? "Design · Build"}
              </dd>
            </div>
            <div>
              <dt className="smallcaps">Scope</dt>
              <dd className="mt-2 text-foreground">
                {(meta.scope ?? ["Brand", "Web"]).join(" · ")}
              </dd>
            </div>
            {meta.collaborators && meta.collaborators.length > 0 && (
              <div className="col-span-2">
                <dt className="smallcaps">Collaborators</dt>
                <dd className="mt-2 text-foreground">
                  {meta.collaborators.join(", ")}
                </dd>
              </div>
            )}
            {meta.photography && (
              <div>
                <dt className="smallcaps">Photography</dt>
                <dd className="mt-2 text-foreground">{meta.photography}</dd>
              </div>
            )}
          </dl>
        </FadeUp>
      </div>

      {/* Sales points — audience-targeted brochure copy */}
      {meta.salesPoints && meta.salesPoints.length > 0 && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-page px-6 md:px-12 py-16 md:py-24">
            <FadeUp>
              <p className="smallcaps">For the buyer</p>
            </FadeUp>
            <ol className="mt-10 grid gap-10 md:grid-cols-2">
              {meta.salesPoints.map((p, i) => (
                <li key={i}>
                  <FadeUp delay={0.05 + i * 0.05}>
                    <span className="smallcaps">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-sans text-h4 font-medium tight-tracking">
                      {p.heading}
                    </h3>
                    <p
                      className="mt-3 max-w-prose text-body text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: p.body }}
                    />
                  </FadeUp>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Blurb — for keen readers */}
      {meta.blurb && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-page px-6 md:px-12 py-16 md:py-24 grid gap-12 md:grid-cols-12">
            <FadeUp className="md:col-span-3">
              <p className="smallcaps">Project note</p>
            </FadeUp>
            <FadeUp className="md:col-span-9" delay={0.1}>
              <p
                className="font-sans text-2xl md:text-[1.75rem] font-medium tight-tracking max-w-prose"
                style={{ color: "hsl(var(--hero-subtitle))" }}
                dangerouslySetInnerHTML={{ __html: meta.blurb }}
              />
            </FadeUp>
          </div>
        </section>
      )}

      {/* Gallery — full-bleed sequence */}
      {meta.gallery && meta.gallery.length > 0 && (
        <section className="border-t border-border/40 bg-background">
          <div className="space-y-2">
            {meta.gallery.map((img, i) => (
              <FadeUp key={i} delay={0.05 + i * 0.05}>
                <ImageSlot img={img} />
              </FadeUp>
            ))}
          </div>
        </section>
      )}

      {/* Up next */}
      {next && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-page px-6 md:px-12 py-16">
            <p className="smallcaps">Up next</p>
            <Link
              href={`/work/${next.slug}`}
              className="mt-6 group flex items-baseline justify-between gap-6"
            >
              <h3 className="font-sans text-h2 font-medium tight-tracking transition-colors group-hover:text-foreground/70">
                {next.title}
              </h3>
              <ArrowRight
                className="h-6 w-6 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
                strokeWidth={1.5}
              />
            </Link>
            <Rule className="mt-8" />
          </div>
        </section>
      )}
    </article>
  );
}
