import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

interface Props {
  header?: React.ReactNode;
  button: React.ReactNode;
  start?: boolean;
  link?: {text: string; route: string};
  list: React.ReactNode[];
}

const CustomItemsDropdownComp = ({header,  button, list, start, link }: Props) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="btn btn-link text-secondary p-0"
        id="dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => setOpen((o) => !o)}
      >
        {button}
      </button>

      <ul
        className={`dropdown-menu dropdown-menu-${start ? "start" : "end"} ${
          open ? "show" : ""
        }`}
        aria-labelledby="dropdown"
      >
        {header}
        
        {list}

       {link?.route && (
          <button
            className="btn btn-primary w-100 rounded-0"
            onClick={() => navigate(link.route)}
          >
            {link.text}
          </button>
        )}
      </ul>
    </div>
  );
};

export default CustomItemsDropdownComp;
