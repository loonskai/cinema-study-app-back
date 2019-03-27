import passport from 'koa-passport';
// import koaJwt from 'koa-jwt';
import jwt from 'jsonwebtoken';

import '../config/passport';
import { env } from '../config/env';
import ApiError from '../classes/ApiError';

interface ParsedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
}

export default {
  async signin(ctx: any, next: any) {
    await passport.authenticate('local', (err, user, info) => {
      if (user === false) {
        throw new ApiError(404, info.message);
      } else {
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role
        };
        const token = jwt.sign(payload, env.JWT_SECRET);
        ctx.body = {
          token,
          user: user.email,
          role: user.role
        };
      }
    })(ctx, next);
  },

  async signout(ctx: any) {
    ctx.body = 'sign out';
  },

  async validateToken(ctx: any) {
    const { token } = ctx.request.body;
    if (!token) {
      throw new ApiError(404, 'Token not found');
    }
    const result: any = jwt.verify(token, env.JWT_SECRET);
    if (typeof result === 'string') {
      throw new ApiError(404, 'Token not valid');
    }
    ctx.body = {
      success: true,
      data: {
        user: result.email,
        role: result.role
      }
    };
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
