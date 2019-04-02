import Router from 'koa-router';

import dataController from '../controllers/data';

const router = new Router();

router.get('/row-categories', dataController.getRowCategories);

export default router;
