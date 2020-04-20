import React, { useContext } from 'react';
import { SocketContext } from 'react-socket-io';
import { MainContext } from '../../../../context/main';

function PlayArea({
  joinedRoom
}) {
  const { state } = useContext(MainContext);
  const socket = useContext(SocketContext);

  const handleClick = (move) => {
    socket.emit('playerInput', {
      input: { move },
      roomId: joinedRoom.id
    });
  }

  const handleClickNewGame = () => {
    socket.emit('playerInput', {
      input: { action: 'NEW_GAME' },
      roomId: joinedRoom.id
    });
  }

  const { activePlayerIndex, players, phase, results } = joinedRoom.gameState;

  const isYourTurn = (phase === 'TURN' && players[activePlayerIndex].id === state.clientId);

  return (
    <div>
      <p>{isYourTurn ? 'It is YOUR turn. Choose your weapon' : 'It is your opponents turn, good luck' }.</p>

      {isYourTurn && (
        <div>
          <button onClick={() => handleClick('rock')}>ROCK</button>
          <button onClick={() => handleClick('paper')}>PAPER</button>
          <button onClick={() => handleClick('scissors')}>SCISSORS</button>
        </div>
      )}

      <p>{players[0].username} {players[0].move ? 'has made their decision.' : 'is picking...'}</p>
      <p>{players[1].username} {players[1].move ? 'has made their decision.' : 'is picking...'}</p>

      <p>{results}</p>

      {phase === 'RESULTS' && (
        <button onClick={handleClickNewGame}>NEW GAME</button>
      )}
    </div>
  )
}

export default PlayArea;
