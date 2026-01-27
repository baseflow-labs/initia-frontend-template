"use client";

import { Page } from "@/types/landing";
import { useEffect, useState } from "react";

interface NavbarProps {
  pages?: Page[];
}

export default function Navbar({ pages = [] }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top transition ${
        isScrolled ? "navbar-light bg-white shadow-sm" : "navbar-dark"
      }`}
      style={{ transition: "all 0.3s ease" }}
    >
      <div className="container">
        <a href="/" className="navbar-brand fw-bold fs-4">
          <span className="text-primary">Innovate</span>Hub
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
        }
        .navbar-dark .nav-link {
          color: rgba(255, 255, 255, 0.9);
        }
        .navbar-dark .nav-link:hover {
          color: #fff;
        }
        .navbar-light .nav-link {
          color: rgba(0, 0, 0, 0.7);
        }
        .navbar-light .nav-link:hover {
          color: #000;
        }
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: white;
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          }
          .navbar-dark .navbar-collapse {
            background: rgba(255, 255, 255, 0.95);
          }
          .navbar-dark .navbar-collapse .nav-link {
            color: rgba(0, 0, 0, 0.7);
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
