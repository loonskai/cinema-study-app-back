import * as Sequilize from 'sequelize';
import db from '../config/db';
import Cinema from './Cinema';
import Row from './Row';

const Hall = db.define(
  'hall',
  {
    title: {
      type: Sequilize.STRING,
      allowNull: false
    },
    cinemaId: {
      type: Sequilize.INTEGER,
      references: {
        model: Cinema,
        key: 'id'
      }
    },
    rows: Sequilize.ARRAY(Row)
  },
  {
    schema: 'cinemaapp'
  }
);

export default Hall;
