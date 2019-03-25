import * as dotenv from 'dotenv';
import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as passport from 'koa-passport';
import * as cors from '@koa/cors';

import router from './routes';
import db from './config/db';

const app = new Koa();

app.use(helmet());
app.use(logger());
app.use(bodyParser());
app.use(
  cors({
    credentials: true
  })
);

db.authenticate()
  .then(() => console.log('Database connected.'))
  .catch((error: any) => console.log(error));

require('./config/passport');
app.use(passport.initialize());
app.use(router.routes());

export default app;
