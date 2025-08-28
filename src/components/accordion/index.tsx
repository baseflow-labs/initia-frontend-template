import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { deleteIcon } from "../../assets/icons/icons";
import IconWrapperComp from "../../assets/icons/wrapper";
import Button from "../../components/core/button";

interface Props {
  key: string;
  icon?: IconProp;
  data: { header: string; body: React.ReactNode }[];
  onAdd: () => void;
  addText: string;
  onRemove: (i: number) => void;
}

const Accordion = ({ key, data, icon, onAdd, addText, onRemove }: Props) => {
  const [activeCollapse, setActiveCollapse] = useState(-1);

  return (
    <Fragment>
      <div className="accordion accordion-flush mt-4" id={key}>
        {data?.map(({ header, body }, i) => (
          <div className="accordion-item mb-4" key={i}>
            <h2 className="accordion-header mb-3" id={"heading" + String(i)}>
              <div className="d-flex align-items-center justify-content-between">
                <button
                  className="btn btn-ghost p-3 w-100 text-start collapsed bg-info rounded-4 text-white"
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

                <Button
                  color="ghost"
                  text="danger"
                  size="sm"
                  type="button"
                  className="border border-1 rounded-4 py-3 ms-2 px-3"
                  onClick={() => onRemove(i)}
                >
                  <IconWrapperComp icon={deleteIcon} />
                </Button>
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

      <Button
        color="success"
        outline
        type="button"
        className="my-4"
        onClick={() => {
          setActiveCollapse(data.length);
          onAdd();
        }}
      >
        {icon && <FontAwesomeIcon icon={icon} />} {addText}
      </Button>
    </Fragment>
  );
};

export default Accordion;
