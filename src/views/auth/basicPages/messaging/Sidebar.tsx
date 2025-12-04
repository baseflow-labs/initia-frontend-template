import { faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { Conversation } from ".";

interface Props {
  conversations: Conversation[];
  setActiveId: (id: string) => void;
  activeId: string;
  query: string;
  setQuery: (q: string) => void;
}

const MessagingView = ({conversations, setActiveId, activeId, query, setQuery}: Props) => {
  const { t } = useTranslation();
  
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="input-group mb-3">
          <span className="input-group-text bg-white">
            <FontAwesomeIcon icon={faSearch} className="text-muted" />
          </span>
          
          <input
            className="form-control"
            placeholder={t("Auth.Messaging.SearchChatsOrMessages")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">{t("Auth.Messaging.Chats")}</h6>

          {/* <button className="btn btn-sm btn-outline-secondary">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button> */}
        </div>

        <div className="list-group">
          {conversations.map((c) => (
            <button
              key={c.id}
              className={`list-group-item list-group-item-action d-flex align-items-center ${
                c.id === activeId ? "active" : ""
              }`}
              onClick={() => setActiveId(c.id)}
            >
              <div className="flex-shrink-0 me-3">
                <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                  <span className="text-primary fw-bold">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              </div>

              <div className="flex-grow-1 text-start">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">{c.name}</span>
                  <small className="text-muted">{c.lastTime}</small>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted text-truncate" style={{ maxWidth: 180 }}>
                    {c.lastMessage}
                  </small>

                  {c.unread ? (
                    <span className="badge rounded-pill bg-primary">{c.unread}</span>
                  ) : null}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagingView;
