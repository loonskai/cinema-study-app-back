import * as Router from 'koa-router';

import authRouter from './authRouter';

const router = new Router();

router.use('/auth', authRouter.routes());

export default router;
