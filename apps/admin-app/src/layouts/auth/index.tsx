import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChartLine,
  faClockRotateLeft,
  faDashboard,
  faDatabase,
  faEnvelope,
  faFileContract,
  faFileShield,
  faFileSignature,
  faGlobe,
  faHeadset,
  faPaintBrush,
  faRobot,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import CommandPalette, { type Command } from "@initia/shared/ui/components/command-palette";
import FloatingSpeedDial, {
  type SpeedDialAction,
} from "@initia/shared/ui/components/floating-speed-dial";
import { TopbarSearchOption } from "@initia/shared/ui/components/search/topbarSearch";
import MessagingView from "@initia/shared/ui/messaging";
import NotificationsView from "@initia/shared/ui/notifications";
import { applyRouteChanges } from "@initia/shared/utils/function";
import { useWindowWidth } from "@initia/shared/utils/hooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { Fragment } from "react/jsx-runtime";

import AuthFooter from "../common/footer";

import { FilePreviewModal } from "./globalModal";
import DashboardNavbar from "./navs/navbar";
import OffCanvasNav from "./navs/offcanvasNav";
import OffCanvasTools from "./navs/offcanvasTools";
import Sidebar from "./navs/sidebarNav";

import DashboardView from "@/views/auth/dashboard";
import LandingPageManagement from "@/views/auth/landingPage";
import SendNotificationsView from "@/views/auth/notifications/send";
import SupportCenterManagementView from "@/views/auth/supportCenter";
import AnalyticsIntegrationsView from "@/views/auth/systemSettings/analyticsIntegrations";
import BackupSettingsView from "@/views/auth/systemSettings/backup";
import SystemDataBulkInsertionView from "@/views/auth/systemSettings/bulkInseration";
import ChatbotBuilderView from "@/views/auth/systemSettings/chatbot";
import AdminFormOfFormsView from "@/views/auth/systemSettings/formOfForms";
import LegalDocumentsView from "@/views/auth/systemSettings/legalDocuments";
import SystemLoggerView from "@/views/auth/systemSettings/logger";
import MailingSettingsView from "@/views/auth/systemSettings/mailing";
import SystemMetadataSettingsView from "@/views/auth/systemSettings/metadata";
import UserActivityView from "@/views/auth/systemSettings/userActivity";
import UsersView from "@/views/auth/systemSettings/users";
// <initia-generated-admin-app-view-imports>
// </initia-generated-admin-app-view-imports>

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
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isPc = width > 992;

  const [collapsed, setCollapsed] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

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
      name: t("Auth.Settings.Admin.LegalDocuments.Title"),
      route: "/legal-documents",
      view: <LegalDocumentsView />,
      showInNav: true,
      icon: faFileContract,
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
      name: t("Auth.Settings.Admin.AnalyticsIntegrations.Title", "Analytics Integrations"),
      route: "/analytics-integrations",
      view: <AnalyticsIntegrationsView />,
      showInNav: true,
      icon: faChartLine,
    },
    {
      name: t("Auth.Settings.Admin.FormsOfForms.Title", "Form of Forms"),
      route: "/forms-of-forms",
      view: <AdminFormOfFormsView />,
      showInNav: true,
      icon: faDatabase,
    },
    {
      name: t("Auth.Settings.Admin.Mailing.Title", "Mailing Service"),
      route: "/mailing",
      view: <MailingSettingsView />,
      showInNav: true,
      icon: faEnvelope,
    },
    {
      name: t("Auth.Chatbot.Builder.Title", "Chatbot Builder"),
      route: "/chatbot-builder",
      view: <ChatbotBuilderView />,
      showInNav: true,
      icon: faRobot,
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
      name: t("Auth.Notifications.SendTitle", "Send Notification"),
      route: "/notifications/send",
      view: <SendNotificationsView />,
    },
    {
      name: t("Auth.Messaging.Title"),
      route: "/messaging",
      view: <MessagingView />,
    },
    // <initia-generated-admin-app-routes>
    // </initia-generated-admin-app-routes>
  ];

  const showSidebar = !location.pathname.includes("apply");

  // const filteredRoutes = authRoutes.filter(({ users }) =>
  //   users.includes(user.role)
  // );

  const filteredFixedRoutes = authRoutes.filter(({ fixed, showInNav }) => fixed && showInNav);

  const toggleSidebar = () => setCollapsed((current) => !current);

  // Setup command palette commands
  const commands: Command[] = authRoutes
    .filter((route) => route.showInNav || route.fixed)
    .map((route) => ({
      id: route.route,
      name: route.name,
      action: () => {
        navigate(route.route);
        setIsCommandPaletteOpen(false);
      },
      icon: route.icon ? "fas fa-arrow-right" : undefined,
    }));

  // Setup floating speed dial actions
  const speedDialActions: SpeedDialAction[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "fas fa-home",
      onClick: () => navigate("/dashboard"),
    },
    {
      id: "users",
      label: "Users",
      icon: "fas fa-users",
      onClick: () => navigate("/users"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: "fas fa-cog",
      onClick: () => navigate("/metadata"),
    },
    {
      id: "messages",
      label: "Messages",
      icon: "fas fa-envelope",
      onClick: () => navigate("/messaging"),
    },
  ];

  useEffect(() => {
    applyRouteChanges(t, authRoutes, location.pathname);
  }, [location.pathname]);

  const searchOptions: TopbarSearchOption[] = authRoutes
    .filter(({ route }) => !route.includes(":"))
    .map(({ name, route }) => ({
      label: name,
      route,
      description: route,
      section: route.split("/")[1]?.replaceAll("-", " ") || t("Global.Labels.All"),
      keywords: route.split("/").filter(Boolean),
    }));

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
            <DashboardNavbar
              searchOptions={searchOptions}
              onSearchSelect={(option) => navigate(option.route)}
              searchPlaceholder={t("Global.TopbarSearch.Placeholder")}
            />

            <Routes>
              {authRoutes.map(({ route, view }, i) => (
                <Route path={route} element={view} key={i} />
              ))}

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>

          <FilePreviewModal />

          <CommandPalette
            commands={commands}
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            openShortcut="Ctrl+K"
          />

          <FloatingSpeedDial
            actions={speedDialActions}
            position="bottom-right"
            direction="up"
            mainIcon="fas fa-plus"
          />

          <AuthFooter />

          <OffCanvasTools />
        </div>
      </main>
    </Fragment>
  );
};

export default AuthLayout;
