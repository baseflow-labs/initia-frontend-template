import { Page, SystemMetadata } from "@/types/landing";

interface FooterProps {
  pages?: Page[];
  systemMetadata?: SystemMetadata;
}

export default function Footer({ pages = [], systemMetadata }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const apps = [
    {
      name: "User App",
      url: "https://initia-frontend-template-user-app.vercel.app",
    },
    {
      name: "Admin App",
      url: "https://initia-frontend-template-admin-app.vercel.app",
    },
    {
      name: "Help Center",
      url: "https://initia-frontend-template-help-center.vercel.app",
    },
  ];

  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row g-4 pb-4">
          {/* Company Info */}
          <div className="col-lg-5 col-md-6">
            <h4 className="fw-bold mb-3">
              {systemMetadata?.logo ? (
                <img
                  src={systemMetadata.logo}
                  alt={systemMetadata.name}
                  style={{ height: "35px" }}
                />
              ) : (
                <>
                  <span className="text-primary">
                    {systemMetadata?.name.slice(0, -3) || "Innovate"}
                  </span>
                  {systemMetadata?.name.slice(-3) || "Hub"}
                </>
              )}
            </h4>
            <p className="text-white-50 mb-4" style={{ lineHeight: "1.7" }}>
              {systemMetadata?.slogan ||
                "Transform your business with AI-powered automation and seamless collaboration."}
            </p>
            <div className="d-flex gap-3">
              {systemMetadata?.socialLinks?.twitter && (
                <a
                  href={systemMetadata.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Twitter"
                >
                  <i className="bi bi-twitter"></i>
                </a>
              )}
              {systemMetadata?.socialLinks?.linkedin && (
                <a
                  href={systemMetadata.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              )}
              {systemMetadata?.socialLinks?.github && (
                <a
                  href={systemMetadata.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="GitHub"
                >
                  <i className="bi bi-github"></i>
                </a>
              )}
              {systemMetadata?.socialLinks?.facebook && (
                <a
                  href={systemMetadata.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
              )}
              {systemMetadata?.socialLinks?.instagram && (
                <a
                  href={systemMetadata.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
              )}
            </div>
          </div>

          {/* Spacer on large screens */}
          <div className="col-lg-3 d-none d-lg-block"></div>

          {/* Dynamic Pages */}
          {pages.length > 0 && (
            <div className="col-lg-4 col-md-3">
              <h6 className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: "0.5px" }}>
                Content
              </h6>
              <ul className="list-unstyled">
                {pages.map((page) => (
                  <li key={page.id} className="mb-2">
                    <a href={`/${page.slug}`} className="footer-link text-white">
                      {page.title.replace(` - ${systemMetadata?.name || "InnovateHub"}`, "")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* System App Links */}
          <div className="col-lg-4 col-md-3">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: "0.5px" }}>
              Quick Links
            </h6>

            <ul className="list-unstyled">
              {apps.map((page, i) => (
                <li key={i} className="mb-2">
                  <a href={page.url} className="footer-link text-white">
                    {page.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-secondary opacity-25" />

        {/* Bottom Bar */}
        <div className="row align-items-center pt-3">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="text-white-50 mb-0 small">
              &copy; {currentYear} {systemMetadata?.name || "InnovateHub"}. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="/privacy" className="legal-link">
                  Privacy Policy
                </a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="/terms" className="legal-link">
                  Terms of Service
                </a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="/cookies" className="legal-link">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .hover-primary:hover {
            color: #667eea !important;
            transition: color 0.3s ease;
          }
        `,
        }}
      />
    </footer>
  );
}
