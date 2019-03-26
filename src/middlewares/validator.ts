import Joi from 'joi';

import { UserType } from '../types/user';
import userService from '../services/user';

export default {
  async user(ctx: any, next: any) {
    try {
      const { body } = ctx.request;
      const schema = Joi.object().keys({
        username: Joi.string()
          .alphanum()
          .min(2)
          .max(20)
          .required()
          .options({
            language: {
              any: {
                empty: 'is required'
              },
              string: {
                min: 'should be at least 2 symbols length',
                max: 'should be max 20 symbols'
              }
            }
          }),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/),
        confirmPassword: Joi.string()
          .required()
          .valid(Joi.ref('password'))
      });
      await Joi.validate(body, schema);
      let existingUser;
      existingUser = await userService.findByUsername(body.username);
      if (!existingUser) {
        existingUser = await userService.findByEmail(body.email);
      }
      if (existingUser) {
        throw new Error('Email or username already in use');
      }
      await next();
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        error: true,
        message: error.message
      };
    }
  }
};
