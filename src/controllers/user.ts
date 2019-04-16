import bcryptjs from 'bcryptjs';

import { UserSignUpReqBody } from '../types/user';
import { Controller } from '../types/base';
import ApiError from '../classes/ApiError';
import userService from '../services/user';
import parseSuccessResponse from '../helpers/parseSuccessResponse';

export default {
  async create(ctx) {
    const { body }: { body: UserSignUpReqBody } = ctx.request;
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(body.password, salt);
    const bodyToSave = { ...body, password: hash, role: 'client' };
    const result = await userService.create(bodyToSave);
    if (!result) throw new ApiError(500, 'Unable to sign up');
    ctx.body = parseSuccessResponse(result);
  }
} as Controller;
