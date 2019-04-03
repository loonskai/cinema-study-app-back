import Joi from 'joi';

import { Context } from 'koa';
import { Controller } from '../types/base';

import userService from '../services/user';
import cinemaService from '../services/cinema';
import customizeJoiError from '../helpers/customizeJoiError';
import ApiError from '../classes/ApiError';

export default {
  async user(ctx, next) {
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
    await Joi.validate(body, schema, customizeJoiError);
    let existingUser;
    existingUser = await userService.findByUsername(body.username);
    if (!existingUser) {
      existingUser = await userService.findByEmail(body.email);
    }
    if (existingUser) {
      throw new ApiError(400, 'Email or username already in use');
    }
    await next();
  },

  async cinema(ctx, next) {
    const { body } = ctx.request;
    const schema = Joi.object().keys({
      title: Joi.string()
        .min(2)
        .required(),
      city: Joi.string()
        .min(2)
        .required()
    });
    await Joi.validate(body, schema, customizeJoiError);
    await next();
  },

  async hall(ctx, next) {
    const { body } = ctx.request;
    console.log(body);

    const rowSchema = Joi.object().keys({
      category: Joi.number()
        .positive()
        .required(),
      quantity: Joi.number()
        .positive()
        .required(),
      lastInSection: Joi.boolean()
    });

    const schema = Joi.object().keys({
      title: Joi.string()
        .min(2)
        .required(),
      cinemaID: Joi.number()
        .positive()
        .required(),
      rows: Joi.array().items(rowSchema)
    });
    await Joi.validate(body, schema, customizeJoiError);
    const { cinemaID } = body;
    const cinema = await cinemaService.getByID(+cinemaID);
    if (!cinema) {
      throw new ApiError(404, 'Cinema not found');
    }
    await next();
  }
} as Controller;
