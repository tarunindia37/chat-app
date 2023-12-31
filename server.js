/* eslint-disable no-console */
/* eslint-disable import/extensions */
import 'dotenv/config.js';
import app from './src/app.js';
import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('client-msg', (msg) => {
    //console.log('Client =====>>', msg);
    io.emit('server-msg', msg);
  });
});

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server started at http://${HOSTNAME}:${PORT}`);
});
