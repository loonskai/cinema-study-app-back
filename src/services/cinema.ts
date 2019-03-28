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
  }
};
