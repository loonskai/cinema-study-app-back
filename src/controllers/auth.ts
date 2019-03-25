import * as passport from 'koa-passport';
import * as jwt from 'jsonwebtoken';

import '../config/passport';
import { env } from '../config/env';

export default {
  async signin(ctx: any, next: any) {
    await passport.authenticate('local', (err, user) => {
      console.log(user.id);
      if (user === false) {
        ctx.status = 404;
        ctx.body = {
          error: true,
          message: 'User not found'
        };
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
  },

  async compileReqBodyUsername(ctx: any, next: any) {
    if (!ctx.request.body.username) {
      ctx.request.body.username = ctx.request.body.email;
    }
    await next();
  }
};
