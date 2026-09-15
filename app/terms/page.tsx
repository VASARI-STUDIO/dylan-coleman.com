import type { Metadata } from "next";
import { PageShell, PageSection } from "@/components/layout/PageShell";
import { BUSINESS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "How engagements run — quoting, payment, scope, ownership and warranty.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <PageShell
      index="T/01"
      label="Terms"
      title={
        <>
          How an engagement <span className="serif-italic">actually</span> runs.
        </>
      }
      lede="These terms apply to design and development work I take on, and to your use of this site. They are written to be read rather than endured — if something here does not suit your situation, say so before we start and we will agree something that does."
      meta={`Last updated ${BUSINESS.lastUpdated}`}
    >
      <PageSection n="01" heading="Who you're dealing with">
        <p>
          <strong>{BUSINESS.legalName}</strong>, a sole trader based in{" "}
          {BUSINESS.location}
          {BUSINESS.abn ? `, ABN ${BUSINESS.abn}` : ""}. Referred to below as
          &ldquo;I&rdquo; or &ldquo;me&rdquo;. You are the client.
        </p>
      </PageSection>

      <PageSection n="02" heading="Quotes and scope">
        <p>
          Work starts from a written quote or proposal that sets out the
          deliverables, the timeline and the fee. That document is the scope. It
          is valid for 30 days from the date I send it, and it becomes binding
          when you accept it in writing — email is fine.
        </p>
        <p>
          Anything not named in the quote is out of scope. That is not a
          gotcha; it is how a fixed price stays fixed. If you want to add
          something mid-project, I will quote it separately before doing it, so
          nothing appears on an invoice that you have not already agreed to.
        </p>
      </PageSection>

      <PageSection n="03" heading="Fees and payment">
        <p>
          Unless the quote says otherwise, engagements are billed{" "}
          <strong>50% on acceptance</strong> and{" "}
          <strong>50% on completion</strong>. The deposit reserves your place in
          the schedule and is non-refundable once I have begun work, because it
          is holding time I have turned other work away for.
        </p>
        <p>
          Invoices are payable within <strong>14 days</strong>. Fees are quoted
          in <strong>Australian dollars (AUD)</strong>.{" "}
          {BUSINESS.gstRegistered === true
            ? "Prices are exclusive of GST; GST is added at the applicable rate and shown on your invoice."
            : BUSINESS.gstRegistered === false
              ? "I am not currently registered for GST, so no GST is charged."
              : "Whether GST applies is stated on your quote and on every invoice."}
        </p>
        <p>
          If an invoice runs more than 14 days overdue I may pause work until it
          is settled. I would much rather talk to you about a payment plan than
          do that, so tell me early if cash flow is tight.
        </p>
      </PageSection>

      <PageSection n="04" heading="Your part">
        <p>
          Projects stall on inputs far more often than on execution. To keep to
          the timeline I need content, brand assets, access credentials and
          feedback within the windows we agree. If material is outstanding for
          more than 30 days, I may treat the current phase as complete, invoice
          it, and requote the remainder against my availability at the time.
        </p>
        <p>
          You confirm that any text, images, logos or other material you supply
          is yours to use, or that you have permission to use it. I rely on that
          confirmation.
        </p>
      </PageSection>

      <PageSection n="05" heading="Revisions">
        <p>
          Each quote states how many rounds of revision it includes. A round
          means consolidated feedback from your side, delivered once — not a
          rolling series of individual notes. Further rounds beyond the included
          number are charged at my hourly rate, quoted before I start them.
        </p>
      </PageSection>

      <PageSection n="06" heading="Ownership">
        <p>
          On <strong>final payment</strong>, ownership of the final deliverables
          created specifically for you transfers to you. Until then I retain
          ownership, which is what makes the arrangement workable for both of
          us.
        </p>
        <p>What does not transfer, and never did:</p>
        <ul>
          <li>
            Working files, source assets, and preliminary concepts that were not
            selected, unless the quote explicitly includes them.
          </li>
          <li>
            Pre-existing tools, code libraries, components and techniques I
            bring to the project. You get a perpetual licence to use these as
            part of your deliverable; you do not get to resell them on their
            own.
          </li>
          <li>
            Third-party licensed material such as fonts, stock imagery or
            plugins. Those are licensed to you directly by their owners, and any
            ongoing fees are yours.
          </li>
        </ul>
        <p>
          I may show the finished work in my portfolio and discuss my role in
          it. If your project is confidential, tell me before we start and I
          will keep it out.
        </p>
      </PageSection>

      <PageSection n="07" heading="Warranty and support">
        <p>
          I fix defects in what I built — things not working as specified — free
          of charge for <strong>30 days after launch</strong>. That covers my
          work. It does not cover new features, content changes, third-party
          service outages, or things that break because something on your side
          changed.
        </p>
        <p>
          Beyond the warranty period, ongoing care is available as a separate
          arrangement.
        </p>
      </PageSection>

      <PageSection n="08" heading="Your rights under Australian law">
        <p>
          My services come with guarantees that{" "}
          <strong>cannot be excluded</strong> under the Australian Consumer Law,
          including that services are supplied with due care and skill and are
          fit for the purpose you told me about. Nothing on this page limits
          those rights.
        </p>
        <p>
          For failures that do not amount to a major failure, you are entitled
          to have problems with the service rectified in a reasonable time and,
          if this is not done, to cancel the contract and obtain a refund for
          the unused portion. For a major failure, you are entitled to cancel
          and obtain a refund for the unused portion, or to compensation for the
          reduction in value.
        </p>
        <p>
          Subject to those rights, my liability for any claim connected with an
          engagement is limited to the fees you have paid me for it, and I am
          not liable for indirect or consequential loss such as lost profits.
        </p>
      </PageSection>

      <PageSection n="09" heading="Cancellation">
        <p>
          You can stop a project at any time by telling me in writing. You are
          billed for work completed up to that point, and the deposit is not
          refunded.
        </p>
        <p>
          I may end an engagement if payment is substantially overdue, if the
          brief changes into something I am not the right person for, or if the
          working relationship has stopped being a workable one. In that case I
          invoice for completed work and hand over what you have paid for.
        </p>
      </PageSection>

      <PageSection n="10" heading="Site content">
        <p>
          The writing, imagery, code and design on this site are mine unless
          credited otherwise. Case studies describe projects as I experienced
          them. Demonstration projects built on my own initiative are labelled
          as such, and imagery that was generated rather than photographed is
          credited in the project&apos;s details.
        </p>
        <p>
          Nothing on this site is an offer capable of acceptance — a binding
          arrangement starts at the quote stage, not the browsing stage.
        </p>
      </PageSection>

      <PageSection n="11" heading="Governing law">
        <p>
          These terms are governed by the laws of {BUSINESS.state}, Australia.
          You and I submit to the non-exclusive jurisdiction of the courts of{" "}
          {BUSINESS.state}.
        </p>
        <p>
          If a term is found unenforceable, it is severed and the rest continues
          to apply. Questions about any of this go to{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
        </p>
      </PageSection>
    </PageShell>
  );
}
