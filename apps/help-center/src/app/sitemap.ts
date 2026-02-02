import { MetadataRoute } from "next";

import { getSections } from "@/lib/api/sections";
import { getSubsections } from "@/lib/api/subsections";
import { getArticlesBySubsection } from "@/lib/api/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://help.yourproduct.com";
  const sections = await getSections();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Add all sections
  for (const section of sections) {
    routes.push({
      url: `${baseUrl}/sections/${section.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Add all subsections
    const subsections = await getSubsections(section.id);
    for (const subsection of subsections) {
      routes.push({
        url: `${baseUrl}/sections/${section.slug}/${subsection.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });

      // Add all articles
      const articles = await getArticlesBySubsection(subsection.id);
      for (const article of articles) {
        routes.push({
          url: `${baseUrl}/sections/${section.slug}/${subsection.slug}/${article.slug}`,
          lastModified: new Date(article.updatedAt),
          changeFrequency: "monthly",
          priority: 0.5,
        });
      }
    }
  }

  return routes;
}
