import Router from 'koa-router';

import orderController from '../controllers/order';

const router = new Router();

router.post('/reserve/:id', orderController.reserve);
// router.post('/complete', movieController.update);
// router.delete('/:id', movieController.delete);

export default router;
