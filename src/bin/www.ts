import http from 'http';
import { env } from '../config/env';
import app from '../app';

const server = http.createServer(app.callback());

server.listen(env.PORT, () => {
  const mode = env.NODE_ENV;
  console.log(`Server listening on ${env.PORT} in ${mode} mode`);
});
