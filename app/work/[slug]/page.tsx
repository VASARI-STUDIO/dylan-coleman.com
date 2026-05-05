import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CaseStudyShell } from "@/components/case-study/CaseStudyShell";
import { editorialMDX } from "@/components/case-study/mdx-elements";
import { HERO_WORK } from "@/content/work/_recent";

// Statically generated case study route. Each MDX file becomes a page.
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

  let MDXContent: React.ComponentType<{ components?: Record<string, unknown> }>;
  let mdxMeta: { role?: string; scope?: string[] } = {};
  try {
    const mod = await import(`@/content/work/${slug}.mdx`);
    MDXContent = mod.default;
    mdxMeta = mod.meta ?? {};
  } catch {
    notFound();
  }

  return (
    <CaseStudyShell meta={{ ...item, ...mdxMeta }} next={next}>
      <MDXContent components={editorialMDX} />
    </CaseStudyShell>
  );
}
