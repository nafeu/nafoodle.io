import io from 'socket.io-client';
import socketEvents from './socket-events';
import {
  clearFieldValues,
  fieldsNotEmpty,
} from '../helpers';
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
  if (fieldsNotEmpty([usernameInput, roomInput])) {
    socket.emit('JOIN_ROOM', {
      username: usernameInput.value,
      room: roomInput.value,
    });
    clearFieldValues([usernameInput, roomInput]);
  }
});

createButton.addEventListener('click', () => {
  if (fieldsNotEmpty([usernameInput])) {
    socket.emit('CREATE_ROOM', {
      username: usernameInput.value,
    });
    clearFieldValues([usernameInput, roomInput]);
  }
});
