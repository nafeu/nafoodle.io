export const logger = ({ getState }) => {
  return next => (action) => {
    console.log('--- DISPATCH ---');
    console.log(JSON.stringify(action, null, 2));
    const returnValue = next(action);
    console.log('--- UPDATED STATE ---');
    console.log(JSON.stringify(getState(), null, 2));
    return returnValue;
  };
}
