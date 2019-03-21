import * as passport from 'koa-passport';
import * as jwt from 'jsonwebtoken';

import { env } from '../config/env';

export default {
  async signin(ctx: any, next: any) {
    await passport.authenticate('local', (err, user) => {
      if (user === false) {
        ctx.body = 'Login failed';
      } else {
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role
        };
        const token = jwt.sign(payload, env.JWT_SECRET);
        ctx.body = {
          token,
          user: user.email
        };
      }
    })(ctx, next);
  },

  async signout(ctx: any) {
    ctx.body = 'sign out';
  },

  async verifyToken(ctx: any) {
    ctx.body = 'verify token';
  },

  async googleSignin(ctx: any) {
    passport.authenticate('google');
  }
};
