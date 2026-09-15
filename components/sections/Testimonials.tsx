import Link from "next/link";
import { FadeUp } from "@/components/ui/FadeUp";
import { TESTIMONIALS } from "@/content/testimonials";
import { getWorkBySlug } from "@/content/work";

/**
 * Renders nothing while content/testimonials.ts is empty, so the site never
 * ships placeholder praise. Deliberately has no section index — it sits
 * between the numbered sections without disturbing their sequence, which
 * means adding the first testimonial does not renumber the whole page.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-t border-border/40"
    >
      <div className="mx-auto max-w-page px-6 md:px-12 py-24 md:py-32">
        <FadeUp>
          <h2 className="smallcaps">In their words</h2>
        </FadeUp>

        <ul
          className={`mt-12 grid gap-10 md:gap-12 ${
            TESTIMONIALS.length > 1 ? "md:grid-cols-2" : "max-w-3xl"
          }`}
        >
          {TESTIMONIALS.map((t, i) => {
            const project = t.project ? getWorkBySlug(t.project) : undefined;
            return (
              <FadeUp as="li" key={t.name} delay={0.08 + i * 0.08}>
                <figure className="flex h-full flex-col">
                  <blockquote className="font-sans text-h5 font-medium tight-tracking text-foreground/90 md:text-h4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-muted-foreground">
                    <span className="text-foreground">{t.name}</span>
                    <span aria-hidden> · </span>
                    {t.role}
                    {project?.slug && (
                      <>
                        {" — "}
                        <Link
                          href={`/work/${project.slug}`}
                          className="underline underline-offset-4 transition-colors hover:text-foreground"
                        >
                          {project.title}
                        </Link>
                      </>
                    )}
                  </figcaption>
                </figure>
              </FadeUp>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
