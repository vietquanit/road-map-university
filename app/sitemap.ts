import type { MetadataRoute } from "next";

import careerMap from "@/data/vietnam-career-map.json";
import { getGroupSlug, getMajorSlug } from "@/lib/catalogSeo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const groupEntries = (careerMap.groupCatalog ?? []).map((group) => ({
    url: `${siteUrl}/tra-cuu-nhom-nganh/${getGroupSlug(group)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85
  }));

  const majorEntries = (careerMap.groupCatalog ?? []).flatMap((group) =>
    (group.majors ?? []).map((major) => ({
      url: `${siteUrl}/tra-cuu-nhom-nganh/${getGroupSlug(group)}/${getMajorSlug(major)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  );

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: `${siteUrl}/tra-cuu-nhom-nganh`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95
    },
    {
      url: `${siteUrl}/roadmap-graph`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    ...groupEntries,
    ...majorEntries
  ];
}
