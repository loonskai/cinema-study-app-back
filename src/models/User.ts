import Sequilize from 'sequelize';

import sequelize from '../config/sequelize';

const User = sequelize.define(
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
    },
    role: {
      type: Sequilize.ENUM('client', 'admin'),
      default: 'client'
    }
  },
  {
    schema: 'cinemaapp',
    timestamps: false
  }
);

export default User;
