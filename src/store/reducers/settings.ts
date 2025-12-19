export interface State {
  fontSize: number;
  name: string;
  logo: string | null;
  logoFull: string | null;
  phoneNumber: string;
}

export type Action =
  | { type: "setFontSize"; size: number }
  | {
      type: "setMetadata";
      data: {
        name: string;
        logo: string;
        logoFull: string;
        phoneNumber: string;
      };
    };

const initialState: State = {
  fontSize: parseInt(localStorage.getItem("fontSize") || "") || 15,
  name: localStorage.getItem("name") || "Initia",
  logo: localStorage.getItem("logo") || null,
  logoFull: localStorage.getItem("logoFull") || null,
  phoneNumber: localStorage.getItem("phoneNumber") || "",
};

const settings = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "setFontSize":
      localStorage.setItem("fontSize", String(action.size));
      return {
        ...state,
        fontSize: action.size,
      };

    case "setMetadata": {
      const { name, logo, logoFull, phoneNumber } = action.data;

      if (name) localStorage.setItem("name", String(name));
      if (logo) localStorage.setItem("logo", String(logo));
      if (logoFull) localStorage.setItem("logoFull", String(logoFull));
      if (phoneNumber) localStorage.setItem("phoneNumber", String(phoneNumber));

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
