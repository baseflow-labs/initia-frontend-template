import { faDashboard, faGear } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

import { useWindowWidth } from "../../utils/hooks";
import MessagingView from "../../views/auth/basicPages/messaging";
import NotificationsView from "../../views/auth/basicPages/notifications";
import SupportCenterView from "../../views/auth/basicPages/supportCenter";
import ContactUsView from "../../views/auth/basicPages/supportCenter/contact-us";
import FaqView from "../../views/auth/basicPages/supportCenter/faq";
import SupportTicketsView from "../../views/auth/basicPages/supportCenter/tickets";
import UserManualView from "../../views/auth/basicPages/supportCenter/user-manual";
import SystemSettingsView from "../../views/auth/basicPages/systemSettings";
import UserProfileView from "../../views/auth/basicPages/userProfile";
import UserSettingsView from "../../views/auth/basicPages/userSettings";
import DashboardView from "../../views/auth/dashboard";
import TemplateDataViewExamplesView from "../../views/auth/templateExamples/dataView";
import TemplateFormExamplesView from "../../views/auth/templateExamples/forms";
import { FilePreviewModal } from "./globalModal";
import DashboardNavbar from "./navs/navbar";
import OffCanvasNav from "./navs/offcanvasNav";
import Sidebar from "./navs/sidebarNav";

const AuthLayout = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const width = useWindowWidth();
  const isPc = width > 992;

  const [collapsed, setCollapsed] = useState(true);

  const authRoutes = [
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardView />,
      showInNav: true,
      icon: faDashboard,
    },
    {
      name: t("Auth.Profile.Title"),
      route: "/profile",
      view: <UserProfileView />,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.Messaging.Title"),
      route: "/messaging",
      view: <MessagingView />,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.Notifications.Title"),
      route: "/notifications",
      view: <NotificationsView />,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.UserSettings.Title"),
      route: "/settings",
      view: <UserSettingsView />,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.Settings.Admin.Title"),
      route: "/system-settings",
      view: <SystemSettingsView />,
      showInNav: true,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.SupportCenter.Title"),
      route: "/support-center",
      view: <SupportCenterView />,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.SupportCenter.Faq.Title"),
      route: "/support-center/faq",
      view: <FaqView />,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.SupportCenter.ContactUs.Title"),
      route: "/support-center/contact-us",
      view: <ContactUsView />,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.SupportCenter.Tickets.Title"),
      route: "/support-center/tickets",
      view: <SupportTicketsView />,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.SupportCenter.UserManual.Title"),
      route: "/support-center/user-manual",
      view: <UserManualView />,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.TemplateExamples.DataView.Title"),
      route: "/template-examples/data-view",
      view: <TemplateDataViewExamplesView />,
      icon: faGear,
      showInNav: true,
      fixed: true,
    },
    {
      name: t("Auth.TemplateExamples.Forms.Title"),
      route: "/template-examples/forms",
      view: <TemplateFormExamplesView />,
      icon: faGear,
      showInNav: true,
      fixed: true,
    },
  ];

  const showSidebar = !location.pathname.includes("apply");

  // const filteredRoutes = authRoutes.filter(({ users }) =>
  //   users.includes(user.role)
  // );

  const filteredFixedRoutes = authRoutes.filter(({ fixed, showInNav }) => fixed && showInNav);

  const toggleSidebar = () => setCollapsed((current) => !current);

  return (
    <Fragment>
      {/* <DemoWarning /> */}
      <DashboardNavbar />

      <OffCanvasNav
        fixedRoutes={filteredFixedRoutes}
        routes={authRoutes
          .filter(({ showInNav, fixed }) => showInNav && !fixed)
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
                .filter(({ showInNav, fixed }) => showInNav && !fixed)
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
