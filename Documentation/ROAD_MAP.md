# Frontend Roadmap (derived from commit history)

## Phase 1 – Auth, Membership & Core Tables (May 8 – Jul 2, 2025)

### Sprint 1 (8 – 21 May, 2025)

- [x] Set up public layout, initial login/register views, and Formik-based dynamic form component.
- [x] Start multi-step wizard experience .

### Sprint 2 (22 May – 4 Jun, 2025)

- [x] Wire table pagination and integrate initial create / edit flows.

### Sprint 3 (5 – 18 Jun, 2025)

- [x] Launch Notifications view, role-based authorization, global file preview, and Data Review archive view.

### Sprint 4 (19 Jun– 2 Jul, 2025)

- [x] Add reusable dropdown and collapse group components.
- [x] Build star-based evaluation input and hook it into existing flows.
- [x] Set up initial CI build workflows and API-based file-return handler for demos.

## Phase 2 – Dashboards, Research Workflows & File Management (Jul 3 – Aug 27, 2025)

### Sprint 5 (3 – 16 Jul, 2025)

- [x] Introduce release automation (auto-versioning, commit conventions, Husky) and UX features like read/unread notifications, application progress timeline, and clickable email/phone in tables.
- [x] Enforce secure password change flow by requiring old password.

### Sprint 6 (17 – 30 Jul, 2025)

- [x] Improve file handling: upload size limits, multi-file input, and increased per-file size.
- [x] Centralize Excel export processor and set up PR title checks / auto releases in CI/CD.

### Sprint 7 (31 Jul – 13 Aug, 2025)

- [x] Add capacity controls for dropdown-option API calls and file-count limits.
- [x] Apply system identity/theming across the app.
- [x] Launch independent file-upload service, form reset behavior.

### Sprint 8 (14 – 27 Aug, 2025)

- [x] Ship accountant-focused dashboard views.
- [x] Surface category data in accountant overview and program stats (including suspended programs).

## Phase 3 – Governance, Approvals, Debt & Bulk Ops (28 Aug – 22 Oct, 2025)

### Sprint 9 ( 28 Aug – 10 Sep, 2025)

- [x] Introduce CEO user type and show user type in logout dropdown.
- [x] Add system admin login plus admin tools for bulk data insertion and initial user management view.

### Sprint 10 (11 Sep – 24 Sep, 2025)

- [x] Implement structured program approval model (flags, rejected status, approval flow).
- [x] Add head-of-committee dummy login for UAT/demo scenarios.
- [x] Provide admin “delete all users data” operations guarded with warning messages.

### Sprint 11 (25 Sep – 8 Oct, 2025)

- [x] Focus sprint on stabilization, refinement, and QA around approvals, and bulk-insert operations (no major net-new features).

### Sprint 12 (9 – 22 Oct, 2025)

- [x] Override and standardize date input formats across forms.
- [x] Add role/Type-based filters to admin user management to improve operability at scale.

## Phase 4 – Template Platform, Admin Tools & Advanced Components (Oct 23 – Dec 17, 2025)

### Sprint 13 (23 Oct – 5 Nov, 2025)

- [x] Build necessary template views and an initial to-do list for template work.
- [x] Set up NVM controller, splitting public-view inputs and standardizing configuration.
- [x] Implement a global table layout that centralizes common table functionality.
- [x] Add an improved navbar on the authenticated layout for template-based apps.

### Sprint 14 (6 – 19 Nov, 2025)

- [x] Dedicated stabilization sprint: polish template views, global table layout, and navigation behavior (primarily refactors and fixes).

### Sprint 15 (20 Nov – 3 Dec, 2025)

- [x] Create example view for the new DataTable page pattern.
- [x] Add placeholder pages for optional backend-driven services and a support-center section.
- [x] Clone initial UI for messaging service and expand user-related settings under admin.
- [x] Add generic template example pages and basic page placeholders.
- [x] Refresh documentation to-do lists to reflect template-focused backlog.

### Sprint 16 (4 – 17 Dec, 2025)

- [x] Add live demo pages for the datatable and form examples.
- [x] Implement refresh-token setup for auth and role-permissions UI under Settings.
- [x] Build bulk data-insertion tooling and data-backup service under Settings.
- [x] Enhance datatable UX with column-visibility controller, orderable columns, export/print tools, and calendar data viewer.
- [x] Introduce theme-color settings for admin area.
- [x] Ship a full suite of advanced inputs with live examples:
  - [x] Checkbox groups, radio layouts, image/card/button-based checkbox & radio inputs.
  - [x] Button/switch-based boolean inputs, color & star inputs, and range slider.
  - [x] Accordion and tabs-based data view components, plus modal/table/dropdown UI examples.
- [x] Finalize updated documentation to-do list for next iterations.
