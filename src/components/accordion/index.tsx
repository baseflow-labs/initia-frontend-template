import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";

interface Props {
  id: string;
  icon?: IconProp;
  data: { header: string; body: React.ReactNode }[];
  addText: string;
}

const Accordion = ({ id, data, icon, addText }: Props) => {
  const [activeCollapse, setActiveCollapse] = useState(-1);

  return (
    <Fragment>
      <div className="accordion accordion-flush mt-4" id={id}>
        {data?.map(({ header, body }, i) => (
          <div className="accordion-item mb-4" key={i}>
            <h2 className="accordion-header mb-3" id={"heading" + String(i)}>
              <div className="d-flex align-items-center justify-content-between">
                <button
                  className="btn btn-ghost p-3 w-100 text-start collapsed bg-primary rounded-4 text-white"
                  aria-expanded="false"
                  type="button"
                  aria-controls={"collapse" + String(i)}
                  onClick={() => {
                    setActiveCollapse(activeCollapse === i ? -1 : i);
                  }}
                >
                  {icon && <FontAwesomeIcon icon={icon} className="me-2" />}{" "}
                  {header}
                </button>
              </div>
            </h2>

            <div
              id={`collapse${i}`}
              className={`accordion-collapse collapse ${
                activeCollapse === i ? "show" : ""
              }`}
              aria-labelledby={`heading${i}`}
            >
              <div className="accordion-body">{body}</div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Accordion;
