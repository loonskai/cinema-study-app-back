import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';
import Hall from './Hall';
import Bonus from './Bonus';

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

Hall.belongsTo(Cinema, {
  targetkey: 'id',
  foreignKey: 'cinema-id'
});

Cinema.hasMany(Hall, {
  as: 'halls',
  foreignKey: 'cinema-id',
  onDelete: 'cascade'
});

Cinema.hasMany(Bonus, {
  as: 'bonuses',
  foreignKey: 'cinema-id',
  onDelete: 'cascade'
});

export default Cinema;
