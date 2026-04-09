import '../globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

function logSystemError(message: string, stack?: string) {
  const body = JSON.stringify({
    level: 'error',
    message,
    context: 'documentation',
    stack,
    meta: { app: 'documentation' },
  });

  try {
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(`${apiBase}/logging`, blob);
      return;
    }

    void fetch(`${apiBase}/logging`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    });
  } catch {
    // logging must not impact docs UX
  }
}

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const router = useRouter();

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

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      logSystemError(
        event.message || 'Unhandled window error',
        event.error?.stack as string | undefined
      );
    };

    window.addEventListener('error', onError);

    return () => {
      window.removeEventListener('error', onError);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
