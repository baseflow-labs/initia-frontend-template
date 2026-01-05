import { Resource } from "i18next";

/**
 * Deep merge i18n resources
 * App-specific translations override shared ones
 */
export function mergeResources(shared: Resource, appSpecific: Resource): Resource {
  const merged: Resource = {};

  const languages = new Set([...Object.keys(shared), ...Object.keys(appSpecific)]);

  languages.forEach((lang) => {
    const sharedTranslation = (shared[lang]?.translation as Record<string, unknown>) || {};
    const appTranslation = (appSpecific[lang]?.translation as Record<string, unknown>) || {};
    merged[lang] = {
      translation: Object.assign({}, sharedTranslation, appTranslation),
    };
  });

  return merged;
}
