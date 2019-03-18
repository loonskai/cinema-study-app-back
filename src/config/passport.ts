import * as passport from 'koa-passport';
import * as passportLocal from 'passport-local';
import * as passportGoogle from 'passport-google-oauth2';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy: any = passportGoogle.Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    // Fetch user from DB
  })
);

passport.use(new GoogleStrategy());
