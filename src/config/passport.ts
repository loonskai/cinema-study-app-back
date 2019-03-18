import * as passport from 'koa-passport';
import * as passportLocal from 'passport-local';
import * as passportGoogle from 'passport-google-oauth2';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy: any = passportGoogle.Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    // Fetch user from DB
    console.log(username);
    console.log(password);
    console.log('hi');
    done(null, 'signed in');
  })
);

passport.use(new GoogleStrategy());
