import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://help.yourproduct.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
};

export default robots;
