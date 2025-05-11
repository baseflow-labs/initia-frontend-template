import { useTranslation } from "react-i18next";
import { Route, Routes, useLocation } from "react-router";
import bgImage from "../../assets/images/brand/logo-full.png";
import Button from "../../components/core/button";
import LoginView from "../../views/public/login";
import RegisterView from "../../views/public/register";

const AuthLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const publicRoutes = [
    { name: t("Public.Login.Title"), route: "/", view: <LoginView /> },
    {
      name: t("Public.Register.Title"),
      route: "/register",
      view: <RegisterView />,
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
            <img src={bgImage} className="w-50 px-1" />
            <div className="my-4 p-2 bg-light w-fit mx-auto rounded-5">
              {publicRoutes.map(({ name, route, view }, i) => {
                const isSelected = location.pathname == route;

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
