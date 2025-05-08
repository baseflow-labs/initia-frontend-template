import { useTranslation } from "react-i18next";
import LoginView from "../../views/public/login";
import { Route, Routes, useNavigate } from "react-router";
import bgImage from "../../assets/images/brand/logo-full.png";
import RegisterView from "../../views/public/register";
import Button from "../../components/core/button";

const AuthLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          className="card shadow p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div className="card-body text-center">
            <img src={bgImage} className="w-100 px-5" />

            <div className="my-2 p-1 bg-light">
              {publicRoutes.map(({ name, route, view }, i) => (
                <Button
                  color="info"
                  className="mx-1"
                  onClick={() => navigate(route)}
                  key={i}
                >
                  {name}
                </Button>
              ))}
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
