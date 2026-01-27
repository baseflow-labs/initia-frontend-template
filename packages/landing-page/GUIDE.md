# 🚀 Landing Page Package - Complete Guide

## What We Built

A fully dynamic Next.js landing page package that:

- ✅ Fetches page structure from API at build time
- ✅ Supports 13 different section types
- ✅ Integrates with the admin panel builder
- ✅ Uses Static Site Generation (SSG) for optimal performance
- ✅ Shares UI components with other packages
- ✅ SEO optimized with full metadata support

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start the Landing Page

```bash
# From the root
pnpm dev:landing

# Or from the package directory
cd packages/landing-page
pnpm dev
```

The app will run on `http://localhost:3002`

### 3. (Optional) Start Mock API Server

For testing without a real backend:

```bash
cd packages/landing-page/examples
npm install
npm start
```

This starts a mock API server on `http://localhost:3000` with sample data.

### 4. Configure API URL

```bash
cd packages/landing-page
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Package Scripts

From the monorepo root:

```bash
pnpm dev:landing      # Run development server
pnpm build:landing    # Build for production
```

From the package directory:

```bash
pnpm dev             # Development server (port 3002)
pnpm build           # Production build
pnpm start           # Start production server
pnpm lint            # Lint code
pnpm type-check      # TypeScript check
```

## 13 Section Types Supported

| Type           | Description           | Key Features                          |
| -------------- | --------------------- | ------------------------------------- |
| `hero`         | Hero/banner section   | Background image, CTAs, heading       |
| `features`     | Feature grid          | Icons, horizontal/vertical layouts    |
| `pricing`      | Pricing plans         | Multiple tiers, highlight recommended |
| `faq`          | FAQ accordion         | Expandable Q&A items                  |
| `testimonials` | Customer testimonials | Slider/grid, star ratings, avatars    |
| `blog`         | Blog posts            | Slider/grid, post excerpts            |
| `contact`      | Contact form          | Form, email, phone, map, social links |
| `clients`      | Client/partner logos  | Logo grid with optional links         |
| `team`         | Team members          | Photos, bios, social links            |
| `about`        | About section         | Rich content, statistics              |
| `how_it_works` | Step-by-step guide    | Numbered steps with descriptions      |
| `demo_request` | Demo request form     | Dynamic form builder                  |
| `careers`      | Job listings          | Openings with apply links             |

## API Contract

### Endpoint

```
GET /api/landing-pages
```

### Response Structure

```typescript
{
  pages: [
    {
      id: string,
      slug: string,              // URL slug (e.g., "home")
      title: string,
      metadata: {
        title: string,
        description?: string,
        keywords?: string,
        ogImage?: string,
        ogTitle?: string,
        ogDescription?: string
      },
      sections: [
        {
          id: string,
          title: string,
          subtitle?: string,
          type: SectionType,       // One of 13 types
          order?: number,          // Display order
          content: SectionContent  // Type-specific content
        }
      ]
    }
  ]
}
```

### Example Section Contents

**Hero Section:**

```json
{
  "type": "hero",
  "content": {
    "heading": "Build Your Next Big Thing",
    "subheading": "The all-in-one platform",
    "backgroundImage": "/hero-bg.jpg",
    "ctaText": "Get Started",
    "ctaLink": "/signup",
    "secondaryCtaText": "Learn More",
    "secondaryCtaLink": "#features"
  }
}
```

**Features Section:**

```json
{
  "type": "features",
  "content": {
    "variant": "horizontal",
    "features": [
      {
        "id": "f1",
        "title": "Fast & Reliable",
        "description": "Lightning-fast performance",
        "icon": "⚡"
      }
    ]
  }
}
```

**Pricing Section:**

```json
{
  "type": "pricing",
  "content": {
    "plans": [
      {
        "id": "p1",
        "name": "Starter",
        "price": "$9",
        "interval": "month",
        "features": ["Feature 1", "Feature 2"],
        "highlighted": false,
        "ctaText": "Get Started",
        "ctaLink": "/signup"
      }
    ]
  }
}
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for all section content structures.

