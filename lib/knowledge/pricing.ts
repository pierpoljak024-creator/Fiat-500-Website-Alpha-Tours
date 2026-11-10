/**
 * What we sell, what we charge, and what we pass through at cost.
 *
 * Two rules for anyone editing this file:
 *   1. `published: true` tours mirror lib/content.ts — change both or neither.
 *   2. Tickets are sold at cost today. The markup decision lives in exactly one
 *      place (TICKET_POLICY) so switching it on later is a one-line change, not
 *      a hunt through the codebase.
 */

import type { MarkupPolicy, TicketProduct, TourProduct } from "./types";

/**
 * Ticketing markup policy — currently OFF.
 *
 * Decided 2026-11-06: recharge monument tickets at cost. The question of a
 * markup was parked, to be revisited later. Until `enabled` is true, a guest
 * pays exactly what the monument charges us, and the quote is presented as
 * "the difference is exactly the price of the tickets, nothing added on top" —
 * which is a trust argument worth more than the margin, so do not switch this
 * on casually and never switch it on without updating the guest wording in
 * ./operations.ts.
 */
export const TICKET_POLICY: MarkupPolicy = {
  enabled: false,
  euroPerTicket: 0,
  percent: 0,
  decision:
    "Tickets are passed through at cost (€18 per person). Markup deferred, to be reviewed later.",
  decidedAt: "2026-11-06",
};

/** The drives we sell. Prices are per car, never per head. */
export const tourProducts: TourProduct[] = [
  {
    id: "rome-highlights",
    name: "Rome Highlights",
    hours: 2,
    price: 130,
    currency: "EUR",
    priceBasis: "per-car",
    published: true,
    contentId: "rome-highlights",
    summary:
      "Colosseum, Circo Massimo, the Aventine keyhole and Trastevere, roof open, in two unhurried hours.",
    notes: [
      "Mirrors lib/content.ts (badge 'Most booked'). Change both or neither.",
      "Carries the same route rules as any other drive — see ./operations.ts.",
    ],
  },
  {
    id: "dolce-vita",
    name: "Dolce Vita Experience",
    hours: 4,
    price: 350,
    currency: "EUR",
    priceBasis: "per-car",
    published: true,
    contentId: "dolce-vita",
    summary:
      "The far bank: Janiculum, Acqua Paola, a seasonal fruit stop, Villa Pamphili with its Vatican view, coffee in the park and a Testaccio food tasting to close.",
    notes: [
      "Mirrors lib/content.ts (featured tour). Change both or neither.",
      "The restaurant tasting is what makes this four hours — remove it and the drive collapses to the 3h rate.",
    ],
  },
  {
    id: "custom-3h",
    name: "Custom 3 hours",
    hours: 3,
    price: 300,
    currency: "EUR",
    priceBasis: "per-car",
    published: false,
    summary:
      "A hand-priced middle ground: a short private drive shaped around one guest's list, with a gelato stop instead of the restaurant tasting.",
    notes: [
      "Not a SKU: it does not exist on the site, in the tour cards or in the enquiry form. Quote it in conversation and expect to explain the number.",
      "Sits between Rome Highlights (2h / €130) and Dolce Vita (4h / €350), so it needs its own sentence in any reply — never let a guest think €300 is the 4h price.",
      "With two Vittoriano lift tickets at cost it becomes €336. That is arithmetic, not a package: €300 + 2 × €18.",
      "If the 3h quote becomes routine, promote it to a published tour in lib/content.ts rather than quoting by hand forever.",
    ],
  },
  {
    id: "golf-cart-centre",
    name: "Golf cart — historic centre (personalised)",
    hours: 2.5,
    price: 550,
    currency: "EUR",
    priceBasis: "per-car",
    published: false,
    summary:
      "The pedestrian centre by golf cart: Piazza Navona and the Four Rivers, the Pantheon, Trevi, the Spanish Steps, Campo de' Fiori and Villa Borghese, collected from the hotel door.",
    notes: [
      "Confirmed by the operator on 2026-11-06: the cart is the one vehicle that can work inside the pedestrian centre, where no car may enter. The seven places a car cannot serve are exactly the seven it can.",
      "€550 for 2h30 is the personalised price quoted for this guest. Confirm whether it is a standing rate or a one-off before it appears anywhere public.",
      "priceBasis stays 'per-car' because the type is shared with the drives: it is one cart and a driver-guide, not a per-head fare.",
      "Capacity is not recorded. Do not offer the cart to a party larger than the two guests already quoted without asking the operator first.",
      "Pick-up confirmed at the guest's hotel door — Via Luigi Petroselli 47 sits beside Circo Massimo, outside the restricted zone, so both the cart and the 500 can collect there.",
      "Still unrecorded: insurance for paying passengers, driver licensing/authorisation, whether the cart is open-sided in January, and cancellation terms. See open question 'golf-cart-operational-terms'.",
      "Nothing here bundles the Vittoriano lift tickets: they remain €18 per person at cost, quoted separately.",
      "'Tivoli fountain' in the guest's list is almost certainly the Fountain of the Four Rivers in Piazza Navona, which this route passes. If she truly meant Villa d'Este at Tivoli, that is a half-day out of town and a different product.",
    ],
  },
];

/** Tickets we can buy on a guest's behalf. */
export const ticketProducts: TicketProduct[] = [
  {
    id: "vittoriano-panoramic-lift",
    name: "Admission Ticket",
    venue: "Vittoriano — Panoramic Terrace (via panoramic elevator)",
    operator: "VIVE — Vittoriano e Palazzo Venezia (Ministero della Cultura)",
    currency: "EUR",
    costPerPerson: 18,
    reductions: [
      { amount: 5, appliesTo: "EU citizens aged 18–25 (reduced admission)" },
      { amount: 0, appliesTo: "Under 18s (free admission)" },
    ],
    includes: [
      "Sommo portico level",
      "Panoramic Terrace, reached by the panoramic elevator, with priority access",
      "Museo Centrale del Risorgimento",
      "Palazzo Venezia",
      "Temporary exhibitions (admission ticket covers the current exhibition)",
    ],
    validity:
      "One entry per site, valid 7 days from the date selected at booking. Not tied to a fixed time slot.",
    hours:
      "Mon–Sun 9:30–19:30, last entry 19:00. Ticket office 9:30–18:45. Closed 25 December. Free entry on the first Sunday of the month.",
    booking: [
      "Official online shop: https://vive.midaticket.com/en — product 'Admission Ticket'.",
      "Booking flow: pick the date, then a single arrival window of 9:30 – 19:00.",
      "18 January 2027 was available in the calendar when checked (2026-11-06), including the 9:30–19:00 window.",
      "Because the ticket is valid for 7 days and not slot-bound, buying a few days ahead is low-risk if the drive shifts by a day or the guest runs late.",
    ],
    restrictions: [
      "Food and drink are not allowed inside — gelato must come before the visit, not after.",
      "Security screening applies; 'priority access' is not the same as bypassing security. Say 'priority access to the lift', never 'skip the line'.",
      "Photographs of the official ticket are not a substitute for the QR code — send the guest the booking PDF/message, not a screenshot of a screen.",
    ],
    groupBooking:
      "More than 10 tickets: VIVE reservation centre on +39 06 83845776.",
    source: "vive.midaticket.com (official VIVE ticketing) and vive.cultura.gov.it",
    verifiedAt: "2026-11-06",
    verified: true,
    policy: TICKET_POLICY,
  },
];
