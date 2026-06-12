import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import Button from "../core/button";

interface Props {
  header?: React.ReactNode;
  button: React.ReactNode;
  start?: boolean;
  menuClassName?: string;
  link?: { text: string; route: string };
  list: React.ReactNode[];
}

const CustomItemsDropdownComp = ({ header, button, list, start, menuClassName, link }: Props) => {
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
        className={`dropdown-menu dropdown-menu-${start ? "start" : "end"} ${
          open ? "show" : ""
        } ${menuClassName || ""}`}
        style={{
          maxWidth: "calc(100vw - 1rem)",
          maxHeight: "min(24rem, calc(100vh - 4rem))",
          overflowY: "auto",
        }}
        aria-labelledby="dropdown"
      >
        {header}

        {list}

        {link?.route && (
          <Button className="w-100 rounded-0" onClick={() => navigate(link.route)}>
            {link.text}
          </Button>
        )}
      </ul>
    </div>
  );
};

export default CustomItemsDropdownComp;
