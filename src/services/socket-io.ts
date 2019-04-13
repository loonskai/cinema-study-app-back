import socketioJwt from 'socketio-jwt';

import { SeatItem } from '../types/session';
import { env } from '../config/env';
import orderService from './order';

enum SocketEvents {
  CONNECTION = 'connection',
  AUTHENTICATED = 'authenticated',
  TOGGLE_RESERVATION = 'toggleReservation',
  CLEAR_RESERVATION = 'clearReservation',
  REFRESH_SEATS = 'refreshSeats'
}

export default (io: any) => {
  io.on(
    SocketEvents.CONNECTION,
    socketioJwt.authorize({
      secret: env.JWT_SECRET,
      timeout: 15000,
      decodedPropertyName: 'tokenData'
    })
  ).on(SocketEvents.AUTHENTICATED, (socket: any) => {
    socket
      .on(
        SocketEvents.TOGGLE_RESERVATION,
        async (data: { sessionID: number; item: SeatItem }) => {
          const isReservationSuccessful = await orderService.reserve(
            socket.tokenData.id,
            data.sessionID,
            data.item
          );
          if (isReservationSuccessful) {
            socket.broadcast.emit(SocketEvents.REFRESH_SEATS);
          }
        }
      )
      .on(
        SocketEvents.CLEAR_RESERVATION,
        async (data: { sessionID: number; items: SeatItem[] }) => {
          const isReservationSuccessful = await orderService.cancelReservation(
            socket.tokenData.id,
            data.sessionID,
            data.items
          );
          if (isReservationSuccessful) {
            socket.broadcast.emit(SocketEvents.REFRESH_SEATS);
          }
        }
      );
  });
};
