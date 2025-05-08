# `packages/shared-types`

## Zweck

Zentrale Definition von Interfaces, die in Front- und Backend gleichermaßen genutzt werden.

## Dateien

- **src/index.ts**
  - `interface Commit { sha, message, date, authorName, authorEmail }`
  - `interface Author { name, email }`
- **package.json**  
  Build‑Script: `pnpm exec tsc`
- **tsconfig.json**
  - `composite: true`, `declaration: true`, `outDir: dist`
- **dist/**
  - Generierte `.js` & `.d.ts` Dateien

## Build

```bash
pnpm –r run build

```
