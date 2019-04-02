import sequilize from '../config/sequelize';

import Hall from '../models/Hall';
import Row from '../models/Row';
import RowCategory from '../models/RowCategory';

import { RowCategoryType } from '../types/hall';

export default {
  async getRowCategories(): Promise<RowCategoryType[]> {
    const result = await RowCategory.findAll({ raw: true });
    return result;
  }
};
