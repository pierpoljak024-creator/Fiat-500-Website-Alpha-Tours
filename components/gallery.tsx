import { ArrowUpRight } from "lucide-react";
import { gallery } from "@/lib/content";
import { site } from "@/lib/site";
import Photo from "./photo";
import Reveal from "./reveal";

const ratios = {
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  tall: "aspect-[2/3]",
} as const;

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-ink py-20 text-cream sm:py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_50%_at_82%_0%,rgba(197,160,89,0.16),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-brass" aria-hidden />
              <p className="eyebrow text-[10px] text-brass-light">
                The gallery
              </p>
            </div>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.03]">
              Eight frames
              <span className="block text-cream/50 italic">from the back seat.</span>
            </h2>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 border-b border-brass/40 pb-1.5 text-[10px] font-medium tracking-[0.2em] text-brass-light uppercase transition-colors hover:border-brass-light hover:text-cream"
          >
            {site.instagramHandle} on Instagram
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
            />
          </a>
        </div>

        <div className="mt-10 columns-2 gap-3 sm:gap-4 lg:mt-14 lg:columns-3">
          {gallery.map((item, index) => (
            <Reveal
              key={item.src}
              delay={(index % 3) * 0.05}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <figure className="group relative overflow-hidden ring-1 ring-cream/10">
                <Photo
                  src={item.src}
                  alt={item.alt}
                  plate={item.plate}
                  caption={item.caption}
                  variant="card"
                  sizes="(min-width: 1024px) 430px, (min-width: 640px) 48vw, 180px"
                  className={`w-full ${ratios[item.ratio]}`}
                  imageClassName="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="eyebrow absolute top-2.5 left-2.5 z-20 bg-ink/55 px-2 py-1 text-[7.5px] text-cream/80 backdrop-blur-sm"
                >
                  {item.plate}
                </span>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-[10px] tracking-[0.16em] text-cream/35 uppercase">
          Every frame shot on a real tour · Rome, roof open
        </p>
      </div>
    </section>
  );
}
