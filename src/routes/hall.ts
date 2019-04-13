import Router from 'koa-router';

import hallController from '../controllers/hall';
import adminMiddleware from '../middlewares/adminMiddleware';
import validator from '../middlewares/validator';

const router = new Router();

router.get('/', hallController.getAll);
router.get('/:id', hallController.getByID);
router.use(adminMiddleware);
router.post('/', validator.hall, hallController.create);

export default router;
