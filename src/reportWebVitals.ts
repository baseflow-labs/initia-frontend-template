import type { ReportCallback } from "web-vitals";

const reportWebVitals = (onPerfEntry?: ReportCallback) => {
  if (!onPerfEntry) return;

  import("web-vitals").then((mod) => {
    mod.onCLS(onPerfEntry);
    mod.onFCP(onPerfEntry);
    mod.onINP(onPerfEntry);
    mod.onLCP(onPerfEntry);
    mod.onTTFB(onPerfEntry);
  });
};

export default reportWebVitals;
