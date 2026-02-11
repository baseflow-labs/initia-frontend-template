import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Custom hook to handle RTL/LTR direction switching based on language
 * Updates document direction, toggles Bootstrap CSS variants, and manages body classes
 */
export const useDirectionHandler = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = i18n.language;
    const isRTL = currentLanguage === "ar";
    const direction = isRTL ? "rtl" : "ltr";

    // Update document direction
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;

    // Toggle Bootstrap CSS files
    const stylesheets = document.styleSheets;
    for (let i = 0; i < stylesheets.length; i++) {
      const sheet = stylesheets[i];
      const href = sheet.href || "";

      // Toggle RTL/LTR Bootstrap stylesheets
      if (href.includes("bootstrap.rtl")) {
        (sheet as CSSStyleSheet).disabled = !isRTL;
      } else if (href.includes("bootstrap.min.css")) {
        (sheet as CSSStyleSheet).disabled = isRTL;
      }
    }

    // Update body classes for additional styling hooks
    document.body.classList.remove("rtl", "ltr");
    document.body.classList.add(isRTL ? "rtl" : "ltr");
  }, [i18n.language]);
};
