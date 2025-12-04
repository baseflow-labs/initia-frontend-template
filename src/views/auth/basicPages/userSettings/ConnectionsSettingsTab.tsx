import { useTranslation } from "react-i18next";

const ConnectionsSettingsTab = () => {
  const { t } = useTranslation();

  const connections = [
    {
      key: "github",
      name: t("Auth.Settings.User.Connections.GitHub.Title"),
      description: t("Auth.Settings.User.Connections.GitHub.Description", {
        defaultValue: "Use GitHub to sign in and sync repositories.",
      }),
      connected: true,
      lastSync: "2025-11-01 10:32",
    },
    {
      key: "google",
      name: t("Auth.Settings.User.Connections.Google.Title"),
      description: t("Auth.Settings.User.Connections.Google.Description", {
        defaultValue: "Use your Google account for login and calendar sync.",
      }),
      connected: false,
      lastSync: null,
    },
    {
      key: "slack",
      name: t("Auth.Settings.User.Connections.Slack.Title"),
      description: t("Auth.Settings.User.Connections.Slack.Description", {
        defaultValue: "Send alerts and notifications to Slack channels.",
      }),
      connected: false,
      lastSync: null,
    },
  ];

  return (
    <div>
      <p className="text-muted mb-4">
        {t("Auth.Settings.User.Connections.Description", {
          defaultValue:
            "Connect third-party services to sign in faster and sync data.",
        })}
      </p>

      <div className="row g-3">
        {connections.map((conn) => (
          <div key={conn.key} className="col-12 col-md-6 col-xl-4">
            <div className="border rounded p-3 h-100 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="mb-0">{conn.name}</h6>
                <span
                  className={`badge ${
                    conn.connected ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {conn.connected
                    ? t("Auth.Settings.User.Connections.StatusConnected", {
                        defaultValue: "Connected",
                      })
                    : t("Auth.Settings.User.Connections.StatusNotConnected", {
                        defaultValue: "Not connected",
                      })}
                </span>
              </div>
              
              <p className="text-muted small mb-2">{conn.description}</p>
              {conn.lastSync && (
                <p className="text-muted small mb-3">
                  {t("Auth.Settings.User.Connections.LastSync", {
                    defaultValue: "Last sync: {{date}}",
                    date: conn.lastSync,
                  })}
                </p>
              )}

              <div className="mt-auto">
                {conn.connected ? (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                  >
                    {t("Auth.Settings.User.Connections.Disconnect", {
                      defaultValue: "Disconnect",
                    })}
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary btn-sm">
                    {t("Auth.Settings.User.Connections.Connect", {
                      defaultValue: "Connect",
                    })}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectionsSettingsTab;
