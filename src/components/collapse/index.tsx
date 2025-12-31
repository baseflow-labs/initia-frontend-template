import { faChevronDown, faChevronUp, faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const CollapseGroup = ({
  items,
  draggable,
}: {
  items: { title: string; content: React.ReactNode }[];
  draggable?: boolean;
}) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="collapse-group">
      {items.map(({ title, content }, i) => (
        <div key={i} className="mb-1 rounded-2 overflow-hidden border border-primary p-0">
          <button
            className="w-100 text-start btn btn-light d-flex justify-content-between align-items-center px-4 py-3 text-primary m-0"
            onClick={() => toggle(i)}
            aria-expanded={activeId === i}
          >
            <span>
              {draggable && <FontAwesomeIcon icon={faGripVertical} className="ms-0 px-0 me-1" />}
              {title}
            </span>

            <FontAwesomeIcon icon={activeId === i ? faChevronUp : faChevronDown} />
          </button>

          <div
            className={`collapse px-4 py-3 ${activeId === i ? "show" : ""}`}
            style={{ transition: "max-height 0.3s ease", overflow: "hidden" }}
          >
            {activeId === i && content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollapseGroup;
