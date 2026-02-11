import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",

  // Always show the locale prefix
  localePrefix: "always",
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /favicon.ico, /robots.txt, etc. (static files)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
