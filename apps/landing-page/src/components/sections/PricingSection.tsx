import { PricingContent } from "@/types/landing";

interface PricingSectionProps {
  title: string;
  subtitle?: string;
  content: PricingContent;
}

export default function PricingSection({ title, subtitle, content }: PricingSectionProps) {
  const { plans } = content;

  return (
    <section className="pricing-section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div className="row g-4 justify-content-center">
          {plans.map((plan) => (
            <div key={plan.id} className="col-12 col-md-6 col-lg-4">
              <div
                className={`card h-100 ${plan.highlighted ? "border-primary shadow-lg" : "border-0 shadow-sm"}`}
                style={plan.highlighted ? { transform: "scale(1.05)" } : {}}
              >
                {plan.highlighted && (
                  <div className="card-header bg-primary text-white text-center py-2">
                    <small className="fw-bold">MOST POPULAR</small>
                  </div>
                )}
                <div className="card-body p-4 text-center">
                  <h3 className="h4 mb-3">{plan.name}</h3>
                  {plan.description && <p className="text-muted small mb-4">{plan.description}</p>}
                  <div className="mb-4">
                    <span className="display-4 fw-bold">{plan.price}</span>
                    {plan.interval && <span className="text-muted">/{plan.interval}</span>}
                  </div>
                  <ul className="list-unstyled mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="mb-2">
                        <span className="text-success me-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={plan.ctaLink}
                    className={`btn w-100 ${plan.highlighted ? "btn-primary" : "btn-outline-primary"}`}
                  >
                    {plan.ctaText || "Get Started"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
