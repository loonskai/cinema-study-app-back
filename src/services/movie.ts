import Movie from '../models/Movie';

import { MovieType } from '../types/movie';

export default {
  /*   async create(body: CinemaType): Promise<boolean> {
    await Cinema.create(body);
    return true;
  }, */
  async createMany(body: MovieType[]): Promise<any> {
    const result = await Movie.bulkCreate(body, {
      ignoreDuplicates: true
    });
    console.log(result);
  },

  async getAll(): Promise<MovieType[]> {
    const result = await Movie.findAll({ raw: true, order: [['id', 'DESC']] });
    return result;
  },

  async getByID(id: number): Promise<MovieType | any> {
    const result = await Movie.findByPk(id, { raw: true });
    return result;
  },

  async getManyByIDs(ids: number[]): Promise<MovieType[] | any> {
    const result = await Movie.findAll({
      where: { id: ids },
      raw: true
    });
    return result;
  }

  /*   async update(id: number, body: CinemaType): Promise<CinemaType | any> {
    const result = await Cinema.update(body, {
      where: { id },
      returning: true,
      raw: true
    });
    return !!result[0] && result[1];
  }, */

  /*   async delete(id: number): Promise<any> {
    const result = await Cinema.destroy({ where: { id } });
    return !!result;
  } */
};
