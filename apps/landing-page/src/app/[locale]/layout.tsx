import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer, Navbar } from "@/components/layout";
import { landingApi } from "@/lib/api";
import { locales } from "@/i18n/config";
import "@initia/shared/styles/index.scss";
import "@/styles/rtl.css";

export const metadata: Metadata = {
  title: "InnovateHub - AI-Powered Business Platform",
  description: "Transform your business with AI-powered automation and seamless collaboration",
};

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
  if (!locales.includes(locale as any)) {
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
          <Navbar pages={pages} systemMetadata={systemMetadata} />
          <main style={{ paddingTop: "80px" }}>{children}</main>
          <Footer pages={pages} systemMetadata={systemMetadata} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
