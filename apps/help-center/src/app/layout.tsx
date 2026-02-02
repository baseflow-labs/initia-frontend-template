import type { Metadata } from "next";

import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Help Center | Your Product Name",
    template: "%s | Help Center",
  },
  description: "Find answers and support for all your questions",
  keywords: ["help", "support", "documentation", "guides", "tutorials"],
  authors: [{ name: "Your Company" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://help.yourproduct.com",
    siteName: "Help Center",
    title: "Help Center",
    description: "Find answers and support for all your questions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Center",
    description: "Find answers and support for all your questions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
