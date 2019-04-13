import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';

const Movie = sequelize.define(
  'movie',
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
    overview: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    poster: {
      type: Sequelize.STRING,
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

export default Movie;
