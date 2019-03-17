import {
  joinButton,
  createButton,
  usernameInput,
  roomInput,
} from './dom-elements';

export default class DomEvents {
  constructor(socket, client) {
    this.socket = socket;
    this.client = client;
    this.urlParams = new URLSearchParams(window.location.search);
  }

  init() {
    const { socket, urlParams } = this;

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

    this.renderState();
  }

  renderState() {
    console.log('RENDERING', this.client.state);
  }
}
