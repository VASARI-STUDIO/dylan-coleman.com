import type { Metadata } from "next";
import { PageShell, PageSection } from "@/components/layout/PageShell";
import { BUSINESS, DATA_RECIPIENTS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this site collects, what it doesn't, and how to get in touch about your information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <PageShell
      index="P/01"
      label="Privacy"
      title={
        <>
          What this site <span className="serif-italic">collects</span> — and
          what it doesn&apos;t.
        </>
      }
      lede="Short version: no cookies, no analytics, no tracking pixels, no advertising networks. The only information I hold is what you choose to send me through the contact form or by email."
      meta={`Last updated ${BUSINESS.lastUpdated}`}
    >
      <PageSection n="01" heading="Who this is about">
        <p>
          This site is run by <strong>{BUSINESS.legalName}</strong>, a sole
          trader based in {BUSINESS.location}.
          {BUSINESS.abn ? ` ABN ${BUSINESS.abn}.` : ""} You can reach me at{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
        </p>
        <p>
          Australia&apos;s <strong>Privacy Act 1988 (Cth)</strong> generally
          exempts small business operators with an annual turnover of $3 million
          or less, which includes this practice. I have written this page and
          handle your information in line with the Australian Privacy Principles
          regardless, because the exemption is not a good reason to be careless
          with someone else&apos;s details.
        </p>
      </PageSection>

      <PageSection n="02" heading="What the site collects on its own">
        <p>
          Nothing that identifies you. This is a static site with no accounts,
          no comment system and no user-generated content. Specifically:
        </p>
        <ul>
          <li>
            <strong>No cookies.</strong> The site sets none, first- or
            third-party.
          </li>
          <li>
            <strong>No analytics or tracking.</strong> There is no Google
            Analytics, no tag manager, no advertising or social pixel, and no
            privacy-preserving analytics product either.
          </li>
          <li>
            <strong>No browser storage.</strong> Nothing is written to
            localStorage, sessionStorage or IndexedDB.
          </li>
          <li>
            <strong>No third-party fonts at runtime.</strong> The typefaces are
            downloaded once when the site is built and served from the same
            domain as everything else, so loading a page does not tell any font
            provider that you visited.
          </li>
        </ul>
        <p>
          The one unavoidable exception is standard web-server logging by the
          host, covered below.
        </p>
      </PageSection>

      <PageSection n="03" heading="What you send me">
        <p>
          The contact form asks for your <strong>name</strong>,{" "}
          <strong>email address</strong>, and the{" "}
          <strong>project type, budget range and timeline</strong> you select,
          plus whatever you write in the brief. Submitting it sends me one
          email and nothing else — there is no database behind this site, and
          nothing is stored on the server. If you would rather not use the
          form at all, emailing me directly works just as well.
        </p>
        <p>
          I use it for one purpose: to reply to you and, if we end up working
          together, to run the project. I do not sell it, rent it, trade it, or
          add you to a mailing list. There is no mailing list.
        </p>
        <p>
          Enquiries stay in my email account for as long as they are
          commercially useful — roughly, the life of the project plus the period
          I am required to keep business records. Ask me to delete an enquiry
          and I will, unless I am required to keep it.
        </p>
      </PageSection>

      <PageSection n="04" heading="Who else can see it">
        <p>
          Two service providers are involved in running this site. Both are in
          the United States, so information reaching them leaves Australia.
        </p>
        <ul>
          {DATA_RECIPIENTS.map((r) => (
            <li key={r.name}>
              <strong>
                {r.name} ({r.country})
              </strong>{" "}
              — {r.role}
            </li>
          ))}
        </ul>
        <p>
          That is the complete list. No other party receives anything you send
          through this site.
        </p>
      </PageSection>

      <PageSection n="05" heading="Your choices">
        <p>
          You can ask me to give you a copy of what I hold about you, correct
          it, or delete it. Email{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> and I will
          respond within a reasonable period — in practice, a few days.
        </p>
        <p>
          If you are unhappy with how I have handled your information, tell me
          first so I have a chance to fix it. If that does not resolve it, you
          can complain to the{" "}
          <a
            href="https://www.oaic.gov.au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Office of the Australian Information Commissioner
          </a>
          .
        </p>
      </PageSection>

      <PageSection n="06" heading="Changes">
        <p>
          If this page changes, the date at the top changes with it. There is no
          archive of previous versions — the current page is the whole policy.
        </p>
      </PageSection>
    </PageShell>
  );
}
