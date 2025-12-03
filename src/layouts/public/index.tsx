import { useTranslation } from "react-i18next";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";

import Button from "../../components/core/button";
import { useAppSelector } from "../../store/hooks";
import ForgotPasswordView from "../../views/public/forgotPassword";
import LoginView from "../../views/public/login";
import RegisterView from "../../views/public/register";
import ResetPasswordView from "../../views/public/ResetPassword";
import TermsConditions from "../../views/public/termsConditions";
import CopyRightView from "../common/copyright";

const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logo } = useAppSelector((state) => state.settings);

  const publicRoutes = [
    {
      name: t("Public.Login.Title"),
      route: "/",
      view: <LoginView />,
      show: true,
    },
    {
      name: t("Public.Register.Title"),
      route: "/register",
      view: <RegisterView />,
      show: true,
    },
    {
      name: t("Public.ForgotPassword.Title"),
      route: "/forgot-password",
      view: <ForgotPasswordView />,
      show: false,
    },
    {
      name: t("Public.ForgotPassword.GotOtp.Title"),
      route: "/terms-conditions",
      view: <TermsConditions />,
      show: false,
    },
    {
      name: t("Public.ForgotPassword.ResetPassword.Title"),
      route: "/reset-password",
      view: <ResetPasswordView />,
      show: false,
    },
  ];

  return (
    <main className="overflow-x-hidden">
      <div className="min-vh-100 vw-100 d-flex justify-content-center align-items-center public-bg-image px-3 px-lg-4 py-3">
        <div
          className="card pt-4 px-2 px-lg-4 rounded-5"
          style={
            location.pathname === "/terms-conditions"
              ? { height: "100vh", width: "100%" }
              : { maxWidth: "500px", width: "100%" }
          }
        >
          <div className="card-body text-center">
            <img
              alt="bg-image"
              src={process.env.REACT_APP_STORAGE_DIRECTORY_URL + logo}
              className="w-50 px-1 mb-4"
              style={{ maxWidth: "350px" }}
              role="button"
              onClick={() => navigate("/")}
            />

            <div className="d-flex">
              {(location.pathname === "/" ||
                location.pathname === "/register") && (
                <div className="my-4 p-2 bg-light w-fit mx-auto rounded-5">
                  {publicRoutes
                    .filter(({ show }) => show)
                    .map(({ name, route, view }, i) => {
                      const isSelected = location.pathname === route;

                      const settings = isSelected
                        ? {
                            color: "opacity-primary",
                            style: {
                              backgroundColor: "rgba(24,180,191,0.15)",
                            },
                            className: "text-primary",
                          }
                        : {
                            color: "ghost",
                            style: {},
                            className: "text-black",
                          };

                      return (
                        <Button
                          color={settings.color}
                          style={settings.style}
                          className={`mx-1 border-0 ${settings.className}`}
                          rounded={5}
                          route={route}
                          key={i}
                        >
                          <span className={settings.className}>{name}</span>
                        </Button>
                      );
                    })}
                </div>
              )}

              {/* <LangButton /> */}
            </div>

            <div className="card-text">
              <Routes>
                {publicRoutes.map(({ name, route, view }, i) => (
                  <Route path={route} element={view} key={i} />
                ))}

                <Route path="*" element={<Navigate to="/" replace />} />
                {/* <Route path="*" element={<FourZeroFourError />} /> */}
              </Routes>

              <div className="mt-4">
                <CopyRightView oneLine />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
