import passport from 'koa-passport';
import jwt from 'jsonwebtoken';

import { Controller } from '../types/base';

import '../config/passport';
import { env } from '../config/env';
import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

interface ParsedToken {
  id: number;
  email: string;
  role: string;
  iat: number;
}

export default {
  async signin(ctx, next) {
    await passport.authenticate('local', (err, user, info) => {
      if (user === false) throw new ApiError(404, info.message);
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      const token = jwt.sign(payload, env.JWT_SECRET);
      ctx.body = parseSuccessResponse({
        token,
        user: user.email,
        role: user.role
      });
    })(ctx, next as any);
  },

  async signout(ctx) {
    ctx.body = parseSuccessResponse('Succesfully signed out');
  },

  async validateToken(ctx) {
    const { token }: { token: string } = ctx.request.body;
    if (!token) {
      throw new ApiError(404, 'Token not found');
    }
    const result: any = jwt.verify(token, env.JWT_SECRET);
    if (typeof result === 'string') {
      throw new ApiError(404, 'Token not valid');
    }
    ctx.body = parseSuccessResponse({
      user: result.email,
      role: result.role
    });
  },

  async googleSignin(ctx) {
    passport.authenticate('google');
  }
} as Controller;
