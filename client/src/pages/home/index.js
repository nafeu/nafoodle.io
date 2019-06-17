import React, { useContext, useState, useEffect } from 'react';
import { SocketContext, Event } from 'react-socket-io';

function Home() {
  const [state, setState] = useState({
    clientId: null,
    pingCount: 0,
  });

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      setState({
        ...state,
        clientId: socket.id
      });
    }
  }, [socket]);

  const handleConnect = () => {
    setState({
      ...state,
      clientId: socket.id
    });
  }

  const handlePing = () => {
    socket.emit('ping');
    setState({
      ...state,
      pingCount: state.pingCount + 1,
    });
  }

  return (
    <div>
      <h2>Home</h2>
      <p>This is the homepage to {state.clientId} which pinged the server {state.pingCount} times.</p>
      <button onClick={handlePing}>
        Ping
      </button>
      <Event event='connect' handler={handleConnect} />
    </div>
  );
}

export default Home;
