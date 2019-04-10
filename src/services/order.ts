import Session from '../models/Session';
import { SeatItem } from '../types/session';

export default {
  async reserve(sessionID: number, body: SeatItem[]): Promise<boolean | any> {
    console.log(sessionID);
    console.log(body);
    const session = await Session.findByPk(sessionID);
    if (!session) return false;
    console.log(session.reserved);
    session.update({
      reserved: body
    });
    // await Session.create({ ...body, date: combinedDate });
    // return true;
  }
};
