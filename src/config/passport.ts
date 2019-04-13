import passport from 'koa-passport';
import passportLocal from 'passport-local';
import bcryptjs from 'bcryptjs';

import userService from '../services/user';

const LocalStrategy: any = passportLocal.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    async (username: string, password: string, done: any) => {
      let user;
      user = await userService.findByUsername(username);
      if (!user) {
        user = await userService.findByEmail(username);
      }
      if (!user) return done(null, false, { message: 'User not found' });
      const passwordsMatch = await bcryptjs.compare(password, user.password);
      if (!passwordsMatch) {
        return done(null, false, { message: 'Wrong password' });
      }
      return done(null, user);
    }
  )
);

export default passport;
