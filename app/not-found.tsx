import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-page px-6 md:px-10 py-32 md:py-48">
      <p className="smallcaps text-muted">404 · Index not found</p>
      <h1 className="mt-6 font-display text-display leading-[0.95] tracking-[-0.02em]">
        This page is
        <br />
        <em className="italic">unwritten.</em>
      </h1>
      <p className="mt-8 max-w-prose text-body-lg text-ink/80">
        The address you followed leads nowhere on this site. Return to the index and try again.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-11 items-center border border-ink px-5 smallcaps text-ink hover:bg-ink hover:text-paper transition"
      >
        Return Home
      </Link>
    </section>
  );
}
