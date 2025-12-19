import { useAppSelector } from "@/store/hooks";
import { useState } from "react";

import tempLogo from "@/assets/images/brand/logo.png";
import { MenuItem, MenuList } from "./menuItemRenderer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface Props {
  routes: MenuItem[];
  fixedRoutes: MenuItem[];
}

const OffCanvasNav = ({ routes, fixedRoutes }: Props) => {
  const { logoFull } = useAppSelector((state) => state.settings);
  const { user } = useAppSelector((state) => state.auth);
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleDismiss = () => {
    const offcanvasElement = document.getElementById("offcanvasNav");
    if (offcanvasElement) {
      const bsOffcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasElement);
      bsOffcanvas?.hide();
    }
  };

  return (
    <div
      className="offcanvas offcanvas-start border-0"
      id="offcanvasNav"
      aria-labelledby="offcanvasNavLabel"
      style={{ maxWidth: "70vw", maxHeight: "100vh", overflowY: "hidden" }}
    >
      <div className="offcanvas-header d-flex justify-content-around align-items-center mb-0 pb-0">
        <div>
          <img src={logoFull || tempLogo} style={{ height: "40px" }} alt="Logo" />
        </div>

        <button
          type="button"
          className="btn btn-ghost p-0 text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>

      <div className="offcanvas-body px-0 mt-0 d-flex flex-column" style={{ minHeight: 0 }}>
        <div
          style={{
            overflowY: "auto",
            overflowX: "hidden",
            flex: 1,
            minHeight: 0,
            maxHeight: "55vh",
          }}
        >
          <MenuList
            items={routes}
            userRole={user.role}
            expandedMenus={expandedMenus}
            onToggleMenu={toggleMenu}
            onDismiss={handleDismiss}
            isOffcanvas
          />
        </div>

        <hr className="mx-3 flex-shrink-0" />

        <div className="flex-shrink-0">
          <MenuList
            items={fixedRoutes}
            userRole={user.role}
            expandedMenus={expandedMenus}
            onToggleMenu={toggleMenu}
            onDismiss={handleDismiss}
            isOffcanvas
          />
        </div>
      </div>
    </div>
  );
};

export default OffCanvasNav;
