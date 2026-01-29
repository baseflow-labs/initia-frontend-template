# Admin Panel to Landing Page Integration

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          ADMIN PANEL                                     │
│                  (packages/admin-app/src/views/auth/                    │
│                      landingPage/builder.tsx)                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  1. Select Page                                                         │
│     ├─ Page Title: "Home"                                              │
│     ├─ Slug: "home"                                                    │
│     └─ SEO Metadata: title, description, keywords                      │
│                                                                          │
│  2. Add Sections                                                        │
│     ├─ Section Type: [Dropdown]                                        │
│     │   ├─ Hero                                                        │
│     │   ├─ Features                                                    │
│     │   ├─ Pricing                                                     │
│     │   ├─ FAQ                                                         │
│     │   ├─ Testimonials                                                │
│     │   ├─ Blog                                                        │
│     │   ├─ Contact                                                     │
│     │   ├─ Clients/Partners                                            │
│     │   ├─ Team                                                        │
│     │   ├─ About                                                       │
│     │   ├─ How It Works                                                │
│     │   ├─ Demo Request                                                │
│     │   └─ Careers                                                     │
│     │                                                                   │
│     ├─ Section Title: "Welcome to Our Platform"                       │
│     ├─ Section Subtitle: (optional)                                   │
│     └─ Section Content: (type-specific fields)                        │
│                                                                          │
│  3. Save Configuration                                                  │
│     └─ POST to Backend API                                             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP POST
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         BACKEND API                                      │
│                    (Your Backend Service)                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Database Tables:                                                       │
│  ├─ pages: id, slug, title, metadata                                  │
│  ├─ sections: id, page_id, title, subtitle, type, order, content      │
│  └─ Relationships                                                       │
│                                                                          │
│  API Endpoints:                                                         │
│  ├─ POST /api/landing-pages        (Admin saves)                      │
│  └─ GET  /api/landing-pages        (Landing page fetches)             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP GET (during build)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      LANDING PAGE PACKAGE                               │
│                    (packages/landing-page)                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Build Process (next build):                                           │
│  1. lib/api.ts → getPages()                                            │
│  2. Fetch all pages from API                                           │
│  3. generateStaticParams() → create routes                             │
│  4. For each page:                                                     │
│     ├─ Generate metadata (SEO)                                         │
│     ├─ Sort sections by order                                          │
│     ├─ Render sections via SectionRenderer                             │
│     └─ Output static HTML                                              │
│                                                                          │
│  Runtime (user visits):                                                │
│  └─ Serve pre-built static HTML (instant!)                            │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## Example: Creating a Hero Section

### Step 1: Admin Panel Input

```typescript
// Admin fills form in builder.tsx
{
  sectionTitle: "Welcome Hero",
  sectionType: "hero",
  heroHeading: "Build Your Next Big Thing",
  heroSubheading: "The all-in-one platform",
  heroBackgroundImage: "https://example.com/hero.jpg",
  ctaText: "Get Started",
  ctaLink: "/signup"
}
```

### Step 2: Backend Storage (Your API)

```json
POST /api/landing-pages
{
  "pageId": "home",
  "section": {
    "title": "Welcome Hero",
    "type": "hero",
    "order": 1,
    "content": {
      "heading": "Build Your Next Big Thing",
      "subheading": "The all-in-one platform",
      "backgroundImage": "https://example.com/hero.jpg",
      "ctaText": "Get Started",
      "ctaLink": "/signup"
    }
  }
}
```

### Step 3: Landing Page Fetches

```json
GET /api/landing-pages
{
  "pages": [{
    "slug": "home",
    "title": "Home",
    "sections": [{
      "id": "s1",
      "title": "Welcome Hero",
      "type": "hero",
      "order": 1,
      "content": {
        "heading": "Build Your Next Big Thing",
        "subheading": "The all-in-one platform",
        "backgroundImage": "https://example.com/hero.jpg",
        "ctaText": "Get Started",
        "ctaLink": "/signup"
      }
    }]
  }]
}
```

### Step 4: Rendered Output

```tsx
// SectionRenderer → HeroSection.tsx
<section className="hero-section" style={{ backgroundImage: "url(https://example.com/hero.jpg)" }}>
  <h1>Build Your Next Big Thing</h1>
  <p>The all-in-one platform</p>
  <Button href="/signup">Get Started</Button>
</section>
```

## Type Mapping Reference

