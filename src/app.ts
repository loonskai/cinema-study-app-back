import * as dotenv from 'dotenv';
import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as passport from 'koa-passport';

import router from './routes';
import db from './config/db';
import * as passportConfig from './config/passport';

const app = new Koa();

app.use(helmet());
app.use(logger());
app.use(bodyParser());

db.authenticate()
  .then(() => console.log('Database connected.'))
  .catch((error: any) => console.log(error));

app.use(passport.initialize());

app.use(router.routes());

export default app;
