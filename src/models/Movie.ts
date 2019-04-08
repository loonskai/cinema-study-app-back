import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';

const Movie = sequelize.define(
  'movie',
  {
    title: {
      type: Sequilize.STRING,
      allowNull: false
    },
    overview: {
      type: Sequilize.STRING,
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
