import hallService from '../services/hall';

import { Controller } from '../types/base';

import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

export default {
  async getAll(ctx) {
    const result = await hallService.getAll();
    if (!result) throw new ApiError(500, 'Unable to load hall list');
    ctx.body = parseSuccessResponse(result);
  },

  async create(ctx) {
    const { body } = ctx.request;
    console.log(body);
    /*     const result = await hallService.create(body);
    if (!result) throw new ApiError(500, 'Unable to create hall');
    ctx.body = parseSuccessResponse('Succesfully created hall'); */
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
