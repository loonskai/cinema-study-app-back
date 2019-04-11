import Joi from 'joi';

import { Controller } from '../types/base';

import userService from '../services/user';
import cinemaService from '../services/cinema';
import movieService from '../services/movie';
import hallService from '../services/hall';
import customizeJoiError from '../helpers/customizeJoiError';
import ApiError from '../classes/ApiError';
import { MovieType } from '../types/movie';
import hall from '../controllers/hall';
import { HallType } from '../types/hall';

const rowSchema = Joi.object().keys({
  category: Joi.number()
    .positive()
    .required(),
  quantity: Joi.number()
    .positive()
    .required(),
  lastInSection: Joi.boolean()
});

const movieSchema = Joi.object().keys({
  id: Joi.number().positive(),
  title: Joi.string()
    .required()
    .options({
      language: {
        any: 'is required'
      }
    }),
  overview: Joi.string()
    .min(2)
    .max(1000)
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
  poster: Joi.string()
    .required()
    .uri()
});

const priceSchema = Joi.object().keys({
  id: Joi.number()
    .positive()
    .required(),
  price: Joi.number()
    .positive()
    .required()
});

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
  },

  async movie(ctx, next) {
    const { body } = ctx.request;
    await Joi.validate(body, movieSchema, customizeJoiError);
    await next();
  },

  async moviesMany(ctx, next) {
    const { body } = ctx.request;
    const schema = Joi.array().items(movieSchema);
    await Joi.validate(body, schema, customizeJoiError);
    const ids = body.map((movie: MovieType) => movie.id);
    const movies = await movieService.getManyByIDs(ids);
    if (!!movies.length) {
      throw new ApiError(500, 'Some movie ID already in use');
    }
    await next();
  },

  async bonus(ctx, next) {
    const { body } = ctx.request;
    const schema = Joi.object().keys({
      title: Joi.string()
        .min(2)
        .required(),
      cinemaID: Joi.number()
        .positive()
        .required(),
      price: Joi.number()
        .positive()
        .required()
    });
    await Joi.validate(body, schema, customizeJoiError);
    const { cinemaID } = body;
    const cinema = await cinemaService.getByID(+cinemaID);
    if (!cinema) {
      throw new ApiError(404, 'Cinema not found');
    }
    await next();
  },

  async session(ctx, next) {
    const { body } = ctx.request;
    const schema = Joi.object().keys({
      date: Joi.string()
        .isoDate()
        .required(),
      time: Joi.string().required(),
      movie: Joi.string().required(),
      hall: Joi.number()
        .positive()
        .required(),
      prices: Joi.array().items(priceSchema)
    });
    await Joi.validate(body, schema, customizeJoiError);
    const { movie: title } = body;
    const movie = await movieService.getOne({ title });
    if (!movie) {
      throw new ApiError(404, 'Movie not found');
    }
    body['movie-id'] = movie.id;
    const hall: HallType = await hallService.getByID(body.hall);
    if (!hall) {
      throw new ApiError(404, 'Hall not found');
    }
    body['hall-id'] = hall.id;
    await next();
  },

  async order(ctx, next) {
    const { body } = ctx.request;
    console.log(body);
    await next();
  }
} as Controller;
