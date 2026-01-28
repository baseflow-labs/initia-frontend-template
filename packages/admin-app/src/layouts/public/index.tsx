import tempLogo from "@initia/shared/assets/images/brand/logo.png";
import Button from "@initia/shared/ui/components/core/button";
import ForgotPasswordView from "@initia/shared/ui/forgotPassword";
import LoginView from "@initia/shared/ui/login";
import ResetPasswordView from "@initia/shared/ui/ResetPassword";
import { applyRouteChanges } from "@initia/shared/utils/function";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router";

import { useAppSelector } from "../../store/hooks";
import CommonFooter from "../common/footer";

const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { logoFull } = useAppSelector((state) => state.settings);

  const publicRoutes = [
    {
      name: t("Public.Login.Title"),
      route: "/",
      view: <LoginView />,
      show: true,
    },
    {
      name: t("Public.ForgotPassword.Title"),
      route: "/forgot-password",
      view: <ForgotPasswordView />,
      show: false,
    },
    {
      name: t("Public.ForgotPassword.ResetPassword.Title"),
      route: "/reset-password",
      view: <ResetPasswordView />,
      show: false,
    },
  ];

  useEffect(() => {
    applyRouteChanges(t, publicRoutes, location.pathname);
  }, [location.pathname]);

  return (
    <main className="d-flex flex-column overflow-x-hidden min-vh-100 vw-100">
      <div className="d-flex justify-content-center align-items-center flex-grow-1 px-3 px-lg-4 py-3">
        <div
          className="card pt-4 px-2 px-lg-4 rounded-2"
          style={
            location.pathname === "/terms-conditions"
              ? { height: "100vh", width: "100%" }
              : { maxWidth: "500px", width: "100%" }
          }
        >
          <div className="card-body text-center">
            <img
              alt="bg-image"
              src={logoFull || tempLogo}
              className="w-50 px-1 mb-4"
              style={{ maxWidth: "350px" }}
              role="button"
              onClick={() => navigate("/")}
            />

            <div className="d-flex">
              {(location.pathname === "/" || location.pathname === "/register") && (
                <div className="my-4 p-2 bg-light w-fit mx-auto rounded-2">
                  {publicRoutes
                    .filter(({ show }) => show)
                    .map(({ name, route }, i) => {
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
                {publicRoutes.map(({ route, view }, i) => (
                  <Route path={route} element={view} key={i} />
                ))}

                <Route path="*" element={<Navigate to="/" replace />} />
                {/* <Route path="*" element={<FourZeroFourError />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-shrink-0 pb-3">
        <CommonFooter />
      </div>
    </main>
  );
};

export default AuthLayout;
