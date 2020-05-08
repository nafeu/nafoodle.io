import _ from 'lodash';

export const getPlayer = (players, id) => {
  return _.find(players, { id });
}