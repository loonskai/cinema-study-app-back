import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';
import HallModel from './Hall';
import RowCategoryModel from './RowCategory';

const Row = sequelize.define(
  'row',
  {
    /*     price: {
      type: Sequilize.INTEGER,
      validate: {
        isNumeric: true,
        min: 0
      }
    }, */
    quantity: {
      type: Sequilize.INTEGER,
      validate: {
        isNumeric: true,
        min: 0
      }
    },
    /*     reserved: Sequilize.ARRAY(Sequilize.INTEGER),
    ordered: Sequilize.ARRAY(Sequilize.INTEGER), */
    lastInSection: Sequilize.BOOLEAN
  },
  {
    schema: 'cinemaapp'
  }
);

/* Row.belongsTo(HallModel, {
  foreingKey: 'hall-id',
  targetKey: 'id'
}); */

Row.belongsTo(RowCategoryModel, {
  foreignKey: 'category-id',
  targetKey: 'id'
});

export default Row;
