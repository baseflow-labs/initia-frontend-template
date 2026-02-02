import { useEffect } from "react";
import { useTranslation } from "react-i18next";

/**
 * Hook to handle RTL/LTR direction changes when language changes
 * Updates document direction and toggles Bootstrap CSS
 */
export const useDirectionHandler = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const direction = i18n.dir();
    const isRTL = direction === "rtl";

    // Update document direction
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;

    // Get all stylesheets
    const stylesheets = Array.from(document.styleSheets);

    // Disable/enable Bootstrap stylesheets based on direction
    stylesheets.forEach((sheet) => {
      try {
        const href = sheet.href || "";

        if (href.includes("bootstrap.rtl")) {
          (sheet as CSSStyleSheet).disabled = !isRTL;
        } else if (href.includes("bootstrap.min.css") && !href.includes(".rtl")) {
          (sheet as CSSStyleSheet).disabled = isRTL;
        }
      } catch (e) {
        // Cross-origin stylesheet, ignore
      }
    });

    // Add CSS class to body for additional RTL/LTR specific styling
    document.body.classList.remove("rtl", "ltr");
    document.body.classList.add(isRTL ? "rtl" : "ltr");
  }, [i18n.language, i18n]);

  return { direction: i18n.dir(), isRTL: i18n.dir() === "rtl" };
};
