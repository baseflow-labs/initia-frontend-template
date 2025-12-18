import { useTranslation } from "react-i18next";

const UserProfileConnectionsView = () => {
  const { t } = useTranslation();
  const connections = [
    { id: 1, name: "Cecilia Payne", connections: "45 Connections" },
    { id: 2, name: "Curtis Fletcher", connections: "1.32k Connections" },
    { id: 3, name: "Alice Stone", connections: "125 Connections" },
    { id: 4, name: "Darrell Barnes", connections: "456 Connections" },
    { id: 5, name: "Eugenia Moore", connections: "1.2k Connections" },
  ];

  return (
    <div className="card shadow-sm border-0 h-100 mb-3">
      <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          {t("Auth.Profile.Connections", "Connections")}
        </h5>
        <div className="btn-group btn-group-sm">
          <button type="button" className="btn btn-outline-secondary">
            {t("Auth.Profile.ShareConnections", "Share")}
          </button>
          <button type="button" className="btn btn-outline-secondary">
            {t("Auth.Profile.SuggestEdits", "Suggest edits")}
          </button>
        </div>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush mb-3">
          {connections.map((c) => (
            <li
              key={c.id}
              className="list-group-item px-0 border-0 border-bottom pb-3 mb-3 d-flex align-items-center"
            >
              <div
                className="rounded-circle bg-secondary-subtle me-3"
                style={{ width: 40, height: 40 }}
              />
              <div>
                <div className="small fw-semibold">{c.name}</div>
                <div className="small text-muted">{c.connections}</div>
              </div>
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn-outline-secondary btn-sm w-100">
          {t("Auth.Profile.ViewAllConnections", "View all connections")}
        </button>
      </div>
    </div>
  );
};

export default UserProfileConnectionsView;
