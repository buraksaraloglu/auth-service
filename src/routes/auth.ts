import express from 'express';

import {
  createUserController,
  getUserController,
} from '@/controllers/auth.controller';
import { createUserSchema, getUserSchema } from '@/schema/user.schema';
import validateResource from '@/middleware/validateResource';

const router = express.Router();

/**
 * @openapi
 * '/auth/users':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 */
router.post('/users', validateResource(createUserSchema), createUserController);
router.get('/user', validateResource(getUserSchema), getUserController);

export default router;
