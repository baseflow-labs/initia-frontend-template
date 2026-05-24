import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";
import { faDashboard, faGear, faTable } from "@fortawesome/free-solid-svg-icons";
import { USER_FEATURES, canAccessUserFeature } from "@initia/core";
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

import DashboardView from "../../views/auth/dashboard";
import SupportCenterView from "../../views/auth/supportCenter";
import ContactUsView from "../../views/auth/supportCenter/contact-us";
import FaqView from "../../views/auth/supportCenter/faq";
import SupportTicketsView from "../../views/auth/supportCenter/tickets";
import UserManualView from "../../views/auth/supportCenter/user-manual";
import TemplateDataTableExampleView from "../../views/auth/templateExamples/datatablePage";
import TemplateDataTableRecordView from "../../views/auth/templateExamples/datatablePage/record";
import TemplateDataViewExamplesView from "../../views/auth/templateExamples/dataView";
import TemplateFormExamplesView from "../../views/auth/templateExamples/forms";
import FormOfFormsView from "../../views/auth/templateExamples/formOfForms";
import ChatbotView from "../../views/auth/chatbot";
import UserProfileView from "../../views/auth/user/profile";
import UserSettingsView from "../../views/auth/user/settings";
import AuthFooter from "../common/footer";
import { useAppSelector } from "../../store/hooks";

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
  icon: IconProp;
  fixed?: boolean;
  subRoute?: AuthRoute[];
  /**
   * Optional permission gate. When set, the route is only rendered (and shown in
   * navigation) when the logged-in user's role has the matching permission.
   * Admins always pass through regardless of this field.
   */
  permission?: { table: string; action: string };
}

const AuthLayout = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isPc = width > 992;

  const [collapsed, setCollapsed] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const { user, permissions } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === "admin";

  /** Returns true when the route is accessible by the current user */
  const viewMap: Record<string, React.ReactNode> = {
    dashboard: <DashboardView />,
    profile: <UserProfileView />,
    messaging: <MessagingView />,
    notifications: <NotificationsView />,
    settings: <UserSettingsView />,
    "support-center": <SupportCenterView />,
    "support-center-faq": <FaqView />,
    "support-center-contact-us": <ContactUsView />,
    "support-center-tickets": <SupportTicketsView />,
    "support-center-user-manual": <UserManualView />,
    chatbot: <ChatbotView />,
    "template-examples-data-view": <TemplateDataViewExamplesView />,
    "template-examples-data-table": <TemplateDataTableExampleView />,
    "template-examples-data-table-new": <TemplateDataTableRecordView />,
    "template-examples-data-table-id": <TemplateDataTableRecordView />,
    "template-examples-forms": <TemplateFormExamplesView />,
    "template-examples-form-of-forms": <FormOfFormsView />,
  };
  const iconMap: Record<string, IconProp> = {
    dashboard: faDashboard,
    profile: faGear,
    messaging: faGear,
    notifications: faGear,
    settings: faGear,
    "support-center": faGear,
    "support-center-faq": faGear,
    "support-center-contact-us": faGear,
    "support-center-tickets": faGear,
    "support-center-user-manual": faGear,
    "template-examples-data-view": faDashboard,
    "template-examples-data-table": faTable,
    "template-examples-data-table-new": faTable,
    "template-examples-data-table-id": faTable,
    "template-examples-forms": faWpforms,
    chatbot: faGear,
  };
  const authRoutes: AuthRoute[] = USER_FEATURES.map((feature) => ({
    name: t(feature.titleKey),
    route: feature.path,
    view: viewMap[feature.key],
    showInNav: feature.showInNav,
    fixed: feature.fixed,
    permission: feature.permission,
    icon: iconMap[feature.key] ?? faGear,
  })).filter((route) => Boolean(route.view));

  // Filter routes the current user can access
  const accessibleRoutes = authRoutes.filter((route) =>
    canAccessUserFeature(route, permissions, isAdmin)
  );

  const showSidebar = !location.pathname.includes("apply");

  const filteredFixedRoutes = accessibleRoutes.filter(({ fixed, showInNav }) => fixed && showInNav);

  const toggleSidebar = () => setCollapsed((current) => !current);

  // Setup command palette commands
  const commands: Command[] = accessibleRoutes
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
      id: "profile",
      label: "Profile",
      icon: "fas fa-user",
      onClick: () => navigate("/profile"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: "fas fa-cog",
      onClick: () => navigate("/settings"),
    },
    {
      id: "messages",
      label: "Messages",
      icon: "fas fa-envelope",
      onClick: () => navigate("/messaging"),
    },
  ];

  useEffect(() => {
    applyRouteChanges(t, accessibleRoutes, location.pathname);
  }, [location.pathname]);

  const searchOptions: TopbarSearchOption[] = accessibleRoutes
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
        routes={accessibleRoutes.filter(({ showInNav, fixed }) => showInNav && !fixed)}
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
              routes={accessibleRoutes.filter(({ showInNav, fixed }) => showInNav && !fixed)}
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
              {accessibleRoutes.map(({ route, view }, i) => (
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
