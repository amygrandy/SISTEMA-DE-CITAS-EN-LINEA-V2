import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/erroHandler.middlewares.js';
import IndexRoutes from './routes/index.routes.js';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API funcionando',
  });
});

app.use('/api', IndexRoutes);
app.use(errorHandler);

export default app;
