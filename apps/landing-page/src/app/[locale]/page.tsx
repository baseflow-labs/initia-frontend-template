import { redirect } from "next/navigation";

import { landingApi } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Get all pages and redirect to the first one (typically 'home')
  const pages = await landingApi.getPages(locale);

  if (pages.length > 0) {
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
