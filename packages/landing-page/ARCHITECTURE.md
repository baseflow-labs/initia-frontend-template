# Landing Page Package - Architecture

## Overview

This package is a Next.js 14 application using the App Router with Static Site Generation (SSG). It dynamically generates pages based on API responses at build time.

## Key Concepts

### 1. Build-Time Data Fetching

- During `next build`, the app calls the API to fetch all page data
- Pages are pre-rendered as static HTML
- No runtime API calls needed for page rendering
- Fast performance and SEO-friendly

### 2. Dynamic Routes

- Uses Next.js dynamic routes: `app/[slug]/page.tsx`
- `generateStaticParams()` tells Next.js which pages to build
- Each slug becomes a static page

### 3. Section-Based Architecture

- Each page contains multiple sections
- Sections are rendered based on their `type` field
- `SectionRenderer` component maps types to components
- Sections are ordered using the `order` field

## Data Flow

```
Build Time:
API Call → Fetch Pages → Generate Static Params → Render Each Page → Build Static HTML

Runtime:
User Request → Serve Static HTML (instant!)
```

## File Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home redirect
│   ├── [slug]/
│   │   └── page.tsx         # Dynamic page generator
│   ├── error.tsx            # Error boundary
│   └── not-found.tsx        # 404 page
├── components/
│   └── sections/
│       ├── SectionRenderer.tsx    # Maps types to components
│       ├── HeroSection.tsx        # Individual section components...
│       └── ...
├── lib/
│   └── api.ts               # API client with mock fallback
└── types/
    └── landing.ts           # TypeScript definitions
```

## Extending the System

### Adding a New Section Type

1. **Define the type** in `types/landing.ts`:

```typescript
export interface NewSectionContent {
  // your fields
}

export type SectionType = ... | 'new_section';
export type SectionContent = ... | NewSectionContent;
```

2. **Create the component** in `components/sections/NewSection.tsx`:

```typescript
export default function NewSection({ title, subtitle, content }) {
  // render your section
}
```

3. **Register in SectionRenderer**:

```typescript
case 'new_section':
  return <NewSection ... />;
```

4. **Update admin panel** builder to include the new type

### Customizing Styles

- The package uses Bootstrap from `@initia/shared`
- Add custom CSS in component files or create a global stylesheet
- Tailwind can be added if needed

### API Integration

Replace the mock data in `lib/api.ts`:

```typescript
const response = await axios.get(`${API_URL}/landing-pages`);
return response.data.pages;
```

## Performance Considerations

- **Images**: Use Next.js Image component for optimization
- **Code Splitting**: Each section is automatically code-split
- **Static Generation**: Pages are pre-rendered, no server needed
- **Revalidation**: Use ISR (Incremental Static Regeneration) if needed

## Deployment

### Static Export

```bash
pnpm build
```

Deploy the `.next` folder to any static host.

### With Server

Deploy to Vercel, Netlify, or any Node.js host for full Next.js features.

### Environment Variables

Set `NEXT_PUBLIC_API_URL` in your deployment environment.

## Integration Points

### With Admin Panel

- Admin panel defines section types and structures
- API returns data in the format expected by this package
- Both share the same type definitions

### With Shared Package

- Uses UI components from `@initia/shared`
- Imports Bootstrap styles
- Can use shared utilities and hooks

## Future Enhancements

- [ ] Add image optimization
- [ ] Implement ISR for content updates without rebuild
- [ ] Add analytics tracking
- [ ] Create visual page builder preview
- [ ] Add A/B testing support
- [ ] Implement multi-language support (i18n)
- [ ] Add animation libraries (Framer Motion, etc.)
- [ ] Create section templates library
