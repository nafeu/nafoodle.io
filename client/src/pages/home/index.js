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

  const handleChangeRoomId = (event) => {
    dispatch({ type: 'updateRoomId', payload: event.target.value });
  }

  const handleJoinRoom = () => {
    socket.emit('joinRoom', { username: state.username, roomId: state.roomId });
  }

  const handleCreateRoom = () => {
    socket.emit('createRoom', { username: state.username });
  }

  const handleInvalidRequest = ({ message }) => {
    toastr.warning(message);
  }

  const handleCreateRoomSuccess = (joinedRoom) => {
    dispatch({ type: 'updateJoinedRoom', payload: joinedRoom });
  }

  const handleJoinRoomSuccess = (joinedRoom) => {
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
          changeUsername={handleChangeUsername}
          changeRoomId={handleChangeRoomId}
          joinRoom={handleJoinRoom}
          createRoom={handleCreateRoom}
        />
      )}
      <Event event='invalidRequest' handler={handleInvalidRequest} />
      <Event event='createRoomSuccess' handler={handleCreateRoomSuccess} />
      <Event event='joinRoomSuccess' handler={handleJoinRoomSuccess} />
    </React.Fragment>
  );
}

function Lobby({
  clientId,
  username,
  roomId,
  changeUsername,
  changeRoomId,
  joinRoom,
  createRoom
}) {
  return (
    <React.Fragment>
      <h2>Lobby</h2>
      <p>You are connected with clientId: {clientId}</p>
      <input placeholder="Enter username" type="text" value={username} onChange={changeUsername} />
      <input placeholder="Enter room id" type="text" value={roomId} onChange={changeRoomId} />
      <button onClick={joinRoom}>
        Join Room
      </button>
      <button onClick={createRoom}>
        Create Room
      </button>
    </React.Fragment>
  );
}

function Game({ joinedRoom }) {
  return (
    <React.Fragment>
      <h2>Game</h2>
      <p><strong>Room:</strong> {joinedRoom.id}</p>
      <p><strong>Status:</strong> {joinedRoom.status}</p>
      <p><strong>Users:</strong></p>
      <ul>
        {joinedRoom.users.map((user, index) => (
          <li key={index}>{user.id} - {user.username}{user.host ? ' - host' : ''}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Home;
