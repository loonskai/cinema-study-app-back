import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';
import RowCategoryModel from './RowCategory';

const Row = sequelize.define(
  'row',
  {
    quantity: {
      type: Sequilize.INTEGER,
      validate: {
        isNumeric: true,
        min: 0
      }
    },
    lastInSection: Sequilize.BOOLEAN
  },
  {
    schema: 'cinemaapp'
  }
);

Row.belongsTo(RowCategoryModel, {
  foreignKey: 'category-id',
  targetKey: 'id'
});

export default Row;
