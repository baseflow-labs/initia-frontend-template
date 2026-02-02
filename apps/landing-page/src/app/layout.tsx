import type { Metadata } from "next";

import "@initia/shared/styles/index.scss";
import { Navbar, Footer } from "@/components/layout";
import { landingApi } from "@/lib/api";

export const metadata: Metadata = {
  title: "InnovateHub - AI-Powered Business Platform",
  description: "Transform your business with AI-powered automation and seamless collaboration",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch pages and system metadata for navigation
  const [pages, systemMetadata] = await Promise.all([
    landingApi.getPages(),
    landingApi.getSystemMetadata(),
  ]);

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        <Navbar pages={pages} systemMetadata={systemMetadata} />
        <main style={{ paddingTop: "80px" }}>{children}</main>
        <Footer pages={pages} systemMetadata={systemMetadata} />
      </body>
    </html>
  );
}
