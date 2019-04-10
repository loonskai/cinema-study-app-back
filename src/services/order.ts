import Session from '../models/Session';
import { SeatItem } from '../types/session';

export default {
  async reserve(sessionID: number, body: SeatItem[]): Promise<boolean | any> {
    const session = await Session.findByPk(sessionID);
    if (!session) return false;
    session.update({ reserved: body });
    return true;
  }
};
