# Frontend Roadmap (derived from commit history)

## Phase 1 – Auth, Membership & Core Tables (May 8 – Jul 2, 2025)

### Sprint 1 (May 8–21, 2025)

- [x] Set up public layout, initial login/register views, and Formik-based dynamic form component.
- [x] Build the first Membership Form (layout options, no-label cases) and initial authenticated navbar.
- [x] Start multi-step wizard experience for membership onboarding.

### Sprint 2 (May 22 – Jun 4, 2025)

- [x] Introduce shared `TablePage` and initial pages for Beneficiaries, Visits, and Aids.
- [x] Wire table pagination and integrate aids & visit scheduling APIs (create/edit flows).
- [x] Add initial Settings service plus first beneficiary visits and data review UIs.

### Sprint 3 (Jun 5–18, 2025)

- [x] Complete Visit Report UI and connect it to the backend.
- [x] Implement Aids Response, Data Review submission, and App Metadata management.
- [x] Launch Notifications view, role-based authorization, global file preview, and Data Review archive view.

### Sprint 4 (Jun 19 – Jul 2, 2025)

- [x] Add reusable dropdown and collapse group components.
- [x] Build star-based evaluation input and hook it into existing flows.
- [x] Set up initial CI build workflows and API-based file-return handler for demos.

## Phase 2 – Dashboards, Research Workflows & File Management (Jul 3 – Aug 27, 2025)

### Sprint 5 (Jul 3–16, 2025)

- [x] Build researcher supervisor applicants view, researcher management UI, and Add-Researcher modal.
- [x] Deliver HoD/Researcher dashboards (including visits map) with supporting dashboard APIs.
- [x] Introduce release automation (auto-versioning, commit conventions, Husky) and UX features like read/unread notifications, application progress timeline, and clickable email/phone in tables.
- [x] Enforce secure password change flow by requiring old password.

### Sprint 6 (Jul 17–30, 2025)

- [x] Extend beneficiary model with housing home-ownership data and demo-login helpers.
- [x] Improve file handling: upload size limits, multi-file input, and increased per-file size.
- [x] Enhance dashboards with beneficiary name display and richer page action buttons.
- [x] Centralize Excel export processor and set up PR title checks / auto releases in CI/CD.
- [x] Add Excel download options for beneficiaries and researchers, plus system admin dashboard placeholder.
- [x] Enable beneficiary responses to coordinated visit requests.

### Sprint 7 (Jul 31 – Aug 13, 2025)

- [x] Add capacity controls for dropdown-option API calls and file-count limits.
- [x] Build UI for multiple homes per beneficiary and a shared accordion component.
- [x] Introduce central tabs component and refine beneficiary housing (dependents per housing).
- [x] Apply society identity/theming across the app.
- [x] Launch independent file-upload service, form reset behavior, and enhanced beneficiary profile (including file numbers).

### Sprint 8 (Aug 14–27, 2025)

- [x] Ship accountant-focused dashboard views.
- [x] Implement initial aid-program cloning service and category integration across programs.
- [x] Surface category data in accountant overview and program stats (including suspended programs).
- [x] Provide accountant review & response tools for aid requests.
- [x] Add beneficiary type definitions and allow staff-driven beneficiary creation.
- [x] Tighten validations (e.g., account number) and improve visit address picking.

## Phase 3 – Governance, Approvals, Debt & Bulk Ops (Aug 28 – Oct 22, 2025)

### Sprint 9 (Aug 28 – Sep 10, 2025)

- [x] Centralize aid category rendering and include program picker in approval flows.
- [x] Build detailed views for aid requests (including handling of missing data).
- [x] Introduce CEO user type and show user type in logout dropdown.
- [x] Allow beneficiary additions by HoD & CEO and improve numeric formatting (comma function).
- [x] Add system admin login plus admin tools for bulk data insertion and initial user management view.

### Sprint 10 (Sep 11–24, 2025)

- [x] Implement structured program approval model (flags, rejected status, approval flow).
- [x] Add head-of-committee dummy login for UAT/demo scenarios.
- [x] Extend beneficiary financial profile to include debts, with registration-form inputs and profile debt views.
- [x] Provide admin “delete all beneficiaries data” operations guarded with warning messages.
- [x] Create data templates for bulk insertion and researcher bulk-assignment tooling.
- [x] Show aid program details directly within beneficiary profiles.

### Sprint 11 (Sep 25 – Oct 8, 2025)

- [x] Focus sprint on stabilization, refinement, and QA around approvals, debt, and bulk-insert operations (no major net-new features).

### Sprint 12 (Oct 9–22, 2025)

- [x] Override and standardize date input formats across forms.
- [x] Add role/Type-based filters to admin user management to improve operability at scale.

## Phase 4 – Template Platform, Admin Tools & Advanced Components (Oct 23 – Dec 17, 2025)

### Sprint 13 (Oct 23 – Nov 5, 2025)

- [x] Build necessary template views and an initial to-do list for template work.
- [x] Set up NVM controller, splitting public-view inputs and standardizing configuration.
- [x] Implement a global table layout that centralizes common table functionality.
- [x] Add an improved navbar on the authenticated layout for template-based apps.

### Sprint 14 (Nov 6–19, 2025)

- [x] Dedicated stabilization sprint: polish template views, global table layout, and navigation behavior (primarily refactors and fixes).

### Sprint 15 (Nov 20 – Dec 3, 2025)

- [x] Create example view for the new DataTable page pattern.
- [x] Add placeholder pages for optional backend-driven services and a support-center section.
- [x] Clone initial UI for messaging service and expand user-related settings under admin.
- [x] Add generic template example pages and basic page placeholders.
- [x] Refresh documentation to-do lists to reflect template-focused backlog.

### Sprint 16 (Dec 4–17, 2025)

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
