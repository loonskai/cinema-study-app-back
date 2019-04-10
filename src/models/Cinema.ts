import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';
import HallModel from './Hall';
import BonusModel from './Bonus';

const Cinema = sequelize.define(
  'cinema',
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
    city: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    schema: 'cinemaapp'
  }
);

HallModel.belongsTo(Cinema, {
  targetkey: 'id',
  foreignKey: 'cinema-id'
});

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
