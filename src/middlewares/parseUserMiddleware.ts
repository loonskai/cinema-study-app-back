import { Middleware } from 'koa';
import { env } from '../config/env';
import jwt from 'jsonwebtoken';

import ApiError from '../classes/ApiError';

const parseUserMiddleware: Middleware = async (ctx, next) => {
  const authHeader = ctx.request.header.authorization;
  if (!authHeader) {
    throw new ApiError(401, 'Authorization token not found');
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new ApiError(401, 'Authorization token not found');
  }
  const tokenData: any = jwt.verify(token, env.JWT_SECRET);
  if (!tokenData || typeof tokenData === 'string' || !tokenData.id) {
    throw new ApiError(401, 'Wrong authorization token data format');
  }
  ctx.user = {
    id: tokenData.id,
    email: tokenData.email
  };
  await next();
};

export default parseUserMiddleware;
