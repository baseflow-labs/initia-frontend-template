# Landing Page Internationalization (i18n) Setup

## Overview

The landing page uses **Next.js App Router with next-intl** for server-side internationalization with locale-based routing.

## Architecture

### Routes

- `/en/*` - English content
- `/ar/*` - Arabic content

### How It Works

1. **Server-Side Rendering**: All content is rendered on the server for optimal SEO
2. **Backend-Driven Content**: Page content (titles, descriptions, sections) comes from backend API
3. **UI Translations**: Static UI elements (buttons, labels, errors) use next-intl JSON files

### File Structure

```
src/
├── app/
│   └── [locale]/           # Locale-based routes
│       ├── layout.tsx      # Root layout with locale handling
│       ├── page.tsx        # Home page
│       └── [slug]/         # Dynamic pages
│           └── page.tsx
├── i18n/
│   ├── config.ts           # Locale configuration
│   ├── request.ts          # next-intl server config
│   └── locales/
│       ├── en.json         # English UI translations
│       └── ar.json         # Arabic UI translations
├── lib/
│   ├── api.ts              # API client with locale support
│   └── dummyApiData/       # Mock data for development
│       ├── index.ts        # Locale router
│       ├── en.ts           # English mock data
│       └── ar.ts           # Arabic mock data
├── middleware.ts           # Locale detection & routing
└── components/
    └── LandingLanguageSwitcher.tsx  # Language switcher component
```

## API Integration

### Backend Expectations

All API endpoints accept a `locale` query parameter:

```typescript
GET /api/landing-pages?locale=en
GET /api/landing-pages?locale=ar
GET /api/system/metadata?locale=en
GET /api/system/metadata?locale=ar
```

### Development Mode (Mock Data)

When the backend is unavailable, the app automatically falls back to mock data:

- `en.ts` - English content
- `ar.ts` - Arabic content

The mock data provides realistic examples for both locales.

## Adding New Locales

1. Add locale to `src/i18n/config.ts`:

```typescript
export const locales = ["en", "ar", "fr"] as const;
```

2. Create UI translations file:

```
src/i18n/locales/fr.json
```

3. Create mock data file (optional):

```
src/lib/dummyApiData/fr.ts
```

4. Update middleware in `src/middleware.ts` to include the new locale

## Language Switching

The `LandingLanguageSwitcher` component handles locale switching:

- Uses Next.js router to navigate between locales
- Preserves the current path
- Example: `/en/about` → `/ar/about`

## Content vs UI Translations

### Backend Content (API)

- Page titles
- Page descriptions
- Section headings
- Section content
- Metadata

### UI Translations (next-intl JSON)

- Navigation labels
- Button text
- Error messages
- Form labels
- Static UI elements

## RTL Support

Arabic automatically gets RTL layout via the `dir` attribute in layout.tsx:

```typescript
const dir = locale === 'ar' ? 'rtl' : 'ltr';
<html lang={locale} dir={dir}>
```

## SEO Benefits

- ✅ Unique URLs per locale (`/en/...`, `/ar/...`)
- ✅ Server-side rendering for all content
- ✅ Proper `lang` and `dir` attributes
- ✅ Locale-specific meta tags
- ✅ Static generation support

## Testing

Visit:

- English: `http://localhost:3002/en`
- Arabic: `http://localhost:3002/ar`

The middleware will redirect `/` to `/en` (default locale).