| Admin Panel Field             | TypeScript Type       | Landing Page Component    |
| ----------------------------- | --------------------- | ------------------------- |
| `sectionType: "hero"`         | `HeroContent`         | `HeroSection.tsx`         |
| `sectionType: "features"`     | `FeaturesContent`     | `FeaturesSection.tsx`     |
| `sectionType: "pricing"`      | `PricingContent`      | `PricingSection.tsx`      |
| `sectionType: "faq"`          | `FAQContent`          | `FAQSection.tsx`          |
| `sectionType: "testimonials"` | `TestimonialsContent` | `TestimonialsSection.tsx` |
| `sectionType: "blog"`         | `BlogContent`         | `BlogSection.tsx`         |
| `sectionType: "contact"`      | `ContactContent`      | `ContactSection.tsx`      |
| `sectionType: "clients"`      | `ClientsContent`      | `ClientsSection.tsx`      |
| `sectionType: "team"`         | `TeamContent`         | `TeamSection.tsx`         |
| `sectionType: "about"`        | `AboutContent`        | `AboutSection.tsx`        |
| `sectionType: "how_it_works"` | `HowItWorksContent`   | `HowItWorksSection.tsx`   |
| `sectionType: "demo_request"` | `DemoRequestContent`  | `DemoRequestSection.tsx`  |
| `sectionType: "careers"`      | `CareersContent`      | `CareersSection.tsx`      |

## Admin Panel Form Fields → API Content Mapping

### Hero Section

```typescript
// Admin Form → API Content
heroHeading         → content.heading
heroSubheading      → content.subheading
heroBackgroundImage → content.backgroundImage
ctaText            → content.ctaText
ctaLink            → content.ctaLink
```

### Features Section

```typescript
variant        → content.variant ("horizontal" | "vertical")
featuresList   → content.features (parsed from textarea/JSON)
```

### Pricing Section

```typescript
pricingPlans   → content.plans (parsed from JSON)
```

### FAQ Section

```typescript
faqs           → content.faqs (parsed from JSON)
```

### Testimonials Section

```typescript
variant        → content.variant ("slider" | "fixed")
layout         → content.layout ("horizontal" | "vertical")
testimonials   → content.testimonials (parsed from JSON)
```

### Blog Section

```typescript
variant         → content.variant ("slider" | "fixed")
numberOfPosts   → content.numberOfPosts
```

### Contact Section

```typescript
contactEmail    → content.email
contactPhone    → content.phone
map            → content.mapLocation
```

### Clients Section

```typescript
clientsLogos   → content.logos (parsed from JSON)
```

### Team Section

```typescript
teamMembers    → content.members (parsed from JSON)
```

### About Section

```typescript
aboutContent      → content.content (HTML)
aboutStatistics   → content.statistics (parsed from JSON)
```

### How It Works Section

```typescript
steps          → content.steps (parsed from JSON)
```

### Demo Request Section

```typescript
demoRequestFormFields → content.formFields (parsed from JSON)
```

### Careers Section

```typescript
jobOpenings    → content.jobOpenings (parsed from JSON)
```

## Development Workflow

### 1. Local Development (No Backend)

```bash
# Use mock data in lib/api.ts
pnpm dev:landing
```

### 2. With Mock API Server

```bash
# Terminal 1: Start mock API
cd packages/landing-page/examples
npm install && npm start

# Terminal 2: Start landing page
pnpm dev:landing
```

### 3. With Real Backend

```bash
# Set API URL
echo "NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api" > packages/landing-page/.env.local

# Start landing page
pnpm dev:landing
```

### 4. Production Build

```bash
# Fetch from API and build
pnpm build:landing

# Result: Static HTML pages ready to deploy
```

## Deployment Strategy

### Option 1: Rebuild on Content Change

```
Admin saves → Webhook triggers → CI/CD rebuilds → Deploy
```

### Option 2: Scheduled Rebuilds

```
Cron job (every hour) → Fetch latest → Build → Deploy
```

### Option 3: On-Demand Rebuild

```
Admin clicks "Publish" → API call to CI/CD → Rebuild → Deploy
```

## Key Advantages

1. **Performance**: Static pages load instantly
2. **SEO**: Pre-rendered HTML is crawler-friendly
3. **Scalability**: No server-side rendering needed
4. **Reliability**: No API dependency at runtime
5. **Cost**: Cheap to host (static files)
6. **Security**: No backend exposed to users
7. **Flexibility**: Admin can configure everything
8. **Type Safety**: Full TypeScript support

## Maintenance Notes

- Admin panel and landing page share the same section type definitions
- Changes to section types require updates in both packages
- Content validation should happen in admin panel before saving
- Landing page gracefully handles missing or malformed data
- Mock data ensures development works without backend
