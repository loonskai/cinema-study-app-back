import { RowCategoryType } from '../types/hall';
import RowCategory from '../models/RowCategory';
import Cinema from '../models/Cinema';
import hallService from '../services/hall';

interface QueryParams {
  hallID?: number;
}

export default {
  async getRowCategories(params?: QueryParams): Promise<RowCategoryType[]> {
    const result: RowCategoryType[] = await RowCategory.findAll({ raw: true });
    if (params && params.hallID) {
      const hall = await hallService.getByID(params.hallID);
      const { rows } = hall;
      const hallRowsCategoriesIDs = Array.from(
        new Set(rows.map(row => row['category-id']))
      );
      return result.filter(category =>
        hallRowsCategoriesIDs.includes(category.id)
      );
    }
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
