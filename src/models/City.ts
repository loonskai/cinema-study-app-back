import Sequilize from 'sequelize';

import db from '../config/db';

const City = db.define(
  'city',
  {
    name: {
      type: Sequilize.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    schema: 'cinemaapp'
  }
);

export default City;
