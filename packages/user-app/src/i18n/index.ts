import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { sharedResources, mergeResources } from "@initia/shared/i18n";
import configs from "@initia/shared/config/configs";

import enUser from "./locales/en.json";
import arUser from "./locales/ar.json";

const userResources = {
  en: { translation: enUser },
  ar: { translation: arUser },
};

const resources = mergeResources(sharedResources, userResources);

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
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: configs.localization.defaultLanguage,
    supportedLngs: configs.localization.supportedLanguages,
    detection: languageDetectorOptions,
    ns: ["translation"],
    defaultNS: "translation",
    debug: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;
