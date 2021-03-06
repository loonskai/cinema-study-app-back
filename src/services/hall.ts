import { HallType } from '../types/hall';
import sequelize from '../config/sequelize';
import Hall from '../models/Hall';
import Row from '../models/Row';

interface QueryParamsType {
  'cinema-id': number;
}

export default {
  async create(body: HallType): Promise<boolean> {
    const hallBody = {
      title: body.title,
      'cinema-id': body['cinema-id']
    };
    const transaction = await sequelize.transaction();
    try {
      const hall = await Hall.create(hallBody, {
        transaction,
        returning: true
      });
      const rowsArrBody = body.rows.map((row, index: number) => ({
        ...row,
        'row-order': index + 1,
        'category-id': row.category,
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

  async getAll(queryParams?: QueryParamsType): Promise<HallType[]> {
    const result = await Hall.findAll({
      where: queryParams,
      include: [{ model: Row, as: 'rows' }],
      order: [['id', 'ASC']]
    });
    return result;
  },

  async getByID(id: number): Promise<HallType> {
    const result = await Hall.findByPk(id, {
      include: [{ model: Row, as: 'rows' }]
    });
    return result;
  }
};
