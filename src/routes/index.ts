import Router from 'koa-router';

import auth from './auth';
import cinema from './cinema';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/cinema', cinema.routes());

export default router;
