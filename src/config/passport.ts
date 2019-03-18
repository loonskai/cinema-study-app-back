import * as passport from 'koa-passport';
import * as passportLocal from 'passport-local';
import * as passportGoogle from 'passport-google-oauth2';

import User from '../models/User';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy: any = passportGoogle.Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    // Fetch user from DB
    const result = await User.findAll();
    console.log(result);
    done(null, 'signed in');
  })
);

// passport.use(new GoogleStrategy());

export default passport;
