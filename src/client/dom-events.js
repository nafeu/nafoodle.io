import {
  joinButton,
  createButton,
  usernameInput,
  roomInput,
  lobbyArea,
  waitingArea,
  inGameArea,
  clientStageAreas,
  playerList,
  startGameBtn,
} from './dom-elements';

import { isHost } from '../helpers';

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

    this.renderStage();
  }

  renderStage() {
    [].forEach.call(clientStageAreas, (area) => {
      const selectedArea = area;
      selectedArea.style.display = 'none';
    });

    switch (this.client.stage) {
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

  renderState() {
    const { users } = this.client.state;
    playerList.innerText = `Players: ${users.map(user => user.username).join(', ')}`;
    if (isHost(this.socket.id, users)) {
      startGameBtn.style.display = 'block';
    }
  }

  render() {
    this.renderStage();
    this.renderState();
  }
}
