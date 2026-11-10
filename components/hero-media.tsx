import { HERO_IMAGE, HERO_VIDEO } from "@/lib/media";
import { videoIsAvailable } from "@/lib/public-file";
import Photo from "./photo";

/**
 * The hero portrait: /images/hero.jpg plus, once it exists, the ambient
 * /videos/hero.mp4 film laid over the top. Both fall back to the designed
 * paper placeholder while the real shoot is pending, so the arch frame is
 * never empty and the page never requests an asset that isn't there.
 *
 * The film has no `poster`: the `<Photo>` underneath is already the same
 * frame at the right size, so a poster would only duplicate that download.
 */
export default function HeroMedia() {
  const hasFilm = videoIsAvailable(HERO_VIDEO);

  return (
    <div className="relative arch aspect-[4/5] w-full overflow-hidden bg-sand sm:aspect-[5/4] lg:aspect-[4/4.8]">
      <Photo
        src={HERO_IMAGE}
        alt="Couple laughing inside a red classic Fiat 500 above the rooftops of Rome at golden hour"
        plate="Plate 01"
        caption="Roof open, heading for the Aventine."
        variant="hero"
        eager
        sizes="(min-width: 1024px) 46vw, 100vw"
        className="size-full"
      />

      {hasFilm && (
        <>
          <video
            className="absolute inset-0 size-full object-cover motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            tabIndex={-1}
            disablePictureInPicture
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-ink/0 to-ink/5 motion-reduce:hidden"
          />
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 border border-cream/25 bg-ink/60 px-2.5 py-1.5 text-[7.5px] font-medium tracking-[0.24em] text-cream/85 uppercase backdrop-blur-sm motion-reduce:hidden">
            <span className="size-1.5 rounded-full bg-red" aria-hidden />
            In movimento · Roma
          </span>
        </>
      )}
    </div>
  );
}
