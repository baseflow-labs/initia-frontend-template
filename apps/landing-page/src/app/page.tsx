import { redirect } from "next/navigation";

import { landingApi } from "@/lib/api";

export default async function HomePage() {
  // Get all pages and redirect to the first one (typically 'home')
  const pages = await landingApi.getPages();

  if (pages.length > 0) {
    // Redirect to the first page, or look for a page with slug 'home'
    const homePage = pages.find((p) => p.slug === "home") || pages[0];
    redirect(`/${homePage.slug}`);
  }

  return (
    <div className="container py-5 text-center">
      <h1>Welcome</h1>
      <p>No pages configured yet.</p>
    </div>
  );
}
