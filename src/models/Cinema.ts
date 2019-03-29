import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';
import HallModel from './Hall';

const Cinema = sequelize.define(
  'cinema',
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
    city: {
      type: Sequilize.STRING,
      allowNull: false
    }
  },
  {
    schema: 'cinemaapp'
  }
);

Cinema.hasMany(HallModel, { as: 'halls', foreignKey: 'cinema-id' });

export default Cinema;
