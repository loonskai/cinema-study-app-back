import Sequilize from 'sequelize';

import db from '../config/db';
import City from './City';

const Movie = db.define(
  'cinema',
  {
    title: {
      type: Sequilize.STRING,
      allowNull: false
    },
    cityId: {
      type: Sequilize.INTEGER,
      references: {
        model: City,
        key: 'id'
      }
    }
  },
  {
    schema: 'cinemaapp'
  }
);

export default Movie;
