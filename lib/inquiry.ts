import { Resend } from "resend";
import { site } from "./site";

/**
 * Enquiry handling shared by the Netlify Function that serves `/api/inquiry`.
 *
 * The site is exported statically, so there is no Next.js route handler: this
 * module holds the framework-agnostic logic (validation + delivery) and
 * `netlify/functions/inquiry.ts` is the thin HTTP shell around it.
 */

export type InquiryPayload = {
  name: string;
  email: string;
  date: string;
  tour: string;
  message: string;
};

export type InquiryErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Last-resort sender, used only while INQUIRY_FROM is unset. */
const FALLBACK_FROM = "Alpha Tours Rome <onboarding@resend.dev>";

export function str(value: unknown, max = 600) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function tourLabel(tour: string) {
  const map: Record<string, string> = {
    "rome-highlights": "Rome Highlights (2h) — from €130",
    "dolce-vita": "Dolce Vita Experience (4h) — from €350",
    "not-sure": "Not sure yet — advise me",
  };
  return map[tour] ?? tour;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function prettyDate(value: string) {
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Inline-styled HTML keeps the notification readable in every mail client. */
function emailHtml(payload: InquiryPayload) {
  const rows: Array<[string, string]> = [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Tour", tourLabel(payload.tour)],
    ["Preferred date", prettyDate(payload.date)],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #ece5d8;font:600 10px/1.6 Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8a7a63;width:150px;vertical-align:top;">${escapeHtml(
            label,
          )}</td>
          <td style="padding:10px 16px;border-bottom:1px solid #ece5d8;font:400 15px/1.6 Georgia,serif;color:#2b2620;">${escapeHtml(
            value,
          )}</td>
        </tr>`,
    )
    .join("");

  const note = payload.message
    ? `<div style="margin-top:24px;padding:16px 18px;background:#f7f1e6;border-left:3px solid #b08d57;font:400 14px/1.7 Georgia,serif;color:#4a4238;white-space:pre-wrap;">${escapeHtml(
        payload.message,
      )}</div>`
    : `<p style="margin-top:24px;font:400 14px/1.7 Georgia,serif;color:#8a7a63;">No extra notes were included.</p>`;

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f2ece1;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fffdf8;border:1px solid #e4d9c6;">
      <tr>
        <td style="padding:26px 24px 20px;border-bottom:1px solid #ece5d8;">
          <p style="margin:0 0 6px;font:600 10px/1.4 Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#b03a2e;">New enquiry</p>
          <h1 style="margin:0;font:400 26px/1.25 Georgia,serif;color:#2b2620;">Fiat 500 tour · Rome</h1>
          <p style="margin:8px 0 0;font:400 13px/1.6 Helvetica,Arial,sans-serif;color:#8a7a63;">Sent from ${escapeHtml(
            site.url,
          )}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 8px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
        </td>
      </tr>
      <tr><td style="padding:0 24px 24px;">${note}</td></tr>
      <tr>
        <td style="padding:16px 24px;border-top:1px solid #ece5d8;">
          <a href="mailto:${escapeHtml(
            payload.email,
          )}" style="display:inline-block;padding:11px 20px;background:#b03a2e;color:#fffdf8;font:600 10px/1 Helvetica,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;text-decoration:none;">Reply to ${escapeHtml(
            payload.name,
          )}</a>
          <p style="margin:14px 0 0;font:400 11px/1.6 Helvetica,Arial,sans-serif;color:#a3968a;">Reply within 24 hours. Hitting reply goes straight to the guest.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Validates a parsed JSON body and returns the sanitised payload. */
export function validateInquiry(body: Record<string, unknown>) {
  const payload: InquiryPayload = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    date: str(body.date, 40),
    tour: str(body.tour, 60),
    message: str(body.message, 2000),
  };

  const errors: InquiryErrors = {};
  if (payload.name.length < 2) errors.name = "Please include your name.";
  if (!EMAIL_RE.test(payload.email))
    errors.email = "Please include a valid email address.";
  if (!DATE_RE.test(payload.date))
    errors.date = "Please choose a preferred date.";
  if (!payload.tour) errors.tour = "Please choose a tour.";
  if (body.consent !== true)
    errors.consent = "Please accept the privacy note so we can reply.";

  return { payload, errors };
}

/** Human-readable plain-text twin of the HTML notification. */
export function inquirySummary(payload: InquiryPayload) {
  return [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Tour: ${tourLabel(payload.tour)}`,
    `Preferred date: ${prettyDate(payload.date)}`,
    "",
    payload.message || "(no extra notes)",
  ].join("\n");
}

/**
 * Sends the enquiry to every configured channel and returns their names.
 * Throws when a configured channel fails, so the caller can apologise.
 */
export async function deliverInquiry(payload: InquiryPayload) {
  const summary = inquirySummary(payload);
  const channels: string[] = [];

  const webhook = process.env.INQUIRY_WEBHOOK_URL?.trim();
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: site.url, ...payload, summary }),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    channels.push("webhook");
  }

  // INQUIRY_TO_EMAIL wins; NEXT_PUBLIC_EMAIL is the friendly fallback.
  const inbox = process.env.INQUIRY_TO_EMAIL?.trim() || site.email;
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (apiKey && inbox) {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.INQUIRY_FROM?.trim() || FALLBACK_FROM,
      to: [inbox],
      replyTo: payload.email,
      subject: `New Fiat 500 enquiry · ${tourLabel(
        payload.tour,
      )} · ${prettyDate(payload.date)}`,
      text: summary,
      html: emailHtml(payload),
    });

    if (error) throw new Error(`Resend: ${error.message}`);
    channels.push("email");
  }

  if (channels.length === 0) {
    // No channel configured yet — keep the lead visible in the function logs.
    console.error(
      "[inquiry] No delivery channel configured (set RESEND_API_KEY + INQUIRY_TO_EMAIL). Logged only:\n" +
        summary,
    );
    channels.push("logged");
  }

  return channels;
}

/** Copy shown to the visitor when delivery fails. */
export function deliveryErrorMessage() {
  return site.hasWhatsapp
    ? "We couldn't send that just now. Please try again or message us on WhatsApp."
    : "We couldn't send that just now. Please try again in a moment.";
}
