import seedrandom from 'seedrandom';
import _ from 'lodash';

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const weightedAverage = (x, w, N) => {
  return ((x * (N - 1)) + w) / N;
}

export const map = (value, origMin, origMax, mappedMin, mappedMax) => {
  return mappedMin + (mappedMax - mappedMin) * (value - origMin) / (origMax - origMin);
}

export const getRandomNumbers = (size) => {
  const rng = seedrandom();

  return _.map(_.range(size ? size : 10), iteration => {
    return parseFloat(rng().toFixed(2));
  });
}