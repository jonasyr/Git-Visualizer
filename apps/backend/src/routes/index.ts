import { Router } from 'express';
const router = Router();

router.get('/', (_, res) => {
  res.json({ message: 'Hello from Backend!' });
});

export default router;
