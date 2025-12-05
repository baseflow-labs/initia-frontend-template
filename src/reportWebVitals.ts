import type { ReportCallback } from 'web-vitals';

export default function reportWebVitals(onPerfEntry?: ReportCallback) {
  if (!onPerfEntry) return;

  import('web-vitals').then(mod => {
    mod.onCLS(onPerfEntry);
    mod.onFCP(onPerfEntry);
    mod.onINP(onPerfEntry);
    mod.onLCP(onPerfEntry);
    mod.onTTFB(onPerfEntry);
  });
}
