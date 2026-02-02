import { Fragment, useState } from "react";
import OffcanvasComp from "@initia/shared/ui/components/offcanvas";

import { useAppSelector } from "../../../store/hooks";

import { MenuItem, MenuList } from "./menuItemRenderer";

interface Props {
  routes: MenuItem[];
  fixedRoutes: MenuItem[];
}

const OffCanvasNav = ({ routes, fixedRoutes }: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { logoFull } = useAppSelector((state) => state.settings);
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  return (
    <OffcanvasComp
      id="offcanvasNav"
      logoFull={logoFull || undefined}
      content={(handleDismiss) => (
        <Fragment>
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
        </Fragment>
      )}
    />
  );
};

export default OffCanvasNav;
