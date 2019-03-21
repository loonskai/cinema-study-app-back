import * as Joi from 'joi';

import { UserType } from '../types/user';

export default {
  user(ctx: any, next: any) {
    const { body } = ctx.request;
    const schema = Joi.object().keys({
      username: Joi.string()
        .alphanum()
        .min(2)
        .max(20)
        .required(),
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .label('Wrong email format'),
      password: Joi.string().regex(/^[a-zA-Z0-9]{5,30}$/),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
    });
    Joi.validate(body, schema, (err, func) => {
      if (err) {
        ctx.body = err;
      } else {
        next();
      }
    });
  }
};
