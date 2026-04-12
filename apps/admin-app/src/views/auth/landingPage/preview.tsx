import Button from "@initia/shared/ui/components/core/button";
import {
  faComputer,
  faMaximize,
  faMobile,
  faTablet,
  faExternalLink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const LANDING_PAGE_URL = import.meta.env.VITE_APP_LANDING_URL || "http://localhost:3001";

type ViewportMode = "desktop" | "tablet" | "mobile";

const VIEWPORT_WIDTHS: Record<ViewportMode, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

interface LandingPageManagementPreviewProps {
  /** Current page slug to preview. When null shows the home page. */
  slug?: string | null;
  locale?: string;
}

const LandingPageManagementPreview = ({
  slug,
  locale = "en",
}: LandingPageManagementPreviewProps) => {
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [key, setKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const targetSlug = slug || "home";
  const previewUrl = `${LANDING_PAGE_URL}/${locale}/${targetSlug}`;

  // Reload iframe when slug/locale changes
  useEffect(() => {
    setKey((k) => k + 1);
  }, [targetSlug, locale]);

  const refresh = () => setKey((k) => k + 1);

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div className="d-flex gap-2 align-items-center">
          <Button
            outline={viewport !== "desktop"}
            color={viewport === "desktop" ? "primary" : undefined}
            onClick={() => setViewport("desktop")}
            title="Desktop"
          >
            <FontAwesomeIcon icon={faComputer} />
          </Button>
          <Button
            outline={viewport !== "tablet"}
            color={viewport === "tablet" ? "primary" : undefined}
            onClick={() => setViewport("tablet")}
            title="Tablet"
          >
            <FontAwesomeIcon icon={faTablet} />
          </Button>
          <Button
            outline={viewport !== "mobile"}
            color={viewport === "mobile" ? "primary" : undefined}
            onClick={() => setViewport("mobile")}
            title="Mobile"
          >
            <FontAwesomeIcon icon={faMobile} />
          </Button>
        </div>

        <span className="text-muted small text-truncate mx-2" style={{ maxWidth: 200 }}>
          {previewUrl}
        </span>

        <div className="d-flex gap-2">
          <Button outline onClick={refresh} title="Refresh preview">
            ↺
          </Button>
          <Button outline onClick={() => window.open(previewUrl, "_blank")} title="Open in new tab">
            <FontAwesomeIcon icon={faExternalLink} />
          </Button>
          <Button
            outline
            onClick={() => {
              const el = document.getElementById("landing-preview-container");
              el?.requestFullscreen?.();
            }}
            title="Fullscreen"
          >
            <FontAwesomeIcon icon={faMaximize} />
          </Button>
        </div>
      </div>

      <div
        id="landing-preview-container"
        className="card-body p-0 d-flex justify-content-center"
        style={{ background: "#f0f0f0", minHeight: "70vh" }}
      >
        <div
          style={{
            width: VIEWPORT_WIDTHS[viewport],
            maxWidth: "100%",
            transition: "width 0.3s ease",
            background: "#fff",
            boxShadow: viewport !== "desktop" ? "0 0 20px rgba(0,0,0,0.15)" : "none",
          }}
        >
          <iframe
            key={key}
            ref={iframeRef}
            src={previewUrl}
            title="Landing Page Preview"
            style={{
              width: "100%",
              height: "70vh",
              border: "none",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageManagementPreview;
