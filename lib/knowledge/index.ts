/**
 * The operating knowledge base — a barrel and a small query layer.
 *
 * Usage:
 *
 *   import { knowledge, quote, searchKnowledge } from "@/lib/knowledge";
 *
 *   quote({ tourId: "custom-3h", liftTickets: 2 });
 *   // → { drive: 300, tickets: { charge: 36 }, total: 336, … }
 *
 *   searchKnowledge("keyhole");   // every entry that mentions it
 *
 * Nothing here is rendered by the site today. It is data plus a handful of pure
 * functions, so it stays safe to import from a server component, a script or a
 * future assistant without pulling anything into the client bundle.
 */

import { caseStudies } from "./cases";
import { guestsPerCar, vehicleSelectionNote, vehicles } from "./fleet";
import { knowledgeFaq } from "./faq";
import { operationalRules } from "./operations";
import { TICKET_POLICY, ticketProducts, tourProducts } from "./pricing";
import { sites } from "./venues";
import type { OpenQuestion, TicketProduct, TourProduct } from "./types";

export * from "./types";
export { caseStudies } from "./cases";
export { guestsPerCar, vehicleSelectionNote, vehicles } from "./fleet";
export { knowledgeFaq } from "./faq";
export { operationalRules } from "./operations";
export { TICKET_POLICY, ticketProducts, tourProducts } from "./pricing";
export { sites } from "./venues";

/**
 * What we still do not know.
 *
 * This list is the honest half of the knowledge base: it stops a future answer
 * from being invented. Anything marked `blocksQuoting` must be resolved before
 * a price or a promise goes out on the back of it.
 */
export const openQuestions: OpenQuestion[] = [
  {
    id: "ticket-refund-and-nominative",
    question:
      "Are the VIVE lift tickets nominative, and what are the refund/change terms?",
    why: "We now offer to buy them on a guest's behalf. If the ticket carries a name, the guest's name must be entered at checkout; if it is non-refundable, a cancelled tour leaves us €36 out of pocket.",
    blocksQuoting: false,
    status: "open",
  },
  {
    id: "gelato-cost-bearer",
    question: "Who pays for the gelato — us or the guest?",
    why: "A gelato stop that the guest assumes is included, and is then charged for, costs more goodwill than the €5 it saves. Decide before the next quote that mentions gelato.",
    blocksQuoting: false,
    status: "open",
  },
  {
    id: "ticket-markup",
    question: "Should lift tickets carry a service markup?",
    why: "Parked on 2026-11-06 in favour of passing tickets through at cost. Revisit deliberately, and if it changes, update TICKET_POLICY in ./pricing.ts and the guest wording in ./operations.ts (rule 'ticket-at-cost') together.",
    blocksQuoting: false,
    status: "open",
  },
  {
    id: "rates-valid-for-2027",
    question:
      "Are €130 / €300 / €350 still the correct 2027 rates, and are they still 'from' prices?",
    why: "The published prices in lib/content.ts predate the 2027 season. The €300 three-hour rate exists only in conversation, which makes it the easiest of the three to get out of step with reality.",
    blocksQuoting: true,
    status: "open",
  },
  {
    id: "three-hour-sku",
    question: "Should the 3-hour drive become a published tour?",
    why: "It cannot be booked through the enquiry form and it is not visible on the site, so every 3h sale depends on someone remembering the number. If it recurs, it belongs in lib/content.ts.",
    blocksQuoting: false,
    status: "open",
  },
  {
    id: "arena-floor-price-and-times",
    question:
      "What does the private Arena Floor tour cost, and which slots does it actually run?",
    why: "We offer it as an upsell in replies but only have the sequencing rule and an unverified claim of 9:00 and 15:00. Do not quote a price until it is recorded here.",
    blocksQuoting: false,
    status: "open",
  },
  {
    id: "car-availability-process",
    question:
      "Where is the diary that decides which of the three cars is free on a given day?",
    why: "The colour offer is only safe if checking availability is a ten-second habit. Until the process is written down, confirm before naming a car.",
    blocksQuoting: false,
    status: "open",
  },
  {
    id: "solo-and-four-guest-bookings",
    question:
      "Can a single guest book a whole car, and how is a party of four priced?",
    why: "The public FAQ says up to four guests using a second 500. Whether that means one price or two is not recorded, so never answer it from memory.",
    blocksQuoting: true,
    status: "open",
  },
  {
    id: "phone-number-mismatch",
    question:
      "Why does the site display +39 388 455 6998 while the WhatsApp link dials +39 346 322 3879?",
    why: "A guest who reads one number and messages the other will assume nobody is answering. Fix in the environment variables (NEXT_PUBLIC_PHONE vs NEXT_PUBLIC_WHATSAPP) — see lib/site.ts.",
    blocksQuoting: false,
    status: "answered",
    answer:
      "Resolved 2026-11-10. There is now a single contact number, +39 375 829 7864 (digits 393758297864), and WhatsApp is the only channel shown. NEXT_PUBLIC_PHONE is left blank so every phone row and tel: link is hidden by lib/site.ts (hasPhone is false), and NEXT_PUBLIC_WHATSAPP=393758297864 drives every wa.me deep link. The two wrong numbers (+39 388 455 6998 and +39 346 322 3879) came from the host environment, not the code — set the value in the Netlify site config and rebuild, since NEXT_PUBLIC_* values are baked in at build time.",
  },
  {
    id: "enquiry-message-dropped",
    question:
      "Why is the enquiry form's 'Anything we should know?' text discarded from the WhatsApp prefill?",
    why: "The guest writes their requirements and the hand-off loses them, so the reply starts from zero. See lib/booking-intent.ts and components/booking-form.tsx.",
    blocksQuoting: false,
    status: "open",
  },
  {
    id: "alternative-vehicles",
    question:
      "Do we actually run a golf cart tour, and on what terms?",
    why: "Answered 2026-11-06. The cart is the recommended vehicle for any guest whose list is the pedestrian centre, and it is the only vehicle that can work there.",
    blocksQuoting: false,
    status: "answered",
    answer:
      "Yes. A personalised golf cart tour, €550 for 2h30, covering Piazza Navona (including the Fountain of the Four Rivers), the Pantheon, Trevi, the Spanish Steps, Campo de' Fiori and Villa Borghese, with collection at the hotel. The Fiat 500 cannot enter any of those places — it stays on the non-restricted streets and does what it is good at: the hills, the roof open, the terrace finale and photographs with the car. The two products are complements, not rivals. See ./pricing.ts → golf-cart-centre. The Vespa sidecar remains undocumented and unoffered.",
  },
  {
    id: "golf-cart-operational-terms",
    question:
      "How many guests fit one golf cart, and what are the insurance, licence and January-weather terms?",
    why: "None of it is recorded, and the €550 cart was quoted to a party of two. This does not block that quote; it blocks any quote to a larger party, any promise that the cart is enclosed or warm in January, and any claim about who is insured if something happens on board.",
    blocksQuoting: false,
    status: "open",
  },
];

