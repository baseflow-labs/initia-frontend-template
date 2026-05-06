import { SettingsState } from "../types";

export type SettingsAction =
  | { type: "setTheme"; theme: "light" | "dark" }
  | { type: "setColors"; primaryColor: string; secondaryColor: string }
  | { type: "setDefaultLanguage"; language: string };

export const createSettingsInitialState = (partial?: Partial<SettingsState>): SettingsState => ({
  theme: partial?.theme ?? "light",
  primaryColor: partial?.primaryColor ?? "#1e4c9d",
  secondaryColor: partial?.secondaryColor ?? "#dfe5ea",
  defaultLanguage: partial?.defaultLanguage ?? "en",
});

export const settingsReducer = (
  state: SettingsState = createSettingsInitialState(),
  action: SettingsAction
): SettingsState => {
  switch (action.type) {
    case "setTheme":
      return { ...state, theme: action.theme };
    case "setColors":
      return { ...state, primaryColor: action.primaryColor, secondaryColor: action.secondaryColor };
    case "setDefaultLanguage":
      return { ...state, defaultLanguage: action.language };
    default:
      return state;
  }
};
