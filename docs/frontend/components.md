# Frontend Components

## `src/App.tsx`

- **Zustand**: `const [count, setCount]` (Klick‑Zähler)  
- **Return**  
  - Zwei Logos (`vite.svg`, `react.svg`) mit Hover‑Effekten  
  - Überschrift `<h1>`  
  - Button: erhöht `count`  
  - Hinweis‑Text

## `src/main.tsx`

- Bootstrapping mit `createRoot`:  

```ts
createRoot(document.getElementById('root')!)
  .render(<StrictMode><App /></StrictMode>);

## Stylesheets
- **App.css**: Layout, Logo‑Animation, Card‑Styling
- **index.css**: Tailwind‑Direktiven, globale Farb‑/Typographie‑Variablen, Button‑Stile

## Sonstiges
- **assets/**: Logos
- **vite-env.d.ts**: Vite-Client Types
