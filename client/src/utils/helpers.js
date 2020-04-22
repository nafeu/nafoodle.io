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