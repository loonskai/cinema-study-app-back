import moment from 'moment';

import Session from '../models/Session';
import Movie from '../models/Movie';
import Hall from '../models/Hall';
import Cinema from '../models/Cinema';
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

  async getAll(params: any): Promise<SessionType[]> {
    const result = await Session.findAll({
      where: params,
      order: [['id', 'DESC']],
      include: [
        { model: Movie, as: 'movie' },
        {
          model: Hall,
          as: 'hall',
          include: [
            {
              model: Cinema,
              as: 'cinema'
            }
          ]
        }
      ]
    });
    return result;
  },

  async delete(id: number): Promise<boolean> {
    const result = await Session.destroy({ where: { id } });
    return !!result;
  }
};
