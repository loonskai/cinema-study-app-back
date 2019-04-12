import sequelize from '../config/sequelize';
import Session from '../models/Session';
import { SeatItem } from '../types/session';
import OrderModel, { OrderBonuses } from '../models/Order';
import Bonus from '../models/Bonus';

interface QueryParamsType {
  'user-id': number;
}

interface OrderType {
  id: number;
  seats: { row: number; seat: number }[];
  createdAt?: Date;
  updatedAt?: Date;
  bonuses?: {
    id: number;
    title: string;
    price: number;
    'order-bonuses': {
      'order-id': 1;
      'bonus-id': 1;
      quantity: number;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
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
        }
      ],
      order: [['id', 'ASC']]
    });
    console.log(result);
    const parsedResult = result.map((order: OrderType) => ({
      id: order.id,
      seats: order.seats,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }));
    return result;
  },

  async create(body: any, userID: number): Promise<boolean> {
    console.log('order body', body);
    console.log('user id', userID);
    const bonusesIDs: number[] = [];
    const bonusQuantities: number[] = [];
    body.bonuses.forEach((bonus: { id: number; quantity: number }) => {
      bonusesIDs.push(bonus.id);
      bonusQuantities.push(bonus.quantity);
    });
    const transaction = await sequelize.transaction();
    const parsedBody = {
      'user-id': userID,
      'session-id': body.sessionID,
      seats: body.seats
    };
    const newOrder = await OrderModel.create(parsedBody, {
      transaction,
      returning: true
    });
    if (newOrder) {
      const queryPromises: any[] = [];
      body.bonuses.forEach((bonus: { id: number; quantity: number }) => {
        queryPromises.push(
          newOrder.addBonuses([bonus.id], {
            transaction,
            through: { quantity: bonus.quantity }
          })
        );
      });
      const result = await Promise.all(queryPromises);
      console.log(result);
      await transaction.commit();
      /*       newOrder.addBonuses(bonus.id, {
        transaction,
        through: { quantity: bonus.quantity }
      }); */
      // await transaction.commit();
      /* ADD ordered values to sessions table */
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
