import toastr from 'toastr';

export default {
  use: (socket) => {
    socket.on('connect', () => {
      console.log('Socket connection established');
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
