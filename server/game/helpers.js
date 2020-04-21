export const isLastPlayer = (gameState) => {
  return gameState.activePlayerIndex === gameState.playerCount - 1;
}

export const getPlayers = ({ players, activePlayerIndex }) => {
  const output = {}

  _.each(players, (player, index) => {
    output[`player${capitalize(toWords(index + 1))}`] = player;
  });

  output['allPlayers'] = players;
  output['activePlayer'] = players[activePlayerIndex];

  return output;
}