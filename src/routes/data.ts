import Router from 'koa-router';

import dataController from '../controllers/data';

const router = new Router();

router.get('/row-categories', dataController.getRowCategories);
router.get('/cities', dataController.getCities);

export default router;
