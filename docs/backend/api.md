# Backend API

## `src/index.ts`
- Initialisiert Express‑App  
- `dotenv.config()` lädt Umgebungsvariablen  
- `app.use(cors())`, `app.use(express.json())`  
- Mount `/api` → `routes/index.ts`  
- Globales Error‑Handling  
- `app.listen(PORT)`

## `src/routes/index.ts`
- Router‑Instanz  
- GET `/api/` → `{ message: "Hello from Backend!" }`
