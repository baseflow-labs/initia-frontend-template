"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

import { Page, SystemMetadata } from "@/types/landing";
import { LandingLanguageSwitcher } from "@/components/LandingLanguageSwitcher";

interface NavbarProps {
  pages?: Page[];
  systemMetadata?: SystemMetadata;
}

export default function Navbar({ pages = [], systemMetadata }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isRtl = locale === "ar";

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top transition w-100 ${
        isScrolled ? "bg-white shadow-sm" : ""
      }`}
      style={{ transition: "all 0.3s ease" }}
      dir={isRtl ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <div className="container">
        <a href="/" className="navbar-brand fw-bold fs-4">
          {systemMetadata?.logo ? (
            <img src={systemMetadata.logo} alt={systemMetadata.name} style={{ height: "40px" }} />
          ) : (
            <>
              <span className="text-primary">
                {systemMetadata?.name.slice(0, -3) || "Innovate"}
              </span>
              {systemMetadata?.name.slice(-3) || "Hub"}
            </>
          )}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {pages.map((page) => (
              <li key={page.id} className="nav-item">
                <a
                  href={`/${page.slug}`}
                  className="nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {page.title}
                </a>
              </li>
            ))}
            <li className="nav-item ms-lg-3">
              <LandingLanguageSwitcher />
            </li>
          </ul>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .navbar {
          padding: 1rem 0;
        }
        .navbar-brand {
          font-size: 1.5rem;
        }
        .nav-link {
          padding: 0.5rem 1rem;
          font-weight: 500;
          transition: color 0.3s ease;
          color: rgba(0, 0, 0, 0.7) !important;
        }
        .nav-link:hover {
          color: #000 !important;
        }
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: white;
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          }
          .nav-item {
            margin: 0.25rem 0;
          }
        }
      `,
        }}
      />
    </nav>
  );
}
