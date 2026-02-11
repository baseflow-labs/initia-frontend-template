"use client";

import { useTranslation } from "react-i18next";

interface LanguageSwitcherProps {
  variant?: "button" | "dropdown";
  className?: string;
}

export function LanguageSwitcher({ variant = "button", className = "" }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  if (variant === "dropdown") {
    return (
      <div className={`flex gap-2 ${className}`} suppressHydrationWarning>
        <button
          onClick={() => handleLanguageChange("en")}
          className={`px-3 py-2 rounded transition-colors ${
            i18n.language === "en"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          suppressHydrationWarning
        >
          EN
        </button>
        <button
          onClick={() => handleLanguageChange("ar")}
          className={`px-3 py-2 rounded transition-colors ${
            i18n.language === "ar"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          suppressHydrationWarning
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
        onClick={() => handleLanguageChange("en")}
        className={`px-3 py-2 rounded transition-colors ${
          i18n.language === "en"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        suppressHydrationWarning
      >
        EN
      </button>
      <button
        onClick={() => handleLanguageChange("ar")}
        className={`px-3 py-2 rounded transition-colors ${
          i18n.language === "ar"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
        suppressHydrationWarning
      >
        العربية
      </button>
    </div>
  );
}
