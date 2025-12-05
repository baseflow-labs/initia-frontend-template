import { useTranslation } from "react-i18next";

interface Props {
  active: {
    id: string;
    name: string;
    avatar?: string;
    messages: {
      id: string;
      senderId: string;
      text: string;
      time: string;
    }[];
  };
}

const MessagingChatHeaderView = ({active} : Props) => {
  const { t } = useTranslation();

  return (
    <div className="d-flex align-items-center">
      <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: 40, height: 40 }}>
        <span className="text-primary fw-bold">
          {active.name.split(" ").map((n) => n[0]).join("")}
        </span>
      </div>

      <div className="flex-grow-1">
        <h6 className="mb-0">{active.name}</h6>
        <small className="text-muted">{t("Auth.Messaging.Status.Online")}</small>
      </div>

      {/* <div className="d-flex align-items-center gap-2">
        <button className="btn btn-sm btn-outline-secondary">
          <FontAwesomeIcon icon={faPhone} />
        </button>

        <button className="btn btn-sm btn-outline-secondary">
          <FontAwesomeIcon icon={faVideo} />
        </button>

        <button className="btn btn-sm btn-outline-secondary">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
      </div> */}
    </div>
  );
};

export default MessagingChatHeaderView;
