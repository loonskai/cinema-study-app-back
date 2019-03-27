import cinemaService from '../services/cinema';

import ApiError from '../classes/ApiError';

export default {
  async create(ctx: any, next: any) {
    const { body } = ctx.request;
    const result = await cinemaService.create(body);
    if (!result) throw new ApiError(500, 'Unable to create cinema');
    ctx.status = 200;
    ctx.body = 'Succesfully created cinema';
  }
};
