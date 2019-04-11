import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';
import OrderModel from './Order';

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

User.hasMany(OrderModel, {
  as: 'orders',
  foreignKey: 'user-id',
  onDelete: 'cascade'
});

export default User;
