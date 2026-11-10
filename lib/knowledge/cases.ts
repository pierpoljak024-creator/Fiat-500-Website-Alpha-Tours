/**
 * Worked enquiries, kept as training examples.
 *
 * Anonymised on purpose: no guest names, no email addresses, no hotel names.
 * This repository is a public marketing site — personal data belongs in the CRM
 * or the inbox, never in a file that ships with the bundle.
 *
 * The value of a case is the reasoning that cannot be recovered from the final
 * reply: what was asked for, what was refused and why, and what was left open.
 */

import type { CaseStudy } from "./types";

export const caseStudies: CaseStudy[] = [
  {
    id: "case-winter-repeat-visitor",
    label: "Winter 2027 — repeat visitor, first-timer partner, boutique hotel in the centre",
    receivedAt: "2026-11",
    request: {
      date: "2027-01-18",
      party: "Two adults: one who has been to Rome before, one first-timer. Ten days in the city.",
      wants: [
        "Colosseum and the classic highlights",
        "The Aventine: Orange Garden and Santa Sabina",
        "Trastevere or another of the popular quarters",
        "A gelato stop in place of a restaurant tasting",
        "A panoramic view — asked specifically about the Vittoriano lift",
      ],
      constraints: [
        "January, so short daylight and a cold roof-open drive",
        "Staying at a small boutique hotel in the centre — address not yet supplied",
        "Wanted the driver-guide to walk with them, not just drive",
        "Said she was already planning to walk the same places herself, which puts a highlights drive in direct competition with her own itinerary",
      ],
    },
    reply: {
      sentAt: "2026-11-06",
      redacted: [
        "Guest's first name — stored as [guest]. This file ships inside a public website repository, so the name stays in the inbox, not in the code.",
      ],
      text: `Ciao [guest],

Thank you — that's a properly detailed enquiry, which makes this much easier.

One thing in it changes my answer, so let me say it before I quote anything. If you're going to walk the Aventine, Santa Sabina and Trastevere yourselves, then I'd rather not spend your three hours driving you past places you're about to see on foot. A car is bad at that, and you'll do it better walking, with time to stand still.

What a Fiat 500 is genuinely good for is the rest of it: the long climbs between the hills that eat an afternoon on foot, the roof open in the cold January air, the stories in between — and finishing on the Vittoriano terrace as the light goes.

So here's what I'd suggest for the 18th. Start around 14:00, cross the river and go up to the Janiculum for the view over the whole city, come back down through Trastevere for the gelato, then across the centre and up the terrace for sunset — it's about 17:05 that week, and the terrace stays open until 19:30, so there's no rushing. We finish up there, so you can stay as long as you like and walk down when you're ready. You'll still have me on foot with you at the viewpoints and in Trastevere.

Three hours is €300 for the car and the guide, not per person. If you'd like me to include the two lift tickets, that's €36 more — exactly what they cost me, €18 each, nothing added. €336 in total. The ticket gives you priority access to the lift, though it doesn't skip the security check — nothing does.

On the Colosseum: the car stays outside. The inside deserves its own visit, and if you want the Arena Floor I can tell you about that separately.

Two things and I'll hold the date for you: the address of your hotel, so I can check whether I can collect you from the door — and whether you'd rather the late afternoon of the 18th or a morning, and whether you fancy the cream, the orange or the dark blue car.

A presto, Pierfilippo`,
    },
    guestMessages: [
      {
        receivedAt: "2026-11-06",
        text: `Thank you for the quick response. The hotel is boutique hotel 47. And I will discuss these details with my husband and get back to you over the weekend.

I'm wondering if it's possible to change to or include any of the following:
piazza navonna, tivoli fountain, trevi fountain, Spanish steps, campo de fiori, pantheon, villa borghese park.
I've seen some of it but never with a guide and my husband has never been in Rome. These were recommended by cousins of my cousins who live in Rome.`,
      },
    ],
    resolution: {
      tourId: "custom-3h",
      hours: 3,
      quotedTotal: 336,
      summary:
        "Sent 2026-11-06 — the whole enquiry answered in one reply, after the guest mentioned she was planning to walk the same places herself. Three hours at €300 (car and driver-guide, not per head), or €336 with the two VIVE lift tickets at cost (€18 each, nothing added). The route was rebuilt as the complement to her walking tour rather than a rival to it: 14:00 start, Janiculum, down through Trastevere for the gelato, then the centre and the Vittoriano terrace for sunset at about 17:05, with the terrace open until 19:30 and no time pressure on the way down. The Aventine guided walk was dropped because she is walking it; the Colosseum was confirmed exterior-only, with the Arena Floor offered as a separate conversation. She came back the same day: the hotel is Boutique 47 (street not given), she will decide with her husband over the weekend, and she added seven places — Navona, Trevi, Spanish Steps, Campo de' Fiori, Pantheon, Villa Borghese — with the buying motive stated plainly, 'I've seen some of it but never with a guide'. Six of the seven are pedestrian squares the 500 cannot enter, so this second brief points at the golf cart or a guided walk, not at a tighter car route. The operator then supplied what had been missing: the cart is real, €550 for two and a half hours, it covers the whole list including Campo de' Fiori and Villa Borghese, and both the cart and the 500 can collect at the door, because Via Luigi Petroselli 47 sits beside Circo Massimo outside the restricted zone. The reply that followed quotes the cart against her list, at €550, and keeps the 500 as a separate open-roof drive at €300 with the lift tickets at €18 each. Two products, two prices, no compromise and no invented facts.",
    },
    openItems: [
      "Which product she wants, now that both are real: the cart at €550 for her list, the 500 at €300 for the hills and the terrace, or both — and if both, two half-days or one long day",
      "Her decision after the weekend; nothing else can be confirmed until it arrives",
      "If Campo de' Fiori matters to her, the cart has to run in the morning. The afternoon gives an empty square and a better terrace — she has to choose one",
      "'Tivoli fountain' is being read as the Fountain of the Four Rivers in Piazza Navona, which the cart route passes. The reply says so lightly, so she can correct it without being told she was wrong",
      "Whether they want to go inside the Pantheon (free, unbooked, queues) and whether the Galleria Borghese is of interest at all — if it is, the Monday closure on 18 Jan 2027 must be confirmed before it is offered",
      "Whether they want the Arena Floor tour, and if so whether at 9:00 (before) or 15:00 (after)",
      "Which of the three cars, if the 500 is booked at all",
      "Who pays for the gelato",
      "Internal, not the guest's: cart capacity, insurance for passengers, driver authorisation and January weather fit — see open question 'golf-cart-operational-terms'",
    ],
    lessons: [
      "Three corrections had to be made to a first draft before it was sendable: the Aventine is guided, the keyhole is not a stop, and the lift sells tickets in advance rather than only at the desk. Verify before writing, not after the guest has read it.",
      "Rebuilding a route to end at the Vittoriano silently removes the Janiculum. Name that trade-off in the reply instead of letting the guest notice the missing highlight.",
      "Offering the colour choice cost nothing and gave the guest a reason to reply with something other than a date.",
      "Selling the tickets at cost, and saying so, is a credibility move, not a discount.",
      "A guest announcing her own walking plan is not refusing the drive — she is telling us where not to compete. The drafted route was a highlights checklist, which is exactly what a walk covers better. Fix the brief; swapping the vehicle answers a question nobody asked.",
      "The 3 hours were drafted as a morning drive. For a guest whose days are already full on foot, the same three hours become 14:00–17:00 ending on the terrace at dusk, which competes with nothing she has planned.",
      "Nothing had been sent when the walking plan surfaced, so there was no price to walk back and no earlier framing to contradict. Read the whole enquiry before writing the first reply: it is cheaper than a second one.",
      "The reply named the overlap and conceded it before it mentioned a price. That order matters: the guest reads a person thinking about her itinerary, not a supplier filling three hours. Any quote-first version of the same message would have read as a taxi with commentary.",
      "It also kept the thing she had actually asked for — a guide on foot — by promising the walking at the viewpoints and in Trastevere. Dropping the Aventine without that sentence would have looked like quietly removing what she wanted.",
      "The price was stated as arithmetic in one line (€300 + €18 + €18 = €336, 'exactly what they cost me'). No menu, no tiers, no discount. A single clean number is easier to say yes to than three shapes to choose between.",
      "Her second message reversed the first. She is not avoiding the sights — she wants them with a guide: 'I've seen some of it but never with a guide and my husband has never been in Rome.' That sentence is the buying motive, and it was there to be found from the first message if we had read 'wanted the driver-guide to walk with them' as the request rather than as a preference.",
      "Read the requested list against the vehicle before answering it. Six of her seven additions are pedestrian squares; not one of them can be reached by a car. A tighter route is not the fix — a different way of moving is, which is why the golf cart answer is right here and was wrong as a general suggestion earlier.",
      "She named the hotel but not the street, so the pickup question is exactly where it was. When asking for an address, ask for the street and number: a hotel name cannot be checked against the ZTL, and the answer given ('the address of your hotel') invited the answer received.",
      "'Tivoli fountain' sitting next to 'Trevi fountain' is a slip or the Villa d'Este fountains, thirty kilometres out of town. The operator resolved it with the generous reading: assume the guest means the Fountain of the Four Rivers, in the square already on the route, mention it lightly in passing, and let her correct it if not. That costs nothing and never tells a guest she was wrong.",
      "When a vehicle cannot go where the guest wants, the answer is usually another vehicle — not a better-written apology. The cart's price was one question away the whole time, and two drafts were spent working around a restriction that had a product on the other side of it.",
      "The missing hotel address turned out to hold the best line in the reply. A street beside Circo Massimo is outside the restricted zone, so a doorstep collection was available on both vehicles all along: the detail that reads as care was one word of an address away.",
    ],
  },
];
