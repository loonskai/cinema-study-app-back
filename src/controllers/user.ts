import userService from '../services/user';

export default {
  async create(ctx: any) {
    console.log(ctx.request.body);
    ctx.body = 'create user';
  }
};
