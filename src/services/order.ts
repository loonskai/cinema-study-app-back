import Session from '../models/Session';
import { SeatItem } from '../types/session';

export default {
  async create(body: any, userID: number): Promise<boolean> {
    console.log('order body', body);
    console.log('user id', userID);
    return true;
  },

  async reserve(sessionID: number, body: SeatItem[]): Promise<boolean> {
    const session = await Session.findByPk(sessionID);
    if (!session) return false;
    session.update({ reserved: body });
    return true;
  }
};
