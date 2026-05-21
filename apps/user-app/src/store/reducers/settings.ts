export interface State {
  fontSize: number;
  name: string;
  logo: string | null;
  logoFull: string | null;
  slogan: string;
  defaultThemeColor: string;
  phoneNumber: string;
  websiteUrl: string;
  contactEmail: string;
  socialFacebook: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialTwitter: string;
  socialYoutube: string;
  socialTiktok: string;
  theme: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
  layoutMode: "horizontal" | "vertical";
  layoutWidth: "boxed" | "full-width";
  timezone: string;
  dateFormat: string;
  defaultLanguage: string;
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumber: boolean;
  passwordRequireSpecialChar: boolean;
  fileUploadMaxSizeMb: number;
  fileUploadMaxCount: number;
}

export type Action =
  | { type: "setFontSize"; size: number }
  | { type: "setTheme"; theme: "light" | "dark" }
  | { type: "setLayoutMode"; mode: "horizontal" | "vertical" }
  | { type: "setLayoutWidth"; width: "boxed" | "full-width" }
  | { type: "setColors"; primaryColor: string; secondaryColor: string }
  | { type: "setTimezone"; timezone: string }
  | { type: "setDateFormat"; dateFormat: string }
  | { type: "setDefaultLanguage"; language: string }
  | {
      type: "setMetadata";
      data: {
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
        passwordMinLength?: number;
        passwordRequireUppercase?: boolean;
        passwordRequireLowercase?: boolean;
        passwordRequireNumber?: boolean;
        passwordRequireSpecialChar?: boolean;
        fileUploadMaxSizeMb?: number;
        fileUploadMaxCount?: number;
      };
    };

const initialState: State = {
  fontSize: parseInt(localStorage.getItem("fontSize") || "") || 15,
  name: localStorage.getItem("name") || "Initia",
  logo: localStorage.getItem("logo") || null,
  logoFull: localStorage.getItem("logoFull") || null,
  slogan: localStorage.getItem("slogan") || "",
  defaultThemeColor: localStorage.getItem("defaultThemeColor") || "#1e4c9d",
  phoneNumber: localStorage.getItem("phoneNumber") || "",
  websiteUrl: localStorage.getItem("websiteUrl") || "",
  contactEmail: localStorage.getItem("contactEmail") || "",
  socialFacebook: localStorage.getItem("socialFacebook") || "",
  socialInstagram: localStorage.getItem("socialInstagram") || "",
  socialLinkedin: localStorage.getItem("socialLinkedin") || "",
  socialTwitter: localStorage.getItem("socialTwitter") || "",
  socialYoutube: localStorage.getItem("socialYoutube") || "",
  socialTiktok: localStorage.getItem("socialTiktok") || "",
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  primaryColor: localStorage.getItem("primaryColor") || "#1e4c9d",
  secondaryColor: localStorage.getItem("secondaryColor") || "#dfe5ea",
  layoutMode: (localStorage.getItem("layoutMode") as "horizontal" | "vertical") || "horizontal",
  layoutWidth: (localStorage.getItem("layoutWidth") as "boxed" | "full-width") || "full-width",
  timezone: localStorage.getItem("timezone") || "UTC",
  dateFormat: localStorage.getItem("dateFormat") || "MM/DD/YYYY",
  defaultLanguage: localStorage.getItem("defaultLanguage") || "en",
  passwordMinLength: parseInt(localStorage.getItem("passwordMinLength") || "8", 10),
  passwordRequireUppercase: localStorage.getItem("passwordRequireUppercase") !== "false",
  passwordRequireLowercase: localStorage.getItem("passwordRequireLowercase") !== "false",
  passwordRequireNumber: localStorage.getItem("passwordRequireNumber") !== "false",
  passwordRequireSpecialChar: localStorage.getItem("passwordRequireSpecialChar") === "true",
  fileUploadMaxSizeMb: parseInt(localStorage.getItem("fileUploadMaxSizeMb") || "2", 10),
  fileUploadMaxCount: parseInt(localStorage.getItem("fileUploadMaxCount") || "3", 10),
};

