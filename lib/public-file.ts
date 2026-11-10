import fs from "node:fs";
import path from "node:path";
import { isSupportedImage, isSupportedVideo } from "./media";

/**
 * Build-time check for a file inside /public.
 * Lets the UI swap in an art-directed placeholder until the real
 * photograph is dropped into the folder — no manual flag to flip.
 */
export function publicFileExists(src: string) {
  if (!src.startsWith("/")) return false;
  const filePath = path.join(process.cwd(), "public", src);
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/** A supported /images slot (.jpg/.jpeg/.png/.webp/.gif) that exists on disk. */
export function imageIsAvailable(src: string) {
  return isSupportedImage(src) && publicFileExists(src);
}

/** A supported /videos/hero.mp4 slot that exists on disk. */
export function videoIsAvailable(src: string) {
  return isSupportedVideo(src) && publicFileExists(src);
}
