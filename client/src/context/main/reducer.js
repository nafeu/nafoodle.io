export const initialState = {
  clientId: null,
  messageCount: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SEND_MESSAGE':
      return {
        ...state,
        messageCount: state.messageCount + 1
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
