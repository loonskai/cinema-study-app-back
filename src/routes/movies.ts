import Router from 'koa-router';

import movieController from '../controllers/movie';

import validator from '../middlewares/validator';

const router = new Router();

router.get('/', movieController.getAll);
router.get('/:id', movieController.getByID);
router.post('/', validator.moviesMany, movieController.create);
router.patch('/:id', validator.movie, movieController.update);
router.delete('/:id', movieController.delete);

export default router;
