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

  const plans = [
    {
      label: "Starter",
      price: "Free",
      description: "For individuals and small side projects.",
    },
    {
      label: "Pro",
      price: "USD 29/mo",
      description: "Best for small teams that need collaboration and advanced features.",
    },
    {
      label: "Enterprise",
      price: t("Auth.Settings.User.Billing.ContactUs", {
        defaultValue: "Contact us",
      }),
      description: "Custom limits, SSO, audit logs and dedicated support.",
    }
  ]

  return (
    <div className="row">
      <div className="col-lg-6 col-12 mb-4">
        <h5 className="mb-0">
          {t("Auth.Settings.User.Billing.CurrentPlan", {
            defaultValue: "Current Plan",
          })}
        </h5>
            
        <div className="">
          <h3 className="mb-1">
            {currentPlan.name}{" "}
            <span className="text-muted fs-6">
              ({currentPlan.currency} {currentPlan.price}/month)
            </span>
          </h3>

          <p className="text-muted mb-3">
            {t("Auth.Settings.User.Billing.Renewal", {
              defaultValue: "Renews on {{date}}",
              date: currentPlan.renewalDate,
            })}
          </p>

          <ul className="list-unstyled mb-4">
            <li className="mb-1">
              •{" "}
              {t("Auth.Settings.User.Billing.Projects", {
                defaultValue: "{{count}} active projects",
                count: currentPlan.projects,
              })}
            </li>

            <li className="mb-1">
              •{" "}
              {t("Auth.Settings.User.Billing.Seats", {
                defaultValue: "{{count}} team members included",
                count: currentPlan.seats,
              })}
            </li>
          </ul>

          <button type="button" className="btn btn-primary btn-sm me-2">
            {t("Auth.Settings.User.Billing.ChangePlan", {
              defaultValue: "Change Plan",
            })}
          </button>

          <button type="button" className="btn btn-outline-danger btn-sm">
            {t("Auth.Settings.User.Billing.CancelSubscription", {
              defaultValue: "Cancel Subscription",
            })}
          </button>
        </div>
      </div>
      
      <div className="col-lg-6 col-12 mb-4">
        <h5 className="mb-0">
          {t("Auth.Settings.User.Billing.AvailablePlans", {
            defaultValue: "Available Plans",
          })}
        </h5>
            
        <div>
          <p className="text-muted mb-3">
            {t("Auth.Settings.User.Billing.AvailablePlansDescription", {
              defaultValue:
                "Upgrade or downgrade your plan at any time. Billing changes take effect immediately.",
            })}
          </p>

          <div className="d-flex flex-column gap-3">
            {plans.map(({label, price, description}, i) => (
              <div className="border rounded p-3" key={i}>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h6 className="mb-0">{label}</h6>
                  <span className="fw-bold">{price}</span>
                </div>

                <p className="text-muted small mb-2">
                  {description}
                </p>

                <button
                  type="button"
                  className={`btn btn-${currentPlan.name === label ? "outline-secondary" : "primary"} btn-sm`}
                  disabled={currentPlan.name === label}
                >
                  {currentPlan.name === label ? t("Auth.Settings.User.Billing.Current") : t("Auth.Settings.User.Billing.Select")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettingsTab;
