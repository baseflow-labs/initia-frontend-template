import { useTranslation } from "react-i18next";
import LoginView from "../../views/public/login";
import { Route, Routes } from "react-router";

const AuthLayout = () => {
  const { t } = useTranslation();

  const publicRoutes = [
    { name: t("Public.Login.Title"), route: "/", view: <LoginView /> },
  ];

  return (
    <main className="layout">
      Public Layout
      <Routes>
        {publicRoutes.map(({ name, route, view }, i) => (
          <Route path={route} element={view} key={i} />
        ))}
      </Routes>
    </main>
  );
};

export default AuthLayout;
