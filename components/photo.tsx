import Image from "next/image";
import { cn } from "@/lib/cn";
import { isSupportedImage, warnUnsupportedMedia } from "@/lib/media";
import { publicFileExists } from "@/lib/public-file";
import PhotoPlaceholder from "./photo-placeholder";

type PhotoProps = {
  src: string;
  alt: string;
  plate: string;
  caption: string;
  className?: string;
  sizes?: string;
  /**
   * Above-the-fold art: starts loading immediately. The `<link rel=preload>`
   * route (`preload`/`priority`) stays off — its candidate width is resolved
   * before layout can settle and can disagree with the width the `<img>`
   * actually paints, which costs a second download plus a console warning.
   */
  eager?: boolean;
  variant?: "hero" | "frame" | "card";
  imageClassName?: string;
};

/**
 * Renders the photograph from /public when it exists, otherwise a designed
 * CSS placeholder. Adding a file with the same name is all it takes to swap
 * it in — no code change, just a rebuild.
 */
export default function Photo({
  src,
  alt,
  plate,
  caption,
  className,
  sizes = "100vw",
  eager = false,
  variant = "frame",
  imageClassName,
}: PhotoProps) {
  const available = isSupportedImage(src);
  if (!available) warnUnsupportedMedia(src);
  const showImage = available && publicFileExists(src);

  return (
    <div className={cn("relative isolate overflow-hidden bg-sand", className)}>
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={eager ? "eager" : undefined}
          // Next emits a `<link rel=preload as=image>` for eager art, but its
          // candidate width is resolved from `sizes` before layout and can
          // disagree with the width the `<img>` actually paints (extra download
          // + "preloaded but not used" warning). The hero sits in the first
          // viewport anyway, so eager fetching alone is enough.
          preload={false}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <PhotoPlaceholder plate={plate} caption={caption} variant={variant} />
      )}
    </div>
  );
}
