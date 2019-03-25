import * as Router from 'koa-router';
import authController from '../controllers/auth';
import userController from '../controllers/user';

import validator from '../middlewares/validator';

const router = new Router();

router.post('/signup', validator.user, userController.create);
router.post(
  '/signin',
  authController.compileReqBodyUsername,
  authController.signin
);
router.post('/signout', authController.signout);
router.post('/google', authController.googleSignin);

export default router;
