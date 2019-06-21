import React from 'react';

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

export default Lobby;