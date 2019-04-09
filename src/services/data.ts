import sequilize from '../config/sequelize';

import Hall from '../models/Hall';
import Row from '../models/Row';
import RowCategory from '../models/RowCategory';
import Cinema from '../models/Cinema';

import { RowCategoryType } from '../types/hall';

export default {
  async getRowCategories(): Promise<RowCategoryType[]> {
    const result = await RowCategory.findAll({ raw: true });
    return result;
  },

  async getCities(): Promise<string[] | any> {
    const cinemaCities = await Cinema.findAll({
      raw: true,
      attributes: ['city']
    });
    const cities = Array.from(
      new Set(cinemaCities.map((cinema: { city: string }) => cinema.city))
    );
    return cities;
  }
};
