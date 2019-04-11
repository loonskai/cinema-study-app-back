import Router from 'koa-router';

import adminMiddleware from '../middlewares/adminMiddleware';
import cinemaController from '../controllers/cinema';
import validator from '../middlewares/validator';

const router = new Router();

router.get('/', cinemaController.getAll);
router.use(adminMiddleware);
router.post('/', validator.cinema, cinemaController.create);
router.patch('/:id', validator.cinema, cinemaController.update);
router.delete('/:id', cinemaController.delete);

export default router;
