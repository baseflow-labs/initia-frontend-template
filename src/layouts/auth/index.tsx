import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

import { aidsIcon, beneficiariesIcon, dashboardIcon, infoIcon, membershipFormIcon, profileIcon, settingsIcon, visitReportIcon, visitsIcon } from "../../assets/icons/icons";
import { useAppSelector } from "../../store/hooks";
import { useWindowWidth } from "../../utils/hooks";
import AidsView from "../../views/auth/aids";
import AidsBeneficiaryView from "../../views/auth/aids/beneficiary";
import ApplicantsView from "../../views/auth/applicants";
import BeneficiaryFormReview from "../../views/auth/applicants/review";
import ApplicantsViewForSupervisor from "../../views/auth/applicants/supervisor";
import BeneficiariesView from "../../views/auth/beneficiaries";
import BeneficiaryOwnProfile from "../../views/auth/beneficiaries/beneficiaryProfile";
import BeneficiaryProfileView from "../../views/auth/beneficiaries/profile";
import BeneficiariesViewForSupervisor from "../../views/auth/beneficiaries/supervisor";
import ContactUsPage from "../../views/auth/contact-us";
import DashboardView from "../../views/auth/dashboard";
import DashboardResearcherView from "../../views/auth/dashboard/researcher";
import DashboardSupervisorView from "../../views/auth/dashboard/supervisor";
import MembershipRegistrationView from "../../views/auth/membershipRegistration";
import SettingsPage from "../../views/auth/settings";
import ResearcherMgmtPage from "../../views/auth/staff";
import VisitsView from "../../views/auth/visits";
import VisitReportsView from "../../views/auth/visits/addReport";
import BeneficiariesVisitsView from "../../views/auth/visits/beneficiaryVisits";
import VisitDetailView from "../../views/auth/visits/reportDetails";
import DashboardNavbar from "./dashboardNavbar";
import DemoWarning from "./demoWarning";
import { FilePreviewModal } from "./globalModal";
import Navbar from "./navbar";
import OffCanvasNav from "./offcanvasNav";
import Sidebar from "./sidebarNav";

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
      labelNote: "For Beneficiary",
      view: <DashboardView />,
      showInNav: true,
      icon: dashboardIcon,
      users: ["beneficiary", "admin"],
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      labelNote: "For Supervisor",
      view: <DashboardSupervisorView />,
      showInNav: true,
      icon: dashboardIcon,
      users: ["hod", "admin"],
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      labelNote: "For Researchers",
      view: <DashboardResearcherView />,
      showInNav: true,
      icon: dashboardIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Applications"),
      route: "/applicant",
      labelNote: "For Researchers",
      view: <ApplicantsView />,
      showInNav: true,
      icon: beneficiariesIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Applications"),
      route: "/applicant",
      labelNote: "For Supervisor",
      view: <ApplicantsViewForSupervisor />,
      showInNav: true,
      icon: beneficiariesIcon,
      users: ["hod", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Title"),
      route: "/beneficiary",
      labelNote: "For Researchers",
      view: <BeneficiariesView />,
      showInNav: true,
      icon: beneficiariesIcon,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Title"),
      route: "/beneficiary",
      labelNote: "For Supervisor",
      view: <BeneficiariesViewForSupervisor />,
      showInNav: true,
      icon: beneficiariesIcon,
      users: ["hod", "admin"],
    },
    {
      name: t("Auth.Researchers.Title"),
      route: "/staff",
      view: <ResearcherMgmtPage />,
      showInNav: true,
      icon: beneficiariesIcon,
      users: ["hod", "admin"],
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
      users: ["researcher", "hod", "admin"],
    },
    {
      name: t("Auth.Visits.Title"),
      route: "/visitSchedule",
      view: <VisitsView />,
      showInNav: true,
      icon: visitsIcon,
      users: ["researcher", "hod", "admin"],
    },
    {
      name: t("Auth.Visits.Visits"),
      route: "/visitSchedule",
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
      users: ["researcher", "hod", "admin"],
    },
    {
      name: t("Auth.Aids.Title"),
      route: "/aid",
      view: <AidsView />,
      showInNav: true,
      icon: aidsIcon,
      users: ["researcher", "hod", "admin"],
    },
    {
      name: t("Auth.Aids.Beneficiary.Title"),
      route: "/aid",
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
      fixed: true,
      users: ["beneficiary", "admin"],
    },
    {
      name: t("Auth.Settings.Title"),
      route: "/settings",
      view: <SettingsPage />,
      icon: settingsIcon,
      fixed: true,
      users: ["beneficiary", "researcher", "hod", "admin"],
    },
  ];

  const showSidebar = !location.pathname.includes("apply");

  const filteredRoutes = authRoutes
    .filter(({ users }) => users.includes(user.role))
    .map((r) =>
      user.role === "admin"
        ? {
            ...r,
            route:
              r.route + (r.labelNote ? r.labelNote?.replaceAll(" ", "") : ""),
          }
        : r
    );

  const filteredFixedRoutes = filteredRoutes.filter(({ fixed }) => fixed);

  const toggleSidebar = () => setCollapsed((current) => !current);

  return (
    <Fragment>
      {!showSidebar ? <Navbar /> : ""}

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
              showSidebar && isPc ? (collapsed ? "80px" : "250px") : "0px",
            transition: "margin-right 0.3s",
          }}
        >
          <DemoWarning />

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
