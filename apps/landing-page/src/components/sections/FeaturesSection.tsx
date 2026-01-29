import { FeaturesContent } from "@/types/landing";

interface FeaturesSectionProps {
  title: string;
  subtitle?: string;
  content: FeaturesContent;
}

export default function FeaturesSection({ title, subtitle, content }: FeaturesSectionProps) {
  const { variant = "horizontal", features } = content;

  return (
    <section className="features-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div
          className={`row g-4 ${variant === "vertical" ? "row-cols-1" : "row-cols-1 row-cols-md-2 row-cols-lg-3"}`}
        >
          {features.map((feature) => (
            <div key={feature.id} className="col">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  {feature.icon && (
                    <div className="mb-3" style={{ fontSize: "3rem" }}>
                      {feature.icon}
                    </div>
                  )}
                  {feature.image && (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="img-fluid mb-3 rounded"
                      style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
                    />
                  )}
                  <h3 className="h4 mb-3">{feature.title}</h3>
                  <p className="text-muted mb-0">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
