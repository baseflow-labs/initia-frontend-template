import Button from "@initia/shared/ui/components/core/button";
import * as UsersApi from "@initia/shared/api/users";
import { apiCatchGlobalHandler } from "@initia/shared/utils/function";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { addNotification } from "../../../../../store/actions/notifications";
import { updateUserProfile } from "../../../../../store/actions/auth";
import { useAppSelector } from "../../../../../store/hooks";

const CONNECTION_SPECS: Array<{
  key: string;
  titleKey: string;
  titleDefault: string;
  descriptionKey: string;
  descriptionDefault: string;
}> = [
  {
    key: "github",
    titleKey: "Auth.Settings.User.Connections.GitHub.Title",
    titleDefault: "GitHub",
    descriptionKey: "Auth.Settings.User.Connections.GitHub.Description",
    descriptionDefault: "Use GitHub to sign in and sync repositories.",
  },
  {
    key: "google",
    titleKey: "Auth.Settings.User.Connections.Google.Title",
    titleDefault: "Google",
    descriptionKey: "Auth.Settings.User.Connections.Google.Description",
    descriptionDefault: "Use your Google account for login and calendar sync.",
  },
  {
    key: "slack",
    titleKey: "Auth.Settings.User.Connections.Slack.Title",
    titleDefault: "Slack",
    descriptionKey: "Auth.Settings.User.Connections.Slack.Description",
    descriptionDefault: "Send alerts and notifications to Slack channels.",
  },
];

const DEFAULT_CONNECTIONS: Record<string, { connected: boolean; lastSync?: string }> = {
  github: { connected: false },
  google: { connected: false },
  slack: { connected: false },
};

const ConnectionsSettingsTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [connectionStates, setConnectionStates] = useState(DEFAULT_CONNECTIONS);

  // Load connections from server on mount
  useEffect(() => {
    UsersApi.getMe()
      .then((res) => {
        const serverConnections = res.payload?.connections ?? {};
        setConnectionStates({
          ...DEFAULT_CONNECTIONS,
          ...serverConnections,
        });
      })
      .catch(apiCatchGlobalHandler)
      .finally(() => setLoading(false));
  }, []);

  const toggleConnection = (key: string) => {
    const newState = !connectionStates[key]?.connected;

    if (newState) {
      // In production, this would redirect to OAuth flow
      dispatch(
        addNotification({
          msg: t("Auth.Settings.User.Connections.OAuth.NotImplemented", {
            defaultValue: "OAuth connection not yet implemented",
          }),
          type: "warning",
        })
      );
      return;
    }

    // If disconnecting, update immediately
    setConnectionStates((prev) => ({
      ...prev,
      [key]: { connected: false },
    }));

    // Persist to backend
    UsersApi.updateMe({
      connections: {
        ...connectionStates,
        [key]: { connected: false },
      },
    })
      .then((res) => {
        dispatch(updateUserProfile(res.payload));
        dispatch(
          addNotification({
            msg: t("Global.Form.SuccessMsg", {
              action: t("Global.Form.Labels.Update"),
              data: t("Auth.Settings.User.Connections.Title", { defaultValue: "Connection" }),
            }),
          })
        );
      })
      .catch(apiCatchGlobalHandler);
  };

  if (loading) {
    return <div>{t("Global.Loading", { defaultValue: "Loading..." })}</div>;
  }

  const connections = CONNECTION_SPECS.map((spec) => ({
    ...spec,
    name: t(spec.titleKey, { defaultValue: spec.titleDefault }),
    description: t(spec.descriptionKey, { defaultValue: spec.descriptionDefault }),
    ...connectionStates[spec.key],
  }));

  return (
    <div>
      <p className="text-muted mb-4">
        {t("Auth.Settings.User.Connections.Description", {
          defaultValue: "Connect third-party services to sign in faster and sync data.",
        })}
      </p>

      <div className="row g-3">
        {connections.map((conn) => (
          <div key={conn.key} className="col-12 col-md-6 col-xl-4">
            <div className="border rounded p-3 h-100 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="mb-0">{conn.name}</h6>
                <span className={`badge ${conn.connected ? "bg-success" : "bg-secondary"}`}>
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
                  <Button
                    outline
                    color="danger"
                    size="sm"
                    onClick={() => toggleConnection(conn.key)}
                  >
                    {t("Auth.Settings.User.Connections.Disconnect", {
                      defaultValue: "Disconnect",
                    })}
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => toggleConnection(conn.key)}>
                    {t("Auth.Settings.User.Connections.Connect", {
                      defaultValue: "Connect",
                    })}
                  </Button>
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
