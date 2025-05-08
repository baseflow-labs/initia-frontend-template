import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginView from "./views/public/login";
import DashboardView from "./views/auth/dashboard";
import { Suspense } from "react";

const App = () => {
  const { t } = useTranslation();

  const publicRoutes = [
    { name: t("Public.Login.Title"), route: "/", view: <LoginView /> },
  ];

  const authRoutes = [
    {
      name: t("Auth.Dashboard.Title"),
      route: "/",
      view: <DashboardView />,
    },
  ];

  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          {false
            ? authRoutes.map(({ name, route, view }, i) => (
                <Route path={route} element={view} key={i} />
              ))
            : publicRoutes.map(({ name, route, view }, i) => (
                <Route path={route} element={view} key={i} />
              ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
