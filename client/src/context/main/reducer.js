export const initialState = {
  clientId: null,
  testConnectionCount: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'TEST_CONNECTION':
      return {
        ...state,
        testConnectionCount: state.testConnectionCount + 1
      };
    case 'SET_CLIENT_ID':
      return {
        ...state,
        clientId: action.payload
      };
    default:
      return state;
  }
};
