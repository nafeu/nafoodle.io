import io from 'socket.io-client';
import SocketEvents from './socket-events';
import DomEvents from './dom-events';

const PORT = process.env.PORT || 8000;
const socket = io(`http://localhost:${PORT}`);

const client = {
  state: null,
  stage: 'LOBBY', // LOBBY, WAITING, IN-GAME
};

const domEvents = new DomEvents(socket, client);
const socketEvents = new SocketEvents(socket, client, domEvents);

domEvents.init();
socketEvents.init();
