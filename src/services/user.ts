import User from '../models/User';

import { UserType } from '../types/user';

export default {
  async create(body: UserType) {
    const result = await User.create(body);
    return result;
  },

  findById(id: number) {},

  findByLogin(login: string) {},

  delete(id: number) {}
};
