import { CareersContent } from "@/types/landing";

interface CareersSectionProps {
  title: string;
  subtitle?: string;
  content: CareersContent;
}

export default function CareersSection({ title, subtitle, content }: CareersSectionProps) {
  const { jobOpenings } = content;

  return (
    <section className="careers-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div className="row g-4">
          {jobOpenings.map((job) => (
            <div key={job.id} className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-lg-8">
                      <h3 className="h4 mb-2">{job.title}</h3>
                      <div className="d-flex flex-wrap gap-3 mb-3">
                        <span className="badge bg-primary">{job.department}</span>
                        <span className="badge bg-secondary">{job.location}</span>
                        {job.type && <span className="badge bg-info">{job.type}</span>}
                      </div>
                      {job.description && <p className="text-muted mb-0">{job.description}</p>}
                    </div>
                    <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                      {job.applyLink && (
                        <a href={job.applyLink} className="btn btn-primary">
                          Apply Now
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {jobOpenings.length === 0 && (
          <div className="text-center py-5">
            <p className="lead text-muted">No open positions at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
