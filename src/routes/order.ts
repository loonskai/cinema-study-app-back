import Router from 'koa-router';

import orderController from '../controllers/order';

import validator from '../middlewares/validator';

const router = new Router();

router.post('/', validator.order, orderController.create);
router.post('/reserve/:id', orderController.reserve);

export default router;
