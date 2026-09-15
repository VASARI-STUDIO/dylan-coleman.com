"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rule } from "@/components/ui/Rule";
import { FadeUp } from "@/components/ui/FadeUp";
import { BUSINESS } from "@/content/legal";
import { asset } from "@/lib/asset";

const PROJECT_TYPES = ["Brand website", "Landing page", "Template customisation", "Other"];
// Quoted in Australian dollars — stated explicitly so an overseas enquiry
// isn't reading these as USD.
const BUDGETS = [
  "Under $3k AUD",
  "$3k – $8k AUD",
  "$8k – $20k AUD",
  "$20k+ AUD",
];
const TIMELINES = ["ASAP", "1 – 2 months", "2 – 4 months", "Just exploring"];

const TO_EMAIL = BUSINESS.email;

type Status = "idle" | "submitting" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setStatus("submitting");
    setErrorMessage(null);

    try {
      // Trailing slash matters: next.config sets trailingSlash, so posting to
      // "/api/contact" earns a 308 redirect before the handler ever runs.
      // asset() prefixes NEXT_PUBLIC_BASE_PATH, so this still resolves if the
      // site is ever served from a subpath.
      const res = await fetch(asset("/api/contact/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}) as Record<string, unknown>);

      if (!res.ok) {
        // Never report success we can't back up — say what went wrong and give
        // the visitor a route that always works.
        setErrorMessage(
          typeof result.error === "string"
            ? result.error
            : "Something went wrong sending that.",
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("ok");
    } catch {
      setErrorMessage("Couldn't reach the server. Check your connection.");
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full bg-transparent border-0 border-b border-border/60 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors";
  const selectFieldClass =
    fieldClass + " appearance-none cursor-pointer pr-8";
  const labelClass = "smallcaps";

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border/40">
      <div className="mx-auto max-w-page px-6 md:px-12 py-24 md:py-36">
        <FadeUp>
          <SectionHeader
            index="05"
            label="Plant a Seed"
            title={
              <>
                Tell me what you&apos;re{" "}
                <span className="serif-italic">growing.</span>
              </>
            }
            intro="A short form for serious enquiries — or a direct line if you prefer. The more you tell me up front, the faster we move."
          />
        </FadeUp>

        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <FadeUp className="md:col-span-4" delay={0.1}>
            <p className="smallcaps">Direct</p>
            <a
              href={`mailto:${TO_EMAIL}`}
              className="mt-3 block font-sans text-h4 font-medium tight-tracking underline underline-offset-[6px] decoration-border hover:decoration-foreground transition-colors"
            >
              {TO_EMAIL}
            </a>

            <Rule className="my-8" />

            <p className="smallcaps">Response time</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Within two business days. If it&apos;s urgent, say so in the brief.
            </p>

            <Rule className="my-8" />

            <p className="smallcaps">Currently booking</p>
            <p className="mt-2 text-sm text-muted-foreground">Late-2026.</p>
          </FadeUp>

          <FadeUp className="md:col-span-8" delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="liquid-glass grid gap-7 rounded-2xl p-8 md:p-10"
              aria-label="Project enquiry form"
              aria-describedby="contact-status"
              noValidate={false}
            >
              <input
                type="text"
                name="company_url"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0"
                aria-hidden
              />

              <div className="grid gap-7 md:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>Name</span>
                  <input required name="name" type="text" className={fieldClass} placeholder="Your full name" />
                </label>
                <label className="block">
                  <span className={labelClass}>Email</span>
                  <input required name="email" type="email" className={fieldClass} placeholder="you@studio.com" />
                </label>
              </div>

              <div className="grid gap-7 md:grid-cols-3">
                <label className="block">
                  <span className={labelClass}>Project type</span>
                  <select required name="project" className={selectFieldClass} defaultValue="">
                    <option value="" disabled>Select</option>
                    {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className={labelClass}>Budget</span>
                  <select required name="budget" className={selectFieldClass} defaultValue="">
                    <option value="" disabled>Select</option>
                    {BUDGETS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className={labelClass}>Timeline</span>
                  <select required name="timeline" className={selectFieldClass} defaultValue="">
                    <option value="" disabled>Select</option>
                    {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className={labelClass}>Brief</span>
                <textarea
                  required
                  name="brief"
                  rows={6}
                  className={`${fieldClass} resize-none`}
                  placeholder="What are you building, who is it for, and what does success look like?"
                />
              </label>

              {/* Was flex-col-reverse, which put the error text (and its mailto
                  escape hatch) before the submit button in the tab order on
                  mobile while showing it after. Normal order on both axes now. */}
              <div className="flex flex-col gap-4 md:flex-row-reverse md:items-center md:justify-between">
                <Button
                  type="submit"
                  variant="solid"
                  aria-busy={status === "submitting"}
                  className="shrink-0"
                >
                  {status === "submitting" ? "Sending…" : "Send enquiry"}
                </Button>
                {/* aria-live so the outcome is announced, not just shown.
                    id is referenced by the form's aria-describedby, so an error
                    is tied to the control that produced it rather than floating
                    unattached beside it. */}
                <div
                  id="contact-status"
                  role="status"
                  aria-live="polite"
                  className="max-w-prose text-sm"
                >
                  {status === "idle" && (
                    <span className="smallcaps">All fields required, briefly.</span>
                  )}
                  {status === "submitting" && (
                    <span className="smallcaps">Sending…</span>
                  )}
                  {status === "ok" && (
                    <span className="text-foreground">
                      Sent — I&apos;ll reply from {TO_EMAIL}, within two
                      business days.
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-foreground">
                      {errorMessage}{" "}
                      <a
                        href={`mailto:${TO_EMAIL}`}
                        className="underline underline-offset-4"
                      >
                        Email me directly at {TO_EMAIL}
                      </a>
                      .
                    </span>
                  )}
                </div>
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
