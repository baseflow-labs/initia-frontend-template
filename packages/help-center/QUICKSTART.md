# Help Center - Quick Start

Get your help center up and running in minutes.

## Installation

```bash
# From the monorepo root
pnpm install
```

## Development

```bash
# Navigate to the help-center package
cd packages/help-center

# Start the development server
pnpm dev
```

The help center will be available at `http://localhost:3003`

## Using Mock Data

By default, the help center uses mock data for development. You can:

1. Browse all sections
2. View subsections
3. Read articles
4. Test search functionality
5. See the responsive layout

## Connecting to Your API

To connect to your backend API:

1. Copy the environment template:

   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your API URL:

   ```env
   NEXT_PUBLIC_API_URL=https://api.yourproduct.com/api
   API_SECRET_KEY=your-secret-key
   ```

3. Update the API integration files:
   - `src/lib/api/sections.ts`
   - `src/lib/api/subsections.ts`
   - `src/lib/api/articles.ts`

   Uncomment the real API calls and comment out the mock data.

4. Restart the development server

## Project Structure

```
help-center/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Homepage
│   │   ├── search/       # Search page
│   │   └── sections/     # Dynamic section pages
│   ├── components/       # React components
│   │   ├── articles/     # Article components
│   │   ├── common/       # Shared components
│   │   ├── layout/       # Layout components
│   │   ├── search/       # Search components
│   │   └── sections/     # Section components
│   ├── lib/
│   │   └── api/          # API client functions
│   └── types/            # TypeScript types
├── public/               # Static assets
└── package.json
```

## Key Features

- **Next.js 15+**: Latest framework with React 19
- **Static Generation**: All pages pre-rendered for SEO
- **Search**: Full-text search across all articles
- **Responsive**: Works on all devices
- **Dark Mode**: Automatic dark mode support
- **Breadcrumbs**: Easy navigation
- **Related Articles**: Smart article recommendations
- **Feedback**: User feedback on articles
- **Modern Stack**: Latest TypeScript 5.9+, Tailwind CSS 3.4+

## Building for Production

```bash
# Build the static site
pnpm build

# Preview the production build
pnpm start
```

## Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  },
}
```

### Update Logo & Branding

Edit `src/components/layout/Header.tsx`

### Modify Content

- **Homepage**: `src/app/page.tsx`
- **Footer**: `src/components/layout/Footer.tsx`

## Next Steps

1. Read [INTEGRATION.md](./INTEGRATION.md) for API integration details
2. Review [README.md](./README.md) for complete documentation
3. Customize the design to match your brand
4. Deploy to your hosting platform

## Need Help?

Check the [INTEGRATION.md](./INTEGRATION.md) guide or the main README for more detailed information.
