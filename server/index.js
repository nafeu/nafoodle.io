import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import morgan from 'morgan';
import socketIo from 'socket.io';

import api from './api/v1';
import connectRealtimeServices from './socket';
import store from './store';
import { addClient } from './store/actions';

const app = express();
const server = http.Server(app);
const io = socketIo(server);

server.listen(process.env.PORT || 8000, () => {
  const { port } = server.address();
  console.log(`[ server.js ] Listening on port ${port}`);
});

io.set('heartbeat timeout', 4000);
io.set('heartbeat interval', 2000);
io.on('connection', (socket) => {
  store.dispatch(addClient(socket.id));
  connectRealtimeServices({ io, socket, store });
});

app.use(morgan('short'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'client/build')));
app.use('/api', api.use(io, store));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

export const getIo = () => {
  return io;
}

export default app;