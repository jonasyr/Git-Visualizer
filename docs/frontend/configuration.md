# Frontend Configuration

## Ordnerstruktur

apps/frontend/
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.json
└── vite.config.ts

### `README.md`

Vorlage und Empfehlungen für ESLint‑Plugin‑Konfigurationen.

### `eslint.config.js`

TypeScript‑aware ESLint-Setup, React-Hooks- und Refresh-Plugin.

### `index.html`

Root-Template mit `<div id="root">` und Einbindung von `main.tsx`.

### `package.json`

- **Dependencies**: `react`, `react-dom`, `shared-types`
- **DevDependencies**: Vite, TypeScript, ESLint, Tailwind, PostCSS, Plugins

### PostCSS & Tailwind

- **postcss.config.cjs**: `tailwindcss`, `autoprefixer`
- **tailwind.config.cjs**: Content‑Pfad, Theme‑Erweiterungen

### TypeScript

- **tsconfig.app.json**: JSX, ES2020, Bundler-Modus, strikte Checks
- **tsconfig.node.json**: For `vite.config.ts`
- **tsconfig.json**: References auf beide

### Vite

- **vite.config.ts**: Lädt `@vitejs/plugin-react`
