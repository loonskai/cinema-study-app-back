import passport from 'koa-passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import bcryptjs from 'bcryptjs';

import { env } from '../config/env';
import userService from '../services/user';

const LocalStrategy: any = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;

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

const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET
} as any;

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload: any, done: any) => {
    try {
      const user: any = await userService.findById(jwt_payload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error, null);
    }
  })
);

export default passport;
// passport.use(new GoogleStrategy());
