import dataService from '../services/data';

import { Controller } from '../types/base';

import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

export default {
  async getRowCategories(ctx) {
    const queryParams = ctx.request.query;
    const result = await dataService.getRowCategories(queryParams);
    if (!result) throw new ApiError(500, 'Unable to load row categories list');
    ctx.body = parseSuccessResponse(result);
  },

  async getCities(ctx) {
    const result = await dataService.getCities();
    if (!result) throw new ApiError(500, 'Unable to load cities list');
    ctx.body = parseSuccessResponse(result);
  }
} as Controller;
