import Bonus from '../models/Bonus';

import { BonusType } from '../types/bonus';

export default {
  async create(body: BonusType): Promise<boolean> {
    const bonusBody = {
      title: body.title,
      price: body.price,
      'cinema-id': body.cinemaID
    };
    await Bonus.create(bonusBody);
    return true;
  },

  async getAll(): Promise<BonusType[]> {
    const result = await Bonus.findAll({ raw: true, order: [['id', 'DESC']] });
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
