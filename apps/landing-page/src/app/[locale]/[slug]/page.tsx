import type { Metadata } from "next";

import SectionRenderer from "@/components/sections/SectionRenderer";
import { landingApi } from "@/lib/api";
import "@initia/shared/styles/index.scss";

// Always fetch fresh from the API — no static caching so admin edits reflect immediately.
export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate metadata for each page
export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug, locale } = await params;
  const page = await landingApi.getPageBySlug(slug, locale);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.metadata.title || page.title,
    description: page.metadata.description,
    keywords: page.metadata.keywords,
    openGraph: {
      title: page.metadata.ogTitle || page.metadata.title || page.title,
      description: page.metadata.ogDescription || page.metadata.description,
      images: page.metadata.ogImage ? [page.metadata.ogImage] : [],
    },
  };
};

const LandingPage = async ({ params }: PageProps) => {
  const { slug, locale } = await params;
  const [page, systemMetadata] = await Promise.all([
    landingApi.getPageBySlug(slug, locale),
    landingApi.getSystemMetadata(locale),
  ]);

  if (!page) {
    return (
      <div className="container py-5 text-center">
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  // Sort sections by order
  const sortedSections = [...page.sections].sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    return orderA - orderB;
  });

  return (
    <main>
      {sortedSections.map((section) => (
        <SectionRenderer key={section.id} section={section} systemMetadata={systemMetadata} />
      ))}
    </main>
  );
};

export default LandingPage;
