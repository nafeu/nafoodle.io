import io from 'socket.io-client';
import EventManager from './event-manager';

const PORT = process.env.PORT || 8000;
const socket = io(`http://localhost:${PORT}`);

const client = {
  state: null,
  stage: 'LOBBY', // LOBBY, WAITING, IN-GAME
};

const eventManager = new EventManager(socket, client);

eventManager.init();
