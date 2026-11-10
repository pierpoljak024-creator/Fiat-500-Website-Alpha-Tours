import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { bookingSteps } from "@/lib/content";
import { MAP_LINK, fullAddress, site, whatsappLink } from "@/lib/site";
import BookingForm from "./booking-form";

export default function Booking() {
  return (
    <section id="book" className="relative bg-cream py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid overflow-hidden border border-brass/35 lg:grid-cols-[0.86fr_1.14fr]">
          {/* Editorial / contact panel */}
          <div className="relative overflow-hidden bg-ink p-7 text-cream sm:p-10 lg:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_15%_0%,rgba(197,160,89,0.2),transparent_70%)]"
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-brass" aria-hidden />
                <p className="eyebrow text-[10px] text-brass-light">Booking</p>
              </div>
              <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3rem)] leading-[1.04]">
                Reserve your
                <span className="block text-brass-light italic">500.</span>
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/65">
                Tell us the date and the tour. A real person from Alpha Tours
                Rome replies within 24 hours — usually much sooner.
              </p>

              <ol className="mt-8 space-y-5">
                {bookingSteps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-brass/45 font-display text-[11px] text-brass-light">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-[13px] font-medium tracking-[0.04em] text-cream">
                        {step.title}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-cream/55">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-cream/15 pt-6">
                {site.hasWhatsapp && (
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-[10px] font-medium tracking-[0.2em] text-ink uppercase transition-colors hover:bg-brass-light sm:w-auto"
                  >
                    <MessageCircle className="size-4" strokeWidth={1.6} />
                    WhatsApp a real person
                  </a>
                )}

                <ul className="mt-6 space-y-2.5 text-[12px] text-cream/60">
                  {site.hasPhone && (
                    <li>
                      <a
                        href={`tel:${site.phoneHref}`}
                        className="inline-flex items-center gap-2.5 transition-colors hover:text-cream"
                      >
                        <Phone className="size-3.5 text-brass-light" strokeWidth={1.6} />
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
                        <Mail className="size-3.5 text-brass-light" strokeWidth={1.6} />
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
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="relative bg-bone p-7 sm:p-10 lg:p-12">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
