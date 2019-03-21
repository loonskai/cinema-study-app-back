import * as passport from 'koa-passport';
import * as passportLocal from 'passport-local';
import * as passportGoogle from 'passport-google-oauth2';
import User from '../models/User';
import { NextFunction } from 'connect';

import { UserType } from '../types/user';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportLocal.Strategy;
const GoogleStrategy: any = passportGoogle.Strategy;

const fetchUser = async (username: number | string): Promise<UserType> => {
  const user = await User.find({
    where: {
      username
    }
  });
  console.log(user);
  return {
    id: 1,
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };
};

const options = {};

/* passport.use(
  new JwtStrategy(options, (payload, done) => {
    done(null, payload);
  })
); */

/* passport.serializeUser((user: UserType, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user: UserType = await fetchUser(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
}); */

/* passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user: UserType = await fetchUser(username);
      if (user.username === user.username && user.password === password) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      done(error);
    }
  })
); */

// passport.use(new GoogleStrategy());
