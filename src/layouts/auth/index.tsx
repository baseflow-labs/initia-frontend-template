import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

import {
  aidsIcon,
  beneficiariesIcon,
  dashboardIcon,
  infoIcon,
  membershipFormIcon,
  profileIcon,
  settingsIcon,
  visitReportIcon,
  visitsIcon,
} from "../../assets/icons/icons";
import { useAppSelector } from "../../store/hooks";
import { useWindowWidth } from "../../utils/hooks";
import DashboardView from "../../views/auth/dashboard";
import DashboardAccountantView from "../../views/auth/dashboard/accountant";
import DashboardAdminView from "../../views/auth/dashboard/admin";
import DashboardResearcherView from "../../views/auth/dashboard/researcher";
import DashboardSupervisorView from "../../views/auth/dashboard/supervisor";
import SettingsPage from "../../views/auth/settings";
import UserMgmtPage from "../../views/auth/users";
import DemoWarning from "./demoWarning";
import { FilePreviewModal } from "./globalModal";
import OffCanvasNav from "./navs/offcanvasNav";
import Sidebar from "./navs/sidebarNav";

const AuthLayout = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const width = useWindowWidth();
  const isPc = width > 992;

  const isUnacceptedBeneficiary =
    user.role === "beneficiary" &&
    (!user.status ||
      user.status === "Incomplete" ||
      user.status === "Need Help");

  const denyMembershipFormPageAccess =
    user.role === "beneficiary" &&
    user.status !== "Incomplete" &&
    user.status !== "Need Help";

  const [collapsed, setCollapsed] = useState(false);

  const authRoutes = [
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardAdminView />,
      showInNav: true,
      icon: dashboardIcon,
      users: ["admin"],
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardView />,
      showInNav: true,
      icon: dashboardIcon,
      users: ["beneficiary"],
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardSupervisorView />,
      showInNav: true,
      icon: dashboardIcon,
      users: ["ceo", "hod"],
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardResearcherView />,
      showInNav: true,
      icon: dashboardIcon,
      users: ["researcher"],
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardAccountantView />,
      showInNav: true,
      icon: dashboardIcon,
      users: ["accountant"],
    },
    {
      name: t("Auth.Users.Title"),
      route: "/user",
      view: <UserMgmtPage />,
      showInNav: true,
      icon: beneficiariesIcon,
      users: ["admin"],
    },
    {
      name: t("Auth.Settings.Title"),
      route: "/settings",
      view: <SettingsPage />,
      icon: settingsIcon,
      fixed: true,
      users: ["ceo", "beneficiary", "researcher", "hod", "accountant", "admin"],
    },
  ];

  const showSidebar = !location.pathname.includes("apply");

  const filteredRoutes = authRoutes.filter(({ users }) =>
    users.includes(user.role)
  );

  const filteredFixedRoutes = filteredRoutes.filter(({ fixed }) => fixed);

  const toggleSidebar = () => setCollapsed((current) => !current);

  return (
    <Fragment>
      <OffCanvasNav
        fixedRoutes={filteredFixedRoutes}
        routes={filteredRoutes
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
              routes={filteredRoutes
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
              {filteredRoutes.map(({ name, route, view }, i) => (
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
