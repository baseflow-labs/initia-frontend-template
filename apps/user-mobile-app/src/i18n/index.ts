import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { sharedResources, mergeResources } from "@initia/shared/i18n";
import { userServicesResources } from "@initia/user-services/i18n";

import enMobile from "./locales/en.json";
import arMobile from "./locales/ar.json";

const mobileResources = {
  en: { translation: enMobile },
  ar: { translation: arMobile },
};

const resources = mergeResources(
  mergeResources(sharedResources, userServicesResources),
  mobileResources
);

void i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  supportedLngs: ["en", "ar"],
  defaultNS: "translation",
  interpolation: { escapeValue: false },
  debug: false,
});

export default i18n;
