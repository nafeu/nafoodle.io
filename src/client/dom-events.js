import {
  joinButton,
  createButton,
  usernameInput,
  roomInput,
} from './dom-elements';

const urlParams = new URLSearchParams(window.location.search);

function renderElements(state) {
  console.log('RENDERING', state);
}

export default {
  use: (socketConnection, connectedClient) => {
    const socket = socketConnection;
    const client = connectedClient;

    joinButton.addEventListener('click', () => {
      socket.emit('JOIN_ROOM', {
        username: usernameInput.value,
        roomId: roomInput.value,
      });
    });

    createButton.addEventListener('click', () => {
      socket.emit('CREATE_ROOM', {
        username: usernameInput.value,
      });
    });

    const roomParam = urlParams.get('room');
    if (roomParam && roomParam.length > 0) {
      roomInput.value = roomParam;
      createButton.style.display = 'none';
    }

    renderElements(client.state);
  },
};
