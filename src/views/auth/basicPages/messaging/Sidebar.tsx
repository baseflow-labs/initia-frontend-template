import { useTranslation } from "react-i18next";

import { ConversationSummary } from ".";

interface Props {
  conversations: ConversationSummary[];
  setActiveId: (id: string) => void;
  activeId: string;
  query: string;
  setQuery: (q: string) => void;
}

const MessagingView = ({ conversations, setActiveId, activeId }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        {/* <div className="input-group mb-3">
          <span className="input-group-text bg-white">
            <FontAwesomeIcon icon={faSearch} className="text-muted" />
          </span>

          <input
            className="form-control"
            placeholder={t("Auth.Messaging.SearchChatsOrMessages")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div> */}

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="mb-0">{t("Auth.Messaging.Chats")}</h6>

          {/* <button className="btn btn-sm btn-outline-secondary">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button> */}
        </div>

        <div className="list-group">
          {conversations?.map((c: ConversationSummary) => {
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                className={`list-group-item list-group-item-action d-flex align-items-center ${
                  isActive ? "active" : ""
                }`}
                onClick={() => setActiveId(c.id)}
              >
                <div className="flex-shrink-0 me-3">
                  <div
                    className={`rounded-circle ${isActive ? "bg-white text-primary" : "bg-primary text-white"} d-flex align-items-center justify-content-center`}
                    style={{ width: 40, height: 40 }}
                  >
                    <span className="fw-bold">
                      {c.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>

                <div className="flex-grow-1 text-start">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">{c.name}</span>
                    <small className={isActive ? "text-light" : "text-muted"}>{c.lastTime}</small>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <small
                      className={isActive ? "text-light" : "text-muted"}
                      style={{ maxWidth: 180 }}
                    >
                      {c.lastMessage}
                    </small>

                    {c.unread ? (
                      <span
                        className={`badge rounded-pill ${isActive ? "bg-light text-primary" : "bg-primary text-light"}`}
                      >
                        {c.unread}
                      </span>
                    ) : null}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessagingView;
