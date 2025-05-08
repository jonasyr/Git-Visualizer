import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import repositoryRoutes from './routes/repositoryRoutes'; // Import the new repository routes
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API-Routen
app.use('/api', routes);
app.use('/api/repositories', repositoryRoutes); // Mount the repository routes

// Fehlerhandling-Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Backend läuft auf Port ${PORT}`);
});

