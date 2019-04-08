import Movie from '../models/Movie';

import { MovieType } from '../types/movie';

export default {
  /*   async create(body: CinemaType): Promise<boolean> {
    await Cinema.create(body);
    return true;
  }, */

  async getAll(): Promise<MovieType[]> {
    const result = await Movie.findAll({ raw: true, order: [['id', 'DESC']] });
    return result;
  }

  /*   async getByID(id: number): Promise<CinemaType | any> {
    const result = await Cinema.findByPk(id, { raw: true });
    return result;
  }, */

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
