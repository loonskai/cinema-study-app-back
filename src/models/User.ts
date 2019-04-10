import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';

const User = sequelize.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('client', 'admin'),
      default: 'client'
    }
  },
  {
    schema: 'cinemaapp',
    timestamps: false
  }
);

export default User;
