import cors from 'cors';
import express, { Request, Response } from 'express';
import corsOptions from './helpers/cors';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';

const app = express();

// Middlewares
app.use(express.json()); // for parsing JSON bodies in incoming requests
app.use(cors()); // enable CORS globally

// Default route for the root URL
app.get('/', (req: Request, res: Response) => {
  const serverStatus = {
    status: 'running',
    message: 'Edu Fusion API is operational and running smoothly.',
    timestamp: new Date().toISOString(),
    version: 'v1.0.1',
    uptime: process.uptime(),
  };

  res.json(serverStatus);
});

// Application routes under the '/api/v1' path with specific CORS options
app.use('/api/v1', cors(corsOptions), router);

// Error-handling middlewares
app.use(globalErrorHandler); // Global error handler middleware
app.use(notFound); // Middleware to handle 404 - Not Found errors

export default app;
