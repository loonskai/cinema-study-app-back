import bcryptjs from 'bcryptjs';

import { Middleware } from 'koa';

import userService from '../services/user';
import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

interface Controller {
  create: Middleware;
}

export default {
  async create(ctx) {
    const { body } = ctx.request;
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(body.password, salt);
    body.password = hash;
    body.role = 'client';
    const result = await userService.create(body);
    if (!result) throw new ApiError(500, 'Unable to sign up');
    ctx.body = parseSuccessResponse('Succesfully signed up');
  }
} as Controller;
