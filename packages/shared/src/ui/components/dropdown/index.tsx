import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import Button from "../core/button";

interface Props {
  header?: React.ReactNode;
  button: React.ReactNode;
  start?: boolean;
  link?: { text: string; route: string };
  list: {
    disabled?: boolean;
    route?: string;
    onClick?: () => void;
    label: string | React.ReactNode;
    icon?: IconProp;
  }[];
}

const DropdownComp = ({ header, button, list, start, link }: Props) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <Button
        color="link"
        className="text-secondary p-0"
        id="dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => setOpen((o) => !o)}
      >
        {button}
      </Button>

      <ul
        className={`dropdown-menu dropdown-menu-${start ? "start" : "end"} ${open ? "show" : ""}`}
        aria-labelledby="dropdown"
      >
        {header}

        {list.map(({ onClick, route, label, disabled, icon }, i) => (
          <li key={i}>
            <span
              className={"dropdown-item" + (disabled ? " disabled" : "")}
              role={disabled ? undefined : "button"}
              onClick={disabled ? undefined : route ? () => navigate(route) : onClick}
            >
              {icon && <FontAwesomeIcon icon={icon} className="me-2" />}
              {label}
            </span>
          </li>
        ))}

        {link?.route && (
          <Button className="w-100 rounded-0" onClick={() => navigate(link.route)}>
            {link.text}
          </Button>
        )}
      </ul>
    </div>
  );
};

export default DropdownComp;
