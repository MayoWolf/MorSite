import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.team1515.com",
      lastModified: new Date("2026-08-19"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.team1515.com/leadership",
      lastModified: new Date("2026-08-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
