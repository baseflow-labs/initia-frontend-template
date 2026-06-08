"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale } from "next-intl";

const CONSENT_KEY = "landingConsent.v1";

const ConsentPopup = () => {
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const accepted = window.localStorage.getItem(CONSENT_KEY);
    if (!accepted) setOpen(true);
  }, []);

  const links = useMemo(() => {
    return {
      privacy: `/${locale}/privacy-policy`,
      terms: `/${locale}/terms-and-conditions`,
    };
  }, [locale]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 1200,
      }}
      aria-live="polite"
      aria-label="Cookie and data consent"
    >
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: 880, margin: "0 auto", borderRadius: 14 }}
      >
        <div className="card-body d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between">
          <div>
            <h6 className="mb-1">We value your privacy</h6>
            <p className="mb-0 text-muted small">
              We use essential cookies and process data to improve your experience. By continuing,
              you agree to our <a href={links.privacy}>Privacy Policy</a> and{" "}
              <a href={links.terms}>Terms of Service</a>.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => {
                window.localStorage.setItem(CONSENT_KEY, "declined");
                setOpen(false);
              }}
            >
              Decline
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                window.localStorage.setItem(CONSENT_KEY, "accepted");
                setOpen(false);
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentPopup;
