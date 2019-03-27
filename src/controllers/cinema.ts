import cinemaService from '../services/cinema';

import { Middleware } from 'koa';

import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

interface Controller {
  create: Middleware;
}

export default {
  async create(ctx) {
    const { body } = ctx.request;
    const result = await cinemaService.create(body);
    if (!result) throw new ApiError(500, 'Unable to create cinema');
    ctx.body = parseSuccessResponse('Succesfully created cinema');
  }
} as Controller;
