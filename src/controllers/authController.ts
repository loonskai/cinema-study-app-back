import { Context } from 'koa';

export default {
  async signup(ctx: Context) {
    ctx.body = 'sign up';
  },

  async signin(ctx: Context) {
    ctx.body = 'sign in';
  },

  async signout(ctx: Context) {
    ctx.body = 'sign out';
  },

  async verifyToken(ctx: Context) {
    ctx.body = 'verify token';
  }
};
