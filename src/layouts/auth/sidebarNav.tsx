import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import Logo from "../../assets/images/brand/logo-full.png";
import LogoOnly from "../../assets/images/brand/logo-only.png";
import IconWrapperComp from "../../assets/icons/wrapper";

interface Props {
  routes: {
    name: string;
    route: string;
    icon: any;
  }[];
  fixedRoutes: {
    name: string;
    route: string;
    icon: any;
  }[];
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ routes, collapsed, toggleSidebar, fixedRoutes }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Fragment>
      <nav
        className={`sidebar d-flex flex-column flex-shrink-0 position-fixed bg-light min-vh-100 ${
          collapsed ? "collapsed-sidebar" : ""
        }`}
        style={{
          width: collapsed ? "80px" : "250px",
          transition: "0.3s",
          zIndex: 4,
        }}
      >
        <div className="p-4">
          <img src={collapsed ? LogoOnly : Logo} className="w-100" alt="Logo" />
        </div>

        <div className="nav flex-column px-2">
          {routes.map(({ name, route, icon }, i) => (
            <Fragment key={i}>
              <h5
                className={`sidebar-link text-decoration-none p-3 rounded-3 ${
                  location.pathname.includes(route)
                    ? "bg-info text-white"
                    : "text-dark"
                }`}
                role="button"
                onClick={() => {
                  navigate(route);
                }}
              >
                <IconWrapperComp icon={icon} className="me-2" />
                {!collapsed && <span>{name}</span>}
              </h5>

              {i === 0 && (
                <button
                  className="btn toggle-btn float-end bg-white rounded-circle border-dark border-1 m-0 position-absolute"
                  style={{
                    zIndex: 5,
                    left: -20,
                  }}
                  onClick={toggleSidebar}
                >
                  <FontAwesomeIcon
                    icon={collapsed ? faChevronLeft : faChevronRight}
                  />
                </button>
              )}
            </Fragment>
          ))}
        </div>

        <hr className="mx-3" />

        <div className="nav flex-column px-2">
          {fixedRoutes.map(({ name, route, icon }, i) => (
            <h5
              key={i}
              className={`sidebar-link text-decoration-none p-3 rounded-3 ${
                location.pathname.includes(route)
                  ? "bg-info text-white"
                  : "text-dark"
              }`}
              role="button"
              onClick={() => {
                navigate(route);
              }}
            >
              <IconWrapperComp icon={icon} className="me-2" />
              {!collapsed && <span>{name}</span>}
            </h5>
          ))}
        </div>
      </nav>
    </Fragment>
  );
};

export default Sidebar;
