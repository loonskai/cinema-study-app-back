import cinemaService from '../services/cinema';

import { Middleware } from 'koa';

import ApiError from '../classes/ApiError';

interface Controller {
  create: Middleware;
}

export default {
  async create(ctx, next) {
    const { body } = ctx.request;
    const result = await cinemaService.create(body);
    if (!result) throw new ApiError(500, 'Unable to create cinema');
    ctx.status = 200;
    ctx.body = 'Succesfully created cinema';
  }
} as Controller;
