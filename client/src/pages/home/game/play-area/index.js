import React, { useContext, useEffect } from 'react';
import _ from 'lodash';
import { SocketContext } from 'react-socket-io';
import { MainContext } from '../../../../context/main';
import { getPlayers, getGameInfo, getCard } from '../services';

const ONE_SECOND = 1000;
const STATE_DELAY = ONE_SECOND;

function PlayArea({
  joinedRoom
}) {
  const { state } = useContext(MainContext);
  const socket = useContext(SocketContext);

  const { phase, youAreHost, results, isYourTurn } = getGameInfo(joinedRoom.gameState, state);

  const goToNextPhase = () => {
    socket.emit('playerInput', {
      input: {
        action: 'NEXT_PHASE',
      },
      roomId: joinedRoom.id
    });
  }

  useEffect(() => {
    if (youAreHost) {
      if (phase === 'START') {
        setTimeout(goToNextPhase, STATE_DELAY);
      }

      if (phase === 'TURN') {
        setTimeout(goToNextPhase, STATE_DELAY);
      }

      if (phase === 'DRAW') {
        setTimeout(goToNextPhase, STATE_DELAY);
      }

      if (phase === 'END') {
        setTimeout(goToNextPhase, STATE_DELAY);
      }

      if (phase === 'MATCH') {
        setTimeout(goToNextPhase, STATE_DELAY);
      }
    }
  }, [phase, youAreHost]);

  const handlePlayCard = (cardId, index) => {
    socket.emit('playerInput', {
      input: {
        action: 'PLAY_CARD',
        cardId,
        index,
      },
      roomId: joinedRoom.id
    });
  }

  const handleNewGame = () => {
    socket.emit('playerInput', {
      input: {
        action: 'NEW_GAME'
      },
      roomId: joinedRoom.id
    })
  }

  const { playerOne, playerTwo, activePlayer, you } = getPlayers(joinedRoom.gameState, state);

  return (
    <div>
      <h2>{phase}</h2>
      <h3>
        {phase === 'START' && ('Game will start shortly...')}
        {phase === 'TURN' && (`It is ${activePlayer.username}'s turn.`)}
        {phase === 'DRAW' && (`${activePlayer.username} is drawing cards.`)}
        {phase === 'ACTION' && (`${activePlayer.username} is now deciding what card to play.`)}
        {phase === 'END' && (`${activePlayer.username} has picked a card.`)}
        {phase === 'MATCH' && (`${playerOne.username} plays ${getCard(playerOne.action).name}, ${playerTwo.username} plays ${getCard(playerTwo.action).name}, ${results.message}.`)}
        {phase === 'RESULTS' && (`${results.winner}`)}
      </h3>
      {_.map(you.hand, (cardId, index) => {
        const { name } = getCard(cardId);

        if (isYourTurn) {
          return (
            <button onClick={() => handlePlayCard(cardId, index)}>{name}</button>
          );
        }

        return (
          <button disabled>{name}</button>
        );
      })}
      <p>{playerOne.username}'s HP: {playerOne.hp}</p>
      <p>{playerTwo.username}'s HP: {playerTwo.hp}</p>
      {phase === 'RESULTS' && youAreHost && (
        <button onClick={handleNewGame}>Play again.</button>
      )}
    </div>
  )
}

export default PlayArea;
