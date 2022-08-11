import express from 'express';

import { health } from '@/controllers/health.controller';
import authRouter from './auth';

const router = express.Router();
router.use('/auth', authRouter);

router.get('/', health);

export default function initRouter(app: express.Application) {
  app.use(router);
}
