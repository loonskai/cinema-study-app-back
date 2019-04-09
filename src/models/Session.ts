import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';
import Movie from './Movie';
import Hall from './Hall';

const Session = sequelize.define(
  'session',
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    date: {
      type: Sequilize.DATE,
      allowNull: false
    }
  },
  {
    schema: 'cinemaapp'
  }
);

Session.belongsTo(Movie, {
  foreignKey: 'movie-id',
  targetKey: 'id'
});

Session.belongsTo(Hall, {
  foreignKey: 'hall-id',
  targetKey: 'id'
});

export default Session;
