import { Middleware } from 'koa';

export interface Controller {
  [key: string]: Middleware;
}
