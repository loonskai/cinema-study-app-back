import socketioJwt from 'socketio-jwt';

import { env } from '../config/env';
import orderService from './order';
import { SeatItem } from '../types/session';

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
    socket
      .on(
        'toggleReservation',
        async (data: { sessionID: number; item: SeatItem }) => {
          const isReservationSuccessful = await orderService.reserve(
            data.sessionID,
            data.item
          );
          if (isReservationSuccessful) {
            // io.sockets.emit('refreshSeats');
            socket.broadcast.emit('refreshSeats');
          }
        }
      )
      .on(
        'clearReservation',
        async (data: { sessionID: number; items: SeatItem[] }) => {
          const isReservationSuccessful = await orderService.cancelReservation(
            data.sessionID,
            data.items
          );
          if (isReservationSuccessful) {
            // io.sockets.emit('refreshSeats');
            socket.broadcast.emit('refreshSeats');
          }
        }
      );
  });
};
