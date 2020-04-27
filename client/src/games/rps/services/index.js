import { toWords } from 'number-to-words';
import { capitalize } from '../../../utils/helpers';
import _ from 'lodash';

const deck = [
  {
    id: 0,
    icon: '🗻',
    name: 'ROCK'
  },
  {
    id: 1,
    icon: '📃',
    name: 'PAPER'
  },
  {
    id: 2,
    icon: '✂️',
    name: 'SCISSORS'
  },
]

export const getPlayers = (gameState, localState) => {
  const output = {}

  const { players, activePlayerIndex } = gameState;
  const { clientId } = localState;

  _.each(players, (player, index) => {
    output[`player${capitalize(toWords(index + 1))}`] = player;
  });

  output['allPlayers'] = players;
  output['activePlayer'] = players[activePlayerIndex];
  output['you'] = _.find(players, player => player.id === clientId);
  output['opponent'] = _.find(players, player => player.id !== clientId);

  return output;
}

export const isHost = (clientId, userList) => {
  let output = false;
  userList.forEach((user) => {
    if (user.id === clientId && user.host) {
      output = true;
    }
  });
  return output;
}

export const getGameInfo = (gameState, localState) => {
  const {
    phase,
    activePlayerIndex,
    players,
    deck,
    results
  } = gameState;

  const { clientId } = localState;

  const output = {
    phase,
    results,
    isYourTurn: (phase === 'ACTION' || phase === 'TURN') && players[activePlayerIndex].id === clientId,
    isOpponentsTurn: (phase === 'ACTION' || phase === 'TURN') && players[activePlayerIndex].id !== clientId,
    youAreHost: isHost(clientId, players),
    deck
  }

  return output;
}

export const getAlertInfo = (gameState, localState) => {
  const defaults = {
    alertType: '',
    alertTitle: '',
    alertBody: ''
  }

  const { phase, results, isYourTurn } = getGameInfo(gameState, localState);
  const { playerOne, playerTwo, activePlayer, you, opponent } = getPlayers(gameState, localState);

  console.log({ phase, isYourTurn, you, activePlayer });

  if (phase === 'START') {
    return {
      ...defaults,
      alertTitle: `${playerOne.username} vs ${playerTwo.username}`,
      alertBody: 'Game is starting soon...'
    }
  }

  if (phase === 'TURN') {
    return {
      ...defaults,
      alertTitle: isYourTurn ? 'It is your turn.' : `${opponent.username}'s turn.`,
      alertBody: isYourTurn ? 'Make your move.' : 'Prepare yourself.',
      alertType: isYourTurn ? 'success' : 'error',
    }
  }

  if (phase === 'MATCH') {
    return {
      ...defaults,
      alertTitle: results.title,
      alertBody: results.body,
      alertType: results.recipientId ? 'error' : 'warning',
      recipientId: results.recipientId
    }
  }

  if (phase === 'RESULTS') {
    return {
      ...defaults,
      alertTitle: `${results.winner} is the winner.`,
      alertBody: 'Thanks for playing.',
      alertType: 'info',
    }
  }

  return {
    alertType: '',
    alertTitle: '',
    alertBody: ''
  };
}

export const getCard = (cardId) => {
  return _.find(deck, card => card.id === cardId);
}