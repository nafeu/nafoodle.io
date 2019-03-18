import toastr from 'toastr';

export default class SocketEvents {
  constructor(socket, client, domEvents) {
    this.socket = socket;
    this.client = client;
    this.domEvents = domEvents;
  }

  init() {
    const { socket, client, domEvents } = this;

    socket.on('connect', () => {
      console.log('Socket connection established');
    });

    socket.on('JOIN_ROOM_SUCCESS', (room) => {
      window.history.pushState(null, '', `?room=${room.id}`);
      client.state = room;
      client.stage = 'WAITING';
      domEvents.render();
    });

    socket.on('CREATE_ROOM_SUCCESS', (room) => {
      window.history.pushState(null, '', `?room=${room.id}`);
      client.state = room;
      client.stage = 'WAITING';
      domEvents.render();
    });

    socket.on('UPDATE_ROOM', (room) => {
      client.state = room;
      domEvents.renderState();
    });

    socket.on('INVALID_REQUEST', (data) => {
      toastr.warning(data.message);
    });

    socket.on('DEBUG_STATE', (state) => {
      document.querySelector('#state').innerHTML = `<code>${JSON.stringify(state, null, 2)}</code>`;
    });
  }
}
