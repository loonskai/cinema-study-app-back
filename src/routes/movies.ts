import Router from 'koa-router';

import movieController from '../controllers/movie';
import adminMiddleware from '../middlewares/adminMiddleware';
import validator from '../middlewares/validator';

const router = new Router();

router.get('/', movieController.getAll);
router.get('/:id', movieController.getByID);
router.use(adminMiddleware);
router.post('/', validator.moviesMany, movieController.create);
router.patch('/:id', validator.movie, movieController.update);
router.delete('/:id', movieController.delete);

export default router;
