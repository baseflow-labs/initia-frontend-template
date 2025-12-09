# AppNest Frontend App

## To Do

- Fix changelog generating script
- Update documentation (read me, commit convention)
- Split localization files into smaller chunks
- wrap with vite / turbo-back
- build analysis tools integration prep
- build form various input types
  - date, time, date time, month, year, weekday
  - rich text editor
  - google maps picker
  - searchable & clearable select
  - nested form layouts (with / without table, within / split form)
- data view options
  - google maps view
  - calendar view
  - kanban view
  - gallery / photo grid view
  - accordion
  - carousel view
  - modal
  - toaster
  - tabs
  - table
  - js maps
  - charts & stat cards
- build form wizard
- New apis
  - return values of TablesNames
  - export file by field & filters
- build datatable with ...
  - server side filtering
    - per type (text, number, date, boolean, select, multi-select)
    - default filter values
    - advanced filters (AND/OR conditions, operators)
    - localstorage saved filters
  - localstorage saved columns (visibility, order)
  - server side search
  - scroll vs pagination
  - row selection (bulk standard & custom actions)
  - preset column rendering (badges, progress, boolean, select, multi-select, avatar, image, type-based)
  - custom column rendering
  - responsiveness to cards view
  - details panel option
  - record view options (card, image-oriented, table)
  - role-based columns & actions
  - grouping option
  - fixed header, footer & columns (to choose)
  - record duplicates option
  - data localization support
  - width control
- build initial next.js landing page templates
- build initial dashboard contents
  - Non-Admin
    - Account Info
    - Calendar
    - Chat
    - Notifications
  - Admin
    - Users stats & list
    - System health
    - System reviews
    - Subscriptions
  - Template-based dashboards
    - e-Commerce
    - Marketplace / 3rd party sellers
    - Delivery
    - Ride Hailing
    - Booking system (venue, tickets, events, appointments)
    - e-Learning
    - Telemedicine
    - Real estate listing
    - Community / Social
    - Personal Financials
    - Project Management
    - CRM
    - Recruiting platform
    - HRMS
    - News portal
    - Personal-portfolio
    - SIS
    - Encyclopedia
- build dark / light mode, color themes switcher, horizontal / vertical layout switcher, boxed / full-width layout switcher
- build onboarding process (spread in admin settings + first login trigger wizard)
- build admin advanced settings
  - system health monitoring
  - data import/export
  - api keys management
  - integrations management
  - session management
  - IP whitelisting / blacklisting
  - files management
  - configurations
    - password policy
    - files upload limits
    - enabled languages
    - localization values
    - initial dark mode
    - env vars
    - per user role theme color
    - services control (build services with integration)
    - form of forms (with user-role based workflow)
  - contents
    - policy, terms & conditions with localization
    - landing page contents management
- build advanced user controls
  - dashboard customization
- build announcements / notifications manual generation service
- Build technical & business documentation

## 🚀 Getting Started

### 1. Clone & Install

```bash
  git clone <repo-url>
  cd <repo-directory>
  yarn   # or npm install
```

### 2. Run the App

```bash
  yarn start
```

## 🛠 Development Notes

### 📦 Project Structure

src/
api/
assets/
components/
documentation/
layouts/
store/
styles/
types/
utils/
views/

### 💬 Commit Message Convention

We follow the Conventional Commits format with enforced scope per service/module.

📘 See full guide here: [COMMIT_CONVENTION.md](./src/documentation/COMMIT_CONVENTION.md)

Example:

feat(auth): implement login via OTP
fix(user): fix avatar cropping on mobile

### ✅ Git Hooks & Code Quality

- ✅ Commit messages are checked via Husky + Commitlint
- ✅ Code formatting via Prettier (if enabled)
- ✅ Linting rules (optional — add if using ESLint)

### 💬 [ChangeLog](./src/documentation/CHANGELOG.md)

### 📦 Build for Production

```bash
  yarn build
```

Output will be in the build/ directory, ready for deployment.

### 🧪 Optional Scripts

```bash
  yarn start               # Start dev server
  yarn build               # Build for production
  yarn extract-translation # Extract i18n strings
  yarn commit              # Use Commitizen to write formatted commits

```

### 🔐 Environment Profiles

| Profile | Description               |
| ------- | ------------------------- |
| `.env`  | Default/local development |

### 📤 Deployment

- Built with create-react-app
- To deploy: push to your main or prod branch or follow your CI/CD pipeline.

### 🧰 Tooling & Stack

#### 🖥 Frontend Framework

- React v19 with TypeScript
- React Router v7 for routing
- React Redux + Redux for state management

#### 🎨 Styling & UI

- Bootstrap 5 for responsive UI
- @fontsource/cairo for Arabic/Cairo font
- Font Awesome (@fortawesome) for icons
- React Select for enhanced dropdowns

#### 🌐 Internationalization

- i18next and react-i18next for localization
- i18next-parser for automatic translation extraction
- extract-translation script available

#### 📦 Forms & Validation

- Formik for form state & validation
- Ajv and ajv-keywords for advanced JSON schema validation

#### 🗺 Maps Integration

- @react-google-maps/api for embedding Google Maps

#### 📊 Files & Export

- xlsx for spreadsheet export
- exceljs for advanced Excel generation
- pdfkit for generating PDF documents

#### 📆 Date & Time

- Moment.js for date formatting and manipulation

#### 🔐 Environment & Configuration

- dotenv-cli for loading environment variables

#### 📡 HTTP & APIs

- Axios for API calls

#### 📦 Build Tools & Scripts

- react-scripts (CRA) for dev/build/test
- yarn start, yarn build, yarn test, yarn eject available

#### 📏 Linting & Standards

- ESLint config extends react-app and react-app/jest

### 🧠 Maintainers

- [Makkahwi](https://github.com/makkahwi) — Product Owner & Lead Developer
