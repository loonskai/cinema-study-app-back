import socketioJwt from 'socketio-jwt';

import { env } from '../config/env';

enum SocketEvents {
  CONNECTION = 'connection'
}

export default (io: any) => {
  io.on(
    SocketEvents.CONNECTION,
    socketioJwt.authorize({
      secret: env.JWT_SECRET,
      timeout: 15000,
      decodedPropertyName: 'tokenData'
    })
  ).on('authenticated', (socket: any) => {
    console.log(socket.id);
    console.log('auth via socket. your email: ' + socket.tokenData.email);
  });
};
