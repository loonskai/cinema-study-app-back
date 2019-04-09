import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';

const Session = sequelize.define(
  'session',
  {
    date: {
      type: Sequilize.DATE,
      allowNull: false
    }
  },
  {
    schema: 'cinemaapp'
  }
);

export default Session;
