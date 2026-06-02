import * as AuthApi from "@initia/shared/api/auth";
import Button from "@initia/shared/ui/components/core/button";
import PageTemplate from "@initia/shared/ui/layouts/auth/pages/pageTemplate";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { addNotification } from "../../../../../store/actions/notifications";

export const OAuthProvidersSettingsContent = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [providers, setProviders] = useState<
    Array<AuthApi.OAuthProviderState & { initialEnabled: boolean }>
  >([]);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [initialRegistrationEnabled, setInitialRegistrationEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  const hasChanges = useMemo(
    () =>
      providers.some((provider) => provider.enabled !== provider.initialEnabled) ||
      registrationEnabled !== initialRegistrationEnabled,
    [initialRegistrationEnabled, providers, registrationEnabled]
  );

  const loadData = async () => {
    const [adminRes, publicRes] = await Promise.all([
      AuthApi.getOAuthAdminProvidersConfig(),
      AuthApi.getOAuthProvidersConfig(),
    ]);
    const mapped = (adminRes.payload || []).map((provider) => ({
      ...provider,
      initialEnabled: provider.enabled,
    }));
    setProviders(mapped);
    setRegistrationEnabled(publicRes.payload?.registrationEnabled ?? true);
    setInitialRegistrationEnabled(publicRes.payload?.registrationEnabled ?? true);
  };

  useEffect(() => {
    loadData().catch(() => {
      dispatch(addNotification("err", "Failed to load OAuth providers settings"));
    });
  }, []);

  const toggleProvider = (providerName: AuthApi.AuthProvider) => {
    setProviders((current) =>
      current.map((provider) =>
        provider.provider === providerName ? { ...provider, enabled: !provider.enabled } : provider
      )
    );
  };

  const onSave = async () => {
    try {
      setSaving(true);
      const res = await AuthApi.updateOAuthAdminProvidersConfig(
        providers.map(({ provider, enabled }) => ({ provider, enabled })),
        registrationEnabled
      );

      const updated = (res.payload || []).map((provider) => ({
        ...provider,
        initialEnabled: provider.enabled,
      }));
      setProviders(updated);
      setInitialRegistrationEnabled(registrationEnabled);
    } catch {
      dispatch(addNotification("err", "Failed to update OAuth providers settings"));
    } finally {
      setSaving(false);
    }
  };

  const labelByProvider: Record<AuthApi.AuthProvider, string> = {
    email: "Email / Password",
    google: "Google",
    apple: "Apple",
    microsoft: "Microsoft",
  };

  return (
    <>
      <p className="text-muted mb-4">
        {t(
          "Auth.Settings.Admin.OAuthProviders.Description",
          "Enable or disable login methods and control whether public registration is available."
        )}
      </p>

      <div className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-center border rounded-3 p-3">
          <div>
            <div className="fw-semibold">Registration</div>
            <small className="text-muted">Allow public account creation</small>
          </div>

          <div className="form-check form-switch m-0">
            <input
              className="form-check-input"
              type="checkbox"
              checked={registrationEnabled}
              onChange={() => setRegistrationEnabled((enabled) => !enabled)}
              id="auth-registration-enabled"
            />
          </div>
        </div>

        {providers.map((provider) => (
          <div
            key={provider.provider}
            className="d-flex justify-content-between align-items-center border rounded-3 p-3"
          >
            <div>
              <div className="fw-semibold">{labelByProvider[provider.provider]}</div>
              <small className="text-muted">{provider.provider}</small>
            </div>

            <div className="form-check form-switch m-0">
              <input
                className="form-check-input"
                type="checkbox"
                checked={provider.enabled}
                onChange={() => toggleProvider(provider.provider)}
                id={`oauth-provider-${provider.provider}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 d-flex justify-content-end">
        <Button onClick={onSave} disabled={saving || !hasChanges}>
          {t("Global.Form.Labels.Save")}
        </Button>
      </div>
    </>
  );
};

const OAuthProvidersSettingsView = () => {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("Auth.Settings.Admin.OAuthProviders.Title", "OAuth Providers")}>
      <OAuthProvidersSettingsContent />
    </PageTemplate>
  );
};

export default OAuthProvidersSettingsView;
