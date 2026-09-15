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
  // Each case study shares its own card rather than the generic site one — the
  // imagery is the strongest thing these pages have. These are pre-rendered
  // 1200x630 PNGs (scripts note in public/og), not the raw hero: crawlers want
  // declared dimensions and a format they all decode, and a raw WebP of unknown
  // size gets skipped by some and letterboxed by others.
  const images = [
    {
      url: `/og/${slug}.png`,
      width: 1200,
      height: 630,
      type: "image/png",
      alt: `${item.title} — ${item.client}`,
    },
  ];

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
