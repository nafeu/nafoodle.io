import React, { useContext } from 'react';
import { SocketContext, Event } from 'react-socket-io';
import { MainContext } from '../../context/main';
import toastr from 'toastr';

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

  const handleChangeUsername = (event) => {
    dispatch({ type: 'updateUsername', payload: event.target.value });
  }

  const handleCreateRoom = () => {
    socket.emit('createRoom', { username: state.username });
  }

  const handleInvalidRequest = ({ message }) => {
    toastr.warning(message);
  }

  return (
    <React.Fragment>
      <h2>Home</h2>
      <p>This is the homepage. You are connected as {state.clientId} which tested the server connection {state.testConnectionCount} times.</p>
      <input placeholder="Enter username" type="text" value={state.username} onChange={handleChangeUsername} />
      <button onClick={handleCreateRoom}>
        Create Room
      </button>
      <button onClick={handleTestConnection}>
        Test Connection
      </button>
      <Event event='invalidRequest' handler={handleInvalidRequest} />
    </React.Fragment>
  );
}

export default Home;
