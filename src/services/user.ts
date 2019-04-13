import { UserType } from '../types/user';
import User from '../models/User';

export default {
  async create(body: UserType) {
    await User.create(body);
    return true;
  },

  async findByUsername(username: string) {
    const result = await User.findOne({
      where: { username }
    });
    return result;
  },

  async findByEmail(email: string) {
    const result = await User.findOne({
      where: { email }
    });
    return result;
  }
};
