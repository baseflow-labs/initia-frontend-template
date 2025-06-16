import {
  faGear,
  faHome,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import Logo from "../../assets/images/brand/logo-full.png";

const Sidebar = ({ routes = [{ name: "", route: "", icon: faHome }] }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  const fixedRoutes = [
    {
      name: t("Auth.ContactUs.Title"),
      route: "/contact-us",
      icon: faInfoCircle,
    },
    { name: t("Auth.Settings.Title"), route: "/settings", icon: faGear },
  ];

  return (
    <div
      className="d-flex flex-column p-3 bg-light m-0 min-vh-100 h-100 w-100"
      style={{ overflowY: "auto" }}
    >
      <span
        className="navbar-brand p-3 mb-5 px-4"
        onClick={() => navigate("/dashboard")}
        role="button"
      >
        <img src={Logo} style={{ height: "75px" }} />
      </span>

      <ul className="nav nav-pills flex-column mb-3">
        {routes.map(({ name, route, icon }, i) => (
          <li className="nav-item my-1" key={i}>
            <h5
              onClick={() => navigate(route)}
              role="button"
              className={`p-2 rounded-3 ${
                location.pathname.includes(route)
                  ? "bg-info text-white"
                  : "text-dark"
              }`}
            >
              <FontAwesomeIcon icon={icon} className="me-2" />
              {name}
            </h5>
          </li>
        ))}
      </ul>

      <hr />

      <ul className="nav nav-pills flex-column mb-3">
        {fixedRoutes.map(({ name, route, icon }, i) => (
          <li className="nav-item my-1" key={i}>
            <h5
              onClick={() => navigate(route)}
              role="button"
              className={`p-2 rounded-3 ${
                location.pathname.includes(route)
                  ? "bg-info text-white"
                  : "text-dark"
              }`}
            >
              <FontAwesomeIcon icon={icon} className="me-2" />
              {name}
            </h5>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
