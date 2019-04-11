import Router from 'koa-router';

import { env } from '../config/env';
import orderController from '../controllers/order';
import jwtMiddleware from 'koa-jwt';
import validator from '../middlewares/validator';

const router = new Router();
router.use(jwtMiddleware({ secret: env.JWT_SECRET }));
router.post('/', validator.order, orderController.create);
router.post('/reserve/:id', orderController.reserve);

export default router;
