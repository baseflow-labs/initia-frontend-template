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
    Array<AuthApi.OAuthProviderState & { initialEnabled: boolean; effectiveEnabled: boolean }>
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

  const applyConfig = (config?: AuthApi.OAuthProvidersConfigPayload) => {
    const enabledOAuthProviders = new Set(config?.enabledProviders || []);
    const mapped = (config?.providers || []).map((provider) => ({
      ...provider,
      initialEnabled: provider.enabled,
      effectiveEnabled:
        provider.provider === "email"
          ? (config?.emailLoginEnabled ?? provider.enabled)
          : enabledOAuthProviders.has(provider.provider),
    }));

    setProviders(mapped);
    setRegistrationEnabled(config?.registrationEnabled ?? true);
    setInitialRegistrationEnabled(config?.registrationEnabled ?? true);
  };

  const loadData = async () => {
    const adminRes = await AuthApi.getOAuthAdminProvidersConfig();
    applyConfig(adminRes.payload);
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

      applyConfig(res.payload);
      dispatch(addNotification("warning", "Login provider settings updated"));
    } catch {
      dispatch(addNotification("err", "Failed to update OAuth providers settings"));
    } finally {
      setSaving(false);
    }
  };

  const providerMeta: Record<AuthApi.AuthProvider, { label: string; help: string }> = {
    email: {
      label: "Email / Password",
      help: "Show the email and password login form",
    },
    google: {
      label: "Google",
      help: "Allow Google OAuth login",
    },
    apple: {
      label: "Apple",
      help: "Allow Apple OAuth login",
    },
    microsoft: {
      label: "Microsoft",
      help: "Allow Microsoft OAuth login",
    },
  };
  const emailProvider = providers.find((provider) => provider.provider === "email");
  const oauthProviders = providers.filter((provider) => provider.provider !== "email");

  const renderProviderToggle = (
    provider: AuthApi.OAuthProviderState & {
      initialEnabled: boolean;
      effectiveEnabled: boolean;
    }
  ) => {
    const isEnvironmentLimited = provider.enabled && !provider.effectiveEnabled;
    const meta = providerMeta[provider.provider];

    return (
      <div
        key={provider.provider}
        className="d-flex justify-content-between align-items-center border rounded-3 p-3"
      >
        <div>
          <div className="fw-semibold">{meta.label}</div>
          <small className={isEnvironmentLimited ? "text-warning" : "text-muted"}>
            {isEnvironmentLimited ? "Enabled here, unavailable by environment config" : meta.help}
          </small>
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
    );
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
        <div className="fw-semibold text-uppercase small text-muted">Public access</div>
        <div className="d-flex justify-content-between align-items-center border rounded-3 p-3">
          <div>
            <div className="fw-semibold">Public Registration</div>
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

        <div className="fw-semibold text-uppercase small text-muted mt-2">Login methods</div>
        {emailProvider ? renderProviderToggle(emailProvider) : null}

        <div className="fw-semibold text-uppercase small text-muted mt-2">OAuth providers</div>
        {oauthProviders.map(renderProviderToggle)}
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
