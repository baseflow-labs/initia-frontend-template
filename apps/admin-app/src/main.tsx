import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import App from "./App";
import i18n from "./i18n";
import store from "./store/store";
import { initializeApi } from "./api/setup";

import "moment/locale/ar";

// Initialize API client
initializeApi();

// Import both Bootstrap CSS files (LTR and RTL)
// The useDirectionHandler hook will toggle them based on language
import("bootstrap/dist/css/bootstrap.min.css");
import("bootstrap/dist/css/bootstrap.rtl.min.css");
import("./styles/index.scss");
import("./styles/direction.css");

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
