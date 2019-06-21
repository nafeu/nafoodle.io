import React, { useContext, useEffect, useState } from 'react';
import { SocketContext, Event } from 'react-socket-io';
import { MainContext } from '../../context/main';
import toastr from 'toastr';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function Home(props) {
  const { state, dispatch } = useContext(MainContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    if (roomId) {
      dispatch({ type: 'updateRoomId', payload: roomId});
    }
  }, [dispatch])

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
    props.history.push({
      search: `?room=${joinedRoom.id}`
    });
    dispatch({ type: 'updateJoinedRoom', payload: joinedRoom });
  }

  const handleJoinRoomSuccess = (joinedRoom) => {
    props.history.push({
      search: `?room=${joinedRoom.id}`
    });
    dispatch({ type: 'updateJoinedRoom', payload: joinedRoom });
  }

  const handleUpdateRoom = (joinedRoom) => {
    dispatch({ type: 'updateJoinedRoom', payload: joinedRoom });
  }

  const {
    clientId,
    roomId,
    username,
    joinedRoom
  } = state;

  return (
    <React.Fragment>
      {joinedRoom ? (
        <Game clientId={clientId} joinedRoom={joinedRoom} />
      ) : (
        <Lobby
          username={username}
          roomId={roomId}
          changeUsername={handleChangeUsername}
          changeRoomId={handleChangeRoomId}
          joinRoom={handleJoinRoom}
          createRoom={handleCreateRoom}
        />
      )}
      <Event event='invalidRequest' handler={handleInvalidRequest} />
      <Event event='createRoomSuccess' handler={handleCreateRoomSuccess} />
      <Event event='joinRoomSuccess' handler={handleJoinRoomSuccess} />
      <Event event='updateRoom' handler={handleUpdateRoom} />
    </React.Fragment>
  );
}

function Lobby({
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

function Game({ clientId, joinedRoom }) {
  const joinableLink = `${window.location.host}/?room=${joinedRoom.id}`;
  const [copied, setCopied] = useState(false);

  return (
    <React.Fragment>
      <h2>Game</h2>
      <p>
        <strong>Link: </strong>
        <CopyToClipboard text={joinableLink}
          onCopy={() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 500);
          }}>
          <span>{copied ? 'Copied to clipboard!' : joinableLink}</span>
        </CopyToClipboard>
      </p>
      <p><strong>Status:</strong> {joinedRoom.status}</p>
      <p><strong>Users:</strong></p>
      <ul>
        {joinedRoom.users.map((user, index) => (
          <li key={index}>{clientId === user.id ? '(you) ' : ''}{user.username}{user.host ? ' is the host.' : ''}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default Home;
