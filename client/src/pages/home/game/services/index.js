import { toWords } from 'number-to-words';
import { capitalize } from '../../../../utils/helpers';
import _ from 'lodash';

const deck = [
  {
    id: 0,
    name: 'ROCK'
  },
  {
    id: 1,
    name: 'PAPER'
  },
  {
    id: 2,
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
    results
  } = gameState;

  const { clientId } = localState;

  const output = {
    phase,
    results,
    isYourTurn: phase === 'ACTION' && players[activePlayerIndex].id === clientId,
    youAreHost: isHost(clientId, players)
  }

  return output;
}

export const getCard = (cardId) => {
  return _.find(deck, card => card.id === cardId);
}