import { UserSignUpReqBody, UserSignUpResBody } from '../types/user';
import User from '../models/User';

export default {
  async create(
    body: UserSignUpReqBody & { role: string }
  ): Promise<UserSignUpResBody | null> {
    const newUser = await User.create(body, {
      returning: true
    });
    if (!newUser) return null;
    return {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role
    };
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
