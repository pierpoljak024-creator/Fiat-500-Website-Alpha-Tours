import { Check } from "lucide-react";
import type { Tour } from "@/lib/content";
import BookTourButton from "./book-tour-button";
import Photo from "./photo";

export default function TourCard({ tour, index }: { tour: Tour; index: number }) {
  const featured = Boolean(tour.featured);

  return (
    <article
      className={
        featured
          ? "flex h-full flex-col border border-brass/35 bg-ink text-cream"
          : "flex h-full flex-col border border-charcoal/12 bg-cream text-charcoal"
      }
    >
      <div className="relative">
        <Photo
          src={tour.image}
          alt={`${tour.name} — classic Fiat 500 private tour of Rome`}
          plate={`Tour 0${index + 1}`}
          caption={tour.summary}
          variant="card"
          sizes="(min-width: 768px) 46vw, 100vw"
          className="aspect-[16/10] w-full"
        />
        <span
          className={
            featured
              ? "absolute top-4 left-4 bg-brass px-3 py-1.5 text-[8px] font-medium tracking-[0.24em] text-ink uppercase"
              : "absolute top-4 left-4 bg-cream/95 px-3 py-1.5 text-[8px] font-medium tracking-[0.24em] text-charcoal uppercase"
          }
        >
          {tour.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl leading-tight sm:text-[1.75rem]">
              {tour.name}
            </h3>
            <p
              className={
                featured
                  ? "mt-2 text-[9px] font-medium tracking-[0.2em] text-brass-light uppercase"
                  : "mt-2 text-[9px] font-medium tracking-[0.2em] text-brass-dark uppercase"
              }
            >
              {tour.duration} · {tour.capacity} · private
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span
              className={
                featured
                  ? "block text-[8px] tracking-[0.24em] text-cream/45 uppercase"
                  : "block text-[8px] tracking-[0.24em] text-charcoal/40 uppercase"
              }
            >
              From
            </span>
            <span className="font-display text-3xl leading-none">
              €{tour.price}
            </span>
          </div>
        </div>

        <p
          className={
            featured
              ? "mt-4 font-display text-lg leading-snug text-cream/85 italic"
              : "mt-4 font-display text-lg leading-snug text-charcoal/80 italic"
          }
        >
          {tour.summary}
        </p>
        <p
          className={
            featured
              ? "mt-3 text-sm leading-relaxed text-cream/60"
              : "mt-3 text-sm leading-relaxed text-charcoal/65"
          }
        >
          {tour.description}
        </p>

        <div
          aria-hidden
          className={
            featured ? "dot-rule my-6 text-brass/60" : "dot-rule my-6 text-brass"
          }
        />

        <ul className="space-y-2.5">
          {tour.highlights.map((highlight) => (
            <li
              key={highlight}
              className={
                featured
                  ? "flex gap-2.5 text-[13px] leading-snug text-cream/75"
                  : "flex gap-2.5 text-[13px] leading-snug text-charcoal/70"
              }
            >
              <Check
                className={
                  featured
                    ? "mt-0.5 size-3.5 shrink-0 text-brass-light"
                    : "mt-0.5 size-3.5 shrink-0 text-red"
                }
                strokeWidth={2}
              />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <BookTourButton
            tourId={tour.id}
            variant={featured ? "light" : "solid"}
            className="w-full"
          >
            {tour.cta}
          </BookTourButton>
          <p
            className={
              featured
                ? "mt-3 text-center text-[9px] tracking-[0.14em] text-cream/35 uppercase"
                : "mt-3 text-center text-[9px] tracking-[0.14em] text-charcoal/40 uppercase"
            }
          >
            Free cancellation · no payment online
          </p>
        </div>
      </div>
    </article>
  );
}
