import Link from "next/link";

export default function CaseStudyNotFound() {
  return (
    <section className="mx-auto max-w-page px-6 md:px-10 py-32">
      <p className="smallcaps text-muted">404 · Case not found</p>
      <h1 className="mt-6 font-display text-h1 leading-[0.95] tracking-[-0.02em]">
        That study isn&apos;t in the index.
      </h1>
      <Link
        href="/#work"
        className="mt-8 inline-flex h-11 items-center border border-ink px-5 smallcaps hover:bg-ink hover:text-paper transition"
      >
        Back to selected work
      </Link>
    </section>
  );
}
