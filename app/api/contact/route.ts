import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BUSINESS } from "@/content/legal";

// Enquiries used to be handed to the visitor's mail client via a mailto: link,
// which does nothing at all for anyone on webmail — and the UI claimed success
// regardless. This delivers the enquiry properly, and every failure path below
// returns an error the form can actually surface rather than a false positive.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 120, email: 200, choice: 80, brief: 5000 } as const;

type Payload = {
  name?: unknown;
  email?: unknown;
  project?: unknown;
  budget?: unknown;
  timeline?: unknown;
  brief?: unknown;
  company_url?: unknown; // honeypot
};

const str = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

// Deliberately permissive: the goal is to reject obvious rubbish, not to
// adjudicate the RFC. A real address that fails a clever regex is a lost lead.
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function escapeHtml(v: string) {
  return v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see. Answer 200 so
  // a bot has no signal to adapt to.
  if (str(body.company_url, 200).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, MAX.name);
  const email = str(body.email, MAX.email);
  const project = str(body.project, MAX.choice);
  const budget = str(body.budget, MAX.choice);
  const timeline = str(body.timeline, MAX.choice);
  const brief = str(body.brief, MAX.brief);

  if (!name || !email || !brief) {
    return NextResponse.json(
      { error: "Please include your name, email and a short brief." },
      { status: 422 },
    );
  }
  if (!looksLikeEmail(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? BUSINESS.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Not configured is a server problem, not the visitor's. Say so plainly so
  // the form can offer the direct email address instead of pretending.
  if (!apiKey || !from) {
    console.error(
      "[contact] RESEND_API_KEY and/or CONTACT_FROM_EMAIL are not set — enquiry not delivered.",
    );
    return NextResponse.json(
      { error: "The form isn't available right now.", fallbackEmail: to },
      { status: 503 },
    );
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Project", project || "—"],
    ["Budget", budget || "—"],
    ["Timeline", timeline || "—"],
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New enquiry — ${name}${project ? ` · ${project}` : ""}`,
      text: [
        ...rows.map(([k, v]) => `${k}: ${v}`),
        "",
        "Brief:",
        brief,
      ].join("\n"),
      html: `
        <h2 style="font:600 18px system-ui;margin:0 0 16px">New enquiry</h2>
        <table style="font:14px system-ui;border-collapse:collapse">
          ${rows
            .map(
              ([k, v]) =>
                `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
            )
            .join("")}
        </table>
        <p style="font:14px/1.6 system-ui;margin:20px 0 6px;color:#666">Brief</p>
        <p style="font:14px/1.6 system-ui;margin:0;white-space:pre-wrap">${escapeHtml(brief)}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend rejected the send:", error);
      return NextResponse.json(
        { error: "Couldn't send that just now.", fallbackEmail: to },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected failure:", err);
    return NextResponse.json(
      { error: "Couldn't send that just now.", fallbackEmail: to },
      { status: 500 },
    );
  }
}
