# Landing Page Package

Dynamic Next.js landing page builder that fetches content from an API and generates static pages at build time.

## Features

- 🚀 **Static Site Generation (SSG)**: Pages are pre-rendered at build time based on API data
- 🎨 **13 Section Types**: Hero, Features, Pricing, FAQ, Testimonials, Blog, Contact, Clients, Team, About, How It Works, Demo Request, Careers
- 📱 **Responsive Design**: All sections are mobile-friendly using Bootstrap
- 🔧 **Dynamic Content**: Configure everything through API responses
- 🎯 **SEO Optimized**: Full metadata support for each page
- 🧩 **Shared Components**: Uses the `@initia/shared` package for UI components

## Section Types

Each section type has its own content structure:

### Hero

- Heading, subheading, background image
- Primary and secondary CTAs

### Features

- Horizontal or vertical variants
- Icon/image support per feature

### Pricing

- Multiple pricing plans
- Highlight recommended plans
- Feature lists

### FAQ

- Expandable Q&A items

### Testimonials

- Slider or fixed grid variants
- Star ratings, avatars

### Blog

- Slider or fixed grid variants
- Post excerpts and links

### Contact

- Contact form
- Email, phone, address display
- Map integration
- Social links

### Clients/Partners

- Logo grid
- Optional links

### Team

- Team member cards
- Avatars, bios, social links

### About

- Rich content with HTML support
- Statistics display
- Optional image

### How It Works

- Numbered steps
- Icons/images per step

### Demo Request

- Dynamic form builder
- Custom fields

### Careers

- Job listings
- Department, location, type badges
- Apply links

## API Integration

The landing page expects a single API endpoint:

```
GET /api/landing-pages
```

### Response Format

```json
{
  "pages": [
    {
      "id": "1",
      "slug": "home",
      "title": "Home",
      "metadata": {
        "title": "Welcome to Our Platform",
        "description": "Build amazing things",
        "keywords": "platform, saas",
        "ogImage": "https://example.com/og.jpg",
        "ogTitle": "Platform",
        "ogDescription": "Build amazing things"
      },
      "sections": [
        {
          "id": "s1",
          "title": "Hero Section",
          "subtitle": "Optional subtitle",
          "type": "hero",
          "order": 1,
          "content": {
            "heading": "Build Your Next Big Thing",
            "subheading": "The all-in-one platform",
            "backgroundImage": "/hero-bg.jpg",
            "ctaText": "Get Started",
            "ctaLink": "/signup"
          }
        }
      ]
    }
  ]
}
```

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Configure API URL:

```bash
cp .env.local.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL
```

3. Run development server:

```bash
pnpm dev
```

4. Build for production:

```bash
pnpm build
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: API endpoint URL (default: `http://localhost:3000/api`)

## Development

The package includes mock data in `src/lib/api.ts` for development when the API is unavailable. The app will automatically fall back to mock data if the API call fails.

## Integration with Admin Panel

This package is designed to work with the admin panel's landing page builder. The section types and content structures match those defined in:

- `/packages/admin-app/src/views/auth/landingPage/builder.tsx`

## Project Structure

```
src/
  app/                    # Next.js app router
    [slug]/              # Dynamic page routes
    layout.tsx           # Root layout
    page.tsx             # Home page (redirects)
  components/
    sections/            # Section components
      SectionRenderer.tsx
      HeroSection.tsx
      FeaturesSection.tsx
      ... (all section types)
  lib/
    api.ts               # API client
  types/
    landing.ts           # TypeScript types
```

## Notes

- Pages are statically generated at build time using Next.js 14 App Router
- All sections use Bootstrap classes from the shared package
- Images should be optimized and served from a CDN
- The API is called during build time, not at runtime
- To add new content, rebuild the site after updating API data
