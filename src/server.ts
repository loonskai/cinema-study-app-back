import * as Koa from 'koa';
import * as helmet from 'koa-helmet';

import router from './routes';

const app = new Koa();

app.use(helmet());

app.use(router.routes());

app.listen(5000);
