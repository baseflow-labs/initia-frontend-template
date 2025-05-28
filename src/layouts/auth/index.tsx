import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router";
import { Fragment } from "react/jsx-runtime";

import DashboardView from "../../views/auth/dashboard";
import MembershipRegistrationView from "../../views/auth/membershipRegistration";
import Navbar from "./navbar";

const AuthLayout = () => {
  const { t } = useTranslation();

  const authRoutes = [
    {
      name: t("Auth.Dashboard.Title"),
      route: "/",
      view: <MembershipRegistrationView />,
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardView />,
    },
  ];

  return (
    <Fragment>
      <Navbar />

      <main className="m-0 p-5">
        <Routes>
          {authRoutes.map(({ name, route, view }, i) => (
            <Route path={route} element={view} key={i} />
          ))}
        </Routes>
      </main>
    </Fragment>
  );
};

export default AuthLayout;
