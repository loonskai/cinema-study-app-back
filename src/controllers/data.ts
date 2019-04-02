import dataService from '../services/data';

import { Controller } from '../types/base';

import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

export default {
  async getRowCategories(ctx) {
    const result = await dataService.getRowCategories();
    if (!result) throw new ApiError(500, 'Unable to load row categories list');
    ctx.body = parseSuccessResponse(result);
  }
} as Controller;
