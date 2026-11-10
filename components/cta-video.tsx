import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { closingCta } from "@/lib/content";
import { GALLERY_IMAGES, SECONDARY_VIDEO } from "@/lib/media";
import { videoIsAvailable } from "@/lib/public-file";
import { bookHref, bookLinkProps } from "@/lib/site";

/**
 * Full-bleed closing panel: /videos/secondary.mp4 behind a dark overlay, with
 * a single, centred booking CTA. The still frame underneath means the section
 * still looks composed when the film is missing or motion is reduced (the
 * `<Image>` doubles as the poster, so the film needs no poster attribute).
 */
export default function CtaVideo() {
  const hasFilm = videoIsAvailable(SECONDARY_VIDEO);
  const poster = GALLERY_IMAGES[1];

  return (
    <section
      id="ready"
      aria-labelledby="ready-title"
      className="relative isolate overflow-hidden bg-ink text-cream"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={poster}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />

        {hasFilm && (
          <video
            className="absolute inset-0 size-full object-cover motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
            disablePictureInPicture
          >
            <source src={SECONDARY_VIDEO} type="video/mp4" />
          </video>
        )}

        {/* Dark wash keeps the copy legible over any frame. */}
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/80" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_45%,transparent_0%,rgba(30,27,24,0.52)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[62svh] w-full max-w-[1400px] flex-col items-center justify-center px-5 py-20 text-center sm:px-8 sm:py-24 lg:min-h-[70svh] lg:py-28">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-brass" aria-hidden />
          <p className="eyebrow text-[10px] text-brass-light">
            {closingCta.eyebrow}
          </p>
          <span className="h-px w-8 bg-brass" aria-hidden />
        </div>

        <h2
          id="ready-title"
          className="mt-6 font-display text-[clamp(2.4rem,7vw,4.6rem)] leading-[0.98] text-balance text-cream"
        >
          {closingCta.title}
          <span className="mt-2 block text-brass-light italic">
            {closingCta.accent}
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-[14px] leading-relaxed text-cream/80 sm:text-base">
          {closingCta.body}
        </p>

        <div className="mt-9">
          <a
            href={bookHref}
            {...bookLinkProps}
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-red px-8 py-4 text-[11px] font-medium tracking-[0.2em] text-cream uppercase transition-colors hover:bg-red-deep"
          >
            {closingCta.cta}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
            />
          </a>
        </div>

        <p className="mt-5 text-[9px] tracking-[0.18em] text-cream/55 uppercase">
          {closingCta.note}
        </p>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent"
      />
    </section>
  );
}
