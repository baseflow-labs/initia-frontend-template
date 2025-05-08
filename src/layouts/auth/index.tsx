import { useTranslation } from "react-i18next";
import DashboardView from "../../views/auth/dashboard";
import { Route, Routes } from "react-router";

const AuthLayout = () => {
  const { t } = useTranslation();

  const authRoutes = [
    {
      name: t("Auth.Dashboard.Title"),
      route: "/",
      view: <DashboardView />,
    },
  ];

  return (
    <main>
      Auth Layout
      <Routes>
        {authRoutes.map(({ name, route, view }, i) => (
          <Route path={route} element={view} key={i} />
        ))}
      </Routes>
    </main>
  );
};

export default AuthLayout;
