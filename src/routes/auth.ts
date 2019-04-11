import Router from 'koa-router';
import jwtMiddleware from 'koa-jwt';
import { env } from '../config/env';

import authController from '../controllers/auth';
import userController from '../controllers/user';
import compileReqBodyUsername from '../middlewares/compileReqBodyUsername';

import validator from '../middlewares/validator';

const router = new Router();

router.post('/signup', validator.user, userController.create);
router.post('/signin', compileReqBodyUsername, authController.signin);
router.post('/google', authController.googleSignin);
router.use(jwtMiddleware({ secret: env.JWT_SECRET }));
router.post('/validate', authController.validateToken);
router.post('/signout', authController.signout);

export default router;
