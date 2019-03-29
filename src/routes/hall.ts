import Router from 'koa-router';

import hallController from '../controllers/hall';

import validator from '../middlewares/validator';

const router = new Router();

router.get('/', hallController.getAll);
router.post('/', validator.hall, hallController.create);
/*router.patch('/:id', validator.cinema, cinemaController.update);
router.delete('/:id', cinemaController.delete); */

export default router;
