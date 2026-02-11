import { redirect } from "next/navigation";

import { landingApi } from "@/lib/api";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate static params for locale routes
export async function generateStaticParams() {
  const locales = await landingApi.getAvailableLocales();
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Get all pages and redirect to the first one (typically 'home')
  const pages = await landingApi.getPages(locale);

  if (pages.length > 0) {
    // Redirect to the first page, or look for a page with slug 'home'
    const homePage = pages.find((p) => p.slug === "home") || pages[0];
    redirect(`/${locale}/${homePage.slug}`);
  }

  return (
    <div className="container py-5 text-center">
      <h1>Welcome</h1>
      <p>No pages configured yet.</p>
    </div>
  );
}
