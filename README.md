# Initia Frontend Dashboard Template (Monorepo)

A production-ready, open-source frontend dashboard **monorepo** built with **React + TypeScript + Vite**, designed to work seamlessly with Initia-generated backends.

This monorepo contains:

- 🧑‍💻 **User App**: User-facing dashboard and features
- 👨‍💼 **Admin App**: System administration and management
- 📦 **Shared Package**: Reusable components, utilities, and types

Perfect for:

- 🚀 Startup MVPs with separate user and admin portals
- 🧑‍💼 Multi-tenant applications
- 🧪 Scalable projects requiring code reusability

---

## 🏗️ Monorepo Structure

```
packages/
├── user-app/          # User-facing application (port 5173)
├── admin-app/         # Admin panel (port 5174)
└── shared/            # Shared code (components, utils, types, API)
```

---

## ⚡ Quick Start

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install dependencies
pnpm install

# Run user app
pnpm dev:user

# Run admin app (in another terminal)
pnpm dev:admin

# Build both apps
pnpm build
```

---

## ⭐ Support the Project (Important)

This project is **free and open-source**.  
If it is saving you time, helping your project, or you plan to use it commercially:

👉 **Please support us:**

1. ⭐ [Star this repository](https://github.com/baseflow-labs/initia-frontend-template)
2. ⭐ [Star the GitHub organization](https://github.com/baseflow-labs)
3. 💖 [Donate](https://github.com/sponsors/baseflow-labs) to sustain development and provide you with more

Your support directly funds:

- New templates
- Better documentation
- Faster fixes & features
- Long-term maintenance
- Community support
- Execution of our [roadmap](./Documentation/plan/ROAD_MAP.md)

> Open-source survives on users who give back.

---

## 📚 Documentation – Choose Your Path

We provide **two separate guides**, depending on your background:

### 👩‍💼 Non-Technical / Product-Focused Users

➡️ **Start here**  
📄 [`docs/START_NON_TECHNICAL.md`](./Documentation/start/START_NON_TECHNICAL.md)

> For founders, students, PMs, and new or non developers who want to run, configure, and deploy the dashboard with minimal coding.

---

### 👨‍💻 Technical Users / Developers

➡️ **Start here**  
📄 [`docs/START_TECHNICAL.md`](./Documentation/start/START_TECHNICAL.md)

> For developers who want to extend, customize, and maintain the codebase professionally.

---

## 🧰 Tech Stack (Quick Overview)

- [Initia](https://initia.io/) (backend generator)
- [React 19](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (fast dev & build)
- [Bootstrap 5](https://getbootstrap.com/) + [SCSS](https://sass-lang.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router v7](https://reactrouter.com/)
- [i18next](https://www.i18next.com/) (multi-language, RTL-ready)

---

## 📄 License

MIT License – free for personal and commercial use.  
Attribution and support are appreciated.

---

## 🧠 Maintainers

- [**Suhaib Ahmad**](https://github.com/makkahwi) — Product Owner & Lead Developer
- [**Mustafa Hasanat**](https://github.com/MustafaHasanat) - Inspire
- [**Copilot**](https://github.com/features/copilot) — AI Pair Programmer
- [**ChatGPT**](https://openai.com/chatgpt) — Planning, Surveying & Documentation AI Assistant
- **Community Contributors** — You 💙
