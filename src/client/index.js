import io from 'socket.io-client';
import socketEvents from './socket-events';
import {
  joinButton,
  createButton,
  usernameInput,
  roomInput,
} from './dom-elements';

const PORT = process.env.PORT || 8000;
const socket = io(`http://localhost:${PORT}`);

socketEvents.use(socket);

joinButton.addEventListener('click', () => {
  socket.emit('JOIN_ROOM', {
    username: usernameInput.value,
    room: roomInput.value,
  });
});

createButton.addEventListener('click', () => {
  socket.emit('CREATE_ROOM', {
    username: usernameInput.value,
  });
});
