import dotenv from 'dotenv';
import Koa from 'koa';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import passport from 'koa-passport';
import cors from '@koa/cors';

import router from './routes';
import sequelize from './config/sequelize';
import errorHandler from './middlewares/errorHandler';

const app = new Koa();

app.use(helmet());
app.use(logger());
app.use(bodyParser());
app.use(
  cors({
    credentials: true
  })
);

sequelize
  .authenticate()
  .then(() => console.log('Database connected.'))
  .catch((error: any) => console.log(error));

app.use(errorHandler);
require('./config/passport');
app.use(passport.initialize());
app.use(router.routes());

export default app;
