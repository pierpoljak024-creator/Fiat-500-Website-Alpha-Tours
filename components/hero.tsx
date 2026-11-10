import { ArrowUpRight, Star } from "lucide-react";
import { bookHref, bookLinkProps, site } from "@/lib/site";
import HeroMedia from "./hero-media";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pt-24 pb-14 sm:pt-28 lg:pt-32 lg:pb-24"
    >
      <div className="paper-glow pointer-events-none absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/50 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 xl:gap-20">
          {/* Copy */}
          <div>
            <div className="rise flex items-center gap-3">
              <span className="h-px w-8 bg-brass" aria-hidden />
              <p className="eyebrow text-brass-dark">
                Private chauffeured tours · Roma
              </p>
            </div>

            <h1 className="rise rise-1 mt-5 font-display text-[clamp(2.6rem,8.4vw,5.2rem)] leading-[0.95] text-balance text-charcoal">
              Rome, Reimagined.
              <span className="mt-1 block text-red italic">
                In a Classic Fiat 500.
              </span>
            </h1>

            <p className="rise rise-2 mt-6 max-w-xl text-[15px] leading-relaxed text-charcoal/70 sm:text-base">
              A restored 1960s Fiat 500, a licensed Roman driver-guide, and a
              route built around you. No queues, no crowds — just the city at
              roof-open speed, from the Colosseum to the back lanes of
              Trastevere.
            </p>

            <div className="rise rise-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={bookHref}
                {...bookLinkProps}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-red px-7 py-4 text-[11px] font-medium tracking-[0.2em] text-cream uppercase transition-colors hover:bg-red-deep"
              >
                Book your private tour
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </a>
              <a
                href="#tours"
                className="inline-flex items-center justify-center rounded-full border border-charcoal/20 px-7 py-4 text-[11px] font-medium tracking-[0.2em] text-charcoal uppercase transition-colors hover:border-charcoal/50 hover:bg-bone"
              >
                See the two tours
              </a>
            </div>

            <p className="rise rise-3 mt-4 text-[10px] font-medium tracking-[0.16em] text-charcoal/45 uppercase">
              Private · up to 4 guests · from €130
            </p>

            <div className="rise rise-4 mt-8 border-t border-brass/35 pt-5">
              <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-[10px] font-medium tracking-[0.16em] text-charcoal/70 uppercase">
                <li className="flex items-center gap-1.5">
                  <Star
                    className="size-3.5 fill-brass text-brass"
                    strokeWidth={0}
                    aria-hidden
                  />
                  <span aria-label={`${site.rating.value} guest rating`}>
                    {site.rating.value}
                  </span>
                </li>
                <li aria-hidden className="text-brass">
                  ·
                </li>
                <li>Licensed Guides</li>
                <li aria-hidden className="text-brass">
                  ·
                </li>
                <li>{site.yearsLocal}+ Years Local</li>
              </ul>
            </div>
          </div>

          {/* Photograph */}
          <div className="relative lg:pl-4">
            <span
              aria-hidden
              className="eyebrow absolute top-1/2 -right-8 hidden -translate-y-1/2 text-[8px] text-charcoal/30 [writing-mode:vertical-rl] xl:block"
            >
              Cinquecento · Roma · 1968
            </span>

            <div className="arch relative border border-brass/45 bg-cream p-2 sm:p-2.5">
              <HeroMedia />
            </div>

            <div className="absolute -top-4 -right-2 z-10 hidden size-20 rotate-6 flex-col items-center justify-center rounded-full border border-brass/60 bg-cream text-center shadow-[0_18px_40px_-32px_rgba(30,27,24,0.9)] sm:flex lg:-right-4 lg:size-24">
              <span className="font-display text-2xl leading-none text-red lg:text-3xl">
                500
              </span>
              <span className="mt-1 text-[7px] tracking-[0.3em] text-brass-dark uppercase">
                Roma
              </span>
            </div>

            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3 border border-brass/40 bg-cream/95 px-4 py-3 shadow-[0_22px_45px_-34px_rgba(30,27,24,0.85)] backdrop-blur-sm sm:-bottom-6 sm:left-6">
              <div>
                <span className="eyebrow block text-[8px] text-brass-dark">
                  From
                </span>
                <span className="font-display text-2xl leading-none text-charcoal">
                  €130
                </span>
              </div>
              <div className="h-8 w-px bg-brass/40" aria-hidden />
              <div className="text-[10px] leading-snug text-charcoal/60">
                <span className="block">per tour</span>
                <span className="block">2 hours · 2–4 guests</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
