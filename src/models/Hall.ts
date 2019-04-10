import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';
import RowModel from './Row';

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

Hall.hasMany(RowModel, {
  as: 'rows',
  foreignKey: 'hall-id',
  onDelete: 'cascade'
});

export default Hall;
