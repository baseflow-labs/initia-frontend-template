import { AboutContent } from "@/types/landing";

interface AboutSectionProps {
  title: string;
  subtitle?: string;
  content: AboutContent;
}

export default function AboutSection({ title, subtitle, content }: AboutSectionProps) {
  const { content: aboutText, statistics, image } = content;

  return (
    <section className="about-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div className="row g-4 align-items-center">
          {image && (
            <div className="col-lg-6">
              <img src={image} alt="About Us" className="img-fluid rounded shadow" />
            </div>
          )}
          <div className={image ? "col-lg-6" : "col-12"}>
            <div className="pe-lg-4">
              <div className="mb-4" dangerouslySetInnerHTML={{ __html: aboutText }} />

              {statistics && statistics.length > 0 && (
                <div className="row g-3 mt-4">
                  {statistics.map((stat) => (
                    <div key={stat.id} className="col-6 col-md-4">
                      <div className="text-center p-3 bg-light rounded">
                        <h3 className="display-6 fw-bold text-primary mb-0">{stat.value}</h3>
                        <p className="text-muted mb-0 small">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
