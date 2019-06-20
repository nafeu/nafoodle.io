export const initialState = {
  clientId: '',
  username: '',
  roomId: '',
  joinedRoom: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
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
    case 'updateJoinedRoom':
      return {
        ...state,
        roomId: action.payload.id,
        joinedRoom: action.payload
      };
    default:
      return state;
  }
};
