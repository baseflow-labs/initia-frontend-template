import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation, useNavigate } from "react-router";

import bgImage from "../../assets/images/brand/logo-full.png";
import Button from "../../components/core/button";
import ForgotPasswordView from "../../views/public/forgotPassword";
import LoginView from "../../views/public/login";
import OtpView from "../../views/public/otp";
import RegisterView from "../../views/public/register";
import RegistrationOtpView from "../../views/public/registerOtp";
import ResetPasswordView from "../../views/public/ResetPassword";

const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

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
      route: "/otp",
      view: <OtpView />,
      show: false,
    },
    {
      name: t("Public.ForgotPassword.GotOtp.Title"),
      route: "/register/otp",
      view: <RegistrationOtpView />,
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
    <main>
      <div className="vh-100 vw-100 d-flex justify-content-center align-items-center public-bg-image">
        <div
          className="card shadow p-4 rounded-5"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="card-body text-center">
            <img
              src={bgImage}
              className="w-50 px-1 mb-4"
              role="button"
              onClick={() => navigate("/")}
            />
            {(location.pathname === "/" ||
              location.pathname === "/register") && (
              <div className="my-4 p-2 bg-light w-fit mx-auto rounded-5">
                {publicRoutes
                  .filter(({ show }) => show)
                  .map(({ name, route, view }, i) => {
                    const isSelected = location.pathname === route;

                    const settings = isSelected
                      ? {
                          color: "info",
                          style: {
                            backgroundColor: "rgba(24,180,191,0.15)",
                          },
                          className: "text-info",
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

            <p className="card-text">
              <Routes>
                {publicRoutes.map(({ name, route, view }, i) => (
                  <Route path={route} element={view} key={i} />
                ))}
              </Routes>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
