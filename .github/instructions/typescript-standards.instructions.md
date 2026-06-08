---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript Standards

## Rules

- Do not use `any`. There are no acceptable exceptions.
- Prefer TypeScript-first, modern ES6+ syntax in all new and modified code.
- Prefer `const` by default, `let` when reassignment is needed, and avoid `var`.
- Prefer arrow functions for callbacks and local helper functions; use `function` declarations only when hoisting or framework conventions require them.
- All request bodies, response shapes, API payloads, and API error types must have explicit centralized types.
  - Shared types → `packages/shared/src/types/` or alongside the service in `packages/user-services`
  - App-local types → `src/types/` within the app
- Props, hook return values, service function signatures, and Redux selector outputs must be fully typed.
- Prefer `unknown` over `any` when a type is genuinely not known at compile time; narrow it before use.
- Do not widen types with type assertions (`as SomeType`) to paper over missing types.
- Keep types colocated with the module that owns the shape, or in a shared types file if used across packages.