/** Everything in one object, for export and for a future assistant prompt. */
export const knowledge = {
  /** Every fact here was checked on this date unless a record says otherwise. */
  reviewedAt: "2026-11-06",
  vehicles,
  guestsPerCar,
  vehicleSelectionNote,
  tours: tourProducts,
  tickets: ticketProducts,
  ticketPolicy: TICKET_POLICY,
  sites,
  rules: operationalRules,
  faq: knowledgeFaq,
  cases: caseStudies,
  openQuestions,
} as const;

export type Knowledge = typeof knowledge;

/* ── Query helpers ─────────────────────────────────────────────────────── */

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function requireTicket(productId: string): TicketProduct {
  const found = ticketProducts.find((ticket) => ticket.id === productId);
  if (!found) throw new Error(`Unknown ticket "${productId}"`);
  return found;
}

function requireTour(tourId: string): TourProduct {
  const found = tourProducts.find((tour) => tour.id === tourId);
  if (!found) throw new Error(`Unknown tour "${tourId}"`);
  return found;
}

/** What the monument charges us, per person. */
export function ticketCostPerPerson(productId = "vittoriano-panoramic-lift") {
  return requireTicket(productId).costPerPerson;
}

/**
 * What we charge the guest, per person, after the markup policy.
 * Identical to {@link ticketCostPerPerson} while TICKET_POLICY.enabled is false.
 */
export function ticketChargePerPerson(
  productId = "vittoriano-panoramic-lift",
  policy = TICKET_POLICY,
) {
  const base = requireTicket(productId).costPerPerson;
  if (!policy.enabled) return base;
  return round2((base + policy.euroPerTicket) * (1 + policy.percent / 100));
}

