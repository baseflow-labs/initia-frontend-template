export interface State {
  fontSize: number;
  name: string;
  logo: string;
  phoneNumber: string;
}

export type Action =
  | { type: "setFontSize"; size: number }
  | {
      type: "setMetadata";
      data: {
        name: string;
        logo: string;
        phoneNumber: string;
      };
    };

const initialState: State = {
  fontSize: parseInt(localStorage.getItem("fontSize") || "") || 15,
  name: localStorage.getItem("name") || "Society",
  logo: localStorage.getItem("logo") || "/logo.png",
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

    case "setMetadata":
      const { name, logo, phoneNumber } = action.data;

      name && localStorage.setItem("name", String(name));
      logo && localStorage.setItem("logo", String(logo));
      phoneNumber && localStorage.setItem("phoneNumber", String(phoneNumber));

      return {
        ...action.data,
        ...state,
      };

    default:
      return state;
  }
};

export default settings;
