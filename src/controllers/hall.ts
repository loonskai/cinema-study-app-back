import hallService from '../services/hall';
import ApiError from '../classes/ApiError';
import { Controller } from '../types/base';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

export default {
  async getAll(ctx) {
    const queryParams = ctx.request.query;
    const result = await hallService.getAll(queryParams);
    if (!result) throw new ApiError(500, 'Unable to load hall list');
    ctx.body = parseSuccessResponse(result);
  },

  async getByID(ctx) {
    const { id } = ctx.params;
    if (!id) throw new ApiError(404, 'Hall ID not defined');
    const result = await hallService.getByID(+id);
    if (!result) throw new ApiError(500, 'Hall not found');
    ctx.body = parseSuccessResponse(result);
  },

  async create(ctx) {
    const { body } = ctx.request;
    body['cinema-id'] = parseInt(body.cinemaID, 10);
    const result = await hallService.create(body);
    if (!result) throw new ApiError(500, 'Unable to create hall');
    ctx.body = parseSuccessResponse('Succesfully created hall');
  }
} as Controller;
