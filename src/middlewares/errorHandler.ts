export default async (ctx: any, next: any) => {
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
