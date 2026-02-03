"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@initia/shared/ui/components/button/language-switcher";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  return (
    <header
      className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
      dir={isRtl ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className={`flex items-center space-x-2 ${isRtl ? "order-last" : ""}`}>
          <div className="text-2xl font-bold text-primary-600">{t("Common.HelpCenter")}</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden items-center space-x-6 md:flex ${isRtl ? "flex-row-reverse" : ""}`}>
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
          >
            {t("Navigation.Home")}
          </Link>
          <Link
            href="/getting-started"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
          >
            {t("Navigation.GettingStarted")}
          </Link>
          <Link
            href="/popular"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
          >
            {t("Navigation.Contact")}
          </Link>
          <div className="border-l border-gray-200 pl-6">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 md:hidden"
          dir={isRtl ? "rtl" : "ltr"}
          suppressHydrationWarning
        >
          <nav
            className={`container mx-auto flex flex-col px-4 py-4 ${isRtl ? "text-right" : "text-left"}`}
            style={{
              gap: "1rem",
            }}
          >
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("Navigation.Home")}
            </Link>
            <Link
              href="/getting-started"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("Navigation.GettingStarted")}
            </Link>
            <Link
              href="/popular"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("Navigation.Contact")}
            </Link>
            <div className={`border-t border-gray-200 pt-4 ${isRtl ? "text-right" : "text-left"}`}>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
