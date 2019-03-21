import * as Sequilize from 'sequelize';
import db from '../config/db';
import Movie from './Movie';
import Hall from './Hall';

const Session = db.define(
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
