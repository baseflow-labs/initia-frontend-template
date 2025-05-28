import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

import DashboardView from "../../views/auth/dashboard";
import MembershipRegistrationView from "../../views/auth/membershipRegistration";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import DashboardNavbar from "./dashabordNavbar";

const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const authRoutes = [
    {
      name: t("Auth.Dashboard.Title"),
      route: "/",
      view: <MembershipRegistrationView />,
      icon: faHome,
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardView />,
      icon: faHome,
    },
  ];

  const showSidebar = location.pathname !== "/" && location.pathname !== "";

  return (
    <Fragment>
      {showSidebar ? "" : <Navbar />}

      <main className="m-0 row">
        <div className="col-md-2 p-0">
          {showSidebar && (
            <Sidebar
              routes={authRoutes.map(({ view, ...rest }) => ({ ...rest }))}
            />
          )}
        </div>

        <div className={`col-md-${showSidebar ? 10 : 12} p-0 ps-4`}>
          {showSidebar && <DashboardNavbar />}

          <div className="py-5 px-3">
            <Routes>
              {authRoutes.map(({ name, route, view }, i) => (
                <Route path={route} element={view} key={i} />
              ))}
            </Routes>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default AuthLayout;
