import React, { useContext, useEffect } from 'react';
import { SocketContext, Event } from 'react-socket-io';
import { MainContext } from '../../context/main';
import toastr from 'toastr';

import Game from './game';
import Lobby from './lobby';

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

export default Home;
