export const initialState = {
  clientId: null,
  testConnectionCount: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'testConnection':
      return {
        ...state,
        testConnectionCount: state.testConnectionCount + 1
      };
    case 'setClientId':
      return {
        ...state,
        clientId: action.payload
      };
    default:
      return state;
  }
};
