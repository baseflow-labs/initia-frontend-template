import { Fragment, useState } from "react";

import OffcanvasComp from "@/components/offcanvas";
import TabsComp from "@/components/tab";
import { faHeadset, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const OffCanvasTools = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("chatbot");

  const tabs = [
    {
      id: "chatbot",
      title: t("Auth.SupportCenter.Chatbot.Title"),
      icon: faRobot,
      content: <>Chatbot placeholder</>,
    },
    {
      id: "live-support",
      title: t("Auth.SupportCenter.LiveSupport.Title"),
      icon: faHeadset,
      content: <>Live support</>,
    },
  ];

  return (
    <div>
      <div className="position-fixed vstack gap-2 bottom-50 end-0 me-3">
        {tabs.map(({ id, icon }, i) => (
          <button
            className="btn btn-primary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTools"
            aria-controls="offcanvasTools"
            onClick={() => setActiveTab(id)}
            key={i}
          >
            <FontAwesomeIcon icon={icon} />
          </button>
        ))}
      </div>

      <OffcanvasComp
        id="offcanvasTools"
        position="end"
        content={() => (
          <Fragment>
            <TabsComp
              items={tabs.map((tab) => ({
                ...tab,
                content: <div className="p-4">{tab.content}</div>,
              }))}
              activeTabId={activeTab}
              vertical
            />
          </Fragment>
        )}
      />
    </div>
  );
};

export default OffCanvasTools;
