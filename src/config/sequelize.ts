import Sequelize from 'sequelize';
import { env } from '../config/env';

const SequelizeModule: any = Sequelize;

const config =
  process.env.NODE_ENV === 'production'
    ? {
        dialect: 'postgres',
        host: `/cloudsql/${env.CLOUD_SQL_CONNECTION_NAME}`,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        database: env.DB_NAME,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
      }
    : {
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
      };

const sequelize = new SequelizeModule(config);

sequelize.sync();

export default sequelize;
