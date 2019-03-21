import User from '../models/User';

import { UserType } from '../types/user';

export default {
  async create(body: UserType) {
    await User.create(body);
    return true;
  },

  findById(id: number) {},

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
  },

  delete(id: number) {}
};
