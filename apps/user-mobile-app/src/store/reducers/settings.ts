export interface State {
  theme: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
  defaultLanguage: string;
}

type Action =
  | { type: "setTheme"; theme: "light" | "dark" }
  | { type: "setColors"; primaryColor: string; secondaryColor: string }
  | { type: "setDefaultLanguage"; language: string };

const initialState: State = {
  theme: "light",
  primaryColor: "#1e4c9d",
  secondaryColor: "#dfe5ea",
  defaultLanguage: "en",
};

const settings = (state: State = initialState, action: Action): State => {
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

export default settings;
