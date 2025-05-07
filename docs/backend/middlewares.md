# Backend Middlewares

## `src/middlewares/errorHandler.ts`

```ts
export default function errorHandler(
  err: Error, req: Request, res: Response, next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
}

- Fängt alle unerwarteten Fehler ab
- Loggt Stacktrace
- Sendet 500 + Fehlermeldung JSON

```
