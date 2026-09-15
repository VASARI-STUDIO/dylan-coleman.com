"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

// The App Router had no error boundary at all, so any render error in a client
// component replaced the whole page with Next's bare "Application error" text —
// no nav, no footer, no way onward. This keeps a visitor inside the site.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Unhandled render error:", error);
  }, [error]);

  return (
    <section className="mx-auto max-w-page px-6 md:px-12 py-28 md:py-40">
      <p className="smallcaps">Something went wrong</p>
      <h1 className="mt-6 max-w-[16ch] font-sans text-h1 font-medium tight-tracking">
        That didn&apos;t <span className="serif-italic">load.</span>
      </h1>
      <p className="mt-8 max-w-prose text-body-lg text-muted-foreground">
        An error stopped this page rendering. Trying again usually clears it.
        If it doesn&apos;t, email me and I&apos;ll fix it.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button onClick={reset} variant="solid">
          Try again
        </Button>
        <Button href="/" variant="outline">
          Back to the index
        </Button>
      </div>
    </section>
  );
}
