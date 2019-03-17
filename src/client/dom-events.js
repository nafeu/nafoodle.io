import {
  joinButton,
  createButton,
  usernameInput,
  roomInput,
  lobbyArea,
  waitingArea,
  inGameArea,
  clientStateAreas,
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

    this.renderClientState();
  }

  renderClientState() {
    [].forEach.call(clientStateAreas, (area) => {
      const selectedArea = area;
      selectedArea.style.display = 'none';
    });

    switch (this.client.state) {
      case 'LOBBY':
        lobbyArea.style.display = 'block';
        break;
      case 'WAITING':
        waitingArea.style.display = 'block';
        break;
      case 'IN-GAME':
        inGameArea.style.display = 'block';
        break;
      default:
        break;
    }
  }
}
