import io from 'socket.io-client';
import socketEvents from './socket-events';

const PORT = process.env.PORT || 8000;
const socket = io(`http://localhost:${PORT}`);

socketEvents.use(socket);
