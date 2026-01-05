import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGear, faGlobe } from "@fortawesome/free-solid-svg-icons";
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
import SystemSettingsView from "@/views/common/systemSettings";
import LandingPageManagement from "@/views/common/landingPage";

interface AuthRoute {
  name: string;
  route: string;
  view: React.ReactNode;
  showInNav?: boolean;
  icon: IconProp;
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
      name: t("Auth.Settings.Admin.Title"),
      route: "/system-settings",
      view: <SystemSettingsView />,
      showInNav: true,
      icon: faGear,
      fixed: true,
    },
    {
      name: t("Auth.LandingPage.Title"),
      route: "/landing-page-management",
      view: <LandingPageManagement />,
      icon: faGlobe,
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
