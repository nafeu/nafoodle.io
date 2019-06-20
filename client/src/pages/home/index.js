import React, { useContext } from 'react';
import { SocketContext, Event } from 'react-socket-io';
import { MainContext } from '../../context/main';
import toastr from 'toastr';

function Home() {
  const { state, dispatch } = useContext(MainContext);
  const socket = useContext(SocketContext);

  const handleChangeUsername = (event) => {
    dispatch({ type: 'updateUsername', payload: event.target.value });
  }

  const handleCreateRoom = () => {
    socket.emit('createRoom', { username: state.username });
  }

  const handleInvalidRequest = ({ message }) => {
    toastr.warning(message);
  }

  const handleJoinRoom = (joinedRoom) => {
    dispatch({ type: 'updateJoinedRoom', payload: joinedRoom });
  }

  const {
    clientId,
    username,
    joinedRoom
  } = state;

  return (
    <React.Fragment>
      {joinedRoom ? (
        <Game joinedRoom={joinedRoom} />
      ) : (
        <Lobby
          clientId={clientId}
          username={username}
          handleChangeUsername={handleChangeUsername}
          handleCreateRoom={handleCreateRoom}
        />
      )}
      <Event event='invalidRequest' handler={handleInvalidRequest} />
      <Event event='createRoomSuccess' handler={handleJoinRoom} />
    </React.Fragment>
  );
}

function Lobby({
  clientId,
  username,
  handleChangeUsername,
  handleCreateRoom
}) {
  return (
    <React.Fragment>
      <h2>Lobby</h2>
      <p>You are connected with clientId: {clientId}</p>
      <input placeholder="Enter username" type="text" value={username} onChange={handleChangeUsername} />
      <button onClick={handleCreateRoom}>
        Create Room
      </button>
    </React.Fragment>
  );
}

function Game({ joinedRoom }) {
  return (
    <React.Fragment>
      <h2>Game</h2>
      <p>{JSON.stringify(joinedRoom)}</p>
    </React.Fragment>
  );
}

export default Home;
