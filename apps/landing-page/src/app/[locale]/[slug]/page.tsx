import type { Metadata } from "next";

import SectionRenderer from "@/components/sections/SectionRenderer";
import { landingApi } from "@/lib/api";
import "@initia/shared/styles/index.scss";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate static params for all pages at build time
export async function generateStaticParams() {
  // Fetch available locales from backend (or use defaults)
  const locales = await landingApi.getAvailableLocales();

  // Generate params for each locale/slug combination
  const allParams = await Promise.all(
    locales.map(async (locale) => {
      const slugs = await landingApi.getPageSlugs(locale);
      return slugs.map((slug) => ({
        locale,
        slug,
      }));
    })
  );

  return allParams.flat();
}

// Generate metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
}

export default async function LandingPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const page = await landingApi.getPageBySlug(slug, locale);

  if (!page) {
    return (
      <div className="container py-5 text-center">
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    );
  }

  // Sort sections by order if provided
  const sortedSections = [...page.sections].sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    return orderA - orderB;
  });

  return (
    <main>
      {sortedSections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </main>
  );
}
