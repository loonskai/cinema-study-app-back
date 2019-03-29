import Router from 'koa-router';

import auth from './auth';
import cinema from './cinema';
import hall from './hall';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/cinema', cinema.routes());
router.use('/hall', hall.routes());

export default router;
