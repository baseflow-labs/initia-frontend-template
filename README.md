# AppNest Frontend App§

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

### Documentation

#### [Road Map](./Documentation/ROAD_MAP.md)

### 🧰 Tooling & Stack

#### 🖥 Frontend Framework

- React v19 with TypeScript
- React Router v7 for routing
- React Redux + Redux for state management

#### 🎨 Styling & UI

- Bootstrap 5 for responsive UI
- Font Awesome (@fortawesome) for icons
- React Select for enhanced dropdowns

#### 🌐 Internationalization

- i18next and react-i18next for localization
- i18next-parser for automatic translation extraction
- extract-translation script available

#### 📦 Forms & Validation

- Formik for form state & validation

#### 🗺 Maps Integration

- @react-google-maps/api for embedding Google Maps

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
- [Mustafa Hasanat](https://github.com/MustafaHasanat) - Inspire
- [ChatGPT](https://openai.com/chatgpt) — AI Assistant
- [Copilot](https://github.com/features/copilot) — AI Pair Programmer
