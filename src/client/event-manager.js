import toastr from 'toastr';
import GameRenderer from './game/renderer';
import {
  joinButton,
  createButton,
  usernameInput,
  roomInput,
  lobbyArea,
  gameArea,
  clientStageAreas,
} from './dom-elements';

export default class EventManager {
  constructor(socket, client) {
    this.socket = socket;
    this.client = client;
    this.urlParams = new URLSearchParams(window.location.search);
    this.gameRenderer = new GameRenderer(socket, client);
  }

  init() {
    const { socket, client, urlParams } = this;
    const self = this;

    socket.on('connect', () => {
      console.log('Socket connection established');
    });

    socket.on('JOIN_ROOM_SUCCESS', (room) => {
      window.history.pushState(null, '', `?room=${room.id}`);
      client.state = room;
      client.stage = 'IN-GAME';
      self.render(room);
    });

    socket.on('CREATE_ROOM_SUCCESS', (room) => {
      window.history.pushState(null, '', `?room=${room.id}`);
      client.state = room;
      client.stage = 'IN-GAME';
      self.render(room);
    });

    socket.on('UPDATE_ROOM', (room) => {
      client.state = room;
      self.renderState();
    });

    socket.on('INVALID_REQUEST', (data) => {
      toastr.warning(data.message);
    });

    socket.on('DEBUG_STATE', (state) => {
      document.querySelector('#state').innerHTML = `<code>${JSON.stringify(state, null, 2)}</code>`;
    });

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
      case 'IN-GAME':
        gameArea.style.display = 'block';
        break;
      default:
        break;
    }
  }

  render(state) {
    this.renderStage();
    this.gameRenderer.render(state);
  }
}