## Integration with Admin Panel

The landing page package is designed to work with the admin panel builder at:
`packages/admin-app/src/views/auth/landingPage/builder.tsx`

### How It Works:

1. Admin creates pages and sections in the builder
2. Backend API stores the configuration
3. Landing page fetches config at build time
4. Pages are statically generated
5. Users get instant page loads

### Section Types Match:

- Admin panel dropdown options match the 13 section types
- Content fields in admin panel map to TypeScript types
- JSON validation ensures data integrity

## Development Workflow

### With Mock Data (No API)

The package includes mock data in `src/lib/api.ts`. It automatically falls back to this if API calls fail.

### With Mock API Server

1. Start the mock server: `cd examples && npm start`
2. Point to it: `NEXT_PUBLIC_API_URL=http://localhost:3000/api`
3. Develop with realistic data

### With Real API

1. Set `NEXT_PUBLIC_API_URL` to your backend
2. Ensure endpoint returns proper structure
3. Build and deploy

## Building for Production

### Static Export

```bash
pnpm build
```

This generates:

- Static HTML pages for each slug
- Optimized JavaScript bundles
- All assets in `.next` folder

### Deploy To:

- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **AWS S3 + CloudFront**: CDN distribution
- **Any static host**: Upload `.next` folder

### Rebuild Strategy

Since pages are static, rebuild when content changes:

- Manual rebuild: `pnpm build`
- CI/CD webhook: Trigger on API updates
- Scheduled rebuilds: Cron job every hour/day
- ISR (future): Incremental regeneration

## File Structure

```
packages/landing-page/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [slug]/
│   │   │   └── page.tsx       # Dynamic page generator
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Home redirect
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   └── sections/          # All 13 section components
│   │       ├── SectionRenderer.tsx
│   │       ├── HeroSection.tsx
│   │       └── ... (13 total)
│   ├── lib/
│   │   └── api.ts             # API client
│   └── types/
│       └── landing.ts         # TypeScript types
├── examples/
│   └── mock-api-server.js     # Development mock server
├── package.json
├── next.config.js
├── tsconfig.json
├── README.md
├── QUICKSTART.md
└── ARCHITECTURE.md
```

## Customization

### Adding a New Section Type

1. Add to `types/landing.ts`:

```typescript
export interface MyNewSectionContent {
  customField: string;
}
export type SectionType = ... | 'my_new_section';
```

2. Create component in `components/sections/MyNewSection.tsx`
3. Register in `SectionRenderer.tsx`
4. Update admin panel builder

### Styling

- Uses Bootstrap from `@initia/shared`
- Add custom CSS in component files
- Modify section components directly

### Adding Third-Party Libraries

```bash
cd packages/landing-page
pnpm add library-name
```

## Troubleshooting

### Port Already in Use

Change port in `package.json`:

```json
"dev": "next dev -p 3003"
```

### API Connection Failed

- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify API is running and accessible
- Check CORS settings on backend
- Falls back to mock data automatically

### Build Errors

```bash
# Type check
pnpm type-check

# Clear cache
rm -rf .next
pnpm build
```

### Dependencies Issues

```bash
# From monorepo root
pnpm install --force
```

## Testing

### Manual Testing

1. Start dev server: `pnpm dev`
2. Visit: `http://localhost:3002`
3. Check each section type renders correctly

### With Different Data

Modify mock data in `src/lib/api.ts` or update mock server.

### Production Build

```bash
pnpm build
pnpm start
```

## Next Steps

1. ✅ Package is ready to use
2. Configure your API endpoint
3. Update admin panel to save data to API
4. Test with real content
5. Deploy to production

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)
- [Bootstrap Docs](https://getbootstrap.com/docs/5.3/)
- Package README: `packages/landing-page/README.md`
- Architecture: `packages/landing-page/ARCHITECTURE.md`

## Support

For issues or questions:

1. Check the documentation files
2. Review TypeScript types in `types/landing.ts`
3. Examine section components for examples
4. Test with mock API server

---

Built with ❤️ using Next.js 14, TypeScript, and Bootstrap
