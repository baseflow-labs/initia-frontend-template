import { DocsThemeConfig } from 'nextra-theme-docs';
import configs from '@initia/shared/config/configs.ts';

const config: DocsThemeConfig = {
  logo: (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontWeight: 'bold', fontSize: '18px' }}>📚 Initia Docs</span>
    </div>
  ),
  project: {
    link: 'https://github.com/your-org/initia-fe',
  },
  docsRepositoryBase: 'https://github.com/your-org/initia-fe/blob/main/apps/documentation',
  footer: {
    content: (
      <span>
        © {new Date().getFullYear()} Initia. All rights reserved.{' '}
        <a href={configs.externalLinks.privacyPolicy} target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        {' | '}
        <a href={configs.externalLinks.termsOfService} target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>
        {' | '}
        <a href={configs.externalLinks.landingPage} target="_blank" rel="noopener noreferrer">
          Website
        </a>
      </span>
    ),
  },
  search: {
    placeholder: 'Search documentation...',
  },
  i18n: configs.localization.supportedLanguages.map((lang) => ({
    locale: lang,
    name: lang === 'en' ? 'English' : 'العربية',
  })),
};

export default config;
