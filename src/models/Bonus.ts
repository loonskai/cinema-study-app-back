import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';

const Bonus = sequelize.define(
  'bonus',
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequilize.STRING,
      allowNull: false
    },
    price: {
      type: Sequilize.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0
      }
    }
  },
  {
    schema: 'cinemaapp'
  }
);

export default Bonus;
