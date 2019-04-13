import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';

const Bonus = sequelize.define(
  'bonus',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
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
