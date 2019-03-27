import Sequilize from 'sequelize';

import db from '../config/db';
import Cinema from './Cinema';

const Bonus = db.define(
  'bonus',
  {
    cinemaId: {
      type: Sequilize.INTEGER,
      references: {
        model: Cinema,
        key: 'id'
      }
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
