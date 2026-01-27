import { Page } from "@/types/landing";

interface FooterProps {
  pages?: Page[];
}

export default function Footer({ pages = [] }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row g-4 pb-4">
          {/* Company Info */}
          <div className="col-lg-5 col-md-6">
            <h4 className="fw-bold mb-3">
              <span className="text-primary">Innovate</span>Hub
            </h4>
            <p className="text-white-50 mb-4" style={{ lineHeight: "1.7" }}>
              Transform your business with AI-powered automation and seamless collaboration. Join
              50,000+ companies building the future.
            </p>
            <div className="d-flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Twitter"
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>

          {/* Spacer on large screens */}
          <div className="col-lg-3 d-none d-lg-block"></div>

          {/* Dynamic Pages */}
          {pages.length > 0 && (
            <div className="col-lg-4 col-md-6">
              <h6 className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: "0.5px" }}>
                Quick Links
              </h6>
              <ul className="list-unstyled">
                {pages.map((page) => (
                  <li key={page.id} className="mb-2">
                    <a href={`/${page.slug}`} className="footer-link text-white">
                      {page.title.replace(" - InnovateHub", "")}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <hr className="border-secondary opacity-25" />

        {/* Bottom Bar */}
        <div className="row align-items-center pt-3">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="text-white-50 mb-0 small">
              &copy; {currentYear} InnovateHub. All rights reserved.
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
