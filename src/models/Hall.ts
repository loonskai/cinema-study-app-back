import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';
import CinemaModel from './Cinema';
import RowModel from './Row';

const Hall = sequelize.define(
  'hall',
  {
    id: {
      type: Sequilize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: Sequilize.STRING,
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
