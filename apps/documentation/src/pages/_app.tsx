import '../globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';

import { SystemIdentityReflection } from '../components/SystemIdentityReflection';
import { API_BASE_URL } from '../lib/systemIdentity';

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
      navigator.sendBeacon(`${API_BASE_URL}/logging`, blob);
      return;
    }

    void fetch(`${API_BASE_URL}/logging`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    });
  } catch {
    // logging must not impact docs UX
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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

  return (
    <>
      <Component {...pageProps} />
      <SystemIdentityReflection />
    </>
  );
}
