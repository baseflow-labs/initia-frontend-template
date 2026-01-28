import { TeamContent } from "@/types/landing";

interface TeamSectionProps {
  title: string;
  subtitle?: string;
  content: TeamContent;
}

export default function TeamSection({ title, subtitle, content }: TeamSectionProps) {
  const { members } = content;

  return (
    <section className="team-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div className="row g-4">
          {members.map((member) => (
            <div key={member.id} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body text-center p-4">
                  {member.avatar && (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="rounded-circle mb-3"
                      width="120"
                      height="120"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                  <h3 className="h4 mb-1">{member.name}</h3>
                  <p className="text-primary mb-3">{member.role}</p>
                  {member.bio && <p className="text-muted small mb-3">{member.bio}</p>}
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="d-flex justify-content-center gap-2">
                      {member.socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
