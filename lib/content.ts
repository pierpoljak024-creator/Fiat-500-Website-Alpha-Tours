/**
 * All editable copy for the Fiat 500 Rome landing page.
 * Prices and durations follow the launch brief; swap the copy here and the
 * whole page (including structured data) follows.
 *
 * Image slots are imported from lib/media.ts so the page only ever references
 * the local placeholder paths in /public.
 */

import { GALLERY_IMAGES } from "./media";

export type Tour = {
  id: string;
  name: string;
  badge: string;
  duration: string;
  hours: number;
  price: number;
  capacity: string;
  /** Local image slot from /public/images — see lib/media.ts. */
  image: string;
  summary: string;
  description: string;
  highlights: string[];
  includes: string[];
  cta: string;
  featured?: boolean;
};

export type ValueProp = {
  icon: "chauffeur" | "route" | "camera" | "private";
  title: string;
  body: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  plate: string;
  caption: string;
  /** Drives the masonry rhythm. */
  ratio: "tall" | "portrait" | "square" | "landscape";
};

export type Review = {
  quote: string;
  author: string;
  origin: string;
};

export const navLinks = [
  { href: "#why", label: "Why the 500" },
  { href: "#tours", label: "Tours" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export const tours: Tour[] = [
  {
    id: "rome-highlights",
    name: "Rome Highlights",
    badge: "Most booked",
    duration: "2 hours",
    hours: 2,
    price: 130,
    capacity: "2–4 guests",
    image: GALLERY_IMAGES[2],
    summary: "The Eternal City in two unhurried hours.",
    description:
      "Colosseum, Circo Massimo, the Aventine keyhole and Trastevere — roof open, camera ready, and no queues to stand in.",
    highlights: [
      "Colosseum & Imperial Forums",
      "Circo Massimo",
      "Aventine Hill & the orange garden",
      "The Knights of Malta keyhole",
      "Trastevere lanes",
    ],
    includes: [
      "Private car & licensed chauffeur-guide",
      "Hotel pickup in central Rome on request",
      "Photo stop at every highlight",
      "Free cancellation up to 24h before",
    ],
    cta: "Book Rome Highlights",
  },
  {
    id: "dolce-vita",
    name: "Dolce Vita Experience",
    badge: "The full experience",
    duration: "4 hours",
    hours: 4,
    price: 350,
    capacity: "2–4 guests",
    image: GALLERY_IMAGES[7],
    summary: "Half a day at the pace of a coffee and a story.",
    description:
      "The other side of the river: the Janiculum panorama, the Acqua Paola fountain, a seasonal fruit stop, Villa Pamphili with its Vatican view, coffee in the park and a Testaccio food tasting to close.",
    highlights: [
      "Janiculum Hill panorama",
      "Fontana dell'Acqua Paola",
      "Photo moment",
      "Fruit tasting at a local fruit seller (seasonal)",
      "Villa Pamphili (Vatican view)",
      "Coffee stop in Villa Pamphili",
      "Testaccio food tasting at a restaurant",
    ],
    includes: [
      "Private car & licensed chauffeur-guide",
      "Flexible start time, door to door",
      "An espresso stop, on us",
      "Free cancellation up to 24h before",
    ],
    cta: "Book the Dolce Vita",
    featured: true,
  },
];

export const valueProps: ValueProp[] = [
  {
    icon: "chauffeur",
    title: "A driver-guide, not a taxi",
    body: "Every drive is chauffeured by a licensed Roman guide. You never drive, never park, never think about ZTL cameras or one-way streets.",
  },
  {
    icon: "route",
    title: "Streets the big tours miss",
    body: "A 500 slips through Trastevere's alleys, up the Aventine and along the Tiber — routes a minibus simply cannot take.",
  },
  {
    icon: "camera",
    title: "Photo stops, properly timed",
    body: "We pull over when the light is right: the keyhole, the Janiculum terrace, the ochre wall you spotted on the way.",
  },
  {
    icon: "private",
    title: "Yours alone, start to finish",
    body: "Private by default for 2–4 guests. Change the route, add a coffee, linger longer — the day bends to your party, not a schedule.",
  },
];
export const gallery: GalleryItem[] = [
  {
    src: GALLERY_IMAGES[0],
    alt: "Couple leaning on a cream classic Fiat 500 on a terrace above Rome at golden hour",
    plate: "Plate 01",
    caption: "Golden hour, above Rome",
    ratio: "landscape",
  },
  {
    src: GALLERY_IMAGES[1],
    alt: "Red classic Fiat 500 driving through a sunlit Roman alley with two guests inside",
    plate: "Plate 02",
    caption: "The lanes of Trastevere",
    ratio: "landscape",
  },
  {
    src: GALLERY_IMAGES[2],
    alt: "Red classic Fiat 500 passing the Colosseum in Rome at sunset",
    plate: "Plate 03",
    caption: "Sunset at the Colosseum",
    ratio: "landscape",
  },
  {
    src: GALLERY_IMAGES[3],
    alt: "Ivory dashboard, white steering wheel and tan leather seats inside a restored Fiat 500",
    plate: "Plate 04",
    caption: "Ivory dash, tan leather",
    ratio: "square",
  },
  {
    src: GALLERY_IMAGES[4],
    alt: "Cream classic Fiat 500 parked on a golden-hour cobbled lane in Rome, a dome in the distance",
    plate: "Plate 05",
    caption: "Back lanes, no map needed",
    ratio: "landscape",
  },
  {
    src: GALLERY_IMAGES[5],
    alt: "Behind the wheel of a red Fiat 500 driving toward St Peter's Basilica in Rome",
    plate: "Plate 06",
    caption: "The long way to San Pietro",
    ratio: "landscape",
  },
  {
    src: GALLERY_IMAGES[6],
    alt: "Pale blue vintage Fiat 500 with a wicker picnic basket parked on the cobbled Appian Way",
    plate: "Plate 07",
    caption: "Via Appia Antica",
    ratio: "landscape",
  },
  {
    src: GALLERY_IMAGES[7],
    alt: "A guest laughing inside a red classic Fiat 500 during a private tour of Rome",
    plate: "Plate 08",
    caption: "Roof open, guests in",
    ratio: "portrait",
  },
];

export const reviews: Review[] = [
  {
    quote:
      "We'd walked past the Colosseum twice already. Seeing it from the back of a tiny red 500, roof open, was a completely different city.",
    author: "Sarah & Tom",
    origin: "London, UK",
  },
  {
    quote:
      "Our driver knew every alley in Trastevere. It never felt like a tour — more like a friend with the best car in Rome showing you around.",
    author: "Marie-Claire",
    origin: "Lyon, France",
  },
  {
    quote:
      "Four hours, two kids, zero complaints. The gelato stop and the Janiculum panorama made the whole trip.",
    author: "Daniel",
    origin: "Chicago, USA",
  },
];

export const faq = [
  {
    q: "Is the tour private?",
    a: "Always. The 500 is yours for the duration — no shared seats, no other guests, no waiting for strangers. Your driver-guide plans the pace around you.",
  },
  {
    q: "How many people fit in a classic Fiat 500?",
    a: "The car is snug by design: two guests travel in real comfort. Our tours welcome up to four guests, using a second 500 for larger parties — tell us your group size and we'll confirm the best set-up.",
  },
  {
    q: "Where do you pick us up?",
    a: "Hotel pickup and drop-off in central Rome are available on request when you book. If you're staying further out, we'll suggest an easy meeting point and send the exact location the day before.",
  },
  {
    q: "What happens if it rains?",
    a: "The 500 has a roof, and Rome is beautiful in the rain. If conditions become genuinely unsafe, we'll reschedule at no cost or refund you in full.",
  },
  {
    q: "Can we customise the route?",
    a: "Please do. These are private tours: tell us what you'd like to see — or skip — and we'll shape the drive around it. Extra coffee stops, slower mornings and photo detours are all easy.",
  },
  {
    q: "Are children welcome?",
    a: "Very. The 500 tends to be the highlight of a child's trip. Tell us their ages in advance and we'll bring an appropriate child seat or booster.",
  },
  {
    q: "How do we book and pay?",
    a: "Send an enquiry with your preferred date and tour. We confirm availability within 24 hours and then share payment options — no payment is taken on this site.",
  },
];

export const bookingSteps = [
  {
    title: "Tell us your date",
    body: "Pick a tour and a day. Add your hotel if you'd like to be collected.",
  },
  {
    title: "We confirm availability",
    body: "A real person replies within 24 hours, with the exact meeting plan.",
  },
  {
    title: "Meet your 500",
    body: "Roof open, engine warm, route ready. The rest is Rome.",
  },
];

/** Copy for the full-bleed film panel that closes the page above the FAQ. */
export const closingCta = {
  eyebrow: "Your next chapter",
  title: "Ready for your",
  accent: "Roman holiday?",
  body: "Tell us the date. We'll bring the 500, the route and the espresso — you bring the people.",
  cta: "Book Now",
  note: "No payment online · reply within 24h",
};

export const tourOptions = [
  ...tours.map((tour) => ({
    value: tour.id,
    label: tour.name,
    meta: `${tour.hours}h · from €${tour.price}`,
  })),
  { value: "not-sure", label: "Not sure yet", meta: "Advise me" },
];

