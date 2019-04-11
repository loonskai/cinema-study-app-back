import Session from '../models/Session';
import { SeatItem } from '../types/session';

export default {
  async create(body: any): Promise<boolean> {
    return true;
  },

  async reserve(sessionID: number, body: SeatItem[]): Promise<boolean> {
    const session = await Session.findByPk(sessionID);
    if (!session) return false;
    session.update({ reserved: body });
    return true;
  }
};
