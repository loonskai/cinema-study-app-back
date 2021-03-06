import Router from 'koa-router';
import jwtMiddleware from 'koa-jwt';

import { env } from '../config/env';
import orderController from '../controllers/order';
import validator from '../middlewares/validator';
import parseUserMiddleware from '../middlewares/parseUserMiddleware';

const router = new Router();
router.use(jwtMiddleware({ secret: env.JWT_SECRET }));
router.use(parseUserMiddleware);
router.get('/my', orderController.getPersonalAll);
router.post('/', validator.order, orderController.create);
router.post('/reserve/:id', orderController.reserve);
router.post('/reserve/clear/:id', orderController.cancelReservation);

export default router;
