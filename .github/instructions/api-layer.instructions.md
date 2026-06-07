---
applyTo: "**/api/**/*.ts,**/user-services/**/*.ts,**/services/**/*.ts"
---

# API Layer

All HTTP calls belong in the API layer. Never inline fetch/axios calls in view or logic components.

## Rules

- HTTP client calls live in `src/api/<resource>/index.ts` (app-level) or `packages/user-services/src/<resource>/` (shared across apps).
- Do not duplicate service functions across apps. If both admin-app and user-app need the same endpoint, move it to `packages/user-services`.
- Each API module exports:
  - Typed request body interfaces where applicable
  - Typed response interfaces based on backend contract
  - Named async functions (not default-exported classes)
- Follow the pattern in `apps/user-app/src/api/formOfForms/index.ts` as the baseline shape.
- API modules import from the centralized axios instance, not a local one-off instance.
