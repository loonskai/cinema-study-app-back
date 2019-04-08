import Router from 'koa-router';

import auth from './auth';
import cinema from './cinema';
import hall from './hall';
import data from './data';
import movies from './movies';
import bonuses from './bonuses';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/cinema', cinema.routes());
router.use('/hall', hall.routes());
router.use('/data', data.routes());
router.use('/movies', movies.routes());
router.use('/bonuses', bonuses.routes());

export default router;