export type Quote = {
  tourId: string;
  tourName: string;
  hours: number;
  currency: "EUR";
  /** Price of the drive itself. */
  drive: number;
  /** Tickets bought on the guest's behalf, at cost and at what we charge. */
  tickets: {
    productId: string;
    count: number;
    cost: number;
    charge: number;
  } | null;
  total: number;
  /** Everything the person writing the reply should remember to say. */
  notes: string[];
};

/**
 * Builds a quote from the knowledge base, so the arithmetic in a reply is never
 * done in someone's head. Throws on an unknown tour or ticket id — failing loud
 * beats quoting the wrong price.
 */
export function quote({
  tourId,
  liftTickets = 0,
  ticketProductId = "vittoriano-panoramic-lift",
}: {
  tourId: string;
  liftTickets?: number;
  ticketProductId?: string;
}): Quote {
  const tour = requireTour(tourId);
  const count = Math.max(0, Math.trunc(liftTickets));
  const ticket = count > 0 ? requireTicket(ticketProductId) : null;

  const tickets = ticket
    ? {
        productId: ticket.id,
        count,
        cost: round2(ticket.costPerPerson * count),
        charge: round2(ticketChargePerPerson(ticket.id) * count),
      }
    : null;

  const notes: string[] = [];

  if (!tour.published) {
    notes.push(
      "Quoted by hand: this duration is not on the site and cannot be booked through the enquiry form.",
    );
  }

  if (tickets) {
    const policy = ticket ? ticket.policy : TICKET_POLICY;
    notes.push(
      policy.enabled
        ? `Tickets recharged at cost plus a service amount (€${tickets.cost} cost → €${tickets.charge} charged). Say what the extra covers.`
        : `Tickets recharged at cost, nothing added: €${tickets.cost} for ${count}. Say that out loud — it is the credible part.`,
    );
    notes.push("Book the tickets only once the date and the car are confirmed, a few days ahead.");
  }

  return {
    tourId: tour.id,
    tourName: tour.name,
    hours: tour.hours,
    currency: tour.currency,
    drive: tour.price,
    tickets,
    total: round2(tour.price + (tickets ? tickets.charge : 0)),
    notes,
  };
}

export type SearchHit = {
  kind: "faq" | "rule" | "site" | "vehicle";
  id: string;
  title: string;
  text: string;
  /** Carried through from the FAQ, where the distinction matters. */
  publicReady?: boolean;
};

function contains(haystack: string[], needle: string) {
  return haystack.some((value) => value.toLowerCase().includes(needle));
}

/**
 * Case-insensitive substring search across the whole knowledge base.
 * Deliberately dumb: a token match is enough to find the rule you half-remember,
 * and it keeps the module free of dependencies.
 */
export function searchKnowledge(term: string): SearchHit[] {
  const needle = term.trim().toLowerCase();
  if (needle.length < 2) return [];

  const hits: SearchHit[] = [];

  for (const item of knowledgeFaq) {
    if (contains([item.q, item.a, item.id, ...item.tags], needle)) {
      hits.push({
        kind: "faq",
        id: item.id,
        title: item.q,
        text: item.a,
        publicReady: item.publicReady,
      });
    }
  }

  for (const rule of operationalRules) {
    if (contains([rule.rule, rule.why, rule.id, rule.topic, rule.guestWording ?? ""], needle)) {
      hits.push({
        kind: "rule",
        id: rule.id,
        title: rule.rule,
        text: rule.guestWording ?? rule.why,
      });
    }
  }

  for (const site of sites) {
    if (contains([site.name, site.access, site.guestExperience, site.id], needle)) {
      hits.push({
        kind: "site",
        id: site.id,
        title: site.name,
        text: site.guestExperience,
      });
    }
  }

  for (const vehicle of vehicles) {
    if (contains([vehicle.label, vehicle.colour, vehicle.id], needle)) {
      hits.push({
        kind: "vehicle",
        id: vehicle.id,
        title: vehicle.label,
        text: vehicle.colour,
      });
    }
  }

  return hits;
}

/** Only the answers that are safe to publish on the website. */
export function publicFaq() {
  return knowledgeFaq.filter((item) => item.publicReady);
}

/**
 * The whole knowledge base as JSON — for a training tool, a chat assistant's
 * system prompt, or a spreadsheet somebody wants to read.
 */
export function toTrainingJson(space = 2) {
  return JSON.stringify(knowledge, null, space);
}
