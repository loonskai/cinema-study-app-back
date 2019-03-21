import * as Sequilize from 'sequelize';
import db from '../config/db';

const User = db.define(
  'user',
  {
    username: {
      type: Sequilize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequilize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequilize.STRING,
      allowNull: false
    }
  },
  {
    schema: 'cinemaapp'
  }
);

export default User;
