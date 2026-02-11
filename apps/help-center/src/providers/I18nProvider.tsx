"use client";

import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "@/i18n";

function DirectionHandler() {
  useEffect(() => {
    const updateDirection = () => {
      const currentLang = i18n.language;
      const dir = currentLang === "ar" ? "rtl" : "ltr";
      document.documentElement.dir = dir;
      document.documentElement.lang = currentLang;
      document.body.dir = dir;
    };

    // Set initial direction
    updateDirection();

    // Listen for language changes
    i18n.on("languageChanged", updateDirection);

    return () => {
      i18n.off("languageChanged", updateDirection);
    };
  }, []);

  return null;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <DirectionHandler />
      {children}
    </I18nextProvider>
  );
}
