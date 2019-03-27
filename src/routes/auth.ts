import Router from 'koa-router';

import authController from '../controllers/auth';
import userController from '../controllers/user';
import compileReqBodyUsername from '../middlewares/compileReqBodyUsername';

import validator from '../middlewares/validator';

const router = new Router();

router.post('/signup', validator.user, userController.create);
router.post('/signin', compileReqBodyUsername, authController.signin);
router.post('/validate', authController.validateToken);
router.post('/signout', authController.signout);
router.post('/google', authController.googleSignin);

export default router;
