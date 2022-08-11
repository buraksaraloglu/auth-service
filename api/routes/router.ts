import express from 'express';

import healthRouter from './v1/health';
import v1 from './v1';

const router = express.Router();

// TODO: Could've implement a versioning scheme to allow for multiple versions of the API
router.use('/api/v1', v1);

export default function initRouter(app: express.Application) {
  app.use(router);
}
