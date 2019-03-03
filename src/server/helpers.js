module.exports = {
  generateUID: () => (`0000${(Math.random() * (36 ** 4) << 0).toString(36)}`).slice(-4),
  logger: ({ getState }) => {
    return next => (action) => {
      console.log('--- DISPATCH ---');
      console.log(JSON.stringify(action, null, 2));
      const returnValue = next(action);
      console.log('--- UPDATED STATE ---');
      console.log(JSON.stringify(getState(), null, 2));
      return returnValue;
    };
  },
};
