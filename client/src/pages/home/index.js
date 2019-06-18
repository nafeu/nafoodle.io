import React, { useContext } from 'react';
import { SocketContext } from 'react-socket-io';
import { MainContext } from '../../context/main';

function Home() {
  const { state, dispatch } = useContext(MainContext);
  const socket = useContext(SocketContext);

  const sendMessage = () => dispatch({ type: 'SEND_MESSAGE' });

  const handleMessage = () => {
    socket.emit('message');
    sendMessage();
  }

  return (
    <React.Fragment>
      <h2>Home</h2>
      <p>This is the homepage to {state.clientId} which messaged the server {state.messageCount} times.</p>
      <button onClick={handleMessage}>
        Send Message
      </button>
    </React.Fragment>
  );
}

export default Home;
