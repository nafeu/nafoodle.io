import io from 'socket.io-client';
import SocketEvents from './socket-events';
import DomEvents from './dom-events';

const PORT = process.env.PORT || 8000;
const socket = io(`http://localhost:${PORT}`);

const client = {
  username: null,
  roomId: null,
  state: 'LOBBY', // LOBBY, WAITING, IN-GAME
};

const socketEvents = new SocketEvents(socket, client);
const domEvents = new DomEvents(socket, client);

socketEvents.init();
domEvents.init();
