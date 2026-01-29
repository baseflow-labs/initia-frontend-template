# Help Center

Public user guide and documentation center built with Next.js.

## Features

- 📚 Dynamic documentation from backend APIs
- 🔍 Full-text search functionality
- 🎨 Clean, user-friendly interface inspired by Zendesk
- 🚀 Static site generation for optimal SEO (Next.js 15+)
- 📱 Responsive design for all devices
- 🌐 Multi-language support ready
- ⚡ React 19 with latest performance optimizations

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## API Integration

The help center fetches documentation data from backend APIs with the following structure:

- **Sections**: Top-level categories
- **Subsections**: Nested categories within sections
- **Articles**: Individual documentation pages with content

All data is fetched at build time for optimal performance and SEO.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
API_SECRET_KEY=your-secret-key
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utilities and API clients
└── types/           # TypeScript types
```
