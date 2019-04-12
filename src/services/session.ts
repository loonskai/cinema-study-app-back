import moment from 'moment';

import Session from '../models/Session';
import Movie from '../models/Movie';
import Hall from '../models/Hall';
import Cinema from '../models/Cinema';
import Row from '../models/Row';
import { SessionType } from '../types/session';
import session, { QueryParams } from '../controllers/session';

export default {
  async create(body: SessionType): Promise<boolean | any> {
    const { date, time } = body;
    const combinedDate = moment(
      `${moment(date).format('YYYY-MM-DD')}T${time}`
    ).format();
    await Session.create({ ...body, date: combinedDate });
    return true;
  },

  async getAll(params: QueryParams): Promise<SessionType[]> {
    const result = await Session.findAll({
      where: params,
      include: [
        { model: Movie, as: 'movie' },
        {
          model: Hall,
          as: 'hall',
          include: [
            { model: Cinema, as: 'cinema' },
            { model: Row, as: 'rows', order: ['id', 'asc'] }
          ]
        }
      ],
      order: [['id', 'DESC']]
    });
    return result;
  },

  async getByID(id: number): Promise<SessionType> {
    const result = await Session.findByPk(id, {
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
