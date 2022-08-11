import express from 'express';

import healthRouter from './health';
import authRouter from './auth';
import sessionsRouter from './session';

const router = express.Router();

// TODO: Could've implement a versioning scheme to allow for multiple versions of the API
router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/sessions', sessionsRouter);

export default function initRouter(app: express.Application) {
  app.use(router);
}
