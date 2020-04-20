import React, { useContext } from 'react';
import { SocketContext } from 'react-socket-io';
import { MainContext } from '../../../../context/main';
import { getPlayers, getGameInfo } from '../services';

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

  const { playerOne, playerTwo } = getPlayers(joinedRoom.gameState);
  const { isYourTurn, results, phase } = getGameInfo(joinedRoom.gameState, state);

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

      <p>{playerOne.username} {playerOne.move ? 'has made their decision.' : 'is picking...'}</p>
      <p>{playerTwo.username} {playerTwo.move ? 'has made their decision.' : 'is picking...'}</p>

      <p>{results}</p>

      {phase === 'RESULTS' && (
        <button onClick={handleClickNewGame}>NEW GAME</button>
      )}
    </div>
  )
}

export default PlayArea;
