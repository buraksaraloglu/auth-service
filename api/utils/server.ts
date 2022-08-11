import 'dotenv/config';
import express from 'express';
import routes from '@/routes/router';
import deserializeUser from '@/middleware/deserializeUser';

export const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(deserializeUser);

  routes(app);

  return app;
};
