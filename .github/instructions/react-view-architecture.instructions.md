---
applyTo: "**/*.tsx"
---

# React View Architecture

`.tsx` files are view-first. They own JSX and rendering. Logic lives elsewhere.

## Rules

- Keep `.tsx` files focused on JSX/rendering and event wiring.
- Move non-UI logic (data mapping, business rules, side effects, API calls) into `.ts` modules: hooks, mappers, utils, or service files.
- Do not place HTTP calls inside `.tsx` files. All API calls belong in `api/` directories or `packages/user-services`.
- Before building a new component or page pattern, check for existing examples:
  - Table/list page → `packages/shared/src/ui/layouts/auth/pages/tablePage.tsx`
  - Data table → `packages/shared/src/ui/components/table/apiDatatable.tsx`
  - Dynamic form → existing form builder patterns in the app
  - Generated scaffold → `apps/*/src/views/auth/services/TABLE_PLURAL_LOWER_NAME/index.tsx`
- Prefer components and layouts from `packages/shared` before creating app-local variants.
- Do not duplicate components across apps; promote to `packages/shared` instead.
