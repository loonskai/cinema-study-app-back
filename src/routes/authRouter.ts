import * as Router from 'koa-router';
import authController from '../controllers/authController';

const router = new Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authController.signout);
router.post('/google', authController.googleSignin);

export default router;
