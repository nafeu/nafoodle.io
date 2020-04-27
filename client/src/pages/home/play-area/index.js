import React from 'react';
import WaitingArea from './waiting-area';
import Game from '../../../games/rps';

function PlayArea({
  clientId,
  joinedRoom,
  leaveRoom,
  startGame
}) {
  if (!joinedRoom) { return ""; }

  return (
    <React.Fragment>
      {joinedRoom.status === 'IN_GAME' ? (
        <Game
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

export default PlayArea;