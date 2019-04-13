import Router from 'koa-router';

import adminMiddleware from '../middlewares/adminMiddleware';
import bonusController from '../controllers/bonus';
import validator from '../middlewares/validator';

const router = new Router();

router.get('/', bonusController.getAll);
router.use(adminMiddleware);
router.post('/', validator.bonus, bonusController.create);
router.patch('/:id', validator.bonus, bonusController.update);
router.delete('/:id', bonusController.delete);

export default router;
