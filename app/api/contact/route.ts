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

/** Environment variable, with blank treated as absent. */
const env = (key: string) => {
  const v = process.env[key];
  return v && v.trim() ? v.trim() : undefined;
};

/**
 * Strip anything that could break out of a header value. A name carrying CR or
 * LF would otherwise be interpolated straight into the Subject and could inject
 * additional headers.
 */
const headerSafe = (v: string) => v.replace(/[\r\n\t]+/g, " ").trim();

/**
 * Best-effort per-IP throttle. Serverless instances do not share memory, so
 * this bounds abuse per instance rather than globally — it makes a casual
 * flood expensive without pulling in a KV store. Swap for a shared store if
 * this ever gets seriously targeted.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic sweep so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

/** Largest body worth reading. The field caps only apply after parsing. */
const MAX_BODY_BYTES = 16 * 1024;

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
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Try again shortly.", fallbackEmail: BUSINESS.email },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "That message is too long." }, { status: 413 });
  }

  let body: Payload;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "That message is too long." }, { status: 413 });
    }
    const parsed: unknown = JSON.parse(raw);
    // A bare `null`, array or string parses fine but is not a payload —
    // reading properties off it would throw outside this try block.
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Malformed request." }, { status: 400 });
    }
    body = parsed as Payload;
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

  // `??` does not catch "", and .env.example ships these keys blank — copying
  // it into a hosting dashboard as-is would otherwise resolve `to` to an empty
  // string and fail every enquiry. Treat empty as unset everywhere.
  const apiKey = env("RESEND_API_KEY");
  const from = env("CONTACT_FROM_EMAIL");
  const to = env("CONTACT_TO_EMAIL") ?? BUSINESS.email;

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
      subject: headerSafe(
        `New enquiry — ${name}${project ? ` · ${project}` : ""}`,
      ),
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
