# Landing Page - Quick Start

## Installation

```bash
cd packages/landing-page
pnpm install
```

## Configuration

1. Copy the environment example:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and configure your API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Development

Run the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:3002`

## Production Build

Build the static site:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## API Endpoint

The landing page fetches data from:

```
GET ${NEXT_PUBLIC_API_URL}/landing-pages
```

Expected response:

```json
{
  "pages": [
    {
      "id": "1",
      "slug": "home",
      "title": "Home",
      "metadata": {
        "title": "Page Title",
        "description": "Page description",
        "keywords": "keywords"
      },
      "sections": [
        {
          "id": "s1",
          "title": "Section Title",
          "type": "hero",
          "content": {
            /* Section-specific content */
          }
        }
      ]
    }
  ]
}
```

## Available Section Types

- `hero` - Hero/banner section with CTA
- `features` - Feature grid
- `pricing` - Pricing plans
- `faq` - Frequently asked questions
- `testimonials` - Customer testimonials
- `blog` - Blog post grid
- `contact` - Contact form
- `clients` - Client/partner logos
- `team` - Team member profiles
- `about` - About us section
- `how_it_works` - Step-by-step guide
- `demo_request` - Demo request form
- `careers` - Job listings

## Notes

- Pages are generated at **build time** using Static Site Generation (SSG)
- Rebuild the site whenever content changes in the API
- Mock data is available for development (see `src/lib/api.ts`)
