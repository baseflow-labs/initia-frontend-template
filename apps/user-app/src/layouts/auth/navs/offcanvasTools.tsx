import { faHeadset, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@initia/shared/ui/components/core/button";
import OffcanvasComp from "@initia/shared/ui/components/offcanvas";
import MessagingView from "@initia/shared/ui/messaging";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "../../../store/hooks";

const OffCanvasTools = () => {
  const { t } = useTranslation();
  const { logoFull } = useAppSelector((state) => state.settings);
  const [activeTab, setActiveTab] = useState("chatbot");

  const tabs = [
    {
      id: "chatbot",
      title: t("Auth.SupportCenter.Chatbot.Title"),
      icon: faRobot,
      content: <MessagingView singleChat />,
    },
    {
      id: "live-support",
      title: t("Auth.SupportCenter.LiveSupport.Title"),
      icon: faHeadset,
      content: <MessagingView singleChat />,
    },
  ];

  return (
    <div>
      <div className="position-fixed vstack gap-2 bottom-50 end-0 me-3">
        {tabs.map(({ id, icon }, i) => (
          <Button
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTools"
            aria-controls="offcanvasTools"
            onClick={() => setActiveTab(id)}
            key={i}
          >
            <FontAwesomeIcon icon={icon} />
          </Button>
        ))}
      </div>

      <OffcanvasComp
        id="offcanvasTools"
        position="end"
        logoFull={logoFull || undefined}
        content={() => (
          <Fragment>
            <h6 className="text-primary fw-bold m-3">
              {tabs.find((tab) => tab.id === activeTab)?.title}
            </h6>
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </Fragment>
        )}
      />
    </div>
  );
};

export default OffCanvasTools;
