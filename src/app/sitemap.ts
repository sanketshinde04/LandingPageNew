import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { proofStories } from "@/lib/proofContent";

export default function sitemap(): MetadataRoute.Sitemap {
  const storyUrls: MetadataRoute.Sitemap = Object.keys(proofStories).map(
    (slug) => ({
      url: `${siteConfig.url}/proof/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/proof`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...storyUrls,
    {
      url: `${siteConfig.url}/audit`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];
}
