import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";

interface Props {
  button: React.ReactNode;
  start?: boolean;
  list: {
    route?: string;
    onClick?: () => void;
    label: string | React.ReactNode;
  }[];
}

const DropdownComp = ({ button, list, start }: Props) => {
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
        {list.map(({ onClick, route, label }, i) => (
          <li key={i}>
            <span
              className="dropdown-item"
              role="button"
              onClick={route ? () => navigate(route) : onClick}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownComp;
