import Session from '../models/Session';
import { SeatItem } from '../types/session';
import OrderModel, { OrderBonuses } from '../models/Order';
import Bonus from '../models/Bonus';

interface QueryParamsType {
  'user-id': number;
}

export default {
  async getAll(queryParams?: QueryParamsType): Promise<any> {
    const result = await OrderModel.findAll({
      where: queryParams,
      include: [{ model: Bonus, as: 'bonuses' }],
      order: [['id', 'ASC']]
    });
    return result;
  },

  async create(body: any, userID: number): Promise<boolean> {
    console.log('order body', body);
    console.log('user id', userID);
    const bonusesIDs = body.bonuses.map(
      (bonus: { id: number; quantity: number }) => bonus.id
    );
    const bonusQuantities = body.bonuses.map(
      (bonus: { id: number; quantity: number }) => +bonus.quantity
    );
    const parsedBody = {
      'user-id': userID,
      'session-id': body.sessionID,
      seats: body.seats
    };
    const newOrder = await OrderModel.create(parsedBody, {
      returning: true
    });
    if (newOrder) {
      newOrder.addBonuses(bonusesIDs, {
        through: {
          quantity: bonusQuantities
        }
      });
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
