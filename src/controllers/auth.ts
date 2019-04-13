import passport from 'koa-passport';
import jwt from 'jsonwebtoken';

import '../config/passport';
import { env } from '../config/env';

import { Controller } from '../types/base';
import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

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
        userID: user.id,
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
      userID: result.id,
      role: result.role
    });
  }
} as Controller;
