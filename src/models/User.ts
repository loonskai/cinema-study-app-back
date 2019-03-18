import * as Sequilize from 'sequelize';

const seq: any = Sequilize;
const sequilize = new seq(process.env.POSTGRES_URI);

const User = sequilize.define('user', {
  username: {
    type: Sequilize.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: Sequilize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequilize.STRING,
    allowNull: false
  }
});

export default User;
