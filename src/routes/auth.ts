import express from 'express';
import { register } from '@/controllers/auth.controller';

const router = express.Router();

/**
 * @openapi
 * @summary Register a new user
 * @description Register a new user
 * @tags auth
 * @produces application/json
 * @consumes application/json
 * @parameters
 * - in: body
 *  name: body
 * description: User object
 * required: true
 * schema:
 * $ref: '#/models/User'
 * @responses
 * 200:
 * description: User object
 * schema:
 * $ref: '#/models/User'
 * @securityDefinitions.bearerAuth
 */

router.post('/register', register);

export default router;
