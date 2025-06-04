import {
  faBezierCurve,
  faBoxOpen,
  faEdit,
  faGear,
  faHome,
  faInfoCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation } from "react-router";
import { Fragment } from "react/jsx-runtime";

import AidsView from "../../views/auth/aids";
import AidsBeneficiaryView from "../../views/auth/aids/request";
import BeneficiariesView from "../../views/auth/beneficiaries";
import BeneficiaryProfileView from "../../views/auth/beneficiaries/profile";
import ContactUsPage from "../../views/auth/contact-us";
import DashboardView from "../../views/auth/dashboard";
import MembershipRegistrationView from "../../views/auth/membershipRegistration";
import VisitsView from "../../views/auth/visits";
import VisitReportsView from "../../views/auth/visits/reports";
import FourZeroFourError from "../../views/common/404";
import DashboardNavbar from "./dashboardNavbar";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import SettingsPage from "../../views/auth/settings";
import BeneficiariesVisitsView from "../../views/auth/visits/beneficiaryVisits";

const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const authRoutes = [
    {
      name: t("Auth.MembershipRegistration.Title"),
      route: "/apply",
      view: <MembershipRegistrationView />,
      icon: faEdit,
    },
    {
      name: t("Auth.Dashboard.Title"),
      route: "/dashboard",
      view: <DashboardView />,
      showInNav: true,
      icon: faHome,
    },
    {
      name: t("Auth.Beneficiaries.Title"),
      route: "/beneficiaries",
      view: <BeneficiariesView />,
      showInNav: true,
      icon: faUsers,
    },
    {
      name: t("Auth.Beneficiaries.Profile.Title"),
      route: "/beneficiaries/profile/",
      view: <BeneficiaryProfileView />,
      icon: faUsers,
    },
    {
      name: t("Auth.Visits.Title"),
      route: "/visits",
      view: <VisitsView />,
      showInNav: true,
      icon: faBezierCurve,
    },
    {
      name: t("Auth.Visits.Visits"),
      route: "/beneficiary/visits",
      view: <BeneficiariesVisitsView />,
      showInNav: true,
      icon: faBezierCurve,
    },
    {
      name: t("Auth.Visits.Report.Title"),
      route: "/visits/report",
      view: <VisitReportsView />,
      showInNav: false,
      icon: faBezierCurve,
    },
    {
      name: t("Auth.Aids.Title"),
      route: "/aids",
      view: <AidsView />,
      showInNav: true,
      icon: faBoxOpen,
    },
    {
      name: t("Auth.Aids.Beneficiary.Title"),
      route: "/beneficiary/aids",
      view: <AidsBeneficiaryView />,
      showInNav: true,
      icon: faBoxOpen,
    },
    {
      name: t("Auth.ContactUs.Title"),
      route: "/contact-us",
      view: <ContactUsPage />,
      icon: faInfoCircle,
    },
    {
      name: t("Auth.Settings.Title"),
      route: "/settings",
      view: <SettingsPage />,
      icon: faGear,
    },
  ];

  const showSidebar =
    location.pathname !== "/apply" && location.pathname !== "apply";

  return (
    <Fragment>
      {showSidebar ? "" : <Navbar />}

      <main className="m-0 row">
        <div className="col-md-2 p-0">
          {showSidebar && (
            <Sidebar
              routes={authRoutes
                .filter(({ showInNav }) => showInNav)
                .map(({ view, ...rest }) => ({ ...rest }))}
            />
          )}
        </div>

        <div className={`col-md-${showSidebar ? 10 : 12} p-0 ps-4`}>
          {showSidebar && <DashboardNavbar />}

          <div className="py-5 px-3">
            <Routes>
              {authRoutes.map(({ name, route, view }, i) => (
                <Route path={route} element={view} key={i} />
              ))}

              <Route path="*" element={<FourZeroFourError />} />
            </Routes>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default AuthLayout;
