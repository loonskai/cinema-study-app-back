import Cinema from '../models/Cinema';

export default {
  async create(body: any) {
    await Cinema.create(body);
    return true;
  }
};
