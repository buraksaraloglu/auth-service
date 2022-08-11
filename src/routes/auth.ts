import express from 'express';

import { createUserController } from '@/controllers/auth.controller';
import validateResource from '@/middleware/validateResource';
import { createUserSchema } from '@/schema/user.schema';

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

export default router;
