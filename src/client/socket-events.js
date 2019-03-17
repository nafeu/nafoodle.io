import toastr from 'toastr';

export default {
  use: (socketConnection, connectedClient) => {
    const socket = socketConnection;
    const client = connectedClient;

    socket.on('connect', () => {
      console.log('Socket connection established');
    });

    socket.on('JOIN_ROOM_SUCCESS', ({ username, roomId }) => {
      client.username = username;
      client.roomId = roomId;
      client.state = 'WAITING';
    });

    socket.on('CREATE_ROOM_SUCCESS', ({ username, roomId }) => {
      client.username = username;
      client.roomId = roomId;
      client.state = 'WAITING';
    });

    socket.on('INVALID_REQUEST', (data) => {
      toastr.warning(data.message);
    });

    socket.on('DEBUG_STATE', (state) => {
      document.querySelector('#state').innerHTML = `<code>${JSON.stringify(state, null, 2)}</code>`;
    });

    return socket;
  },
};
