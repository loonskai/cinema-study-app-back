import moment from 'moment';

import Session from '../models/Session';
import { SessionType } from '../types/session';

export default {
  async create(body: SessionType): Promise<boolean | any> {
    const { date, time } = body;
    const combinedDate = moment(
      `${moment(date).format('YYYY-DD-MM')}T${time}`
    ).format();
    await Session.create({ ...body, date: combinedDate });
    return true;
  },
  async getAll(): Promise<SessionType[]> {
    const result = await Session.findAll({
      raw: true,
      order: [['id', 'DESC']]
    });
    return result;
  }
  /*   async update(id: number, body: BonusType): Promise<BonusType> {
    const result = await Bonus.update(body, {
      where: { id },
      returning: true,
      raw: true
    });
    return !!result[0] && result[1];
  }, */
  /*   async delete(id: number): Promise<any> {
    const result = await Bonus.destroy({ where: { id } });
    return !!result;
  } */
};