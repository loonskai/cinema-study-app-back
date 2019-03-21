import * as passport from 'koa-passport';

export default {
  async signup(ctx: any) {
    ctx.body = 'sign up';
  },

  async signin(ctx: any) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/auth/signin'
    });
    ctx.body = 'sign in';
  },

  async signout(ctx: any) {
    ctx.body = 'sign out';
  },

  async verifyToken(ctx: any) {
    ctx.body = 'verify token';
  },

  async googleSignin(ctx: any) {
    passport.authenticate('google');
  }
};
