import cinemaService from '../services/cinema';

import { Controller } from '../types/base';

import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

export default {
  async create(ctx) {
    const { body } = ctx.request;
    const result = await cinemaService.create(body);
    if (!result) throw new ApiError(500, 'Unable to create cinema');
    ctx.body = parseSuccessResponse('Succesfully created cinema');
  },

  async getAll(ctx) {
    const result = await cinemaService.getAll();
    if (!result) throw new ApiError(500, 'Unable to load cinema list');
    ctx.body = parseSuccessResponse(result);
  }
} as Controller;
