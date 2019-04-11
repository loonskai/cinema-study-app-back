import Router from 'koa-router';

import sessionController from '../controllers/session';
import adminMiddleware from '../middlewares/adminMiddleware';
import validator from '../middlewares/validator';

const router = new Router();

router.get('/', sessionController.getAll);
router.get('/:id', sessionController.getByID);
router.use(adminMiddleware);
router.post('/', validator.session, sessionController.create);
router.delete('/:id', sessionController.delete);

export default router;
