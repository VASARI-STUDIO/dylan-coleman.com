import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/case-study/CaseStudyShell";
import { HERO_WORK } from "@/content/work/_recent";

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
  const item = HERO_WORK.find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = HERO_WORK.find((w) => w.slug === slug);
  if (!item) notFound();

  // Pick the "next" hero study (the other one).
  const next = HERO_WORK.find((w) => w.slug !== slug);

  return <CaseStudyShell meta={item} next={next} />;
}
