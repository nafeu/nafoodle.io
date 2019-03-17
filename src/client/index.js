import io from 'socket.io-client';
import socketEvents from './socket-events';
import domEvents from './dom-events';

const PORT = process.env.PORT || 8000;
const socket = io(`http://localhost:${PORT}`);

const client = {
  username: null,
  roomId: null,
  state: 'LOBBY', // LOBBY, WAITING, IN-GAME
};

socketEvents.use(socket, client);
domEvents.use(socket, client);
