import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

import {
  beneficiariesIcon,
  dashboardIcon,
  settingsIcon,
} from "../../assets/icons/icons";
import { useWindowWidth } from "../../utils/hooks";
import DashboardView from "../../views/auth/dashboard";
import SettingsPage from "../../views/auth/settings";
import UserMgmtPage from "../../views/auth/users";
import DemoWarning from "./demoWarning";
import { FilePreviewModal } from "./globalModal";
import DashboardNavbar from "./navs/navbar";
import OffCanvasNav from "./navs/offcanvasNav";
import Sidebar from "./navs/sidebarNav";

const AuthLayout = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const width = useWindowWidth();
  const isPc = width > 992;

  const [collapsed, setCollapsed] = useState(false);

  const authRoutes = [
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardView />,
      showInNav: true,
      icon: dashboardIcon,
    },
    {
      name: t("Auth.Users.Title"),
      route: "/user",
      view: <UserMgmtPage />,
      showInNav: true,
      icon: beneficiariesIcon,
    },
    {
      name: t("Auth.Settings.Title"),
      route: "/settings",
      view: <SettingsPage />,
      icon: settingsIcon,
      fixed: true,
    },
  ];

  const showSidebar = !location.pathname.includes("apply");

  // const filteredRoutes = authRoutes.filter(({ users }) =>
  //   users.includes(user.role)
  // );

  const filteredFixedRoutes = authRoutes.filter(({ fixed }) => fixed);

  const toggleSidebar = () => setCollapsed((current) => !current);

  return (
    <Fragment>
      <DashboardNavbar showNav={true} />

      <OffCanvasNav
        fixedRoutes={filteredFixedRoutes}
        routes={authRoutes
          .filter(({ showInNav }) => showInNav)
          .map(({ view, ...rest }) => ({ ...rest }))}
      />

      <main className="d-flex pb-5">
        {showSidebar && isPc && (
          <div
            className="position-fixed top-0 start-0 min-vh-100"
            style={{
              width: collapsed ? "80px" : "250px",
              transition: "width 0.3s",
              zIndex: 4,
            }}
          >
            <Sidebar
              collapsed={collapsed}
              toggleSidebar={toggleSidebar}
              fixedRoutes={filteredFixedRoutes}
              routes={authRoutes
                .filter(({ showInNav }) => showInNav)
                .map(({ view, ...rest }) => ({ ...rest }))}
            />
          </div>
        )}

        <div
          className="flex-grow-1"
          style={{
            marginRight:
              i18n.language === "ar"
                ? showSidebar && isPc
                  ? collapsed
                    ? "80px"
                    : "250px"
                  : "0px"
                : undefined,
            marginLeft:
              i18n.language === "en"
                ? showSidebar && isPc
                  ? collapsed
                    ? "80px"
                    : "250px"
                  : "0px"
                : undefined,
            transition: "margin-right 0.3s",
          }}
        >
          <DemoWarning />

          <div className="p-0 px-2 px-lg-5 w-100">
            <Routes>
              {authRoutes.map(({ name, route, view }, i) => (
                <Route path={route} element={view} key={i} />
              ))}

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>

          <FilePreviewModal />
        </div>
      </main>
    </Fragment>
  );
};

export default AuthLayout;
