import Cinema from '../models/Cinema';

import { CinemaType } from '../types/cinema';

export default {
  async create(body: CinemaType): Promise<boolean> {
    await Cinema.create(body);
    return true;
  },

  async getAll(): Promise<CinemaType[]> {
    const result = await Cinema.findAll({ raw: true });
    return result;
  },

  async update(id: number, body: CinemaType): Promise<CinemaType | any> {
    const result = await Cinema.update(body, {
      where: { id },
      returning: true,
      raw: true
    });
    return result[0] === 1 && result[1];
  }
};
