import express from 'express';
import { health } from '../controllers/health.controller';

const router = express.Router();

/**
 * @openapi
 * /health:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/', health);

export default router;
