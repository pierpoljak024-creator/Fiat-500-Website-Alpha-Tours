/**
 * Questions we can answer, with enough depth to train on.
 *
 * Deliberately separate from the six marketing answers in lib/content.ts: that
 * `faq` array is public website copy and feeds the FAQPage structured data.
 * This one is the internal layer — the versions with the caveats in them.
 *
 * `publicReady: true` means the answer is also safe to publish verbatim.
 * `publicReady: false` means it is honest but commercially unwise in public, or
 * that it exposes an inconsistency on the site that should be fixed first.
 */

import type { KnowledgeFaq } from "./types";

export const knowledgeFaq: KnowledgeFaq[] = [
  {
    id: "pickup-hotel",
    q: "Can you pick us up at our hotel?",
    a: "On request, and it depends on the address. Central Rome has restricted-access zones with time-based bans, and a classic petrol 500 is precisely the kind of car they exclude. Give us the exact address and we will confirm honestly whether we can reach the door. If we cannot, the meeting point is normally the Colosseum or Circo Massimo — conveniently where the route starts anyway.",
    tags: ["pickup", "ztl", "logistics"],
    publicReady: true,
    source: "operations.ts → pickup-ztl",
  },
  {
    id: "colosseum-inside",
    q: "Does the drive include going inside the Colosseum?",
    a: "No. Every 500 drive sees the Colosseum from outside, at the best angles and without a queue. Interior access is a separate product run by our sister team — a private Arena Floor tour — which must be scheduled either before the drive or later the same day, because a drive that ends at the Vittoriano does not return to the Colosseum.",
    tags: ["colosseum", "upsell", "itinerary"],
    publicReady: true,
    source: "operations.ts → colosseum-exterior, arena-floor-sequencing",
  },
  {
    id: "vittoriano-lift",
    q: "Can we go up the Vittoriano panoramic lift?",
    a: "Yes — and it is the best panorama in the centre. The monument is run by VIVE (the Ministero della Cultura institute), the ticket is €18 per person, and it includes priority access to the panoramic elevator plus Palazzo Venezia and the Risorgimento museum, valid 7 days. We can buy the tickets for you at cost (€36 for two, nothing added) and send the QR codes, or send you the official link. The ticket has no fixed time slot — you choose an arrival between 9:30 and 19:00, last entry 19:00.",
    tags: ["vittoriano", "tickets", "panorama"],
    publicReady: true,
    source: "pricing.ts → vittoriano-panoramic-lift",
  },
  {
    id: "keyhole-stop",
    q: "Do we stop at the Knights of Malta keyhole?",
    a: "No — it is a drive-by. The queue there is constant, around 45 minutes, for a view through a door, and we would rather spend that time on the Aventine itself. Say so before the guest asks; framed as local judgement it reads as expertise, and a guest who was expecting to look through the keyhole otherwise feels short-changed.",
    tags: ["keyhole", "aventine", "expectations"],
    publicReady: false,
    source: "venues.ts → knights-of-malta-keyhole",
  },
  {
    id: "car-colour",
    q: "Can we choose which car we get?",
    a: "Usually yes. Three cars are in the fleet — cream white, orange and dark blue — and when more than one is free the guest chooses the colour. Confirm against the diary before naming a car as available: the choice is a delight, an unavailable car is a broken promise.",
    tags: ["fleet", "positioning"],
    publicReady: true,
    source: "fleet.ts",
  },
  {
    id: "why-three-hours",
    q: "Why is a 3-hour drive €300 when the 4-hour tour is €350?",
    a: "Because the 3-hour rate removes the restaurant tasting from the Dolce Vita and keeps the gelato stop. The gap is smaller than the hour count suggests because the expensive part of the four-hour day is the sit-down stop, not the driving. Always explain this in the same breath as quoting the price — €300 next to a published €350 invites the guest to assume they are being overcharged.",
    tags: ["pricing", "objection-handling"],
    publicReady: false,
    source: "pricing.ts → custom-3h, operations.ts → three-hour-price-explainer",
  },
  {
    id: "tickets-refund-and-names",
    q: "If we buy the lift tickets for a guest and they cancel, or the name is wrong, what happens?",
    a: "Not established. The checkout was not taken far enough to confirm whether the ticket is nominative or what the refund terms are, and VIVE publishes nothing we could verify on either point. Until that is checked, never promise a refund on a ticket we bought. See the open question 'ticket-refund-and-nominative' — check the payment screen before the first time we buy on a guest's behalf.",
    tags: ["tickets", "risk", "unresolved"],
    publicReady: false,
    source: "open question",
  },
  {
    id: "gelato-paid-by",
    q: "Is the gelato included in the price?",
    a: "Not established. The restaurant tasting was a costed part of the Dolce Vita; the gelato stop replaced it but nobody has said who pays. Do not imply it is on us until that is decided — a small thing promised and then charged for sours a good morning. See the open question 'gelato-cost-bearer'.",
    tags: ["gelato", "pricing", "unresolved"],
    publicReady: false,
    source: "open question",
  },
  {
    id: "winter-terrace",
    q: "Is the terrace worth it in January, and when should we go up?",
    a: "Yes, and the timing matters more than the season. The terrace is open every day 9:30–19:30 with last entry at 19:00, so there is no risk of it closing early — but mid-January sunset is around 17:05, so anything after that is a night view. For a daylight panorama the lift should happen before roughly 16:30, which is why a 10:00 start works so well.",
    tags: ["vittoriano", "timing", "winter"],
    publicReady: true,
    source: "pricing.ts → vittoriano-panoramic-lift",
  },
  {
    id: "site-copy-keyhole-tension",
    q: "The site lists the keyhole as a highlight of the 2-hour tour, but we only drive past it. Is that a problem?",
    a: "It is a real inconsistency worth fixing. lib/content.ts lists 'The Knights of Malta keyhole' among the Rome Highlights highlights, and the tour description says 'the Aventine keyhole', while the operating rule is now a drive-by with no stop. The 2-hour drive can still point it out from the car, but the copy implies a visit. Either soften the wording in lib/content.ts or accept the mismatch knowingly — do not let it be discovered by a guest on the Aventine.",
    tags: ["content", "consistency", "keyhole"],
    publicReady: false,
    source: "lib/content.ts vs venues.ts",
  },
  {
    id: "guest-already-walking",
    q: "The guest says she is already planning to walk those places herself. Does she still want the drive?",
    a: "Probably yes — but not the highlights drive we had drafted. Read it as an invitation to differentiate, for three reasons: she told us where the overlap is, she is a repeat visitor (people who plan their own walks are not looking for a highlights checklist), and she asked about the Vittoriano lift, which is not a checklist item. The fix is the brief, not the vehicle: concede the walking tour in one sentence, then rebuild the three hours around what walking cannot do — the drags between the hills, the roof-open drive, the driver-guide's stories, and the terrace at dusk. If she actually meant that the drive should replace her walking tour, she will say so once asked directly.",
    tags: ["positioning", "objection-handling", "walking-tour", "route"],
    publicReady: false,
    source: "operations.ts → already-walking, sunset-slot",
  },
  {
    id: "golf-cart-or-sidecar",
    q: "When is the golf cart the right answer, and what does it cost?",
    a: "Whenever a guest's list is the pedestrian centre. €550 buys two and a half hours of personalised cart: Piazza Navona and the Fountain of the Four Rivers, the Pantheon, Trevi, the Spanish Steps, Campo de' Fiori and Villa Borghese, collected at the hotel door — all of it impossible in a car, because no car may enter any of those places. Quote it with confidence: the cart is not the cheap alternative to the 500, it is the only vehicle that can do that half of Rome. Bring the 500 in only for what the cart cannot do — the hills, the roof open, the photographs with the car, the terrace finale. Two caveats stay: capacity, insurance and January weather are unrecorded, so never offer it to a larger party without asking the operator, and €550 must be confirmed as a standing rate before it appears anywhere public. The Vespa sidecar remains undocumented and unoffered.",
    tags: ["product", "positioning", "golf-cart", "pricing"],
    publicReady: false,
    source: "pricing.ts → golf-cart-centre; operator clarification 2026-11-06",
  },
  {
    id: "cart-or-500-or-both",
    q: "A guest wants the pedestrian squares and also the terrace at sunset. One booking or two?",
    a: "Two products, and say so plainly — this is the pair the business actually has. The cart at €550 covers the pedestrian centre in 2h30 and cannot finish on the Vittoriano terrace because it is a different half of the city; the 500 at €300 covers the hills, the roof-open drive and the terrace at dusk, and cannot enter the centre at all. Doing both is a real day: cart in the morning so Campo de' Fiori has its market, a break, then the 500 from 14:00 so the terrace lands at sunset. That is €850 of vehicles plus €18 per head for the lift tickets — quote the arithmetic, never a bundled 'package' price, and never discount one product to build the other. If the guest wants only one, ask which matters more: the seven squares, or the drive and the terrace. That question answers the booking for them.",
    tags: ["product", "pricing", "route", "training"],
    publicReady: false,
    source: "pricing.ts → golf-cart-centre, custom-3h; operations.ts → two-vehicles-two-jobs",
  },
  {
    id: "centre-squares-in-a-500",
    q: "A guest asks for Piazza Navona, the Pantheon, Trevi, the Spanish Steps and Campo de' Fiori in a three-hour Fiat 500 drive. Can we?",
    a: "Not as a car-served itinerary — and saying so is stronger than finding a clever route. All five are pedestrian at the moment the visit happens: the car reaches an edge, never the square, and the driver cannot hold position at Trevi at all. Offer the thing that can deliver them: the golf cart, €550 for two and a half hours, which covers all five plus Villa Borghese, collected from the hotel door. Two more things worth saying in the same reply. First, name the timing trade-off — Campo de' Fiori is a market in the morning and the terrace wants the last light, so a January day gives one or the other, which is why a cart that matters for the market should run in the morning. Second, ask what they want to go inside: the Pantheon is free and unbooked, the Galleria Borghese needs a timed booking made well in advance, and neither is ever bundled into a quote. What not to do: promise 'we'll show you Navona' in a car and then walk the guest a hundred metres from a drop-off, which reads as a broken promise rather than a traffic restriction.",
    tags: ["route", "site-access", "objection-handling", "golf-cart"],
    publicReady: false,
    source: "venues.ts → piazza-navona, pantheon, trevi-fountain, spanish-steps, campo-de-fiori; operations.ts → centre-squares-need-feet",
  },
  {
    id: "reply-bets-winter-2026",
    q: "What did the first reply to the winter enquiry bet on, and what happens if a bet loses?",
    a: "Four bets, all recoverable, which is why the reply was safe to send. (1) That she wants the drive as a complement to her walking, not a replacement — if not, she was asked to say so and the route reverts to the sights at 10:00. (2) That 14:00–17:00 fits her days — if not, the same route runs in the morning and the terrace becomes a daylight panorama rather than a sunset one. (3) That sunset is worth more to this couple than daylight — if not, only the finale changes. (4) That €300 with the tickets at cost reads as fair rather than as a car for hire — if it is the price that objects, the honest answer is fewer hours at the published 2-hour rate of €130, never a discount on the three hours. Sent 2026-11-06; the verbatim text lives in cases.ts.",
    tags: ["positioning", "pricing", "objection-handling", "training"],
    publicReady: false,
    source: "cases.ts → case-winter-repeat-visitor",
  },
  {
    id: "arena-floor-times",
    q: "What times does the Arena Floor tour run, and how much is it?",
    a: "Believed to run daily at 9:00 and 15:00 per the parent site, and the price has not been recorded here. Treat both as unconfirmed: quote the sequencing rule confidently, quote the times only after re-checking, and never quote a price that is not in this knowledge base.",
    tags: ["colosseum", "upsell", "unresolved"],
    publicReady: false,
    source: "parent site (not re-verified)",
  },
];
