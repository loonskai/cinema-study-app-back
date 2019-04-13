import { Context } from 'koa';

export default async (ctx: Context, next: Function): Promise<void> => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      error: true,
      message: err.message
    };
    ctx.app.emit('error', err, ctx);
  }
};
