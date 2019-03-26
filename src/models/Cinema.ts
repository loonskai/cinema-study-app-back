import Sequilize from 'sequelize';

import db from '../config/db';

const Cinema = db.define(
  'cinema',
  {
    title: {
      type: Sequilize.STRING,
      allowNull: false
    },
    city: {
      type: Sequilize.STRING,
      allowNull: false
    }
  },
  {
    schema: 'cinemaapp'
  }
);

export default Cinema;
