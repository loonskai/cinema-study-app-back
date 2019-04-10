import orderService from '../services/order';
import { Controller } from '../types/base';
import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';
import sanitizeSessionQueryParams from '../helpers/sanitizeSessionQueryParams';

export default {
  async reserve(ctx) {
    const { body } = ctx.request;
    const { id } = ctx.params;
    if (!id) throw new ApiError(404, 'Session ID not defined');
    const result = await orderService.reserve(+id, body);
    if (!result) throw new ApiError(500, 'Unable to reserve seat');
    ctx.body = parseSuccessResponse('Succesfully reserved seat');
  }
} as Controller;
