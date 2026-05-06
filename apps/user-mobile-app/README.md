# User Mobile App

React Native (Expo) mobile app for parity with `apps/user-app`.

## Goals

- Mirror user web app feature/service surface.
- Maximize monorepo package reuse (`@initia/user-services`, `@initia/analysis`).
- Keep native UI isolated so shared web-only UI can be migrated progressively.

## Run

```bash
pnpm --filter @initia/user-mobile-app dev
```

## Parity Route Map

Current scaffold includes entry routes equivalent to web app auth routes:

- dashboard
- profile
- messaging
- notifications
- settings
- support-center (+ faq/contact-us/tickets/user-manual)
- template-examples (data-view/data-table/forms)
