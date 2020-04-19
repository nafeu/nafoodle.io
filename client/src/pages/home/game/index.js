import React from 'react';
import WaitingArea from './waiting-area';
import PlayArea from './play-area';

function Game({
  clientId,
  joinedRoom,
  leaveRoom,
  startGame
}) {
  if (!joinedRoom) { return ""; }

  return (
    <React.Fragment>
      {joinedRoom.status === 'IN_GAME' ? (
        <PlayArea
          joinedRoom={joinedRoom}
        />
      ) : (
        <WaitingArea
          clientId={clientId}
          joinedRoom={joinedRoom}
          leaveRoom={leaveRoom}
          startGame={startGame}
        />
      )}
    </React.Fragment>
  );
}

export default Game;