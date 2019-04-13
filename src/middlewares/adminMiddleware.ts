import { Middleware } from 'koa';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import ApiError from '../classes/ApiError';

const adminMiddleware: Middleware = async (ctx, next) => {
  const authHeader = ctx.request.header.authorization;
  if (!authHeader) {
    throw new ApiError(401, 'Access denied');
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new ApiError(401, 'Access denied');
  }
  const tokenData: any = jwt.verify(token, env.JWT_SECRET);
  if (
    !tokenData ||
    typeof tokenData === 'string' ||
    !tokenData.role ||
    tokenData.role !== 'admin'
  ) {
    throw new ApiError(401, 'Access denied');
  }
  await next();
};

export default adminMiddleware;
