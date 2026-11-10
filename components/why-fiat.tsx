import { Camera, Car, Map, Users } from "lucide-react";
import { valueProps } from "@/lib/content";
import Reveal from "./reveal";

const icons = {
  chauffeur: Car,
  route: Map,
  camera: Camera,
  private: Users,
} as const;

export default function WhyFiat() {
  return (
    <section
      id="why"
      className="relative overflow-hidden border-y border-brass/25 bg-bone py-20 sm:py-24 lg:py-32"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-brass" aria-hidden />
              <p className="eyebrow text-[10px] text-brass-dark">
                Why a Fiat 500
              </p>
            </div>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.05] text-charcoal">
              Not a bus. Not a queue.
              <span className="block text-red italic">
                A little red time machine.
              </span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-charcoal/65">
              Rome rewards the slow route. In a 1960s Cinquecento you trade the
              coach park for back lanes, the audio guide for a Roman who has
              driven these streets for twenty years. Small car, big city,
              entirely your own pace.
            </p>
            <a
              href="#tours"
              className="group mt-7 inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.22em] text-charcoal uppercase"
            >
              <span className="border-b border-red/50 pb-1 transition-colors group-hover:border-red">
                Choose your route
              </span>
              <span aria-hidden className="text-red">
                →
              </span>
            </a>
          </div>

          <ul className="grid gap-px border border-brass/30 bg-brass/30 sm:grid-cols-2">
            {valueProps.map((prop, index) => {
              const Icon = icons[prop.icon];
              return (
                <li key={prop.title} className="bg-cream">
                  <Reveal delay={index * 0.06} className="h-full">
                    <div className="flex h-full flex-col p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid size-10 place-items-center rounded-full border border-red/20 bg-red/5 text-red">
                          <Icon className="size-4.5" strokeWidth={1.4} />
                        </span>
                        <span className="font-display text-lg text-brass/70">
                          0{index + 1}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-xl leading-snug text-charcoal">
                        {prop.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-charcoal/62">
                        {prop.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-brass/35 pt-5 text-[9px] font-medium tracking-[0.2em] text-charcoal/45 uppercase">
          <span>Chauffeur-driven</span>
          <span aria-hidden className="text-brass">
            ·
          </span>
          <span>Licensed & insured</span>
          <span aria-hidden className="text-brass">
            ·
          </span>
          <span>English & Italiano</span>
          <span aria-hidden className="text-brass">
            ·
          </span>
          <span>Hotel pickup on request</span>
        </div>
      </div>
    </section>
  );
}
