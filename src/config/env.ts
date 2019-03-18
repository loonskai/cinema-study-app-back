import * as yenv from 'yenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
export const env = yenv('env.yaml');
