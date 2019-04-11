import bonusService from '../services/bonus';

import { Controller } from '../types/base';

import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

export default {
  async create(ctx) {
    const { body } = ctx.request;
    const result = await bonusService.create(body);
    if (!result) throw new ApiError(500, 'Unable to create bonus');
    ctx.body = parseSuccessResponse('Succesfully created bonus');
  },

  async getAll(ctx) {
    const queryParams = ctx.request.query;
    const result = await bonusService.getAll(queryParams);
    if (!result) throw new ApiError(500, 'Unable to load bonuses list');
    ctx.body = parseSuccessResponse(result);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    if (!id) throw new ApiError(404, 'Bonus ID not defined');
    const result = await bonusService.update(+id, body);
    if (!result) throw new ApiError(500, 'Unable to update bonus');
    ctx.body = parseSuccessResponse(result);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    if (!id) throw new ApiError(404, 'Bonus ID not defined');
    const result = await bonusService.delete(+id);
    if (!result) throw new ApiError(500, 'Unable to delete bonus');
    ctx.body = parseSuccessResponse('Succesfully delete bonus');
  }
} as Controller;
