import 'dotenv/config';
import bodyparser from 'body-parser';
import express from 'express';
import cors from 'cors';

import initRouter from './routes/router';
import swaggerDocs from './utils/swagger';
import log from './utils/logger';
import deserializeUser from './middleware/deserializeUser';
import connectDB from './database/database';

const app = express();

// Middleware
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(deserializeUser);

app.set('port', process.env.APP_PORT || 5000);

connectDB();
initRouter(app);

app.listen(app.get('port'), () => {
  swaggerDocs(app);

  log.info(
    `🚀 Auth Service is running at http://localhost:%d in %s mode`,
    app.get('port'),
    app.get('env'),
  );
  log.info('🚦 Press CTRL-C to stop\n');
});
