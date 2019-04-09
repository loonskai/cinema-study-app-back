import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';
import SessionModel from './Session';

const Movie = sequelize.define(
  'movie',
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
    overview: {
      type: Sequilize.STRING(1000),
      allowNull: false
    },
    poster: {
      type: Sequilize.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    }
  },
  {
    schema: 'cinemaapp'
  }
);

Movie.hasMany(SessionModel, {
  as: 'sessions',
  foreignKey: 'movie-id',
  onDelete: 'cascade'
});

export default Movie;
