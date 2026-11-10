import { faq, gallery, tours } from "./content";
import { imageIsAvailable } from "./public-file";
import { fullAddress, site } from "./site";

/**
 * schema.org graph for the homepage: the local business, one TouristTrip per
 * tour, and the FAQ block. Plain objects so it can be serialised straight
 * into a JSON-LD script tag.
 *
 * TODO(launch): add aggregateRating once the real review count is available.
 */
export function structuredData() {
  const businessId = `${site.url}/#business`;

  // Only advertise photographs that are actually on disk: Google fetches every
  // URL in `image`, so a pending placeholder would be a soft 404.
  const images = gallery
    .filter((item) => imageIsAvailable(item.src))
    .map((item) => `${site.url}${item.src}`);

  const business = {
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": businessId,
    name: site.name,
    legalName: site.parentName,
    description:
      "Private, chauffeured tours of Rome in restored classic Fiat 500s, led by licensed local guides.",
    url: site.url,
    telephone: site.hasPhone ? site.phone : undefined,
    email: site.hasEmail ? site.email : undefined,
    ...(images.length > 0 ? { image: images } : {}),
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "City", name: "Roma" },
    sameAs: [site.instagram, site.parentSite],
    parentOrganization: {
      "@type": "Organization",
      name: site.parentName,
      url: site.parentSite,
    },
  };

  const trips = tours.map((tour) => ({
    "@type": "TouristTrip",
    "@id": `${site.url}/#${tour.id}`,
    name: `${tour.name} — private Fiat 500 tour of Rome`,
    description: tour.description,
    ...(imageIsAvailable(tour.image) ? { image: `${site.url}${tour.image}` } : {}),
    touristType: ["Couples", "Families", "Small groups"],
    provider: { "@id": businessId },
    itinerary: {
      "@type": "ItemList",
      numberOfItems: tour.highlights.length,
      itemListElement: tour.highlights.map((highlight, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: highlight,
      })),
    },
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${site.url}/#book`,
      description: `${tour.duration}, ${tour.capacity}, private chauffeur-guide.`,
      areaServed: fullAddress,
    },
  }));

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${site.url}/#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [business, ...trips, faqPage],
  };
}
