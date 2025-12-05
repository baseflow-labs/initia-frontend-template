import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

import tempLogo from "../../../assets/images/brand/logo.png";
import { useAppSelector } from "../../../store/hooks";
import CopyRightView from "../../common/copyright";

interface Props {
  routes: {
    name: string;
    labelNote?: string;
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
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const { logo } = useAppSelector((state) => state.settings);

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
        <div className="p-4 text-center">
          <img
            src={logo || tempLogo}
            style={{ height: "40px" }}
            alt="Logo"
          />
        </div>

        <div className="nav flex-column px-2">
          {routes.map(({ name, route, icon, labelNote }, i) => (
            <Fragment key={i}>
              <h5
                className={`sidebar-link text-decoration-none p-3 rounded-3 ${
                  location.pathname.includes(route)
                    ? "bg-primary text-white"
                    : "text-dark"
                }`}
                role="button"
                onClick={() => {
                  navigate(route);
                }}
              >
                <FontAwesomeIcon icon={icon} className="me-2" />
                {!collapsed && (
                  <span>
                    {name}

                    {user.role === "admin" && (
                      <div className="text-end w-100">
                        <small>{labelNote}</small>
                      </div>
                    )}
                  </span>
                )}
              </h5>

              {i === 0 && (
                <button
                  className="btn toggle-btn float-end bg-white rounded-circle border-dark border-1 px-2 m-0 position-absolute"
                  style={{
                    zIndex: 5,
                    left: i18n.language === "ar" ? -12.5 : undefined,
                    right: i18n.language === "en" ? -12.5 : undefined,
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
                  ? "bg-primary text-white"
                  : "text-dark"
              }`}
              role="button"
              onClick={() => {
                navigate(route);
              }}
            >
              <FontAwesomeIcon icon={icon} className="me-2" />
              {!collapsed && <span>{name}</span>}
            </h5>
          ))}
        </div>

        <div className="mt-auto mb-3 text-center">
          <CopyRightView short={collapsed} />
        </div>
      </nav>
    </Fragment>
  );
};

export default Sidebar;
