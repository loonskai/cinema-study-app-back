import Sequilize from 'sequelize';

import db from '../config/db';

const Movie = db.define(
  'movie',
  {
    title: {
      type: Sequilize.STRING,
      allowNull: false
    },
    description: {
      type: Sequilize.STRING,
      allowNull: false
    },
    picture: {
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
