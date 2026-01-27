"use client";

import { ClientsContent } from "@/types/landing";

interface ClientsSectionProps {
  title: string;
  subtitle?: string;
  content: ClientsContent;
}

export default function ClientsSection({ title, subtitle, content }: ClientsSectionProps) {
  const { logos } = content;

  return (
    <section className="clients-section py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">{title}</h2>
          {subtitle && <p className="lead text-muted">{subtitle}</p>}
        </div>

        <div className="row g-4 align-items-center justify-content-center">
          {logos.map((client) => (
            <div key={client.id} className="col-6 col-md-4 col-lg-3 text-center">
              {client.url ? (
                <a href={client.url} target="_blank" rel="noopener noreferrer" className="d-block">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="img-fluid"
                    style={{
                      maxHeight: "80px",
                      filter: "grayscale(100%)",
                      opacity: 0.7,
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "grayscale(0%)";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "grayscale(100%)";
                      e.currentTarget.style.opacity = "0.7";
                    }}
                  />
                </a>
              ) : (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="img-fluid"
                  style={{ maxHeight: "80px", filter: "grayscale(100%)", opacity: 0.7 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
