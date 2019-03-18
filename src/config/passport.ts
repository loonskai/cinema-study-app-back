import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }),
  (email, password, cb) => {}
);
