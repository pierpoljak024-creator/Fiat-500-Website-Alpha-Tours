import {
  deliverInquiry,
  deliveryErrorMessage,
  validateInquiry,
} from "../../lib/inquiry";

/**
 * `POST /api/inquiry` — see the rewrite in netlify.toml.
 *
 * Netlify Functions v1 signature so the handler works with both `netlify dev`
 * and a plain `netlify deploy` (the site itself is a static Next.js export, so
 * there is no Next runtime to host a route handler).
 */

type LambdaEvent = {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body: string | null;
  isBase64Encoded?: boolean;
};

type LambdaResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [id, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(id);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function json(statusCode: number, body: unknown): LambdaResponse {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

function readBody(event: LambdaEvent) {
  const raw =
    event.body && event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body;
  return raw ?? "";
}

export async function handler(event: LambdaEvent): Promise<LambdaResponse> {
  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method not allowed." });
  }

  const ip =
    event.headers["x-nf-client-connection-ip"] ||
    event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    "anonymous";

  if (rateLimited(ip)) {
    return json(429, {
      ok: false,
      error: "Too many requests. Please try again in a few minutes.",
    });
  }

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(readBody(event) || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("not an object");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "Invalid request body." });
  }

  // Honeypot: a filled "website" field means a bot, so answer as if it worked.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json(200, { ok: true });
  }

  const { payload, errors } = validateInquiry(body);
  if (Object.keys(errors).length > 0) {
    return json(400, {
      ok: false,
      errors,
      error: "Please check the highlighted fields and try again.",
    });
  }

  try {
    const channels = await deliverInquiry(payload);
    return json(200, { ok: true, channels });
  } catch (error) {
    console.error("[inquiry] Delivery failed", error);
    return json(502, { ok: false, error: deliveryErrorMessage() });
  }
}
