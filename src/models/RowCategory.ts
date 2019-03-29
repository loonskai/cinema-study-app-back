import Sequilize, { Model } from 'sequelize';

import sequelize from '../config/sequelize';

import RowModel from './Row';

interface CategoryAttributes {
  title: string;
}

const RowCategory: Model<CategoryAttributes> | any = sequelize.define(
  'row-category',
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequilize.STRING,
      allowNull: false
    }
  },
  {
    schema: 'cinemaapp'
  }
);

const initialCategories = [
  { title: 'VIP' },
  { title: 'Basic' },
  { title: 'Back seats' }
];

RowCategory.sync().then(() => {
  RowCategory.bulkCreate(initialCategories);
});

RowCategory.hasMany(RowModel, { as: 'rows', foreignKey: 'category-id' });

export default RowCategory;
