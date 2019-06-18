import React, { useContext } from 'react';
import { SocketContext } from 'react-socket-io';
import { MainContext } from '../../context/main';

function Home() {
  const { state, dispatch } = useContext(MainContext);
  const socket = useContext(SocketContext);

  const testConnection = () => {
    socket.emit('testConnection', state.testConnectionCount + 1);
    return dispatch({ type: 'testConnection' });
  };

  const handleTestConnection = () => {
    testConnection();
  }

  return (
    <React.Fragment>
      <h2>Home</h2>
      <p>This is the homepage. You are connected as {state.clientId} which tested the server connection {state.testConnectionCount} times.</p>
      <button onClick={handleTestConnection}>
        Test connection
      </button>
    </React.Fragment>
  );
}

export default Home;
