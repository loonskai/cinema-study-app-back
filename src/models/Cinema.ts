import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';
import HallModel from './Hall';
import BonusModel from './Bonus';

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

Cinema.hasMany(HallModel, {
  as: 'halls',
  foreignKey: 'cinema-id',
  onDelete: 'cascade'
});

Cinema.hasMany(BonusModel, {
  as: 'bonuses',
  foreignKey: 'cinema-id',
  onDelete: 'cascade'
});

export default Cinema;
