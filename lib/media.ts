/**
 * Media contract for the Fiat 500 Rome site.
 *
 * Every photograph and video is served from /public and referenced by a local
 * path only — never a remote URL, an inline data URI, a base64 blob or an
 * attachment. The file names below are the fixed placeholder slots: drop a
 * real asset in with the same name, rebuild, and the page picks it up.
 *
 * This module is dependency-free on purpose: it is imported by both server and
 * client code, so the disk checks live in lib/public-file.ts.
 */

/** Hero photograph (also used as the hero film poster). */
export const HERO_IMAGE = "/images/hero.jpg";

/** Optional ambient hero film. Rendered only when the file is present. */
export const HERO_VIDEO = "/videos/hero.mp4";

/** Closing call-to-action film, used behind the "Roman holiday" panel. */
export const SECONDARY_VIDEO = "/videos/secondary.mp4";

/** The eight gallery frames, in plate order. */
export const GALLERY_IMAGES = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
  "/images/gallery-7.jpg",
  "/images/gallery-8.jpg",
] as const;

/** File types allowed inside /public (images first, then video). */
export const SUPPORTED_MEDIA_EXTENSIONS = [
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".mp4",
] as const;

const IMAGE_EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg", ".gif"]);
const VIDEO_EXTENSIONS = new Set([".mp4"]);

const IMAGE_DIR = "/images/";
const VIDEO_DIR = "/videos/";

/** True for a root-relative path (no protocol, no traversal). */
export function isLocalMediaPath(src: string) {
  if (!src.startsWith("/") || src.startsWith("//")) return false;
  if (src.includes("..")) return false;
  return !/^(?:data|blob|https?):/i.test(src);
}

function extension(src: string) {
  const clean = src.split(/[?#]/)[0] ?? "";
  const dot = clean.lastIndexOf(".");
  return dot === -1 ? "" : clean.slice(dot).toLowerCase();
}

/** Images must live in /public/images with an allowed extension. */
export function isSupportedImage(src: string) {
  return (
    isLocalMediaPath(src) &&
    src.startsWith(IMAGE_DIR) &&
    IMAGE_EXTENSIONS.has(extension(src))
  );
}

/** Videos must live in /public/videos and be .mp4. */
export function isSupportedVideo(src: string) {
  return (
    isLocalMediaPath(src) &&
    src.startsWith(VIDEO_DIR) &&
    VIDEO_EXTENSIONS.has(extension(src))
  );
}

const warned = new Set<string>();

/** Logs an ignored asset once per build instead of once per render. */
export function warnUnsupportedMedia(src: string) {
  if (warned.has(src)) return;
  warned.add(src);
  console.warn(
    `[media] Skipped "${src}" — unsupported file type. Allowed: ${SUPPORTED_MEDIA_EXTENSIONS.join(" ")}`,
  );
}
