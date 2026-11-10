/**
 * Shapes for the operating knowledge base.
 *
 * This is deliberately *not* a database: the site is a static export with no
 * runtime storage (see README → "No database"). Everything here is plain,
 * dependency-free data so it can be
 *
 *   1. imported by any future FAQ section, desk script or chat assistant,
 *   2. exported to JSON/CSV for a training tool (`toTrainingJson()`),
 *   3. reviewed in pull requests like the rest of the copy.
 *
 * Nothing in this folder is rendered today. It records what we know to be true,
 * with the source and the date it was checked, so that a future answer can be
 * traced back to a fact instead of to someone's memory.
 */

/** Where a fact came from, and when we last confirmed it. */
export type Verification = {
  /** Human-readable provenance, e.g. "vive.midaticket.com" or "operator". */
  source: string;
  /** ISO date (YYYY-MM-DD) on which the fact was last checked. */
  verifiedAt?: string;
  /**
   * `false` means "believed but not re-confirmed" — still safe to use
   * internally, never to quote to a guest as certainty.
   */
  verified: boolean;
};

export type Fact = Verification & {
  statement: string;
};

/** A vehicle in the fleet, as offered to guests. */
export type Vehicle = {
  id: string;
  /** Guest-facing label. */
  label: string;
  colour: string;
  /** Guests may pick a colour when more than one car is free. */
  selectable: boolean;
  /** Sourced from the tour capacity in lib/content.ts ("2–4 guests"). */
  guestCapacity: { min: number; max: number };
  notes: string[];
};

/** A sellable drive. Published tours mirror lib/content.ts; the rest are quotes. */
export type TourProduct = {
  id: string;
  name: string;
  hours: number;
  price: number;
  currency: "EUR";
  /** "per-car" — the price covers the vehicle and chauffeur-guide, not per head. */
  priceBasis: "per-car";
  /** false → quoted case by case, never advertised on the site. */
  published: boolean;
  /** Matching id in lib/content.ts when `published` is true. */
  contentId?: string;
  summary: string;
  notes: string[];
};

/** Ticketing policy: what we pay versus what we charge. */
export type MarkupPolicy = {
  enabled: boolean;
  /** Added per ticket, in euro, when enabled. */
  euroPerTicket: number;
  /** Added on top of cost, as a percentage, when enabled. */
  percent: number;
  /** Why the policy is what it is — read this before changing it. */
  decision: string;
  decidedAt: string;
};

/** A ticket we can buy on a guest's behalf. */
export type TicketProduct = Verification & {
  id: string;
  name: string;
  venue: string;
  operator: string;
  currency: "EUR";
  /** What the monument charges us. */
  costPerPerson: number;
  reductions: Array<{ amount: number; appliesTo: string }>;
  includes: string[];
  validity: string;
  hours: string;
  booking: string[];
  restrictions: string[];
  groupBooking?: string;
  /** Sold at cost or with markup — see MarkupPolicy. */
  policy: MarkupPolicy;
};

/** An instruction the team (and any future assistant) must follow. */
export type OperationalRule = {
  id: string;
  topic:
    | "pickup"
    | "route"
    | "site-access"
    | "ticketing"
    | "timing"
    | "pricing"
    | "positioning";
  rule: string;
  why: string;
  /** Approved phrasing for guest-facing replies. Reuse it verbatim. */
  guestWording?: string;
  source?: string;
  verifiedAt?: string;
};

/** A question we can answer, with enough depth to train on. */
export type KnowledgeFaq = {
  id: string;
  q: string;
  a: string;
  tags: string[];
  /** true → also safe as public website copy; false → internal/1:1 only. */
  publicReady: boolean;
  /** Where the answer comes from, for review. */
  source?: string;
};

/** A reply that actually left our side. */
export type SentReply = {
  /** ISO date the reply was sent (YYYY-MM-DD). */
  sentAt: string;
  /** "WhatsApp", "email", … free text: the channel is not always recorded. */
  channel?: string;
  /**
   * Verbatim, never tidied up afterwards. This is the only record of what was
   * promised, including the exact wording a guest is entitled to rely on.
   * Guest names are replaced with `[guest]` — see `redacted`.
   */
  text: string;
  /** Personal data stripped from `text` before storing, for review. */
  redacted?: string[];
};

/** A message received from the guest, kept in order with the replies. */
export type GuestMessage = {
  /** ISO date the message arrived (YYYY-MM-DD). */
  receivedAt: string;
  channel?: string;
  /** Verbatim, typos included — the guest's own words are the evidence. */
  text: string;
};

/** A worked enquiry, kept as a training example. */
export type CaseStudy = {
  id: string;
  /** Anonymised: never store guest names, emails or hotel room details here. */
  label: string;
  receivedAt: string;
  request: {
    date?: string;
    party: string;
    wants: string[];
    constraints: string[];
  };
  resolution: {
    tourId: string;
    hours?: number;
    quotedTotal: number;
    summary: string;
  };
  openItems: string[];
  lessons: string[];
  /** What actually went out, once something did. */
  reply?: SentReply;
  /** What came back, in the guest's own words. */
  guestMessages?: GuestMessage[];
};

/** Something we do not know yet. Keep this list short and honest. */
export type OpenQuestion = {
  id: string;
  question: string;
  why: string;
  blocksQuoting: boolean;
  status: "open" | "answered";
  answer?: string;
};

/** A place the route touches, and what the car is allowed to do there. */
export type SiteInfo = Verification & {
  id: string;
  name: string;
  /** What the 500 can physically do here. */
  access: string;
  /** What the guest actually gets. */
  guestExperience: string;
  /** The default treatment on a drive, unless a route says otherwise. */
  stop: "drive-by" | "photo-stop" | "guided-walk" | "drop-off" | "not-included";
  notes: string[];
};
