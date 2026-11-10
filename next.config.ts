import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // The whole site is prerendered, so it ships as plain HTML/CSS/JS that
  // Netlify serves from `out/` (see netlify.toml). The enquiry endpoint is a
  // Netlify Function instead of a Next.js route handler.
  output: "export",
  // The default image loader needs a running server; images are served from
  // /public as-is instead.
  images: { unoptimized: true },
  // The project lives in a folder with a space in its name; pin the Turbopack
  // root so it never walks up into the home directory.
  turbopack: {
    root: path.resolve("."),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
