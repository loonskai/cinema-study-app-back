import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';
import Movie from './Movie';
import Hall from './Hall';

const Session = sequelize.define(
  'session',
  {
    date: {
      type: Sequilize.DATE,
      allowNull: false
    },
    movieId: {
      type: Sequilize.INTEGER,
      references: {
        model: Movie,
        key: 'id'
      }
    },
    hallId: {
      type: Sequilize.INTEGER,
      references: {
        model: Hall,
        key: 'id'
      }
    }
  },
  {
    schema: 'cinemaapp'
  }
);

export default Session;
