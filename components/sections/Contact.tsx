"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Rule } from "@/components/ui/Rule";
import { FadeUp } from "@/components/ui/FadeUp";

const PROJECT_TYPES = ["Brand website", "Landing page", "Template customization", "Other"];
const BUDGETS = ["Under $3k", "$3k – $8k", "$8k – $20k", "$20k+"];
const TIMELINES = ["ASAP", "1 – 2 months", "2 – 4 months", "Just exploring"];

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
const TO_EMAIL = "contact@dylan-coleman.com";

type Status = "idle" | "submitting" | "ok" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if ((data.get("company_url") as string)?.length > 0) {
      setStatus("ok");
      form.reset();
      return;
    }

    if (!FORM_ENDPOINT) {
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
    "w-full bg-transparent border-0 border-b border-border/60 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors";
  const selectFieldClass =
    fieldClass + " appearance-none cursor-pointer pr-8";
  const labelClass = "smallcaps";

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border/40">
      <div className="mx-auto max-w-page px-6 md:px-12 py-24 md:py-36">
        <FadeUp>
          <SectionHeader
            index="06"
            label="Plant a Seed"
            title={
              <>
                Tell me what you&apos;re{" "}
                <span className="serif-italic">growing.</span>
              </>
            }
            intro="A short form for serious inquiries — or a direct line if you prefer. The more you tell me up front, the faster we move."
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
              aria-label="Project inquiry form"
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

              <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
                <p className="smallcaps">
                  {status === "ok" && "Message sent — talk soon."}
                  {status === "error" && "Something broke. Email me directly instead."}
                  {status === "idle" && "All fields required, briefly."}
                  {status === "submitting" && "Sending…"}
                </p>
                <Button type="submit" variant="solid">
                  {status === "submitting" ? "Sending…" : "Send inquiry"}
                </Button>
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
