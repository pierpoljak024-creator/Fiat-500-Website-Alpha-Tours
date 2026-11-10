import { tours } from "@/lib/content";
import Reveal from "./reveal";
import TourCard from "./tour-card";

export default function Tours() {
  return (
    <section id="tours" className="relative bg-cream py-20 sm:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brass" aria-hidden />
            <p className="eyebrow text-[10px] text-brass-dark">
              Two ways to see Rome
            </p>
          </div>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.03] text-charcoal">
            Choose your route.
            <span className="block text-charcoal/45 italic">
              Either way, the car is yours.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-charcoal/65">
            Both tours are private, chauffeured and shaped around your party.
            Prices are per car — not per person — and include your licensed
            driver-guide.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:mt-14 lg:gap-8">
          {tours.map((tour, index) => (
            <Reveal key={tour.id} delay={index * 0.08} className="h-full">
              <TourCard tour={tour} index={index} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] tracking-[0.14em] text-charcoal/40 uppercase">
          <span>Free cancellation up to 24h</span>
          <span aria-hidden className="text-brass">
            ·
          </span>
          <span>No payment taken online</span>
          <span aria-hidden className="text-brass">
            ·
          </span>
          <span>Reply within 24 hours</span>
        </p>
      </div>
    </section>
  );
}
