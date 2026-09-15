import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Rule } from "@/components/ui/Rule";
import { IndustryTag } from "@/components/ui/IndustryTag";
import { FadeUp } from "@/components/ui/FadeUp";
import { Button } from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import type { WorkItem, GalleryImage } from "@/content/work";

const ratioClass: Record<NonNullable<GalleryImage["ratio"]>, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/9]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

function ImageSlot({
  img,
  rounded = false,
}: {
  img: GalleryImage;
  rounded?: boolean;
}) {
  const ratio = ratioClass[img.ratio ?? "landscape"];
  return (
    <figure>
      <div
        className={`relative w-full ${ratio} bg-card overflow-hidden ${
          rounded ? "rounded-2xl" : ""
        }`}
      >
        {img.src ? (
          <Image
            src={asset(img.src)}
            alt={img.alt}
            fill
            sizes={
              rounded
                ? "(min-width: 768px) 46vw, 100vw"
                : "100vw"
            }
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground">
            <span className="smallcaps">{img.alt}</span>
          </div>
        )}
      </div>
      {img.caption && (
        <figcaption className="mt-3 max-w-prose text-sm text-muted-foreground">
          {img.caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Group the gallery into alternating blocks so a long sequence doesn't read as
 * one monotonous stack of identical frames: `wide` images break out full-bleed
 * as punctuation, and every run between them collapses into a contained
 * two-up grid. Source order is always preserved.
 */
type Block =
  | { kind: "bleed"; img: GalleryImage }
  | { kind: "grid"; imgs: GalleryImage[] };

function toBlocks(gallery: GalleryImage[]): Block[] {
  const blocks: Block[] = [];
  for (const img of gallery) {
    if (img.ratio === "wide") {
      blocks.push({ kind: "bleed", img });
      continue;
    }
    const last = blocks[blocks.length - 1];
    if (last?.kind === "grid") last.imgs.push(img);
    else blocks.push({ kind: "grid", imgs: [img] });
  }
  return blocks;
}

export function CaseStudyShell({
  meta,
  next,
}: {
  meta: WorkItem;
  next?: WorkItem;
}) {
  const blocks = meta.gallery?.length ? toBlocks(meta.gallery) : [];

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
          <div className="relative aspect-[21/10] w-full bg-card overflow-hidden">
            {meta.hero ? (
              <Image
                src={asset(meta.hero)}
                alt={meta.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <div className="grid h-full place-items-center text-muted-foreground">
                <span className="smallcaps">{meta.index} · hero</span>
              </div>
            )}
          </div>
        </FadeUp>
      </div>

      {/* Title block */}
      <div className="mx-auto max-w-page px-6 md:px-12 pt-16 md:pt-24 pb-10 md:pb-14">
        <FadeUp>
          <h1 className="font-sans text-display font-medium tight-tracking max-w-[18ch]">
            {meta.title}
          </h1>
          <p className="mt-8 max-w-prose text-body-lg text-muted-foreground">
            {meta.summary}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 text-sm">
            <IndustryTag k={meta.audience} />
            {meta.location && <span className="smallcaps">{meta.location}</span>}
            <span className="smallcaps">{meta.status ?? meta.year}</span>
          </div>
          {meta.liveUrl && (
            <div className="mt-10">
              <Button href={meta.liveUrl} external variant="solid">
                Visit the live site
                <ArrowUpRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
              </Button>
            </div>
          )}
        </FadeUp>
      </div>

      {/* At a glance — hard numbers before the pitch */}
      {meta.metrics && meta.metrics.length > 0 && (
        <div className="border-t border-border/40">
          <FadeUp>
            {/* flex-col-reverse keeps the value visually on top while the markup
                stays dt-then-dd — a dd before its dt is an inverted
                term/definition pair to anything reading the structure. */}
            <dl className="mx-auto grid max-w-page grid-cols-2 gap-y-10 gap-x-8 px-6 md:px-12 py-12 md:grid-cols-4 md:py-16">
              {meta.metrics.map((m) => (
                <div key={m.label} className="flex flex-col-reverse">
                  <dt className="smallcaps mt-2">{m.label}</dt>
                  <dd className="font-sans text-h3 font-medium tight-tracking">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>
      )}

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
            {meta.duration && (
              <div>
                <dt className="smallcaps">Duration</dt>
                <dd className="mt-2 text-foreground">{meta.duration}</dd>
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
              <h2 className="smallcaps">For the buyer</h2>
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
              <h2 className="smallcaps">Project note</h2>
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

      {/* Gallery — full-bleed punctuation between contained two-up grids */}
      {blocks.length > 0 && (
        <section className="border-t border-border/40 bg-background">
          <div className="py-16 md:py-24 space-y-16 md:space-y-24">
            {blocks.map((block, bi) =>
              block.kind === "bleed" ? (
                <FadeUp key={bi}>
                  <ImageSlot img={block.img} />
                </FadeUp>
              ) : (
                <div
                  key={bi}
                  className="mx-auto grid max-w-page gap-10 px-6 md:grid-cols-2 md:gap-12 md:px-12"
                >
                  {block.imgs.map((img, i) => (
                    <FadeUp key={i} delay={0.05 + i * 0.05}>
                      <ImageSlot img={img} rounded />
                    </FadeUp>
                  ))}
                </div>
              ),
            )}
          </div>
        </section>
      )}

      {/* Closing CTA — send the reader to the thing itself */}
      {meta.liveUrl && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-page px-6 md:px-12 py-16 md:py-24">
            <FadeUp>
              {/* Eyebrow stays a paragraph — two sibling h2s for one section
                  gave the outline a heading that isn't a section. */}
              <p className="smallcaps">See it running</p>
              <h2 className="mt-6 font-sans text-h2 font-medium tight-tracking max-w-[20ch]">
                Screenshots only go so far.
              </h2>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={meta.liveUrl} external variant="solid">
                  Open {meta.title}
                  <ArrowUpRight className="ml-2 h-4 w-4" strokeWidth={1.5} />
                </Button>
                <Button href="/#contact" variant="outline">
                  Start a project
                </Button>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* Up next */}
      {next && (
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-page px-6 md:px-12 py-16">
            <h2 className="smallcaps">Up next</h2>
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
