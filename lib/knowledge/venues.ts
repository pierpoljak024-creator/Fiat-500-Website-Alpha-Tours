/**
 * Places on the route, and what the car may actually do there.
 *
 * This file exists because the difference between "we stop", "we walk with you"
 * and "we drive past" is the single most common source of a disappointed guest.
 * Every entry states the treatment plainly, so a reply never has to guess.
 */

import type { SiteInfo } from "./types";

export const sites: SiteInfo[] = [
  {
    id: "colosseum",
    name: "Colosseum & Imperial Forums",
    access:
      "The 500 can reach the outer ring for a photo stop; it cannot enter the pedestrianised archaeological area.",
    guestExperience:
      "Exterior only — the best angles, no queue to stand in. Entry is not included and is not part of any 500 drive.",
    stop: "photo-stop",
    notes: [
      "Never let a guest believe Colosseum admission is bundled with the drive.",
      "Interior access is a separate product run by the sister team: the private Arena Floor tour.",
      "Because that tour runs at fixed times, it must sit either before the drive or later the same day — not in the middle of it.",
    ],
    source: "operator clarification",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "circo-massimo",
    name: "Circo Massimo",
    access: "Roadside approach; short walk onto the grass if the guest wants it.",
    guestExperience:
      "Photo stop with the Palatine behind you, a few minutes on foot.",
    stop: "photo-stop",
    notes: [
      "Doubles as a fallback meeting point when a hotel sits inside a restricted zone.",
      "The nearest good gelaterie are here — the natural place to take the gelato stop.",
    ],
    source: "operator clarification",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "aventine-orange-garden",
    name: "Aventine Hill — Orange Garden (Giardino degli Aranci)",
    access: "The car parks below and the driver-guide walks up with the guests.",
    guestExperience:
      "A guided walk, not a self-guided visit: the driver-guide stays with the party and tells the story of the hill and the view.",
    stop: "guided-walk",
    notes: [
      "Correction to earlier assumptions: this is not a drop-off-and-wait. The guide walks with the guests.",
      "Budget roughly 45 minutes for the Aventine including Santa Sabina.",
      "The view is good but lower than the Vittoriano terrace — do not oversell it as the best panorama.",
    ],
    source: "operator clarification",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "aventine-santa-sabina",
    name: "Basilica di Santa Sabina",
    access: "On foot, on the same stop as the Orange Garden.",
    guestExperience: "Entered with the driver-guide as part of the Aventine walk.",
    stop: "guided-walk",
    notes: [
      "Same stop as the Orange Garden — never quote them as two separate stops or the timing doubles.",
      "Do not promise a specific interior visit if a service is in progress.",
    ],
    source: "operator clarification",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "knights-of-malta-keyhole",
    name: "The Knights of Malta keyhole (Piazza dei Cavalieri di Malta)",
    access: "Drive-by only. There is no stopping.",
    guestExperience:
      "The driver-guide points it out and explains it as the car passes; the guests see the door, not the view through it.",
    stop: "drive-by",
    notes: [
      "The queue for the keyhole is constant — budget about 45 minutes of standing to look through a door.",
      "Be explicit that we do not stop. A guest who expects to look through the keyhole will otherwise feel short-changed.",
      "Frame it as local judgement, not a limitation: we would rather not spend the morning in a queue.",
    ],
    source: "operator clarification",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "piazza-venezia-vittoriano",
    name: "Piazza Venezia — Vittoriano",
    access:
      "Drop-off on the monument side of the piazza, subject to the traffic restrictions of the day.",
    guestExperience:
      "The finale. The guest is dropped, walked to the lift entrance, and visits the panoramic terrace independently.",
    stop: "drop-off",
    notes: [
      "The driver does not wait: there is no value in holding a classic 500 at Piazza Venezia while guests are on the terrace.",
      "The drive ends here, so the guest must arrange their own onward move — walk into the centre or take a taxi.",
      "Placing the Vittoriano last is what makes a 3-hour drive work; it also replaces the Janiculum panorama.",
    ],
    source: "operator clarification",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "trastevere",
    name: "Trastevere lanes",
    access: "Narrow lanes, restricted at times; approached only where the car is permitted.",
    guestExperience:
      "A slow pass and, if the morning allows, a short walk and the gelato stop.",
    stop: "photo-stop",
    notes: [
      "On a 3-hour drive ending at the Vittoriano, Trastevere is optional — say so instead of promising it.",
      "Gelato here is the alternative to gelato at Circo Massimo; pick one, not both.",
    ],
    source: "operator clarification",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "janiculum",
    name: "Janiculum Hill & Fontana dell'Acqua Paola",
    access: "Drive up, park briefly for the panorama.",
    guestExperience:
      "The west-bank panorama over the domes; the Acqua Paola fountain beside it.",
    stop: "photo-stop",
    notes: [
      "It is the first thing to drop when a route is rebuilt to finish at the Vittoriano.",
      "If a guest asks for it on a 3h drive, the honest answer is that the terrace replaces it.",
    ],
    source: "lib/content.ts (Dolce Vita highlights)",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "testaccio-tasting",
    name: "Testaccio — restaurant food tasting",
    access: "Sit-down stop; needs a booked table and time.",
    guestExperience: "The restaurant tasting that closes the Dolce Vita Experience.",
    stop: "not-included",
    notes: [
      "Belongs to the 4h Dolce Vita only. Swapping it for a gelato stop is what brings a route down to 3 hours.",
      "Never quote a 3h price for a route that still contains this.",
    ],
    source: "lib/content.ts (Dolce Vita highlights)",
    verifiedAt: "2026-11-06",
    verified: true,
  },

  /*
   * The classic centre. Added 2026-11-06, when a guest asked for all of these in
   * one three-hour drive.
   *
   * They are grouped here for one reason: they are the most-requested places in
   * Rome and the ones a car can least serve. Every entry below is pedestrian at
   * the point where the experience actually happens. That much is structural and
   * certain; the practical detail (which corner we drop at, whether the guide
   * walks in) has not been confirmed with the operator, hence `verified: false`.
   * Confirm before quoting any of them as a car-served stop.
   */
  {
    id: "piazza-navona",
    name: "Piazza Navona",
    access:
      "Pedestrian square — no car may enter it. The golf cart works these streets; the 500 can only stop at the edge, a hundred metres out.",
    guestExperience:
      "On the cart route, entered slowly from the south end so the square opens up in one go: the stadium underneath it, then the Fountain of the Four Rivers in front of you.",
    stop: "photo-stop",
    notes: [
      "This is where the Fountain of the Four Rivers stands — almost certainly what a guest meant by 'tivoli fountain' when listing it beside Trevi.",
      "Confirmed 2026-11-06: the square is part of the personalisable cart route, and no part of the car route.",
      "The square is the experience and the experience is on foot — the cart is what gets you into the streets around it, which no car may do.",
    ],
    source: "operator clarification, 2026-11-06",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "pantheon",
    name: "Pantheon & Piazza della Rotonda",
    access:
      "Piazza della Rotonda is closed to traffic. The golf cart can work the surrounding streets; a car reaches a nearby street and the guest walks in.",
    guestExperience:
      "On the cart route. Outside with the guide first, then in under the oculus if they want it — free to enter and unbooked, but it queues.",
    stop: "photo-stop",
    notes: [
      "The interior is never bundled into a quote, on either vehicle. It is free and unbooked, so it costs time rather than money.",
      "Ask whether they want to go inside. A guest who wanted to stand under the oculus will not be satisfied by the outside.",
      "Mid-morning the piazza is a crowd; the light inside the dome is the reason to time it well.",
    ],
    source: "operator clarification, 2026-11-06",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "trevi-fountain",
    name: "Trevi Fountain",
    access:
      "Piazza di Trevi is a small pedestrian basin of streets. The cart can bring guests right in; the car cannot enter and has nowhere to wait.",
    guestExperience:
      "On the cart route, at close range — the only way it is worth seeing. A car visit means walking in from the nearest permitted street and back.",
    stop: "photo-stop",
    notes: [
      "It is lit and far quieter after dark, which suits a late slot better than a morning one.",
      "Do not offer to hold a car here: there is nowhere to hold it. This is the clearest single stop where the cart wins outright.",
    ],
    source: "operator clarification, 2026-11-06",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "spanish-steps",
    name: "Spanish Steps & Piazza di Spagna",
    access:
      "Pedestrianised. The cart brings guests to the foot of the steps; a car stops on an adjacent street and the guest walks in.",
    guestExperience:
      "On the cart route, from the Barcaccia up the steps — better from above, looking down over the centre, if the guest is willing to climb.",
    stop: "photo-stop",
    notes: [
      "Sitting on the steps has been prohibited for years — a guest who plans to sit for a photograph needs telling.",
      "Pairs naturally with the Pincio terrace above, the walkable edge of Villa Borghese and the next stop on the cart route.",
    ],
    source: "operator clarification, 2026-11-06",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "campo-de-fiori",
    name: "Campo de' Fiori",
    access:
      "Closed to traffic, and the market fills the square. The cart works the surrounding lanes and can stop at the edge; a car cannot get near.",
    guestExperience:
      "On the cart route during market hours, walking the stalls with the driver-guide — the produce, the statue, the lane through to Palazzo Farnese.",
    stop: "photo-stop",
    notes: [
      "The market is a morning thing, Monday to Saturday. An afternoon visit is an empty square — a different and lesser experience, so say which one they are buying.",
      "Confirmed 2026-11-06 as possible on the cart, which is the only way to do it properly: the lanes around the square are no place for a car.",
      "This is the one place on a pedestrian list that argues for a morning cart slot against the terrace's late light. January cannot give both on the same day.",
    ],
    source: "operator clarification, 2026-11-06",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "villa-borghese",
    name: "Villa Borghese park & the Pincio",
    access:
      "Closed to general traffic — the 500 cannot drive inside the park, and never will. The golf cart can take guests through it.",
    guestExperience:
      "On the cart route: up through the park and the Pincio, with the view down over Piazza del Popolo. The Galleria Borghese is a separate booked visit with its own timed entry.",
    stop: "photo-stop",
    notes: [
      "Do not promise a car through the park: it is the clearest example of a request the 500 cannot answer at all, and the clearest reason the cart exists.",
      "The Galleria Borghese needs a timed booking made well in advance and is never part of a drive — mention it as a separate arrangement, the way the Arena Floor is.",
      "The gallery closes on Mondays, as most state museums in Rome do — and 18 January 2027 is a Monday. Confirm the current calendar before offering it, and never offer it for that date without checking.",
      "The park itself is open every day and free; it is the gallery that has the calendar.",
    ],
    source: "operator clarification, 2026-11-06",
    verifiedAt: "2026-11-06",
    verified: true,
  },
  {
    id: "tivoli-villa-deste",
    name: "Tivoli — Villa d'Este fountains",
    access:
      "Not in Rome. Tivoli is roughly 30 km east of the centre, a half-day on its own and outside every published drive.",
    guestExperience:
      "A separate excursion with its own transport and ticket; it cannot be folded into a cart or car tour of the centre.",
    stop: "not-included",
    notes: [
      "Kept because a guest listed a 'tivoli fountain' next to Trevi. The operator's reading (2026-11-06) is that she means the Fountain of the Four Rivers in Piazza Navona, which the cart route covers — so no correction is needed and no promise is broken.",
      "If anyone ever does mean Villa d'Este, the honest answer is that it is a different day, not a stop.",
    ],
    source: "operator reading, 2026-11-06",
    verifiedAt: "2026-11-06",
    verified: true,
  },
];
