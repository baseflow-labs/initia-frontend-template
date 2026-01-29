# Help Center Integration Guide

This guide explains how to integrate the Help Center with your backend API.

## API Structure

The Help Center expects your backend to provide three main endpoints:

### 1. Sections Endpoint

**GET** `/api/help/sections`

Returns all top-level documentation sections.

```json
[
  {
    "id": "string",
    "slug": "string",
    "title": "string",
    "description": "string",
    "icon": "string (optional)",
    "order": "number",
    "articleCount": "number (optional)"
  }
]
```

**GET** `/api/help/sections/:slug`

Returns a single section by slug.

### 2. Subsections Endpoint

**GET** `/api/help/sections/:sectionId/subsections`

Returns all subsections for a given section.

```json
[
  {
    "id": "string",
    "slug": "string",
    "sectionId": "string",
    "title": "string",
    "description": "string",
    "order": "number",
    "articleCount": "number (optional)"
  }
]
```

**GET** `/api/help/sections/:sectionId/subsections/:slug`

Returns a single subsection by slug.

### 3. Articles Endpoint

**GET** `/api/help/subsections/:subsectionId/articles`

Returns all articles for a given subsection.

```json
[
  {
    "id": "string",
    "slug": "string",
    "subsectionId": "string",
    "title": "string",
    "summary": "string (optional)",
    "content": "string (HTML or Markdown)",
    "author": {
      "name": "string",
      "avatar": "string (optional)"
    },
    "createdAt": "ISO 8601 date string",
    "updatedAt": "ISO 8601 date string",
    "viewCount": "number (optional)",
    "helpful": "number (optional)",
    "notHelpful": "number (optional)",
    "tags": ["string"] (optional)
  }
]
```

**GET** `/api/help/subsections/:subsectionId/articles/:slug`

Returns a single article by slug.

**GET** `/api/help/articles/search?q=query`

Returns search results.

## Configuration

### Environment Variables

Create a `.env.local` file in the help-center package:

```env
# Your backend API URL
NEXT_PUBLIC_API_URL=https://api.yourproduct.com/api

# Secret key for server-side API calls (optional)
API_SECRET_KEY=your-secret-key

# Public site URL for SEO
NEXT_PUBLIC_SITE_URL=https://help.yourproduct.com
```

### Next.js 15+ Features

This package uses Next.js 15+ with:

- Enhanced caching with cache tags for granular revalidation
- React 19 with improved server components
- Modern image optimization with `remotePatterns`
- ES Module exports (export default instead of module.exports)

### Updating API Integration

In the help-center package, locate these files:

- `src/lib/api/sections.ts`
- `src/lib/api/subsections.ts`
- `src/lib/api/articles.ts`

Uncomment the API fetch calls and remove/comment the mock data:

```typescript
// Before (mock data)
export async function getSections(): Promise<Section[]> {
  return Promise.resolve(MOCK_SECTIONS);
}

// After (real API)
export async function getSections(): Promise<Section[]> {
  return await fetchAPI<Section[]>("/help/sections");
}
```

## Static Site Generation

The Help Center uses Next.js Static Site Generation (SSG) for optimal SEO:

1. **Build Time**: All pages are pre-rendered at build time
2. **Revalidation**: Pages revalidate every hour (configurable)
3. **Dynamic Routes**: All article URLs are generated automatically

### Build Command

```bash
cd packages/help-center
pnpm build
```

This will:

- Fetch all sections, subsections, and articles from your API
- Generate static HTML pages for each article
- Create a sitemap.xml for SEO
- Optimize images and assets

### Deployment

The Help Center can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any static hosting service

## Customization

### Styling

Update `tailwind.config.ts` to match your brand colors:

```typescript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-color',
    // ...
  },
}
```

### Content

- **Logo**: Update in `src/components/layout/Header.tsx`
- **Footer**: Update links in `src/components/layout/Footer.tsx`
- **Homepage**: Customize quick links in `src/app/page.tsx`

### SEO Metadata

Update default metadata in `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: {
    default: "Your Help Center",
    template: "%s | Your Help Center",
  },
  description: "Your description",
  // ...
};
```

## Analytics

To add Google Analytics or other tracking:

1. Install the analytics package
2. Update `src/app/layout.tsx` to include tracking scripts
3. Add tracking IDs to environment variables

## Features

✅ Server-side rendering and static generation
✅ Full-text search
✅ Breadcrumb navigation
✅ Related articles
✅ Article feedback system
✅ SEO optimized (sitemap, robots.txt, metadata)
✅ Responsive design
✅ Dark mode support
✅ TypeScript
✅ Tailwind CSS

## Support

For issues or questions, refer to:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
