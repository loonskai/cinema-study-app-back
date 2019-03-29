import Hall from '../models/Hall';

import { HallType } from '../types/hall';

export default {
  async create(body: HallType): Promise<boolean> {
    console.log(body);
    // await Hall.create(body);
    return true;
  },

  async getAll(): Promise<HallType[]> {
    const result = await Hall.findAll({ raw: true, order: [['id', 'DESC']] });
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
