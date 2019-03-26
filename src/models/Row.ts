import Sequilize from 'sequelize';

import db from '../config/db';

const RowCategory = db.define('row-category', {
  title: {
    type: Sequilize.STRING,
    allowNull: false
  }
});

const Row = db.define(
  'row',
  {
    categoryId: {
      type: Sequilize.INTEGER,
      references: {
        model: RowCategory,
        key: 'id'
      }
    },
    price: {
      type: Sequilize.INTEGER,
      validate: {
        isNumeric: true,
        min: 0
      }
    },
    seats: {
      type: Sequilize.INTEGER,
      validate: {
        isNumeric: true,
        min: 0
      }
    },
    reserved: Sequilize.ARRAY(Sequilize.INTEGER),
    ordered: Sequilize.ARRAY(Sequilize.INTEGER),
    lastInSection: Sequilize.BOOLEAN
  },
  {
    schema: 'cinemaapp'
  }
);

export default Row;
