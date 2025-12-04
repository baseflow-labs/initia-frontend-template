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
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">
          {t("profile.tabs.connections", "Connections")}
        </h5>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {connections.map((c) => (
            <div key={c.id} className="col-md-6 col-lg-4">
              <div className="border rounded-3 p-3 h-100 d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="rounded-circle bg-secondary-subtle me-3"
                    style={{ width: 40, height: 40 }}
                  />
                  <div>
                    <div className="small fw-semibold">{c.name}</div>
                    <div className="small text-muted">{c.connections}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm w-100 mt-2"
                >
                  {t("profile.actions.viewProfile", "View profile")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfileConnectionsView;
