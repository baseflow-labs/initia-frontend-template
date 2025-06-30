import {
  faBezierCurve,
  faBoxOpen,
  faEdit,
  faGear,
  faHome,
  faInfoCircle,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

import { useAppSelector } from "../../store/hooks";
import AidsView from "../../views/auth/aids";
import AidsBeneficiaryView from "../../views/auth/aids/request";
import ApplicantsView from "../../views/auth/applicants";
import BeneficiariesView from "../../views/auth/beneficiaries";
import BeneficiaryOwnProfile from "../../views/auth/beneficiaries/beneficiaryProfile";
import BeneficiaryProfileView from "../../views/auth/beneficiaries/profile";
import BeneficiaryFormReview from "../../views/auth/beneficiaries/review";
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
import Sidebar from "./sidebar";

const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(false);

  const authRoutes = [
    {
      name: t("Auth.MembershipRegistration.Title"),
      route: "/apply",
      showInNav: user.role === "beneficiary",
      view: <MembershipRegistrationView />,
      icon: faEdit,
      users: ["beneficiary", "researcher", "admin"],
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardView />,
      showInNav: true,
      icon: faHome,
      users: ["beneficiary", "researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Applications"),
      route: "/applicants",
      view: <ApplicantsView />,
      showInNav: true,
      icon: faUsers,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Title"),
      route: "/beneficiary",
      view: <BeneficiariesView />,
      showInNav: true,
      icon: faUsers,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Profile.Title"),
      route: "/beneficiary/review/",
      view: <BeneficiaryFormReview />,
      icon: faUsers,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Beneficiaries.Profile.Title"),
      route: "/beneficiary/profile/",
      view: <BeneficiaryProfileView />,
      icon: faUsers,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Visits.Title"),
      route: "/visitSchedule",
      view: <VisitsView />,
      showInNav: true,
      icon: faBezierCurve,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Visits.Detail.title"),
      route: "/visitSchedule/detail",
      view: <VisitDetailView />,
      icon: faEdit,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Visits.Visits"),
      route: "/beneficiary/visitSchedule",
      view: <BeneficiariesVisitsView />,
      showInNav: true,
      icon: faBezierCurve,
      users: ["beneficiary"],
    },
    {
      name: t("Auth.Visits.Report.Title"),
      route: "/visitSchedule/report",
      view: <VisitReportsView />,
      showInNav: false,
      icon: faBezierCurve,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Visits.Detail.title"),
      route: "/visitSchedule/report/details",
      view: <VisitDetailView />,
      icon: faEdit,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Aids.Title"),
      route: "/aid",
      view: <AidsView />,
      showInNav: true,
      icon: faBoxOpen,
      users: ["researcher", "admin"],
    },
    {
      name: t("Auth.Aids.Beneficiary.Title"),
      route: "/beneficiary/aid",
      view: <AidsBeneficiaryView />,
      showInNav: true,
      icon: faBoxOpen,
      users: ["beneficiary"],
    },
    {
      name: t("Auth.Beneficiary.Profile.Title"),
      route: "/beneficiary/profile",
      view: <BeneficiaryOwnProfile />,
      showInNav: true,
      icon: faUser,
      users: ["beneficiary"],
    },
    {
      name: t("Auth.ContactUs.Title"),
      route: "/contact-us",
      view: <ContactUsPage />,
      icon: faInfoCircle,
      users: ["beneficiary", "admin"],
    },
    {
      name: t("Auth.Settings.Title"),
      route: "/settings",
      view: <SettingsPage />,
      icon: faGear,
      users: ["beneficiary", "researcher", "admin"],
    },
  ];

  const showSidebar = !location.pathname.includes("apply");

  const filteredRoutes = authRoutes.filter(({ users }) =>
    users.includes(user.role)
  );

  const toggleSidebar = () => setCollapsed((current) => !current);

  return (
    <Fragment>
      {showSidebar ? "" : <Navbar />}

      <main className="d-flex">
        {showSidebar && (
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
              routes={filteredRoutes
                .filter(({ showInNav }) => showInNav)
                .map(({ view, ...rest }) => ({ ...rest }))}
            />
          </div>
        )}

        <div
          className="flex-grow-1"
          style={{
            marginRight: showSidebar ? (collapsed ? "80px" : "250px") : "0px",
            transition: "margin-right 0.3s",
          }}
        >
          {showSidebar && <DashboardNavbar />}

          <div className="p-0 px-2 px-md-5 w-100">
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
