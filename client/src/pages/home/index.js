import React, { useContext, useEffect, useCallback } from 'react';
import { SocketContext, Event } from 'react-socket-io';
import { MainContext } from '../../context/main';

function Home() {
  const { state, dispatch } = useContext(MainContext);
  const socket = useContext(SocketContext);

  const sendMessage = () => dispatch({ type: 'SEND_MESSAGE' });
  const setClientId = useCallback(clientId => dispatch({ type: 'SET_CLIENT_ID', payload: clientId }), [dispatch]);

  useEffect(() => {
    if (state.clientId === null && socket) {
      setClientId(socket.id);
    }
  }, [state.clientId, socket, setClientId]);

  const handleConnect = () => {
    setClientId(socket.id);
  }

  const handleMessage = () => {
    socket.emit('message');
    sendMessage();
  }

  return (
    <div>
      <h2>Home</h2>
      <p>This is the homepage to {state.clientId} which messaged the server {state.messageCount} times.</p>
      <button onClick={handleMessage}>
        Send Message
      </button>
      <Event event='connect' handler={handleConnect} />
    </div>
  );
}

export default Home;
