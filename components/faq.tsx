import { MessageCircle } from "lucide-react";
import { faq } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";

export default function Faq() {
  return (
    <section
      id="faq"
      className="relative border-t border-brass/25 bg-bone py-20 sm:py-24 lg:py-32"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-brass" aria-hidden />
              <p className="eyebrow text-[10px] text-brass-dark">
                Before you book
              </p>
            </div>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.05] text-charcoal">
              Good questions,
              <span className="block text-red italic">honest answers.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal/60">
              Anything else on your mind? Message us directly — you&apos;ll be
              talking to the people who actually drive the tours.
            </p>
            {site.hasWhatsapp ? (
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-3 text-[10px] font-medium tracking-[0.18em] text-charcoal uppercase transition-colors hover:border-charcoal/50 hover:bg-cream"
              >
                <MessageCircle className="size-3.5" strokeWidth={1.6} />
                Ask on WhatsApp
              </a>
            ) : (
              site.hasEmail && (
                <a
                  href={`mailto:${site.email}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-5 py-3 text-[10px] font-medium tracking-[0.18em] text-charcoal uppercase transition-colors hover:border-charcoal/50 hover:bg-cream"
                >
                  <MessageCircle className="size-3.5" strokeWidth={1.6} />
                  Email us
                </a>
              )
            )}
          </div>

          <div className="border-t border-charcoal/12">
            {faq.map((item, index) => (
              <details
                key={item.q}
                className="group border-b border-charcoal/12"
                name="faq"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 transition-colors hover:text-red [&::-webkit-details-marker]:hidden">
                  <span className="flex items-baseline gap-4">
                    <span className="shrink-0 font-display text-[11px] text-brass-dark">
                      0{index + 1}
                    </span>
                    <span className="text-[15px] leading-snug font-medium text-charcoal transition-colors group-hover:text-red sm:text-base">
                      {item.q}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="relative mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-charcoal/15 transition-colors group-hover:border-red/40"
                  >
                    <span className="absolute h-px w-2.5 bg-charcoal/60 transition-colors group-hover:bg-red" />
                    <span className="absolute h-2.5 w-px bg-charcoal/60 transition-all duration-300 group-hover:bg-red group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-xl pr-8 pb-6 pl-8 text-[13.5px] leading-relaxed text-charcoal/62 sm:text-sm">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
