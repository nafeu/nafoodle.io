import { toWords } from 'number-to-words';
import { capitalize } from '../../../../utils/helpers';
import _ from 'lodash';

export const getPlayers = ({ players, activePlayerIndex }) => {
  const output = {}

  _.each(players, (player, index) => {
    output[`player${capitalize(toWords(index + 1))}`] = player;
  });

  output['allPlayers'] = players;
  output['activePlayer'] = players[activePlayerIndex];

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
    isYourTurn: phase === 'TURN' && players[activePlayerIndex].id === clientId
  }

  return output;
}