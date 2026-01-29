import DashboardView from "@/views/auth/dashboard";
import LandingPageManagement from "@/views/auth/landingPage";
import SupportCenterManagementView from "@/views/auth/supportCenter";
import BackupSettingsView from "@/views/auth/systemSettings/backup";
import SystemDataBulkInsertionView from "@/views/auth/systemSettings/bulkInseration";
import SystemLoggerView from "@/views/auth/systemSettings/logger";
import SystemMetadataSettingsView from "@/views/auth/systemSettings/metadata";
import UserActivityView from "@/views/auth/systemSettings/userActivity";
import UsersView from "@/views/auth/systemSettings/users";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faClockRotateLeft,
  faDashboard,
  faDatabase,
  faFileShield,
  faFileSignature,
  faGlobe,
  faHeadset,
  faPaintBrush,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import MessagingView from "@initia/shared/ui/messaging";
import NotificationsView from "@initia/shared/ui/notifications";
import { applyRouteChanges } from "@initia/shared/utils/function";
import { useWindowWidth } from "@initia/shared/utils/hooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

import AuthFooter from "../common/footer";
import { FilePreviewModal } from "./globalModal";
import DashboardNavbar from "./navs/navbar";
import OffCanvasNav from "./navs/offcanvasNav";
import OffCanvasTools from "./navs/offcanvasTools";
import Sidebar from "./navs/sidebarNav";

interface AuthRoute {
  name: string;
  route: string;
  view: React.ReactNode;
  showInNav?: boolean;
  icon?: IconProp;
  fixed?: boolean;
  subRoute?: AuthRoute[];
}

const AuthLayout = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const width = useWindowWidth();
  const isPc = width > 992;

  const [collapsed, setCollapsed] = useState(true);

  const authRoutes: AuthRoute[] = [
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardView />,
      showInNav: true,
      icon: faDashboard,
    },
    {
      name: t("Auth.Settings.Admin.UserActivity.Title"),
      route: "/user-activity",
      view: <UserActivityView />,
      showInNav: true,
      icon: faFileSignature,
    },
    {
      name: t("Auth.Settings.Admin.SystemLogger.Title"),
      route: "/system-logger",
      view: <SystemLoggerView />,
      showInNav: true,
      icon: faFileShield,
    },
    {
      name: t("Auth.Settings.Admin.Users.Title"),
      route: "/users",
      view: <UsersView />,
      showInNav: true,
      icon: faUsers,
    },
    {
      name: t("Auth.Settings.Admin.Backup.Title"),
      route: "/backups",
      view: <BackupSettingsView />,
      showInNav: true,
      icon: faClockRotateLeft,
    },
    {
      name: t("Auth.Settings.Admin.Metadata.Title"),
      route: "/metadata",
      view: <SystemMetadataSettingsView />,
      showInNav: true,
      icon: faPaintBrush,
    },
    {
      name: t("Auth.Settings.Admin.BulkDataInsertion.Title"),
      route: "/bulk-data-insertion",
      view: <SystemDataBulkInsertionView />,
      showInNav: true,
      icon: faDatabase,
    },
    {
      name: t("Auth.SupportCenter.Admin.Title", "Support Center"),
      route: "/support-center-management",
      view: <SupportCenterManagementView />,
      showInNav: true,
      icon: faHeadset,
    },
    {
      name: t("Auth.LandingPage.Title"),
      route: "/landing-page-management",
      view: <LandingPageManagement />,
      icon: faGlobe,
      showInNav: true,
      fixed: true,
    },
    {
      name: t("Auth.Notifications.Title"),
      route: "/notifications",
      view: <NotificationsView />,
    },
    {
      name: t("Auth.Messaging.Title"),
      route: "/messaging",
      view: <MessagingView />,
    },
  ];

  const showSidebar = !location.pathname.includes("apply");

  // const filteredRoutes = authRoutes.filter(({ users }) =>
  //   users.includes(user.role)
  // );

  const filteredFixedRoutes = authRoutes.filter(({ fixed, showInNav }) => fixed && showInNav);

  const toggleSidebar = () => setCollapsed((current) => !current);

  useEffect(() => {
    applyRouteChanges(t, authRoutes, location.pathname);
  }, [location.pathname]);

  return (
    <Fragment>
      {/* <DemoWarning /> */}
      <OffCanvasNav
        fixedRoutes={filteredFixedRoutes}
        routes={authRoutes.filter(({ showInNav, fixed }) => showInNav && !fixed)}
      />

      <main className="d-flex pb-3 min-vh-100">
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
              routes={authRoutes.filter(({ showInNav, fixed }) => showInNav && !fixed)}
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
          <div className="p-0 px-2 px-lg-5 w-100">
            <DashboardNavbar />

            <Routes>
              {authRoutes.map(({ route, view }, i) => (
                <Route path={route} element={view} key={i} />
              ))}

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>

          <FilePreviewModal />

          <AuthFooter />

          <OffCanvasTools />
        </div>
      </main>
    </Fragment>
  );
};

export default AuthLayout;
