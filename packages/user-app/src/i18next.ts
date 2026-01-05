import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import ar from "@initia/shared/assets/locales/ar.json";
import en from "@initia/shared/assets/locales/en.json";
import configs from "./configs";

const languageDetectorOptions = {
  order: ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"],
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupSessionStorage: "i18nextLng",
  caches: ["localStorage"],
  excludeCacheFor: ["cimode"],
};

i18n
  .use(I18nextBrowserLanguageDetector) // use the class, not a manual instance
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: en },
      ar: { translations: ar },
    },
    fallbackLng: configs.localization.defaultLanguage,
    supportedLngs: configs.localization.supportedLanguages,

    detection: languageDetectorOptions,

    ns: ["translations"],
    defaultNS: "translations",

    debug: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;
