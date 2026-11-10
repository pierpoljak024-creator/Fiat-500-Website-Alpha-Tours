import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// `output: "export"` needs metadata routes marked static explicitly.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
