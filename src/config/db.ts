import Sequilize from 'sequelize';
import { env } from '../config/env';

const seq: any = Sequilize;

const db = new seq({
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

db.sync();

export default db;
