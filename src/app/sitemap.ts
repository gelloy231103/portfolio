import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.8 })),
  ];
}
