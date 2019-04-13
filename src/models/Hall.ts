import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';
import Row from './Row';

const Hall = sequelize.define(
  'hall',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    schema: 'cinemaapp'
  }
);

Hall.hasMany(Row, {
  as: 'rows',
  foreignKey: 'hall-id',
  onDelete: 'cascade'
});

export default Hall;
