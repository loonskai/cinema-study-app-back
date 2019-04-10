import Sequelize, { Model } from 'sequelize';

import sequelize from '../config/sequelize';

interface CategoryAttributes {
  title: string;
}

const RowCategory: Model<CategoryAttributes> | any = sequelize.define(
  'row-category',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    schema: 'cinemaapp'
  }
);

const initialCategories = [
  { id: 1, title: 'VIP' },
  { id: 2, title: 'Basic' },
  { id: 3, title: 'Back seats' }
];

RowCategory.sync().then(() => {
  RowCategory.bulkCreate(initialCategories, {
    ignoreDuplicates: true
  });
});

export default RowCategory;
