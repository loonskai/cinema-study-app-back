import movieService from '../services/movie';

import { Controller } from '../types/base';

import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

export default {
  async create(ctx) {
    /*  
    
    if (!result) throw new ApiError(500, 'Unable to create cinema');
    ctx.body = parseSuccessResponse('Succesfully created cinema'); */
    const { body } = ctx.request;
    const result = await movieService.createMany(body);
    ctx.body = 'create movie';
  },

  async getAll(ctx) {
    const result = await movieService.getAll();
    if (!result) throw new ApiError(500, 'Unable to load cinema list');
    ctx.body = parseSuccessResponse(result);
  }

  /*   async update(ctx) {
    const { id } = ctx.params;
    const { body } = ctx.request;
    if (!id) throw new ApiError(404, 'Cinema ID not defined');
    const [result] = await cinemaService.update(+id, body);
    if (!result) throw new ApiError(500, 'Unable to update cinema');
    ctx.body = parseSuccessResponse(result);
  }, */

  /*   async delete(ctx) {
    const { id } = ctx.params;
    if (!id) throw new ApiError(404, 'Cinema ID not defined');
    const result = await cinemaService.delete(+id);
    if (!result) throw new ApiError(500, 'Unable to delete cinema');
    ctx.body = parseSuccessResponse('Succesfully delete cinema');
  } */
} as Controller;
