import { HowItWorksContent } from "@/types/landing";

interface HowItWorksSectionProps {
  title: string;
  subtitle?: string;
  content: HowItWorksContent;
}

export default function HowItWorksSection({ title, subtitle, content }: HowItWorksSectionProps) {
  const { steps } = content;

  return (
    <section className="how-it-works-section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div className="row g-4">
          {steps.map((step, index) => (
            <div key={step.id} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start mb-3">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {index + 1}
                    </div>
                    {step.icon && <div style={{ fontSize: "2rem" }}>{step.icon}</div>}
                  </div>
                  {step.image && (
                    <img
                      src={step.image}
                      alt={step.title}
                      className="img-fluid rounded mb-3"
                      style={{ maxHeight: "150px", width: "100%", objectFit: "cover" }}
                    />
                  )}
                  <h3 className="h4 mb-3">{step.title}</h3>
                  <p className="text-muted mb-0">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
