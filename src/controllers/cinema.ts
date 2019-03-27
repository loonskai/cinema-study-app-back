import cinemaService from '../services/cinema';

export default {
  async create(ctx: any, next: any) {
    const { body } = ctx.request;
    const result = await cinemaService.create(body);
    if (result) {
      ctx.status = 200;
      ctx.body = 'Succesfully created cinema';
    } else {
      ctx.throw(500, 'Server error. Unable to create cinema');
    }
  }
};
