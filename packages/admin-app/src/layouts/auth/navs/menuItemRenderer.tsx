import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useLocation, useNavigate } from "react-router";

export interface MenuItem {
  name: string;
  route?: string;
  icon?: IconProp;
  badge?: { text: string; color: string };
  subRoute?: MenuItem[];
}

interface MenuItemRendererProps {
  item: MenuItem;
  depth?: number;
  collapsed?: boolean;
  userRole?: string;
  expandedMenus?: { [key: string]: boolean };
  onToggleMenu?: (menuName: string) => void;
  onDismiss?: () => void;
  isOffcanvas?: boolean;
}

export const MenuItemRenderer = ({
  item,
  depth = 0,
  collapsed = false,
  userRole = "user",
  expandedMenus = {},
  onToggleMenu,
  onDismiss,
  isOffcanvas = false,
}: MenuItemRendererProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const hasChildren = item.subRoute && item.subRoute.length > 0;
  const isActive = item.route ? location.pathname.includes(item.route) : false;
  const isExpanded = expandedMenus[item.name];

  const handleClick = () => {
    if (hasChildren) {
      onToggleMenu?.(item.name);
    } else if (item.route) {
      navigate(item.route);
      onDismiss?.();
    }
  };

  const itemClasses = `sidebar-link text-decoration-none p-2 rounded-2 mx-2 mb-1 transition-all cursor-pointer ${
    isActive && !hasChildren ? "bg-primary text-white" : "text-dark"
  } ${collapsed && depth === 0 ? "text-center" : ""}`;

  const itemStyle: React.CSSProperties = isOffcanvas
    ? {}
    : {
        marginLeft: depth > 0 ? `${depth * 12}px` : "0",
        fontSize: collapsed && depth === 0 ? "12px" : "14px",
      };

  return (
    <Fragment key={item.name}>
      <div className={itemClasses} style={itemStyle} role="button" onClick={handleClick}>
        <div
          className={collapsed ? "text-center" : "d-flex align-items-center"}
          style={{ minWidth: 0 }}
        >
          {item.icon && (
            <FontAwesomeIcon
              icon={item.icon}
              className={collapsed ? "" : "me-2"}
              style={{ minWidth: "16px" }}
            />
          )}
          {(!collapsed || depth > 0 || isOffcanvas) && (
            <span className={depth > 0 ? "text-truncate" : ""}>{item.name}</span>
          )}
          {hasChildren && (
            <FontAwesomeIcon
              icon={isExpanded ? faChevronUp : faChevronDown}
              className="ms-auto me-0"
            />
          )}
        </div>
      </div>

      {hasChildren && isExpanded && (!collapsed || isOffcanvas) && (
        <div className="submenu ms-1 border-start border-light ps-2 my-1">
          {item.subRoute?.map((child) => (
            <MenuItemRenderer
              key={child.name}
              item={child}
              depth={depth + 1}
              collapsed={collapsed}
              userRole={userRole}
              expandedMenus={expandedMenus}
              onToggleMenu={onToggleMenu}
              onDismiss={onDismiss}
              isOffcanvas={isOffcanvas}
            />
          ))}
        </div>
      )}
    </Fragment>
  );
};

interface MenuListProps {
  items: MenuItem[];
  collapsed?: boolean;
  userRole?: string;
  expandedMenus?: { [key: string]: boolean };
  onToggleMenu?: (menuName: string) => void;
  onDismiss?: () => void;
  isOffcanvas?: boolean;
}

export const MenuList = ({
  items,
  collapsed = false,
  userRole = "user",
  expandedMenus = {},
  onToggleMenu,
  onDismiss,
  isOffcanvas = false,
}: MenuListProps) => {
  return (
    <div className="nav flex-column px-2 text-center">
      {items.map((item) => (
        <MenuItemRenderer
          key={item.name}
          item={item}
          collapsed={collapsed}
          userRole={userRole}
          expandedMenus={expandedMenus}
          onToggleMenu={onToggleMenu}
          onDismiss={onDismiss}
          isOffcanvas={isOffcanvas}
        />
      ))}
    </div>
  );
};
