import sequelize from '../config/sequelize';
import { SeatItem } from '../types/session';
import Session from '../models/Session';
import OrderModel from '../models/Order';
import Bonus from '../models/Bonus';
import User from '../models/User';
import Movie from '../models/Movie';
import Hall from '../models/Hall';

import parseOrder from '../helpers/parseOrder';

interface QueryParamsType {
  'user-id': number;
}

export default {
  async getAll(queryParams?: QueryParamsType): Promise<any> {
    const result = await OrderModel.findAll({
      where: queryParams,
      include: [
        {
          model: Bonus,
          as: 'bonuses',
          attributes: ['id', 'title', 'price']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'username']
        },
        {
          model: Session,
          as: 'session',
          attributes: ['id', 'date'],
          include: [
            {
              model: Movie,
              as: 'movie'
            },
            {
              model: Hall,
              as: 'hall'
            }
          ]
        }
      ],
      order: [['id', 'ASC']]
    });
    return result.map(parseOrder);
  },

  async create(body: any, userID: number): Promise<boolean> {
    const transaction = await sequelize.transaction();
    const parsedBody = {
      'user-id': userID,
      'session-id': body.sessionID,
      seats: body.seats
    };
    try {
      const newOrder = await OrderModel.create(parsedBody, {
        transaction,
        returning: true
      });
      const queryPromises: any[] = [];
      body.bonuses.forEach((bonus: { id: number; quantity: number }) => {
        queryPromises.push(
          newOrder.addBonuses([bonus.id], {
            transaction,
            through: { quantity: bonus.quantity }
          })
        );
      });
      await Promise.all(queryPromises);
      const session = await Session.findByPk(body.sessionID);
      if (!session) throw new Error();
      await session.update({ ordered: body.seats }, { transaction });
      await transaction.commit();
    } catch (error) {
      if (error) await transaction.rollback();
      return false;
    }
    return true;
  },

  async reserve(sessionID: number, body: SeatItem[]): Promise<boolean> {
    const session = await Session.findByPk(sessionID);
    if (!session) return false;
    session.update({ reserved: body });
    return true;
  }
};
