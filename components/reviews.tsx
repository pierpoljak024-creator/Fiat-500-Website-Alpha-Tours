import { Star } from "lucide-react";
import { reviews } from "@/lib/content";
import { site } from "@/lib/site";
import Reveal from "./reveal";

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative border-y border-brass/25 bg-bone py-20 sm:py-24 lg:py-32"
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-brass" aria-hidden />
              <p className="eyebrow text-[10px] text-brass-dark">
                Guest book
              </p>
            </div>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.6vw,3.1rem)] leading-[1.05] text-charcoal">
              Guests remember
              <span className="block text-red italic">the drive.</span>
            </h2>

            <div className="mt-8 border border-brass/40 bg-cream p-6 sm:p-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="font-display text-5xl leading-none text-charcoal">
                    {site.rating.value}
                  </span>
                  <span className="ml-1.5 text-sm text-charcoal/40">/ 5</span>
                </div>
                <div className="flex gap-0.5" aria-hidden>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="size-3.5 fill-brass text-brass"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              </div>
              <p
                className="sr-only"
                aria-label={`Rated ${site.rating.value} out of 5`}
              >
                {site.rating.value} out of 5
              </p>
              <div className="dot-rule my-4 text-brass" aria-hidden />
              <p className="text-[13px] leading-relaxed text-charcoal/60">
                {site.rating.label} across private tours booked directly with
                Alpha Tours Rome.
              </p>
            </div>

            <ul className="mt-6 space-y-2 text-[9px] font-medium tracking-[0.18em] text-charcoal/45 uppercase">
              <li>Licensed & insured drivers</li>
              <li>English & Italiano</li>
              <li>Private tours for {site.yearsLocal}+ years</li>
            </ul>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {reviews.map((review, index) => (
              <Reveal key={review.author} delay={index * 0.08}>
                <figure className="relative border-l border-brass/50 pl-6 sm:pl-8">
                  <span
                    aria-hidden
                    className="absolute -top-3 left-5 font-display text-5xl leading-none text-brass/50 select-none sm:left-7"
                  >
                    “
                  </span>
                  <blockquote className="pt-2 font-display text-xl leading-[1.45] text-charcoal/85 sm:text-[1.4rem]">
                    {review.quote}
                  </blockquote>
                  <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-medium tracking-[0.2em] text-charcoal/45 uppercase">
                    <span className="text-charcoal/75">{review.author}</span>
                    <span aria-hidden className="text-brass">
                      ·
                    </span>
                    <span>{review.origin}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}

            <p className="border-t border-brass/35 pt-6 text-[10px] tracking-[0.16em] text-charcoal/40 uppercase">
              Reviews shared with permission · names shortened for privacy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
