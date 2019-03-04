module.exports = {
  use: (socket) => {
    socket.on('connect', () => {
      console.log('Socket connection established');
    });

    socket.on('test', () => {
      console.log('Test message received');
    });

    socket.on('currentState', (state) => {
      document.querySelector('#state').innerHTML = `<code>${JSON.stringify(state, null, 2)}</code>`;
    });

    return socket;
  },
};
