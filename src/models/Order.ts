import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';

const Order = sequelize.define(
  'hall',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  },
  {
    schema: 'cinemaapp'
  }
);

export default Order;
