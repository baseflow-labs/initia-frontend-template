import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import App from "./App";
import i18n from "./i18next";
import store from "./store/store";

import "./styles/index.css";
import "./styles/stepper.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import * as bootstrap from "bootstrap";
import "moment/locale/ar";

// Make bootstrap available globally
if (typeof window !== "undefined") {
  (window as any).bootstrap = bootstrap;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
