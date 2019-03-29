import sequilize from '../config/sequelize';

import Hall from '../models/Hall';
import Row from '../models/Row';

import { HallType, RowType } from '../types/hall';

export default {
  async create(body: HallType): Promise<boolean> {
    const hallBody = {
      title: body.title,
      'cinema-id': body['cinema-id']
    };

    const transaction = await sequilize.transaction();
    try {
      const hall = await Hall.create(hallBody, {
        transaction,
        returning: true
      });
      const rowsArrBody = body.rows.map(row => ({
        ...row,
        'category-id': row.categoryID,
        'hall-id': hall.id
      }));
      await Row.bulkCreate(rowsArrBody, { transaction, validate: true });
      await transaction.commit();
      return true;
    } catch (error) {
      if (error) await transaction.rollback();
      return false;
    }
  },

  async getAll(): Promise<HallType[]> {
    const result = await Hall.findAll({ raw: true, order: [['id', 'DESC']] });
    return result;
  }

  /*   async update(id: number, body: CinemaType): Promise<CinemaType | any> {
    const result = await Cinema.update(body, {
      where: { id },
      returning: true,
      raw: true
    });
    return !!result[0] && result[1];
  }, */
  /*   async delete(id: number): Promise<any> {
    const result = await Cinema.destroy({ where: { id } });
    return !!result;
  } */
};
