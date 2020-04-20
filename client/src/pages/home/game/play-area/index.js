import React, { useContext } from 'react';
import { SocketContext } from 'react-socket-io';

function PlayArea({
  joinedRoom
}) {
  const socket = useContext(SocketContext);

  const handleClick = () => {
    socket.emit('playerInput', {
      input: { count: 1 },
      roomId: joinedRoom.id
    });
  }

  return (
    <div>
      {JSON.stringify(joinedRoom)}
      <button onClick={handleClick}>test</button>
    </div>
  )
}

export default PlayArea;
