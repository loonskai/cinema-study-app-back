import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';

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

export default Movie;
