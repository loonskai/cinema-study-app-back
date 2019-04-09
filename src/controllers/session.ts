import sessionService from '../services/session';

import { Controller } from '../types/base';

import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

interface QueryParams {
  hall?: string | number;
  date?: string;
  time?: string;
}

export default {
  async create(ctx) {
    const { body } = ctx.request;
    const result = await sessionService.create(body);
    if (!result) throw new ApiError(500, 'Unable to create session');
    ctx.body = parseSuccessResponse('Succesfully created session');
  },

  async getAll(ctx) {
    const queryParams: QueryParams = ctx.request.query;
    const result = await sessionService.getAll(queryParams);
    if (!result) throw new ApiError(500, 'Unable to load sessions list');
    ctx.body = parseSuccessResponse(result);
  }

  /*   async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    if (!id) throw new ApiError(404, 'Bonus ID not defined');
    const result = await bonusService.update(+id, body);
    if (!result) throw new ApiError(500, 'Unable to update bonus');
    ctx.body = parseSuccessResponse(result);
  }, */

  /*   async delete(ctx) {
    const { id } = ctx.params;
    if (!id) throw new ApiError(404, 'Bonus ID not defined');
    const result = await bonusService.delete(+id);
    if (!result) throw new ApiError(500, 'Unable to delete bonus');
    ctx.body = parseSuccessResponse('Succesfully delete bonus');
  } */
} as Controller;
