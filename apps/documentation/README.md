# README

# @initia/documentation

Technical documentation for the Initia platform built with Next.js and Nextra.

## Features

- 📚 **Static Site Generation (SSG)**: Perfect SEO with pre-rendered pages
- 🌍 **Multi-language Support**: Built-in i18n configuration
- 🎨 **Nextra Theme**: Beautiful documentation theme
- 🚀 **Fast**: Optimized performance with Next.js
- 🔗 **Monorepo Integration**: Integrated with shared packages

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9.12.3+

### Installation

```bash
# Install all dependencies (from root)
pnpm install

# Or install for documentation only
cd apps/documentation
pnpm install
```

### Development

```bash
# Start development server
pnpm dev:documentation

# Or from documentation folder
cd apps/documentation
pnpm dev
```

The documentation will be available at `http://localhost:3004`

### Building

```bash
# Build static site
pnpm build:documentation

# Or from documentation folder
pnpm build
```

### Exporting

```bash
# Export static HTML
pnpm export
```

## Project Structure

```
apps/documentation/
├── src/
│   ├── pages/              # Documentation pages (MDX)
│   │   ├── index.mdx      # Home page
│   │   ├── guide/         # Guide section
│   │   │   ├── architecture.mdx
│   │   │   ├── api.mdx
│   │   │   ├── components.mdx
│   │   │   ├── deployment.mdx
│   │   │   └── _meta.json # Navigation order
│   │   └── _meta.json     # Root navigation
│   └── globals.css        # Global styles
├── public/                # Static assets
├── next.config.js         # Next.js configuration
├── theme.config.tsx       # Nextra theme config
├── tailwind.config.ts     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies
└── README.md              # This file
```

## Configuration

### Navigation (`_meta.json`)

Edit `src/pages/_meta.json` to configure sidebar navigation:

```json
{
  "-- Getting Started": {
    "Getting Started": "/"
  },
  "Guides": {
    "Architecture": "/guide/architecture",
    "API Integration": "/guide/api"
  }
}
```

### Theme (`theme.config.tsx`)

Customize the Nextra theme in `theme.config.tsx`:

```typescript
const config: DocsThemeConfig = {
  logo: <span>Initia Docs</span>,
  project: {
    link: 'https://github.com/your-org/initia-fe',
  },
  // ... more config
};
```

### Styles (`tailwind.config.ts`)

Extend Tailwind CSS in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #3b82f6)',
      },
    },
  },
};
```

## Writing Documentation

### MDX Format

Documentation uses MDX (Markdown + JSX):

```mdx
# Page Title

This is regular markdown content.

## Section

### Subsection

You can also use React components:

<Button>Click me</Button>

\`\`\`typescript
// Code blocks with syntax highlighting
const greeting = 'Hello World';
\`\`\`
```

### Frontmatter

Add metadata to pages:

```mdx
---
title: Page Title
description: Page description for SEO
---

# Page Title

Content...
```

## Monorepo Integration

### Using Shared Packages

Import components from `@initia/shared`:

```tsx
import { Button, Card } from '@initia/shared';

export function MyComponent() {
  return <Button>Click me</Button>;
}
```

### Path Aliases

TypeScript path aliases configured in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@initia/shared": ["../../packages/shared/src"]
  }
}
```

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod
```

### Build & Export

```bash
# Static export
pnpm build
pnpm export

# Output: out/
```

### Environment Variables

Create `.env.local`:

```bash
# Optional: API URL for dynamic content
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Scripts

```bash
# Development
pnpm dev           # Start dev server (port 3004)

# Building
pnpm build         # Build for production
pnpm export        # Export static HTML

# Code Quality
pnpm lint          # Run ESLint
pnpm lint:fix      # Fix linting issues
pnpm typecheck     # Type checking
```

## Dependencies

### Production

- **next**: React framework (v15)
- **nextra**: Documentation framework
- **nextra-theme-docs**: Documentation theme
- **react**: UI library (v19.2.4)
- **@initia/shared**: Shared components
- **tailwindcss**: Styling
- **i18next**: Internationalization

### Development

- **typescript**: Type checking
- **@types/react**: React types
- **eslint**: Linting
- **prettier**: Code formatting
- **tailwindcss**: CSS framework
- **postcss**: CSS processing

## Contributing

1. Create new MDX file in `src/pages/`
2. Add navigation entry in `_meta.json`
3. Follow MDX conventions
4. Test locally: `pnpm dev`
5. Submit PR

## Performance Tips

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Pages are automatically split
3. **SEO**: Add frontmatter with title and description
4. **Analytics**: Integrate with your analytics service
5. **Search**: Nextra includes built-in search

## Resources

- [Nextra Documentation](https://nextra.site/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Specification](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Support

For questions or issues:

1. Check existing documentation
2. Open an issue on GitHub
3. Contact the development team
