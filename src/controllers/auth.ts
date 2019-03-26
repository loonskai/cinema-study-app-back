import passport from 'koa-passport';
// import koaJwt from 'koa-jwt';
import jwt from 'jsonwebtoken';

import '../config/passport';
import { env } from '../config/env';

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
        ctx.status = 404;
        ctx.body = {
          error: true,
          message: info.message
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
    try {
      const { token } = ctx.request.body;
      if (!token) {
        throw Error('Token not found');
      }
      const result: any = jwt.verify(token, env.JWT_SECRET);
      if (typeof result === 'string') {
        throw Error('Token not valid');
      }
      ctx.body = {
        success: true,
        data: {
          user: result.email,
          role: result.role
        }
      };
    } catch (error) {
      console.error(error);
      ctx.status = 400;
      ctx.body = {
        error: true,
        message: error.message
      };
    }
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
