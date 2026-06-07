import '../globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { createPublicApiBridge } from '@initia/shared/api/publicBridge';

const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const apiBridge = createPublicApiBridge({
  appId: 'documentation',
  appBaseUrl: apiBase,
  firebase: {
    realtimeDbUrl: process.env.NEXT_PUBLIC_FIREBASE_RTDB_URL || '',
    permissionsCollection: process.env.NEXT_PUBLIC_FIREBASE_PERMISSIONS_COLLECTION || 'permissions',
    dataRootPath: process.env.NEXT_PUBLIC_FIREBASE_DATA_ROOT || 'api',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  },
});

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

    void apiBridge.request({
      endpoint: '/logging',
      method: 'POST',
      body: JSON.parse(body),
    });
  } catch {
    // logging must not impact docs UX
  }
}

type MetadataPayload = {
  name?: string;
  defaultThemeColor?: string;
  logo?: string;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        const json = await apiBridge.request<{ payload?: MetadataPayload } | MetadataPayload>({
          endpoint: '/metadata',
        });
        const payload: MetadataPayload =
          json && typeof json === 'object' && 'payload' in json
            ? json.payload || {}
            : (json as MetadataPayload);

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
