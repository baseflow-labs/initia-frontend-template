export const setFontSize = (size: number) => ({
  type: "setFontSize" as const,
  size,
});

export const setTheme = (theme: "light" | "dark") => ({
  type: "setTheme" as const,
  theme,
});

export const setLayoutMode = (mode: "horizontal" | "vertical") => ({
  type: "setLayoutMode" as const,
  mode,
});

export const setLayoutWidth = (width: "boxed" | "full-width") => ({
  type: "setLayoutWidth" as const,
  width,
});

export const setColors = (primaryColor: string, secondaryColor: string) => ({
  type: "setColors" as const,
  primaryColor,
  secondaryColor,
});

export const setTimezone = (timezone: string) => ({
  type: "setTimezone" as const,
  timezone,
});

export const setDateFormat = (dateFormat: string) => ({
  type: "setDateFormat" as const,
  dateFormat,
});

export const setDefaultLanguage = (language: string) => ({
  type: "setDefaultLanguage" as const,
  language,
});

export const setMetadata = (data: {
  name: string;
  logo: string;
  logoFull: string;
  slogan: string;
  defaultThemeColor: string;
  phoneNumber?: string;
  websiteUrl?: string;
  contactEmail?: string;
  socialFacebook?: string;
  socialInstagram?: string;
  socialLinkedin?: string;
  socialTwitter?: string;
  socialYoutube?: string;
  socialTiktok?: string;
}) => {
  return {
    type: "setMetadata" as const,
    data,
  };
};
