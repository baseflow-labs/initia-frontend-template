import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import App from "./App";
import i18n from "./i18n";
import store from "./store/store";
import { initializeApi } from "./api/setup";

import "moment/locale/ar";

// Initialize API client with store callbacks
initializeApi();

// Import Bootstrap CSS based on language direction
const isRTL = i18n.dir() === "rtl";

if (isRTL) {
  import("bootstrap/dist/css/bootstrap.rtl.min.css");
  import("./styles/index.scss");
} else {
  import("bootstrap/dist/css/bootstrap.min.css");
  import("./styles/index.scss");
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
