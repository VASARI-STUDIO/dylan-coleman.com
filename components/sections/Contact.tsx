"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rule } from "@/components/ui/Rule";

const PROJECT_TYPES = ["Brand website", "Landing page", "Template customization", "Other"];
const BUDGETS = ["Under $3k", "$3k – $8k", "$8k – $20k", "$20k+"];
const TIMELINES = ["ASAP", "1 – 2 months", "2 – 4 months", "Just exploring"];

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
const TO_EMAIL = "hello@dylan-coleman.com";

type Status = "idle" | "submitting" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot
    if ((data.get("company_url") as string)?.length > 0) {
      setStatus("ok");
      form.reset();
      return;
    }

    if (!FORM_ENDPOINT) {
      // No endpoint configured — fall back to mailto
      const subject = `New inquiry — ${data.get("name") ?? "Anonymous"}`;
      const body = [
        `Name: ${data.get("name") ?? ""}`,
        `Email: ${data.get("email") ?? ""}`,
        `Project: ${data.get("project") ?? ""}`,
        `Budget: ${data.get("budget") ?? ""}`,
        `Timeline: ${data.get("timeline") ?? ""}`,
        "",
        `${data.get("brief") ?? ""}`,
      ].join("\n");
      window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("ok");
      return;
    }

    try {
      setStatus("submitting");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Form submit failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full border-b border-rule bg-transparent py-3 text-body text-ink placeholder:text-muted focus:border-ink focus:outline-none transition";
  const labelClass = "smallcaps text-muted";

  return (
    <section id="contact" className="scroll-mt-20 border-t border-rule">
      <div className="mx-auto max-w-page px-6 md:px-10 py-24 md:py-32">
        <SectionHeader
          index="05"
          label="Make Contact"
          title="A short form for serious inquiries — or a direct line if you prefer."
          intro="Send me a few details and I&apos;ll get back within two business days. The more you tell me up front, the faster we move."
        />

        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="smallcaps text-muted">Direct</p>
            <a
              href={`mailto:${TO_EMAIL}`}
              className="mt-3 block font-display text-h4 leading-[1.1] tracking-[-0.01em] underline underline-offset-[6px] decoration-rule hover:decoration-ink"
            >
              {TO_EMAIL}
            </a>

            <Rule className="my-8" />

            <p className="smallcaps text-muted">Response time</p>
            <p className="mt-2 text-body-sm text-ink/80">
              Within two business days. If it&apos;s urgent, say so in the brief.
            </p>

            <Rule className="my-8" />

            <p className="smallcaps text-muted">Currently booking</p>
            <p className="mt-2 text-body-sm text-ink/80">Late-2026.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="md:col-span-8 grid gap-8"
            aria-label="Project inquiry form"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company_url"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] -top-[9999px] h-0 w-0 opacity-0"
              aria-hidden
            />

            <div className="grid gap-8 md:grid-cols-2">
              <label className="block">
                <span className={labelClass}>Name</span>
                <input
                  required
                  name="name"
                  type="text"
                  className={fieldClass}
                  placeholder="Your full name"
                />
              </label>
              <label className="block">
                <span className={labelClass}>Email</span>
                <input
                  required
                  name="email"
                  type="email"
                  className={fieldClass}
                  placeholder="you@studio.com"
                />
              </label>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <label className="block">
                <span className={labelClass}>Project type</span>
                <select required name="project" className={fieldClass} defaultValue="">
                  <option value="" disabled>Select</option>
                  {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="block">
                <span className={labelClass}>Budget</span>
                <select required name="budget" className={fieldClass} defaultValue="">
                  <option value="" disabled>Select</option>
                  {BUDGETS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="block">
                <span className={labelClass}>Timeline</span>
                <select required name="timeline" className={fieldClass} defaultValue="">
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

            <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
              <p className="smallcaps text-muted">
                {status === "ok" && "Message sent — talk soon."}
                {status === "error" && "Something broke. Email me directly instead."}
                {status === "idle" && "All fields required, briefly."}
                {status === "submitting" && "Sending…"}
              </p>
              <Button type="submit" variant="solid" className="md:min-w-[14rem]">
                {status === "submitting" ? "Sending…" : "Send inquiry"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
