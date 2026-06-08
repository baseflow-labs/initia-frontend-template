import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

import type { SystemIdentity } from "@/lib/api/identity";

const TikTokIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M14 3c.2 1.7 1.4 3.4 3 4.2a6 6 0 0 0 3 .8v3a9 9 0 0 1-3-.6v5.8a6.8 6.8 0 1 1-6.8-6.8c.4 0 .8 0 1.2.1v3.1a3.7 3.7 0 1 0 2.6 3.6V3h3z" />
    </svg>
  );
};

export const Footer = ({ identity }: { identity: SystemIdentity }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">{identity.name} Help Center</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {identity.slogan || "Find answers and support for all your questions."}
            </p>

            <div className="flex gap-3 mt-5">
              {identity?.socialTwitter && (
                <a
                  href={identity.socialTwitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              {identity?.socialLinkedin && (
                <a
                  href={identity.socialLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              {identity?.socialFacebook && (
                <a
                  href={identity.socialFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              {identity?.socialInstagram && (
                <a
                  href={identity.socialInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              {identity?.socialYoutube && (
                <a
                  href={identity.socialYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              {identity?.socialTiktok && (
                <a
                  href={identity.socialTiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600 dark:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/getting-started"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Getting Started
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${identity.contactEmail || "support@example.com"}`}
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Email Support
                </a>
              </li>
              {identity.phoneNumber && (
                <li>
                  <a
                    href={`tel:${identity.phoneNumber}`}
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                  >
                    {identity.phoneNumber}
                  </a>
                </li>
              )}
              {identity.websiteUrl && (
                <li>
                  <a
                    href={identity.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                  >
                    Official Website
                  </a>
                </li>
              )}
              <li>
                <Link
                  href="/status"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                >
                  Terms of Service
                </Link>
              </li>
              {identity.socialFacebook && (
                <li>
                  <a
                    href={identity.socialFacebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {identity.socialInstagram && (
                <li>
                  <a
                    href={identity.socialInstagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {identity.socialLinkedin && (
                <li>
                  <a
                    href={identity.socialLinkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-primary-600 dark:text-gray-400"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
          <p>
            &copy; {currentYear} {identity.name || "Your Company"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
