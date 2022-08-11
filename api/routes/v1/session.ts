import express from 'express';

import {
  createUserSessionController,
  getUserSessionsController,
  deleteSessionController,
} from '@/controllers/session.controller';
import validateResource from '@/middleware/validateResource';
import requireUser from '@/middleware/requireUser';
import { createSessionSchema } from '@/schema/session.schema';

const router = express.Router();

router.post(
  '/',
  validateResource(createSessionSchema),
  createUserSessionController,
);

router.get('/', requireUser, getUserSessionsController);

router.delete('/', requireUser, deleteSessionController);

export default router;
