import '../globals.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiBase}/metadata`);
        if (!response.ok) return;

        const json = await response.json();
        const payload = json?.payload || json;

        if (payload?.name) {
          document.title = `${payload.name} Documentation`;
        }

        if (payload?.defaultThemeColor) {
          document.documentElement.style.setProperty(
            '--docs-brand-primary',
            payload.defaultThemeColor
          );
        }

        if (payload?.logo) {
          let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
          if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
          }
          favicon.href = payload.logo;
        }
      } catch {
        // Keep built-in defaults if metadata request fails
      }
    };

    fetchIdentity();
  }, []);

  return <Component {...pageProps} />;
}
