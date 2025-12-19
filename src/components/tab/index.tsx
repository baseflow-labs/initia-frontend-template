import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";

const TabsComp = ({
  items,
  color = "primary",
}: {
  items: {
    id: string;
    title: string;
    icon?: IconProp;
    content: React.ReactNode;
  }[];
  color?: string;
}) => {
  const [activeTab, setActiveTab] = useState(items[0].id);

  return (
    <Fragment>
      <div className="mt-1 mx-3 mx-xl-5 mx-xxl-auto overflow-x-auto">
        <div
          className="d-flex justify-content-start gap-1 bg-teal rounded-2 p-2"
          style={{
            width: "max-content",
            backgroundColor: "rgba(0,0,0,0.025)",
          }}
        >
          {items.map((tab, i) => (
            <button
              key={i}
              className={`btn mx-2 px-4 py-3 rounded-2 w-fit  
          ${activeTab === tab.id ? `bg-opacity-${color} text-${color} fw-bold fs-6` : "text-dark"}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "none",
              }}
            >
              {tab.icon && <FontAwesomeIcon icon={tab.icon} />} {tab.title}
            </button>
          ))}
        </div>
      </div>

      {items?.find(({ id }) => id === activeTab)?.content}
    </Fragment>
  );
};

export default TabsComp;
