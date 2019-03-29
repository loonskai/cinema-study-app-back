import Sequelize from 'sequelize';
import { env } from '../config/env';

const SequelizeModule: any = Sequelize;

const sequelize = new SequelizeModule({
  dialect: 'postgres',
  host: env.DB_HOST,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.sync({ force: true });

export default sequelize;
