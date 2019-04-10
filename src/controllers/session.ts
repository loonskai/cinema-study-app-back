import sessionService from '../services/session';
import { Controller } from '../types/base';
import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';
import sanitizeSessionQueryParams from '../helpers/sanitizeSessionQueryParams';

export interface QueryParams {
  'hall-id'?: string | number;
  'movie-id'?: string;
  date?: any;
}

export default {
  async create(ctx) {
    const { body } = ctx.request;
    const result = await sessionService.create(body);
    if (!result) throw new ApiError(500, 'Unable to create session');
    ctx.body = parseSuccessResponse('Succesfully created session');
  },

  async getAll(ctx) {
    const queryParams: QueryParams = sanitizeSessionQueryParams(
      ctx.request.query
    );
    const result = await sessionService.getAll(queryParams);
    if (!result) throw new ApiError(500, 'Unable to load sessions list');
    ctx.body = parseSuccessResponse(result);
  },

  async delete(ctx) {
    const { id } = ctx.params;
    if (!id) throw new ApiError(404, 'Session ID not defined');
    const result = await sessionService.delete(+id);
    if (!result) throw new ApiError(500, 'Unable to delete session');
    ctx.body = parseSuccessResponse('Succesfully delete session');
  }
} as Controller;
