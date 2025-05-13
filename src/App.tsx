import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router";

import AuthLayout from "./layouts/auth";
import PublicLayout from "./layouts/public";
import { useAppSelector } from "./store/hooks";

const App = () => {
  const { token } = useAppSelector((state) => state.auth);
  const { i18n } = useTranslation();

  document.documentElement.dir = i18n.dir();
  document.documentElement.lang = i18n.language;

  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          {token !== "null" ? (
            <Route path="*" element={<AuthLayout />} />
          ) : (
            <Route path="*" element={<PublicLayout />} />
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
