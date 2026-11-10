import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, tours } from "@/lib/content";
import { MAP_LINK, fullAddress, site } from "@/lib/site";

// With a static export the footer is rendered once, at build time, so a plain
// call is enough; `"use cache"` belongs to Cache Components, which needs a
// server and is not enabled here.
function currentYear() {
  return new Date().getFullYear();
}

export default function SiteFooter() {
  const year = currentYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_60%_at_8%_0%,rgba(197,160,89,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pt-14 pb-28 sm:px-8 lg:px-12 lg:pt-20 lg:pb-8">
        <div className="grid gap-10 border-b border-cream/12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.72fr_0.83fr_1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-red font-display text-sm text-cream ring-1 ring-brass/40">
                500
              </span>
              <div className="leading-none">
                <span className="block font-display text-lg text-cream">
                  Fiat 500 Tour Rome
                </span>
                <span className="mt-1.5 block text-[7.5px] font-medium tracking-[0.26em] text-brass-light uppercase">
                  Part of Alpha Tours Rome
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-cream/55">
              Private, chauffeured tours of Rome in restored 1960s Fiat 500s.
              Licensed local guides, small car, big city.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 border border-cream/15 px-3 py-2 text-[10px] tracking-[0.14em] text-cream/70 uppercase">
              <span className="text-brass-light">★</span>
              {site.rating.value} guest rating
            </div>

            <ul className="mt-6 space-y-2 text-[10px] font-medium tracking-[0.18em] text-cream/45 uppercase">
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-cream"
                >
                  Instagram
                  <ArrowUpRight className="size-3" strokeWidth={1.8} />
                </a>
              </li>
              <li>
                <a
                  href={site.parentSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-cream"
                >
                  Alpha Tours Rome
                  <ArrowUpRight className="size-3" strokeWidth={1.8} />
                </a>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="text-[13px]">
            <h2 className="text-[9px] font-medium tracking-[0.24em] text-brass-light uppercase">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5 text-cream/60">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#book" className="transition-colors hover:text-cream">
                  Book a tour
                </a>
              </li>
            </ul>
          </nav>

          {/* Tours */}
          <div className="text-[13px]">
            <h2 className="text-[9px] font-medium tracking-[0.24em] text-brass-light uppercase">
              Tours
            </h2>
            <ul className="mt-4 space-y-2.5 text-cream/60">
              {tours.map((tour) => (
                <li key={tour.id}>
                  <a
                    href="#book"
                    className="group flex flex-col transition-colors hover:text-cream"
                  >
                    <span>{tour.name}</span>
                    <span className="text-[9px] tracking-[0.16em] text-cream/30 uppercase">
                      {tour.duration} · from €{tour.price}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-[13px]">
            <h2 className="text-[9px] font-medium tracking-[0.24em] text-brass-light uppercase">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-cream/60">
              {site.hasPhone && (
                <li>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-cream"
                  >
                    <Phone
                      className="size-3.5 shrink-0 text-brass-light"
                      strokeWidth={1.6}
                    />
                    {site.phone}
                  </a>
                </li>
              )}
              {site.hasEmail && (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-cream"
                  >
                    <Mail
                      className="size-3.5 shrink-0 text-brass-light"
                      strokeWidth={1.6}
                    />
                    {site.email}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={MAP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 transition-colors hover:text-cream"
                >
                  <MapPin
                    className="mt-0.5 size-3.5 shrink-0 text-brass-light"
                    strokeWidth={1.6}
                  />
                  {fullAddress}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-[10px] tracking-[0.14em] text-cream/35 uppercase">
              {site.languages}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 text-[9px] tracking-[0.16em] text-cream/35 uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} · Part of {site.parentName}
          </p>
          <p>Made in Roma · Prices in EUR</p>
        </div>
      </div>
    </footer>
  );
}
