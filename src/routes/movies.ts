import Router from 'koa-router';

import movieController from '../controllers/movie';

import validator from '../middlewares/validator';

const router = new Router();

router.get('/', movieController.getAll);
router.post('/', validator.movies, movieController.create);
// router.patch('/:id', validator.cinema, cinemaController.update);
// router.delete('/:id', cinemaController.delete);

export default router;