const settings = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "setFontSize":
      localStorage.setItem("fontSize", String(action.size));
      return {
        ...state,
        fontSize: action.size,
      };

    case "setTheme":
      localStorage.setItem("theme", action.theme);
      return {
        ...state,
        theme: action.theme,
      };

    case "setLayoutMode":
      localStorage.setItem("layoutMode", action.mode);
      return {
        ...state,
        layoutMode: action.mode,
      };

    case "setLayoutWidth":
      localStorage.setItem("layoutWidth", action.width);
      return {
        ...state,
        layoutWidth: action.width,
      };

    case "setColors":
      localStorage.setItem("primaryColor", action.primaryColor);
      localStorage.setItem("secondaryColor", action.secondaryColor);
      return {
        ...state,
        primaryColor: action.primaryColor,
        secondaryColor: action.secondaryColor,
      };

    case "setTimezone":
      localStorage.setItem("timezone", action.timezone);
      return {
        ...state,
        timezone: action.timezone,
      };

    case "setDateFormat":
      localStorage.setItem("dateFormat", action.dateFormat);
      return {
        ...state,
        dateFormat: action.dateFormat,
      };

    case "setDefaultLanguage":
      localStorage.setItem("defaultLanguage", action.language);
      return {
        ...state,
        defaultLanguage: action.language,
      };

    case "setMetadata": {
      const {
        name,
        logo,
        logoFull,
        slogan,
        defaultThemeColor,
        phoneNumber,
        websiteUrl,
        contactEmail,
        socialFacebook,
        socialInstagram,
        socialLinkedin,
        socialTwitter,
        socialYoutube,
        socialTiktok,
        passwordMinLength,
        passwordRequireUppercase,
        passwordRequireLowercase,
        passwordRequireNumber,
        passwordRequireSpecialChar,
        fileUploadMaxSizeMb,
        fileUploadMaxCount,
      } = action.data;

      if (name) localStorage.setItem("name", String(name));
      if (logo) localStorage.setItem("logo", String(logo));
      if (logoFull) localStorage.setItem("logoFull", String(logoFull));
      if (defaultThemeColor) localStorage.setItem("defaultThemeColor", String(defaultThemeColor));
      if (phoneNumber) localStorage.setItem("phoneNumber", String(phoneNumber));
      if (slogan) localStorage.setItem("slogan", String(slogan));
      if (websiteUrl) localStorage.setItem("websiteUrl", String(websiteUrl));
      if (contactEmail) localStorage.setItem("contactEmail", String(contactEmail));
      if (socialFacebook) localStorage.setItem("socialFacebook", String(socialFacebook));
      if (socialInstagram) localStorage.setItem("socialInstagram", String(socialInstagram));
      if (socialLinkedin) localStorage.setItem("socialLinkedin", String(socialLinkedin));
      if (socialTwitter) localStorage.setItem("socialTwitter", String(socialTwitter));
      if (socialYoutube) localStorage.setItem("socialYoutube", String(socialYoutube));
      if (socialTiktok) localStorage.setItem("socialTiktok", String(socialTiktok));
      if (passwordMinLength) localStorage.setItem("passwordMinLength", String(passwordMinLength));
      if (typeof passwordRequireUppercase === "boolean")
        localStorage.setItem("passwordRequireUppercase", String(passwordRequireUppercase));
      if (typeof passwordRequireLowercase === "boolean")
        localStorage.setItem("passwordRequireLowercase", String(passwordRequireLowercase));
      if (typeof passwordRequireNumber === "boolean")
        localStorage.setItem("passwordRequireNumber", String(passwordRequireNumber));
      if (typeof passwordRequireSpecialChar === "boolean")
        localStorage.setItem("passwordRequireSpecialChar", String(passwordRequireSpecialChar));
      if (fileUploadMaxSizeMb)
        localStorage.setItem("fileUploadMaxSizeMb", String(fileUploadMaxSizeMb));
      if (fileUploadMaxCount)
        localStorage.setItem("fileUploadMaxCount", String(fileUploadMaxCount));

      return {
        ...state,
        ...action.data,
      };
    }

    default:
      return state;
  }
};

export default settings;
