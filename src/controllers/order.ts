import orderService from '../services/order';
import { Controller } from '../types/base';
import ApiError from '../classes/ApiError';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

export default {
  async create(ctx) {
    const { body } = ctx.request;
    const { user } = ctx;
    if (!user || !user.id) {
      throw new ApiError(500, 'User data is not defined');
    }
    const result = await orderService.create(body, user.id);
    if (!result) throw new ApiError(500, 'Unable to create order');
    ctx.body = parseSuccessResponse('Succesfully created order');
  },

  async getPersonalAll(ctx) {
    const { user } = ctx;
    if (!user || !user.id) {
      throw new ApiError(500, 'User data is not defined');
    }
    const result = await orderService.getAll({ 'user-id': user.id });
    if (!result) throw new ApiError(500, 'Unable to load order list');
    ctx.body = parseSuccessResponse(result);
  },

  async reserve(ctx) {
    const { body } = ctx.request;
    const { id } = ctx.params;
    if (!id) throw new ApiError(404, 'Session ID not defined');
    const result = await orderService.reserve(+id, body);
    if (!result) throw new ApiError(500, 'Unable to reserve seat');
    ctx.body = parseSuccessResponse('Succesfully reserved seat');
  },

  async cancelReservation(ctx) {
    const { body } = ctx.request;
    const { id } = ctx.params;
    if (!id) throw new ApiError(404, 'Session ID not defined');
    const parsedBody = body.map((item: any) => ({
      row: item.row,
      seat: item.seat
    }));
    const result = await orderService.cancelReservation(+id, parsedBody);
    if (!result) throw new ApiError(500, 'Unable to cancel reservation');
    ctx.body = parseSuccessResponse('Succesfully reserved seat');
  }
} as Controller;
