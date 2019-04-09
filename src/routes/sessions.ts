import Router from 'koa-router';

import sessionController from '../controllers/session';

import validator from '../middlewares/validator';

const router = new Router();

// router.get('/', bonusController.getAll);
router.post('/', validator.session, sessionController.create);
// router.patch('/:id', validator.bonus, bonusController.update);
// router.delete('/:id', bonusController.delete);

export default router;
