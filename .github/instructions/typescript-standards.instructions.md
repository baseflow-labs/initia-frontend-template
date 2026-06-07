---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript Standards

## Rules

- Do not use `any`. There are no acceptable exceptions.
- All request bodies, response shapes, API payloads, and API error types must have explicit centralized types.
  - Shared types → `packages/shared/src/types/` or alongside the service in `packages/user-services`
  - App-local types → `src/types/` within the app
- Props, hook return values, service function signatures, and Redux selector outputs must be fully typed.
- Prefer `unknown` over `any` when a type is genuinely not known at compile time; narrow it before use.
- Do not widen types with type assertions (`as SomeType`) to paper over missing types.
- Keep types colocated with the module that owns the shape, or in a shared types file if used across packages.
