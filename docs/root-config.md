# Root Configuration

## `package.json`

- **Scripts**  
  - `lint`, `lint:fix`: ESLint über alle `.js/.ts/.jsx/.tsx`  
  - `format`: Prettier-Formatierung  
- **Dependencies**  
  - `shared-types`: Gemeinsame TypeScript-Interfaces  
- **DevDependencies**  
  - ESLint, Prettier, Husky, lint-staged, typescript-eslint

## `eslint.config.mjs`

- Globale ESLint-Regeln für JS/TS, React, Hooks, Accessibility  
- Ignoriert Konfig‑Dateien im Frontend  
- Integriert Prettier am Ende der Pipeline

## `prettier.config.js`

- `semi: true`, `singleQuote: true`, `tabWidth: 2`, `trailingComma: "es5"`

## `pnpm-workspace.yaml` & `pnpm-lock.yaml`

- Definiert Monorepo-Pakete (`apps/*`, `packages/*`)  
- Lockfile für reproduzierbare Builds
