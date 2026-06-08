import type { Metadata } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { I18nProvider } from "@/providers/I18nProvider";
import { getSystemIdentity } from "@/lib/api/identity";
import "./globals.css";
import "@/styles/rtl.css";

export const generateMetadata = async (): Promise<Metadata> => {
  const identity = await getSystemIdentity();

  return {
    title: {
      default: `Help Center | ${identity.name}`,
      template: `%s | ${identity.name}`,
    },
    description: identity.slogan || "Find answers and support for all your questions",
    keywords: ["help", "support", "documentation", "guides", "tutorials"],
    authors: [{ name: identity.name }],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: identity.websiteUrl || "https://help.yourproduct.com",
      siteName: `${identity.name} Help Center`,
      title: `${identity.name} Help Center`,
      description: identity.slogan || "Find answers and support for all your questions",
      images: identity.logoFull ? [identity.logoFull] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${identity.name} Help Center`,
      description: identity.slogan || "Find answers and support for all your questions",
      images: identity.logoFull ? [identity.logoFull] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const identity = await getSystemIdentity();

  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ ["--theme-primary" as string]: identity.defaultThemeColor }}>
        <I18nProvider>
          <div className="flex min-h-screen flex-col">
            <Header identity={identity} />
            <main className="flex-1">{children}</main>
            <Footer identity={identity} />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
