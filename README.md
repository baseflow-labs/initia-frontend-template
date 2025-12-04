# AppNest Frontend App

## To Do

- Add Token Refresh to Auth API Setup
- Build Dynamic Access Roles (API Integration)
- Centralize identity control (theme color, logo ,name)
- Fix changelog generating script
- Update documentation (read me, commit convention)
- Split localization files into smaller chunks
- wrap with vite / turbo-back
- build analysis tools integration prep
- build form various input types
  - rich text editor
  - google maps picker
  - color picker
  - toggle switch
  - slider
  - card-based / photo-based radio & checkbox
  - searchable & clearable select
  - nested form
- build form wizard
- build datatable with ...
  - actions column (standard + custom)
  - auto handle of sub-props
  - server side pagination / infinite scroll
  - server side sorting
  - server side filtering
  - server side search
  - column visibility control (show / hide + re-order)
  - export with customization to csv, excel, pdf
  - row selection (bulk actions)
  - responsiveness to cards view
  - details panel option
  - column custom cell rendering (badges, progress, boolean, select, avatar, type-based)
  - grouping option
  - fixed header & footer
  - record duplicates option
  - export template & import
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
- Build technical & business documentation 

## 🚀 Getting Started

### 1. Clone & Install

```bash
  git clone <repo-url>
  cd <repo-directory>
  yarn   # or npm install
```

### 2. Environment Setup

- Copy .env.example to .env
- Update the following variables:

| Key                               | Value (Dev)                                    | Value (Stg)                                    | Value (Prod)                      |
| --------------------------------- | ---------------------------------------------- | ---------------------------------------------- | --------------------------------- |
| `REACT_APP_BACKEND_URL`           | `http://127.0.0.1:8000`                        | `https://demo-api.appnest.org/`                | `https://zad-api.appnest.org/ `   |
| `REACT_APP_STORAGE_DIRECTORY_URL` | `http://appnest.oss-me-central-1.aliyuncs.com` | `http://appnest.oss-me-central-1.aliyuncs.com` | `https://assets.appnest.org/`     |
| `REACT_APP_GOOGLE_MAP_API_KEY`    | `AIzaSyAgboGKtbUjn8v5EW1KG4ofubRCQkok3w4`      | `AIzaSyAgboGKtbUjn8v5EW1KG4ofubRCQkok3w4`      | `googleMapApiKeyProvidedByGoogle` |
| `REACT_APP_ENVIRONMENT`           | `staging`                                      | `staging`                                      | `production`                      |

### 3. Run the App

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
