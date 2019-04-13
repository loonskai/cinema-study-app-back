import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';
import Order from './Order';

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

User.hasMany(Order, {
  as: 'orders',
  foreignKey: 'user-id',
  onDelete: 'cascade'
});

Order.belongsTo(User, {
  foreignKey: 'user-id',
  targetKey: 'id'
});

export default User;
