import Router from 'koa-router';

import sessionController from '../controllers/session';

import validator from '../middlewares/validator';

const router = new Router();

router.get('/', sessionController.getAll);
router.post('/', validator.session, sessionController.create);
router.delete('/:id', sessionController.delete);

export default router;
