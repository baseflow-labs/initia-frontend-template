import { useEffect, useState } from 'react';

import {
  DEFAULT_SYSTEM_IDENTITY,
  SystemIdentity,
  fetchSystemIdentity,
} from '../lib/systemIdentity';

const applyIdentity = (identity: SystemIdentity) => {
  document.title = `${identity.name} Documentation`;
  document.documentElement.style.setProperty('--docs-brand-primary', identity.defaultThemeColor);
  document.documentElement.style.setProperty('--color-primary', identity.defaultThemeColor);

  const faviconUrl = identity.logo || identity.logoFull;
  if (!faviconUrl) return;

  let favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
  if (!favicon) {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    document.head.appendChild(favicon);
  }

  favicon.href = faviconUrl;
};

export const SystemIdentityReflection = () => {
  const [identity, setIdentity] = useState<SystemIdentity>(DEFAULT_SYSTEM_IDENTITY);

  useEffect(() => {
    let mounted = true;

    fetchSystemIdentity().then((nextIdentity) => {
      if (!mounted) return;
      setIdentity(nextIdentity);
      applyIdentity(nextIdentity);
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      style={{
        borderTop: '1px solid rgba(148, 163, 184, 0.25)',
        padding: '16px 24px',
        fontSize: '14px',
        color: 'var(--nextra-text-color, inherit)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px 20px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <strong>{identity.name} Documentation</strong>
        {identity.contactEmail && (
          <a href={`mailto:${identity.contactEmail}`}>{identity.contactEmail}</a>
        )}
        {identity.phoneNumber && <a href={`tel:${identity.phoneNumber}`}>{identity.phoneNumber}</a>}
        {identity.websiteUrl && (
          <a href={identity.websiteUrl} target="_blank" rel="noopener noreferrer">
            Website
          </a>
        )}
      </div>
    </div>
  );
};
