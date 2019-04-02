import Router from 'koa-router';

import auth from './auth';
import cinema from './cinema';
import hall from './hall';
import data from './data';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/cinema', cinema.routes());
router.use('/hall', hall.routes());
router.use('/data', data.routes());

export default router;
