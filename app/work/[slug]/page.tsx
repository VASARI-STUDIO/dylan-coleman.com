import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/case-study/CaseStudyShell";
import { HERO_WORK, getWorkBySlug } from "@/content/work";

// Statically generated case study route — fully data-driven, no MDX import needed.
export function generateStaticParams() {
  return HERO_WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) return {};
  // Each case study shares its own hero rather than the generic site card —
  // the imagery is the strongest thing these pages have, and a link to a
  // specific project should look like that project.
  const image = item.hero ?? item.cover;
  const images = image
    ? [{ url: image, alt: `${item.title} — ${item.client}` }]
    : undefined;

  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${item.title} — ${item.client}`,
      description: item.summary,
      type: "article",
      url: `/work/${slug}`,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} — ${item.client}`,
      description: item.summary,
      images,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) notFound();

  // Walk to the next hero study in display order, wrapping at the end, so a
  // reader can page through the whole collection instead of bouncing between
  // the same two entries.
  const i = HERO_WORK.findIndex((w) => w.slug === slug);
  const next =
    HERO_WORK.length > 1 ? HERO_WORK[(i + 1) % HERO_WORK.length] : undefined;

  return <CaseStudyShell meta={item} next={next} />;
}
