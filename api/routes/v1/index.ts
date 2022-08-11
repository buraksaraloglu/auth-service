import express from 'express';

import healthRouter from './health';
import authRouter from './auth';
import sessionsRouter from './session';

const router = express.Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/sessions', sessionsRouter);

export default router;
