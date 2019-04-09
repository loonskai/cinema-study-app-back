import movieService from '../services/movie';

import { Controller } from '../types/base';

import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

export default {
  async create(ctx) {
    const { body } = ctx.request;
    let result;
    if (body instanceof Array) {
      result = await movieService.createMany(body);
      if (!result || !result.length) {
        throw new ApiError(500, 'Unable to create movies');
      }
    } else {
      result = await movieService.create(body);
      if (!result) throw new ApiError(500, 'Unable to create movie');
    }
    ctx.body = parseSuccessResponse(result);
  },

  async getAll(ctx) {
    const result = await movieService.getAll();
    if (!result) throw new ApiError(500, 'Unable to load movies list');
    ctx.body = parseSuccessResponse(result);
  },

  async getByID(ctx) {
    const { id } = ctx.params;
    if (!id) throw new ApiError(404, 'Movie ID not defined');
    const result = await movieService.getByID(+id);
    if (!result) throw new ApiError(500, 'Movie not found');
    ctx.body = parseSuccessResponse(result);
  },

  async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    if (!id) throw new ApiError(404, 'Movie ID not defined');
    const result = await movieService.update(+id, body);
    if (!result) throw new ApiError(500, 'Unable to update movie');
    ctx.body = parseSuccessResponse(result);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    if (!id) throw new ApiError(404, 'Movie ID not defined');
    const result = await movieService.delete(+id);
    if (!result) throw new ApiError(500, 'Unable to delete movie');
    ctx.body = parseSuccessResponse('Succesfully delete movie');
  }
} as Controller;
