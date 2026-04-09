export interface State {
  fontSize: number;
  name: string;
  logo: string | null;
  logoFull: string | null;
  phoneNumber: string;
  slogan: string;
  theme: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
  layoutMode: "horizontal" | "vertical";
  layoutWidth: "boxed" | "full-width";
  timezone: string;
  dateFormat: string;
  defaultLanguage: string;
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
        phoneNumber: string;
        slogan: string;
      };
    };

const initialState: State = {
  fontSize: parseInt(localStorage.getItem("fontSize") || "") || 15,
  name: localStorage.getItem("name") || "Initia",
  logo: localStorage.getItem("logo") || null,
  logoFull: localStorage.getItem("logoFull") || null,
  phoneNumber: localStorage.getItem("phoneNumber") || "",
  slogan: localStorage.getItem("slogan") || "",
  theme: (localStorage.getItem("theme") as "light" | "dark") || "light",
  primaryColor: localStorage.getItem("primaryColor") || "#1e4c9d",
  secondaryColor: localStorage.getItem("secondaryColor") || "#dfe5ea",
  layoutMode: (localStorage.getItem("layoutMode") as "horizontal" | "vertical") || "horizontal",
  layoutWidth: (localStorage.getItem("layoutWidth") as "boxed" | "full-width") || "full-width",
  timezone: localStorage.getItem("timezone") || "UTC",
  dateFormat: localStorage.getItem("dateFormat") || "MM/DD/YYYY",
  defaultLanguage: localStorage.getItem("defaultLanguage") || "en",
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
      const { name, logo, logoFull, phoneNumber, slogan } = action.data;

      if (name) localStorage.setItem("name", String(name));
      if (logo) localStorage.setItem("logo", String(logo));
      if (logoFull) localStorage.setItem("logoFull", String(logoFull));
      if (phoneNumber) localStorage.setItem("phoneNumber", String(phoneNumber));
      if (slogan) localStorage.setItem("slogan", String(slogan));

      return {
        ...action.data,
        ...state,
      };
    }

    default:
      return state;
  }
};

export default settings;
