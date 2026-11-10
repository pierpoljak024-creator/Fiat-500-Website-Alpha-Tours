import { cn } from "@/lib/cn";

type Variant = "hero" | "frame" | "card";

/**
 * Art-directed stand-in shown until a real photograph is dropped into
 * /public/images. Warm paper, brass rules and a typographic "500" plate, so
 * the page reads as designed even before the shoot lands.
 */
export default function PhotoPlaceholder({
  plate,
  caption,
  variant = "frame",
  className,
}: {
  plate: string;
  caption: string;
  variant?: Variant;
  className?: string;
}) {
  const isHero = variant === "hero";

  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden bg-sand", className)}
    >
      <div className="absolute inset-0 bg-[linear-gradient(155deg,#F2E7D6_0%,#E6D5B9_46%,#D5BC93_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(72%_58%_at_16%_90%,rgba(200,50,50,0.30),transparent_64%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(64%_52%_at_88%_6%,rgba(253,251,247,0.8),transparent_62%)]" />

      {/* Roman arch outline */}
      <div
        className={cn(
          "arch absolute bottom-0 left-1/2 w-[72%] -translate-x-1/2 border border-ink/15",
          isHero ? "h-[84%]" : "h-[78%]",
        )}
      />
      <div
        className={cn(
          "arch absolute bottom-0 left-1/2 w-[56%] -translate-x-1/2 border border-brass/40",
          isHero ? "h-[70%]" : "h-[64%]",
        )}
      />

      {/* Roundel */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 text-center">
        <span
          className={cn(
            "grid place-items-center rounded-full border border-ink/25 font-display text-ink/55",
            isHero ? "size-20 text-2xl sm:size-24 sm:text-3xl" : "size-14 text-lg",
          )}
        >
          500
        </span>
        <span className="eyebrow text-[8px] text-ink/40">Roma · Cinquecento</span>
      </div>

      {/* Plate + caption */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-3 sm:p-4">
        <div className="min-w-0">
          <span className="eyebrow block text-[8px] text-ink/55">{plate}</span>
          <p className="mt-1 truncate font-display text-xs text-ink/70 italic sm:text-sm">
            {caption}
          </p>
        </div>
        <span className="eyebrow shrink-0 text-[7px] text-ink/35">
          Photo coming soon
        </span>
      </div>

      <div className="pointer-events-none absolute inset-[7px] border border-cream/45" />
    </div>
  );
}
