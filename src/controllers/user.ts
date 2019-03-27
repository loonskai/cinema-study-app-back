import bcryptjs from 'bcryptjs';

import ApiError from '../classes/ApiError';
import userService from '../services/user';

export default {
  async create(ctx: any, next: any) {
    const { body } = ctx.request;
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(body.password, salt);
    body.password = hash;
    body.role = 'client';
    const result = await userService.create(body);
    if (!result) throw new ApiError(500, 'Unable to sign up');
    ctx.status = 200;
    ctx.body = 'Succesfully signed up';
  }
};
