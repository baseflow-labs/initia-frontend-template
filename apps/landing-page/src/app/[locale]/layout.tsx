import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer, Navbar } from "@/components/layout";
import ConsentPopup from "@/components/layout/ConsentPopup";
import { landingApi } from "@/lib/api";
import { locales } from "@/i18n/config";
import "@initia/shared/styles/index.scss";
import "@/styles/rtl.css";

// Always SSR — content driven by the backend
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export async function generateMetadata({ params }: RootLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const identity = await landingApi.getSystemMetadata(locale);

  return {
    title: identity.name,
    description: identity.slogan,
    openGraph: {
      title: identity.name,
      description: identity.slogan,
      siteName: identity.name,
      url: identity.websiteUrl,
      images: identity.logoFull ? [identity.logoFull] : identity.logo ? [identity.logo] : undefined,
    },
  };
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  // Fetch messages for the locale
  const messages = await getMessages();

  // Fetch pages and system metadata for navigation (backend returns localized content)
  const [pages, systemMetadata] = await Promise.all([
    landingApi.getPages(locale),
    landingApi.getSystemMetadata(locale),
  ]);

  // Set direction based on locale
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div
            style={{
              ["--theme-primary" as string]: systemMetadata.defaultThemeColor,
              ["--bs-primary" as string]: systemMetadata.defaultThemeColor,
            }}
          >
            <Navbar pages={pages} systemMetadata={systemMetadata} />
            <main>{children}</main>
            <ConsentPopup />
            <Footer pages={pages} systemMetadata={systemMetadata} locale={locale} />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
