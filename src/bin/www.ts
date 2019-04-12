import http from 'http';
import io from 'socket.io';

import { env } from '../config/env';
import app from '../app';
import socketService from '../services/socket-io';

const server = http.createServer(app.callback());
const SocketConnection = io(server);
socketService(SocketConnection);
console.log('Socket connection established.');

server.listen(env.PORT, () => {
  const mode = env.NODE_ENV;
  console.log(`Server listening on ${env.PORT} in ${mode} mode`);
});
