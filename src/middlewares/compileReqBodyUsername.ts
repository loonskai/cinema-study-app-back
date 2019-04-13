import { Middleware } from 'koa';

const compileReqBodyUsername: Middleware = async (ctx, next) => {
  if (!ctx.request.body.username) {
    ctx.request.body.username = ctx.request.body.email;
  }
  await next();
};

export default compileReqBodyUsername;
