import tempLogo from "@initia/shared/assets/images/brand/logo.png";
import { useAppSelector } from "../../../store/hooks";
import { faCircle, faCircleDot } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

import { MenuItem, MenuList } from "./menuItemRenderer";

interface Props {
  routes: MenuItem[];
  fixedRoutes: MenuItem[];
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ routes, collapsed, toggleSidebar, fixedRoutes }: Props) => {
  const { i18n } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const { logo, logoFull } = useAppSelector((state) => state.settings);
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

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
        <div className={`p-4 pb-0 ${collapsed ? "text-center" : ""} flex-shrink-0`}>
          <img
            src={(collapsed ? logo : logoFull) || tempLogo}
            style={{ height: "40px" }}
            alt="Logo"
          />
        </div>

        <div
          className="text-primary bg-white p-1 rounded-circle border-1 m-0 mt-4 position-absolute"
          style={{
            zIndex: 5,
            left: i18n.language === "ar" ? -13 : undefined,
            right: i18n.language === "en" ? -13 : undefined,
            cursor: "pointer",
          }}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={collapsed ? faCircle : faCircleDot} />
        </div>

        <hr className="mx-3 flex-shrink-0" />

        <div
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            flex: 1,
            minHeight: 0,
            maxHeight: "60vh",
          }}
        >
          <MenuList
            items={routes}
            collapsed={collapsed}
            userRole={user.role}
            expandedMenus={expandedMenus}
            onToggleMenu={toggleMenu}
          />
        </div>

        <hr className="mx-3 flex-shrink-0" />

        <div className="flex-shrink-0">
          <MenuList
            items={fixedRoutes}
            collapsed={collapsed}
            userRole={user.role}
            expandedMenus={expandedMenus}
            onToggleMenu={toggleMenu}
          />
        </div>
      </nav>
    </Fragment>
  );
};

export default Sidebar;
