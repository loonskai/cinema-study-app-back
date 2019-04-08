import Router from 'koa-router';

import bonusController from '../controllers/bonus';

import validator from '../middlewares/validator';

const router = new Router();

router.get('/', bonusController.getAll);
router.post('/', validator.bonus, bonusController.create);
// router.patch('/:id', validator.cinema, cinemaController.update);
// router.delete('/:id', cinemaController.delete);

export default router;
