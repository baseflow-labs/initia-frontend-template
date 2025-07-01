import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

import {
  aidsIcon,
  beneficiariesIcon,
  contactIcon,
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
import AidsView from "../../views/auth/aids";
import AidsBeneficiaryView from "../../views/auth/aids/request";
import ApplicantsView from "../../views/auth/applicants";
import BeneficiaryFormReview from "../../views/auth/applicants/review";
import BeneficiariesView from "../../views/auth/beneficiaries";
import BeneficiaryOwnProfile from "../../views/auth/beneficiaries/beneficiaryProfile";
import BeneficiaryProfileView from "../../views/auth/beneficiaries/profile";
import ContactUsPage from "../../views/auth/contact-us";
import DashboardView from "../../views/auth/dashboard";
import MembershipRegistrationView from "../../views/auth/membershipRegistration";
import SettingsPage from "../../views/auth/settings";
import VisitsView from "../../views/auth/visits";
import VisitReportsView from "../../views/auth/visits/addReport";
import BeneficiariesVisitsView from "../../views/auth/visits/beneficiaryVisits";
import VisitDetailView from "../../views/auth/visits/reportDetails";
import DashboardNavbar from "./dashboardNavbar";
import { FilePreviewModal } from "./globalModal";
import Navbar from "./navbar";
import OffCanvasNav from "./offcanvasNav";
import Sidebar from "./sidebarNav";
import DemoWarning from "./demoWarning";

const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const width = useWindowWidth();
  const isPc = width > 992;

  const [collapsed, setCollapsed] = useState(false);

  const authRoutes = [
    {
      name: t("Auth.MembershipRegistration.Title"),
      route: "/apply",
      showInNav: user.role === "beneficiary",
      view: <MembershipRegistrationView />,
      icon: membershipFormIcon,
      users: ["beneficiary", "researcher", "admin"],
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardView />,
      showInNav: true,
      icon: dashboardIcon,
      users: ["beneficiary", "researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Applications"),
      route: "/applicants",
      view: <ApplicantsView />,
      showInNav: true,
      icon: beneficiariesIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Title"),
      route: "/beneficiary",
      view: <BeneficiariesView />,
      showInNav: true,
      icon: beneficiariesIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Profile.Title"),
      route: "/review/",
      view: <BeneficiaryFormReview />,
      icon: beneficiariesIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Profile.Title"),
      route: "/profile/",
      view: <BeneficiaryProfileView />,
      icon: beneficiariesIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Visits.Title"),
      route: "/visitSchedule",
      view: <VisitsView />,
      showInNav: true,
      icon: visitsIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Visits.Detail.title"),
      route: "/visitSchedule/detail",
      view: <VisitDetailView />,
      icon: visitsIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Visits.Visits"),
      route: "/beneficiary/visitSchedule",
      view: <BeneficiariesVisitsView />,
      showInNav: true,
      icon: visitsIcon,
      users: ["beneficiary"],
    },
    {
      name: t("Auth.Visits.Report.Title"),
      route: "/visitSchedule/report",
      view: <VisitReportsView />,
      showInNav: false,
      icon: visitsIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Visits.Detail.title"),
      route: "/visitSchedule/report/details",
      view: <VisitDetailView />,
      icon: visitReportIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Aids.Title"),
      route: "/aid",
      view: <AidsView />,
      showInNav: true,
      icon: aidsIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Aids.Beneficiary.Title"),
      route: "/beneficiary/aid",
      view: <AidsBeneficiaryView />,
      showInNav: true,
      icon: aidsIcon,
      users: ["beneficiary"],
    },
    {
      name: t("Auth.Beneficiary.Profile.Title"),
      route: "/profile",
      view: <BeneficiaryOwnProfile />,
      showInNav: true,
      icon: profileIcon,
      users: ["beneficiary"],
    },
    {
      name: t("Auth.ContactUs.Title"),
      route: "/contact-us",
      view: <ContactUsPage />,
      icon: infoIcon,
      users: ["beneficiary", "admin"],
    },
    {
      name: t("Auth.Settings.Title"),
      route: "/settings",
      view: <SettingsPage />,
      icon: settingsIcon,
      users: ["beneficiary", "researcher", "admin"],
    },
  ];

  const fixedRoutes = [
    {
      name: t("Auth.ContactUs.Title"),
      route: "/contact-us",
      icon: contactIcon,
    },
    { name: t("Auth.Settings.Title"), route: "/settings", icon: settingsIcon },
  ];

  const showSidebar = !location.pathname.includes("apply");

  const filteredRoutes = authRoutes.filter(({ users }) =>
    users.includes(user.role)
  );

  const toggleSidebar = () => setCollapsed((current) => !current);

  return (
    <Fragment>
      {!showSidebar ? <Navbar /> : ""}

      <DemoWarning />

      <OffCanvasNav
        fixedRoutes={fixedRoutes}
        routes={filteredRoutes
          .filter(({ showInNav }) => showInNav)
          .map(({ view, ...rest }) => ({ ...rest }))}
      />

      <main className="d-flex">
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
              fixedRoutes={fixedRoutes}
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
              showSidebar && isPc ? (collapsed ? "80px" : "250px") : "0px",
            transition: "margin-right 0.3s",
          }}
        >
          {showSidebar && <DashboardNavbar />}

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
