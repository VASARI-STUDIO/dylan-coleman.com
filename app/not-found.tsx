import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-page px-6 md:px-12 py-32 md:py-48">
      <p className="smallcaps">404 · Index not found</p>
      <h1 className="mt-6 font-sans text-display font-medium tight-tracking">
        This page is
        <br />
        <span className="serif-italic">unwritten.</span>
      </h1>
      <p className="mt-8 max-w-prose text-lg text-muted-foreground">
        The address you followed leads nowhere on this site. Return to the index and try again.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-11 items-center rounded-full border border-foreground/30 px-6 text-sm hover:border-foreground transition-colors"
      >
        Return Home
      </Link>
    </section>
  );
}
