/**
 * Single source of truth for contact details and business facts.
 *
 * Phone, email and WhatsApp come from environment variables (see .env.local),
 * so they can be changed on the host without touching code. There are no dummy
 * fallbacks: while a value is missing — or still contains the CHANGE_ME
 * placeholder — the matching UI is hidden and WhatsApp links fall back to the
 * on-page enquiry form.
 */

const PLACEHOLDER = /change[_\s-]?me/i;

function env(value: string | undefined, fallback = "") {
  const trimmed = value?.trim();
  if (!trimmed || PLACEHOLDER.test(trimmed)) return fallback;
  return trimmed;
}

const phone = env(process.env.NEXT_PUBLIC_PHONE);
// Digits only, including the country code (e.g. 393331234567).
const whatsapp = env(process.env.NEXT_PUBLIC_WHATSAPP).replace(/\D/g, "");
const email = env(process.env.NEXT_PUBLIC_EMAIL);
// External booking engine (FareHarbor, Airbnb, etc.); defaults to the form.
const bookingUrl = env(process.env.NEXT_PUBLIC_BOOKING_URL, "#book");

export const site = {
  /** Marketing name used in the UI and metadata. */
  name: "Fiat 500 Tour Rome",
  /** Parent brand shown in the footer badge and in structured data. */
  parentName: "Alpha Tours Rome",
  tagline: "Private chauffeured Fiat 500 tours of Rome",

  url: env(process.env.NEXT_PUBLIC_SITE_URL, "https://alphatoursrome.com"),

  /** Empty until NEXT_PUBLIC_EMAIL is set; the UI hides the row meanwhile. */
  email,
  phone,
  phoneHref: phone.replace(/[^\d+]/g, ""),
  whatsapp,
  /** True only once the matching .env.local value has been filled in. */
  hasPhone: phone.length > 0,
  hasEmail: email.length > 0,
  hasWhatsapp: whatsapp.length >= 8,

  /** "#book" keeps visitors on the page until a real booking link is added. */
  bookingUrl,
  bookingIsExternal: /^https?:\/\//.test(bookingUrl),

  address: {
    street: "Via dell'Impruneta 27",
    postalCode: "00146",
    city: "Roma",
    region: "RM",
    country: "IT",
    countryName: "Italia",
  },

  // TODO(launch): confirm the social profiles before going live.
  instagram: "https://www.instagram.com/alphatours.rome",
  instagramHandle: "@alphatours.rome",
  /**
   * The parent Alpha Tours Rome site. Its custom domain now points here, so the
   * older site lives on its Netlify subdomain — keep this link on that URL.
   */
  parentSite: "https://alphatoursrome.netlify.app",

  rating: {
    value: "4.94",
    label: "Guest rating",
  },

  yearsLocal: 20,
  languages: "English · Italiano",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}, ${site.address.countryName}`;

export const MAP_QUERY = encodeURIComponent(`${fullAddress}, ${site.address.country}`);
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Ciao Alpha Tours! I'd like to check availability for the private Fiat 500 tour in Rome.";

/**
 * Where a "Book Now" button should go. Falls back to the on-page enquiry
 * form until NEXT_PUBLIC_BOOKING_URL is configured.
 */
export const bookHref = site.bookingUrl || "#book";

export const bookLinkProps = site.bookingIsExternal
  ? { target: "_blank" as const, rel: "noopener noreferrer" }
  : {};

/** Pre-filled WhatsApp deep link; the form until a number is configured. */
export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  if (!site.hasWhatsapp) return bookHref;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
