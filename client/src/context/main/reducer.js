export const initialState = {
  clientId: '',
  testConnectionCount: 0,
  username: '',
  roomId: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'testConnection':
      return {
        ...state,
        testConnectionCount: state.testConnectionCount + 1
      };
    case 'updateClientId':
      return {
        ...state,
        clientId: action.payload
      };
    case 'updateUsername':
      return {
        ...state,
        username: action.payload
      };
    case 'updateRoomId':
      return {
        ...state,
        roomId: action.payload
      };
    default:
      return state;
  }
};
