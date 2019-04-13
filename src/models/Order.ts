import Sequelize from 'sequelize';

import sequelize from '../config/sequelize';
import Bonus from './Bonus';

const Order = sequelize.define(
  'order',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    seats: {
      type: Sequelize.ARRAY(Sequelize.JSON)
    }
  },
  {
    schema: 'cinemaapp'
  }
);

export const OrderBonuses = sequelize.define(
  'order-bonuses',
  {
    'order-id': {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: 'id'
      }
    },
    'bonus-id': {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Bonus,
        key: 'id'
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  },
  {
    schema: 'cinemaapp'
  }
);

Order.belongsToMany(Bonus, {
  through: OrderBonuses,
  as: 'bonuses',
  foreignKey: 'order-id'
});

Bonus.belongsToMany(Order, {
  through: OrderBonuses,
  as: 'orders',
  foreignKey: 'bonus-id'
});

export default Order;
