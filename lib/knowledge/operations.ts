/**
 * The operating rules: what we always do, why, and the approved way to say it.
 *
 * `guestWording` is the field that matters. Copy it, adapt the names, keep the
 * substance — these sentences were written to be honest without sounding like
 * an excuse, which is the whole trick when the answer is "no".
 */

import type { OperationalRule } from "./types";

const CHECKED = { verifiedAt: "2026-11-06", verified: true };

export const operationalRules: OperationalRule[] = [
  {
    id: "pickup-ztl",
    topic: "pickup",
    rule: "Hotel pickup is on request and never guaranteed. Confirm the exact address before promising a door collection; if the address sits inside a restricted traffic zone, offer a meeting point instead — usually the Colosseum or Circo Massimo.",
    why: "Central Rome has restricted-access zones and time-based bans, and a classic petrol Fiat 500 is exactly the kind of vehicle those rules are written for. Promising a doorstep pickup we cannot make is the most expensive mistake in this business — it ruins the first five minutes of a four-hour day.",
    guestWording:
      "Central Rome has restricted-access zones and the classic 500 is an older petrol car, so there are hours of the day when I simply can't bring it to certain streets. Send me the exact address and I'll tell you honestly whether I can come to the door. If not, I'll give you a pickup point — usually by the Colosseum or Circo Massimo.",
    source: "operator clarification; matches the site FAQ wording 'on request'",
    ...CHECKED,
  },
  {
    id: "pickup-fallback-points",
    topic: "pickup",
    rule: "Use the Colosseum or Circo Massimo as the default fallback meeting points.",
    why: "Both are where every route already starts, both are outside the hardest restrictions, and choosing them costs the guest almost nothing — so the compromise reads as convenience rather than a downgrade.",
    guestWording:
      "…a pickup point — usually by the Colosseum or Circo Massimo, both of which are where your day starts anyway.",
    source: "operator clarification",
    ...CHECKED,
  },
  {
    id: "keyhole-driveby",
    topic: "route",
    rule: "The Knights of Malta keyhole is a drive-by. State clearly that we do not stop, and say why.",
    why: "The queue is constant, around 45 minutes, for a view through a door. Saying so out loud protects the rest of the morning and reads as local knowledge rather than a gap in the tour.",
    guestWording:
      "We drive right past it and I'll show you exactly where it is, but we won't stop. There is always a 45-minute queue of people filming through that door, and I'd rather not spend your morning in it.",
    source: "operator clarification",
    ...CHECKED,
  },
  {
    id: "aventine-guided",
    topic: "route",
    rule: "On the Aventine the driver-guide parks and walks with the guests through the Orange Garden and Santa Sabina. It is a guided walk, never a self-guided one.",
    why: "It is a stronger product and it is what actually happens — describing it as 'free time' both undersells the tour and misleads on timing.",
    guestWording:
      "I park the 500 and we walk up together: I take you into the Orange Garden and Santa Sabina myself, so you get the stories and not just the photos.",
    source: "operator clarification",
    ...CHECKED,
  },
  {
    id: "gelato-elastic",
    topic: "route",
    rule: "The gelato stop is elastic: wherever and whenever the guest is ready. Offer Circo Massimo and Trastevere as the two natural candidates, and decide on the day.",
    why: "It replaces the fixed restaurant tasting, so its value is precisely that it is not fixed. Pinning it to a specific gelateria turns a flexible perk back into an itinerary item that can be missed.",
    guestWording:
      "Gelato, elastic — wherever the morning takes us. Some of the best gelato in Rome is right by Circo Massimo; if we're running comfortably we'll cross into Trastevere for it, if not we stay on this side. You tell me when you're ready.",
    source: "operator clarification",
    ...CHECKED,
  },
  {
    id: "colosseum-exterior",
    topic: "site-access",
    rule: "The Colosseum is exterior only on every 500 drive. Interior access is the sister team's private Arena Floor tour, sold separately.",
    why: "A guest who assumes the drive includes admission will discover the truth at the worst possible moment. Said up front, it becomes an upsell instead of a complaint.",
    guestWording:
      "The Colosseum is outside only on our drive — we don't go in. If you want inside, our sister team runs the private Arena Floor tour.",
    source: "operator clarification",
    ...CHECKED,
  },
  {
    id: "arena-floor-sequencing",
    topic: "timing",
    rule: "When a drive finishes at the Vittoriano, the Arena Floor tour must sit either before the drive or later the same day — the guest makes their own way for the later slot.",
    why: "The drive no longer returns the guest to its starting point, so an 'insert it in the middle' plan leaves the car and the Colosseum at opposite ends of the centre.",
    guestWording:
      "Since the drive now finishes at the Vittoriano, it would either sit before the drive — 9:00, and we'd start at 11:30 — or that same afternoon at 15:00, in which case you'd make your own way over from Piazza Venezia.",
    source: "operator clarification",
    ...CHECKED,
  },
  {
    id: "vittoriano-finale",
    topic: "route",
    rule: "When the Vittoriano lift is in the plan, it is the last stop. The drive ends at the drop-off; the driver does not wait.",
    why: "There is no point holding a classic 500 at Piazza Venezia while guests are on the terrace. Ending there also gives the guest an unhurried visit and puts them in the centre of Rome when they come down.",
    guestWording:
      "I drop you at the Vittoriano and that's where our drive ends — I won't be waiting below, so take all the time you like up on the terrace. When you come down you're in the middle of Rome: walk straight into the centre, or take a taxi back to the hotel.",
    source: "operator clarification",
    ...CHECKED,
  },
  {
    id: "lift-priority-not-skip",
    topic: "site-access",
    rule: "Describe the lift ticket as priority access to the panoramic elevator. Never call it skip-the-line.",
    why: "Security screening applies to everyone. 'Priority access' is the monument's own wording and is accurate; 'skip the line' is a promise we cannot keep at the metal detector.",
    guestWording:
      "The ticket includes priority access to the panoramic lift — you walk straight past the ticket queue.",
    source: "vive.midaticket.com product description",
    ...CHECKED,
  },
  {
    id: "gelato-before-lift",
    topic: "timing",
    rule: "Schedule the gelato before the Vittoriano, never after.",
    why: "Food and drink are not allowed inside VIVE. A gelato in hand at the security check is a gelato in the bin.",
    guestWording:
      "No food or drink allowed inside, so the gelato comes before the lift, never after.",
    source: "VIVE visiting rules",
    ...CHECKED,
  },
  {
    id: "ticket-buy-timing",
    topic: "ticketing",
    rule: "Offer to buy lift tickets, but only after the date and the car are confirmed — then buy a few days ahead, not months ahead.",
    why: "The ticket is valid for 7 days from the chosen date and carries no fixed time slot, so a short delay is safe and a shifted day is survivable. Paying out weeks in advance only adds risk to us for no benefit to the guest.",
    guestWording:
      "Either way I'd sort them a few days before, so nothing depends on the desk being open when you arrive.",
    source: "operator clarification + VIVE validity terms",
    ...CHECKED,
  },
  {
    id: "ticket-at-cost",
    topic: "pricing",
    rule: "Tickets are recharged at cost: €18 per person, €36 for two. The markup is switched off in ./pricing.ts and was explicitly deferred.",
    why: "Presenting the ticket line as arithmetic — 'the difference is exactly the price of the tickets, nothing added on top' — answers the unspoken suspicion that we are marking up a monument ticket. With a repeat visitor that credibility is worth more than the margin.",
    guestWording:
      "€336 if you'd like me to include the two Vittoriano lift tickets — the difference is exactly the price of the tickets, €18 each, with nothing added on top.",
    source: "operator decision, 2026-11-06",
    ...CHECKED,
  },
  {
    id: "three-hour-price-explainer",
    topic: "pricing",
    rule: "Whenever €300 for three hours is quoted, explain in the same breath why it is three hours and not the four-hour tour.",
    why: "€300 next to a published €350 for four hours invites the guest to think they are being overcharged. The reason is legitimate — no restaurant tasting — so say it before they have to ask.",
    guestWording:
      "Because we drop the restaurant tasting and do a gelato stop instead, it comes to 3 hours rather than 4.",
    source: "operator decision, 2026-11-06",
    ...CHECKED,
  },
  {
    id: "january-light",
    topic: "timing",
    rule: "In winter, prefer a 10:00 start when the guest wants a daylight panorama; the lift must happen before roughly 16:30. If the guest's days are already full on foot, offer the 14:00–17:00 sunset slot instead (rule 'sunset-slot').",
    why: "Sunset in mid-January is around 17:05, while the terrace stays open until 19:30 with last entry at 19:00. A late lift is a night view — beautiful, but not what most guests mean by 'panorama'.",
    guestWording:
      "January light — roof up, sunset early — which is another good reason to start at 10:00 and reach the terrace while it's still daylight.",
    source: "VIVE opening hours + seasonal daylight",
    ...CHECKED,
  },
  {
    id: "vehicle-choice",
    topic: "positioning",
    rule: "Offer the colour choice — cream white, orange or dark blue — but only name a car after checking the diary.",
    why: "Choosing the car is a memorable, almost free touch of hospitality. Naming a car that is already out that day is a promise broken before the tour starts.",
    guestWording:
      "We have three out that day, and you get to choose: cream-white, orange, or dark blue. Tell me which one and I'll reserve it for you.",
    source: "operator availability, 2026-11-06",
    ...CHECKED,
  },
  {
    id: "already-walking",
    topic: "positioning",
    rule: "When a guest says they are already walking the sights on foot, never sell the drive as a checklist of the same places. Concede the walking tour openly, then rebuild the route around what walking cannot do: the distance between the hills, the roof-open drive itself, the stories, and the terrace finale at dusk.",
    why: "A drive that mirrors a walking tour is transport with commentary, sold at experience prices — and the guest has just told us exactly where the overlap is. That is an invitation to differentiate, not a rejection. Answering it by swapping the vehicle repeats the same mistake in a different shape.",
    guestWording:
      "If you're going to walk the Aventine, Santa Sabina and Trastevere yourselves, then I'd rather not spend your three hours driving you past places you're about to see on foot. A car is bad at that, and you'll do it better walking, with time to stand still.",
    source: "operator review of the 18 Jan 2027 enquiry",
    ...CHECKED,
  },
  {
    id: "sunset-slot",
    topic: "timing",
    rule: "For a guest whose days are already full on foot, offer a 14:00–17:00 drive that ends on the terrace at dusk, instead of the 10:00 daylight start.",
    why: "It removes the drive from direct competition with their walking day, and it turns the terrace into the best three minutes of the tour: mid-January sunset is around 17:05 and the terrace stays open to 19:30, last entry 19:00, so there is no closing risk. It is the same three hours, positioned as the evening rather than the morning.",
    guestWording:
      "…it's about 17:05 that week, and the terrace stays open until 19:30, so there's no rushing. We finish up there, so you can stay as long as you like and walk down when you're ready.",
    source: "operator review; VIVE opening hours",
    ...CHECKED,
  },
  {
    id: "no-invented-facts",
    topic: "positioning",
    rule: "If a fact is not in this knowledge base, say you will check and come back. Do not estimate a price, a queue, an opening time or a walking distance.",
    why: "Every number in this folder was checked against the monument, the operator or the site. A guess in a private tour quote is a mistake the guest only discovers in Rome.",
    guestWording: "Let me check that properly and come back to you today.",
    source: "house rule",
    ...CHECKED,
  },
  {
    id: "centre-squares-need-feet",
    topic: "site-access",
    rule: "Piazza Navona, the Pantheon, Trevi, the Spanish Steps, Campo de' Fiori and Villa Borghese are pedestrian where the visit actually happens: no car drives into them, so the 500 can only deliver a guest to the nearest edge. Never present them as car-served stops. When a guest's list is mostly these, the answer is the golf cart — €550 for 2h30, all of them, collected from the hotel — not a cleverer car route.",
    why: "These are the most-requested places in Rome and the least car-friendly, and a guest who is walked a hundred metres from a drop-off after being told 'we'll show you Navona' reads it as a broken promise, not as a traffic restriction. The cart is not a downgrade of the 500 and must never be sold as one: it is the only vehicle permitted where these places are, and it turns an apology into a better day.",
    guestWording:
      "Those squares are closed to cars — ours included — which is exactly why they're worth seeing properly. The golf cart is the one vehicle that can take you into them, and it's the route I'd put you on for that half of your trip.",
    source: "pedestrian status of the centre squares; operator review 2026-11-06",
    ...CHECKED,
  },
  {
    id: "guide-not-driver",
    topic: "positioning",
    rule: "When a guest asks to see famous places 'with a guide', the request is for the guide. Answer with the guiding first and let the vehicle be what makes it possible — do not answer it with a route or a bigger car.",
    why: "'I've seen some of it but never with a guide' is the buying motive stated out loud, and it is the same motive as the earlier request that the driver-guide walk with them. A guest who wanted transport would not mention the guide twice. Re-reading it as a transport problem is how a car gets sold to someone who wanted a person.",
    guestWording:
      "That's the part I'd enjoy most — none of those places make sense without someone telling you what you're looking at. The vehicle is just how we cover the ground between them.",
    source: "operator review of the 18 Jan 2027 enquiry",
    ...CHECKED,
  },
  {
    id: "market-or-terrace",
    topic: "timing",
    rule: "Campo de' Fiori is a market in the morning and an empty square by mid-afternoon; the terrace wants the last of the light. A single three-hour window in January cannot give both. Name the trade-off and let the guest choose, or split it across two days.",
    why: "Two of this guest's wishes pull in opposite directions, and quietly satisfying one while disappointing the other is how a good tour becomes a slightly disappointing one. Saying it out loud costs one sentence and makes the guest a collaborator in the plan rather than a critic of it afterwards.",
    guestWording:
      "One thing worth deciding together: the market at Campo de' Fiori is a morning, and the terrace is best at sunset. On a January afternoon we can have the light or the market, not both — which matters more to you?",
    source: "market hours; VIVE opening hours; operator review",
    ...CHECKED,
  },
  {
    id: "two-vehicles-two-jobs",
    topic: "positioning",
    rule: "Never present the cart and the 500 as rivals or as substitutes for each other. The cart is how you get inside the pedestrian centre, for fun and for access. The 500 is the open-roof drive between the hills, the photographs with the car, and the terrace finale. A guest who wants both is not being upsold — they are asking for two different days, and should be told so plainly, with both prices.",
    why: "The two products have opposite strengths and the same guest can legitimately want both. Framing the cart as 'the cheaper way to see the same things' invites a comparison that makes one of them look redundant; framing them by what each does uniquely makes each easy to justify on its own terms.",
    guestWording:
      "They're honestly two different things. The cart gets you inside the little streets; the 500 is the roof-down drive along the hills and the photographs with the car. Nobody needs both — but plenty of people decide they want both.",
    source: "operator clarification, 2026-11-06",
    ...CHECKED,
  },
  {
    id: "pickup-beside-circo-massimo",
    topic: "pickup",
    rule: "A hotel on Via Luigi Petroselli, beside Circo Massimo, sits outside the restricted zone: both the golf cart and the 500 collect at the door. Circo Massimo stays the fallback meeting point for any hotel actually inside the restricted zone, where a collection at the door may not be possible.",
    why: "The two-minute distinction changes the whole first impression of a tour: a guest collected from their own doorstep has been looked after, while a guest walked to a meeting point has been processed. It also saves the argument at the end of the booking about why the car is not outside.",
    guestWording:
      "You're right next to Circo Massimo, so there's no meeting point to find — we'll pull up at your door.",
    source: "guest hotel address, 2026-11-06",
    ...CHECKED,
  },
];
