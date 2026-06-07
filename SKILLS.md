# SKILLS.md

Codex execution skills for frontend delivery.

## Skill F1: New CRUD Resource End To End

### Goal

Ship a new resource across admin/user/mobile surfaces with typed services, list analysis rendering, docs/help-center visibility, and optional landing-page feature mention.

### Clone-From Examples

- Web CRUD view scaffold (admin and user):
  - apps/admin-app/src/views/auth/services/TABLE_PLURAL_LOWER_NAME/index.tsx
  - apps/user-app/src/views/auth/services/TABLE_PLURAL_LOWER_NAME/index.tsx
  - packages/shared/src/ui/layouts/auth/pages/tablePage.tsx
  - packages/shared/src/ui/components/table/apiDatatable.tsx
- Rich support/manual consumption patterns:
  - apps/user-app/src/api/support/index.ts
  - apps/user-app/src/views/auth/supportCenter/faq/index.tsx
  - apps/user-app/src/views/auth/supportCenter/user-manual/index.tsx
- Mobile feature registration:
  - apps/user-mobile-app/src/screens/features/FeatureRegistry.tsx
  - apps/user-mobile-app/src/navigation/AppNavigator.tsx

### Required Inputs Before Coding

- Resource ownership: user-oriented vs admin-oriented.
- Route location and nav placement.
- Fields and input components per field.
- Relation data needed for forms/selects.
- Analysis cards/charts to display on list screen.
- Required docs/help-center copy and localization.

### Build Steps

1. Start from existing examples first (TablePage, ApiDataTable, dynamic form, and generated TABLE_PLURAL views) before creating new abstractions.
2. Add typed client functions in packages/user-services or app api layer used by that app.
3. Keep API wiring in centralized api directories; do not place HTTP calls inline inside .tsx views.
4. Add list/detail/create/edit views using TablePage or ApiDataTable patterns.
5. Keep .tsx files mostly presentation-focused and move non-UI logic to framework-agnostic .ts modules.
6. Use centralized request/response/body types and do not use any.
7. Add localization keys for all user-facing copy and update locale JSON values.
8. Add route wiring in target app layout/router.
9. For analysis-enabled listing:
   - map analysis counters/trends/segments from backend response.
   - render KPI cards or mini charts in list screen header.
10. If user-oriented, implement both:

- user web views.
- user-mobile feature entries and screens.

11. If admin-oriented only, keep in admin app and guard via permissions.
12. Add help/documentation display integration for seeded FAQ/manual content.
13. If resource has marketing value, add/update landing page features content entries.
14. Run lint and typecheck for touched frontend scope before finalizing.

### Analysis Data Rendering Pattern

Recommended UI blocks above the table:

- KPI chips/cards for counters.
- small bar or sparkline for trends.
- grouped badges/table for segments.

Use existing example references:

- apps/user-app/src/views/auth/templateExamples/dataView/index.tsx
- apps/user-mobile-app/src/screens/features/ListLikeView.tsx

### Landing Feature Mention Guidance

If resource is user-visible and differentiating:

- add one concise feature title.
- add one outcome-focused description.
- map it in landing section data and localized strings.

Suggested content pattern:

- title: Real-time <ResourcePlural> Management
- description: Track, filter, and act on <resourcePlural> with role-aware workflows.

### Done Criteria

- Web and mobile coverage matches ownership model.
- List view consumes backend analysis payload when present.
- Routes and permissions are aligned.
- Docs/help-center content appears in related apps.
- No any is introduced; request/response/body typing remains centralized.
- API calls stay in centralized api setup directories, not inline in view code.
- User-facing text is localized via keys and locale JSON values.
- Build/typecheck/lint pass for touched apps/packages.

## Skill F2: First-Time Setup For New Resource Productization

### Goal

Make all key product and technical decisions before implementation for a new resource.

### Decision Framework

1. User value:
   - What job does this resource solve?
2. Ownership and visibility:
   - admin-only, user-only, or both.
3. Information architecture:
   - where it appears in nav, support center, and docs.
4. Interaction model:
   - table-first, form-first, workflow-first.
5. Required analytics:
   - counters, trends, segmentation.
6. Localization scope:
   - keys needed in en/ar and fallback policy.
7. Mobile parity:
   - full parity, reduced parity, or summary-only.

### Deliverables Before Coding

- Resource brief with UX intent.
- Web and mobile screen map.
- API contract assumptions and fallback states.
- Documentation/help-center content draft.
- Landing feature copy decision.
- Acceptance checklist and rollout notes.

### Default Implementation Strategy

- Start with TABLE_PLURAL scaffold for speed and clone existing table/form/page examples first.
- Promote reusable parts into packages/shared.
- Keep API calls centralized via shared service layer.
- Keep .tsx files view-first and move logic into framework-agnostic modules.
- Run lint and typecheck after each completed task.

## Skill F3: Rebuild/Refine Theme Design And Layout

### Goal

Refine visual system and layout structure without breaking routes, permissions, or data flows.

### Common Root Files To Hit First

- Global app entry and theme variable wiring:
  - apps/admin-app/src/App.tsx
  - apps/user-app/src/App.tsx
- Shared design tokens and layout CSS variables:
  - packages/shared/src/styles/index.scss
- Core auth/public shells:
  - apps/admin-app/src/layouts/auth/index.tsx
  - apps/admin-app/src/layouts/public/index.tsx
  - apps/user-app/src/layouts/auth/index.tsx
  - apps/user-app/src/layouts/public/index.tsx

### Common View Templates

- Page shell:
  - packages/shared/src/ui/layouts/auth/pages/pageTemplate.tsx
- Table page wrapper:
  - packages/shared/src/ui/layouts/auth/pages/tablePage.tsx
- Data table engine:
  - packages/shared/src/ui/components/table/apiDatatable.tsx

### App-Specific Layout Surfaces

- Landing page visual blocks:
  - apps/landing-page/src/components/sections/\*
- Help center shell:
  - apps/help-center/src/app/layout.tsx
  - apps/help-center/src/app/globals.css
- Documentation shell:
  - apps/documentation/src/pages/\_app.tsx
  - apps/documentation/src/globals.css

### Safe Refactor Sequence

1. Update shared style tokens first.
2. Validate auth/public layout wrappers.
3. Validate table and page templates.
4. Validate one admin and one user CRUD page.
5. Validate mobile screen navigation and feature rendering.

### Done Criteria

- Theme variables still flow from app settings and metadata.
- Table pages remain functional and readable.
- Landing/help/documentation shells remain consistent.
- Desktop and mobile layouts are both verified.
