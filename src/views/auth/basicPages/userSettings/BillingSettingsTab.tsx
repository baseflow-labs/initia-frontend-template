import { useTranslation } from "react-i18next";

const BillingSettingsTab = () => {
  const { t } = useTranslation();

  // later you can wire this to real billing data
  const currentPlan = {
    name: "Pro",
    price: 29,
    currency: "USD",
    projects: 10,
    seats: 5,
    renewalDate: "2025-12-31",
  };

  return (
    <div className="row">
      {/* Current plan card */}
      <div className="col-lg-6 col-12 mb-4">
        <div className="card h-100">
          <div className="card-header border-bottom">
            <h5 className="card-title mb-0">
              {t("Auth.Settings.Billing.CurrentPlan", {
                defaultValue: "Current Plan",
              })}
            </h5>
          </div>
          <div className="card-body">
            <h3 className="mb-1">
              {currentPlan.name}{" "}
              <span className="text-muted fs-6">
                ({currentPlan.currency} {currentPlan.price}/month)
              </span>
            </h3>
            <p className="text-muted mb-3">
              {t("Auth.Settings.Billing.Renewal", {
                defaultValue: "Renews on {{date}}",
                date: currentPlan.renewalDate,
              })}
            </p>

            <ul className="list-unstyled mb-4">
              <li className="mb-1">
                •{" "}
                {t("Auth.Settings.Billing.Projects", {
                  defaultValue: "{{count}} active projects",
                  count: currentPlan.projects,
                })}
              </li>
              <li className="mb-1">
                •{" "}
                {t("Auth.Settings.Billing.Seats", {
                  defaultValue: "{{count}} team members included",
                  count: currentPlan.seats,
                })}
              </li>
            </ul>

            <button type="button" className="btn btn-primary btn-sm me-2">
              {t("Auth.Settings.Billing.ChangePlan", {
                defaultValue: "Change Plan",
              })}
            </button>
            <button type="button" className="btn btn-outline-danger btn-sm">
              {t("Auth.Settings.Billing.CancelSubscription", {
                defaultValue: "Cancel Subscription",
              })}
            </button>
          </div>
        </div>
      </div>

      {/* Plans list / upsell */}
      <div className="col-lg-6 col-12 mb-4">
        <div className="card h-100">
          <div className="card-header border-bottom">
            <h5 className="card-title mb-0">
              {t("Auth.Settings.Billing.AvailablePlans", {
                defaultValue: "Available Plans",
              })}
            </h5>
          </div>
          <div className="card-body">
            <p className="text-muted mb-3">
              {t("Auth.Settings.Billing.AvailablePlansDescription", {
                defaultValue:
                  "Upgrade or downgrade your plan at any time. Billing changes take effect immediately.",
              })}
            </p>

            <div className="d-flex flex-column gap-3">
              <div className="border rounded p-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h6 className="mb-0">Starter</h6>
                  <span className="fw-bold">Free</span>
                </div>
                <p className="text-muted small mb-2">
                  {t("Auth.Settings.Billing.StarterDescription", {
                    defaultValue: "For individuals and small side projects.",
                  })}
                </p>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  disabled
                >
                  {t("Auth.Settings.Billing.Current", {
                    defaultValue: "Current",
                  })}
                </button>
              </div>

              <div className="border rounded p-3 border-primary">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h6 className="mb-0">Pro</h6>
                  <span className="fw-bold">USD 29/mo</span>
                </div>
                <p className="text-muted small mb-2">
                  {t("Auth.Settings.Billing.ProDescription", {
                    defaultValue:
                      "Best for small teams that need collaboration and advanced features.",
                  })}
                </p>
                <button type="button" className="btn btn-primary btn-sm">
                  {t("Auth.Settings.Billing.UpgradeToPlan", {
                    defaultValue: "Switch to Pro",
                  })}
                </button>
              </div>

              <div className="border rounded p-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h6 className="mb-0">Enterprise</h6>
                  <span className="fw-bold">
                    {t("Auth.Settings.Billing.ContactUs", {
                      defaultValue: "Contact us",
                    })}
                  </span>
                </div>
                <p className="text-muted small mb-2">
                  {t("Auth.Settings.Billing.EnterpriseDescription", {
                    defaultValue:
                      "Custom limits, SSO, audit logs and dedicated support.",
                  })}
                </p>
                <button type="button" className="btn btn-outline-primary btn-sm">
                  {t("Auth.Settings.Billing.TalkToSales", {
                    defaultValue: "Talk to sales",
                  })}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettingsTab;
