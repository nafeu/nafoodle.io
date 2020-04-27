import React, { useContext, useEffect } from 'react';
import { SocketContext, Event } from 'react-socket-io';
import { MainContext } from '../../context/main';
import toastr from 'toastr';

import PlayArea from './play-area';
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

  const handleStartGame = () => {
    socket.emit('startGame', { username: state.username, roomId: state.roomId });
  }

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', { roomId: state.roomId });
    props.history.push({
      search: ''
    });
    dispatch({ type: 'resetRoom' });
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

  const handleStartGameSuccess = (joinedRoom) => {
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

  const handleHostHasLeft = () => {
    socket.emit('leaveRoom', { roomId: state.roomId });
    props.history.push({
      search: ''
    });
    dispatch({ type: 'resetRoom' });
    toastr.warning('The host has left the game.');
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
        <PlayArea
          clientId={clientId}
          joinedRoom={joinedRoom}
          leaveRoom={handleLeaveRoom}
          leaveHostlessRoom={handleHostHasLeft}
          startGame={handleStartGame}
        />
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
      <Event event='startGameSuccess' handler={handleStartGameSuccess} />
      <Event event='joinRoomSuccess' handler={handleJoinRoomSuccess} />
      <Event event='updateRoom' handler={handleUpdateRoom} />
      <Event event='hostHasLeft' handler={handleHostHasLeft} />
    </React.Fragment>
  );
}

export default Home;
