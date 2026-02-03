"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface LanguageSwitcherProps {
  variant?: "button" | "dropdown";
  className?: string;
}

export function LandingLanguageSwitcher({
  variant = "button",
  className = "",
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const switchLanguage = (newLocale: string) => {
    // Extract the path without the locale prefix
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    // Navigate to the same path with the new locale
    router.push(`/${newLocale}${pathWithoutLocale || ""}`);
  };

  if (variant === "dropdown") {
    return (
      <div className={`flex gap-2 ${className}`}>
        <button
          onClick={() => switchLanguage("en")}
          className={`px-3 py-2 rounded transition-colors ${
            currentLocale === "en"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => switchLanguage("ar")}
          className={`px-3 py-2 rounded transition-colors ${
            currentLocale === "ar"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          العربية
        </button>
      </div>
    );
  }

  // Button variant (default)
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={() => switchLanguage("en")}
        className={`px-3 py-2 rounded transition-colors ${
          currentLocale === "en"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage("ar")}
        className={`px-3 py-2 rounded transition-colors ${
          currentLocale === "ar"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        العربية
      </button>
    </div>
  );
}
