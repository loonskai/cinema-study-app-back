import * as Koa from 'koa';
import * as helmet from 'koa-helmet';
import * as logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as passport from 'koa-passport';

import router from './routes';
import * as passportConfig from './config/passport';

const app = new Koa();

app.use(helmet());
app.use(logger());
app.use(bodyParser());

app.use(passport.initialize());

app.use(router.routes());

app.listen(5000);
