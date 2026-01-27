import type { Metadata } from "next";
import "@initia/shared/styles/index.scss";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "Dynamic landing page builder",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
