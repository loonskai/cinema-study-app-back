import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';
import RowModel from './Row';
import SessionModel from './Session';

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

Hall.hasMany(SessionModel, {
  as: 'sessions',
  foreignKey: 'hall-id',
  onDelete: 'cascade'
});

export default Hall;
