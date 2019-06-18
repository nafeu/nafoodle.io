import React, { useReducer } from "react";

const MainContext = React.createContext();

const initialState = {
  clientId: null,
  messageCount: 0,
};

const reducer = (state, action) => {
  console.log(`${JSON.stringify(action)} --- ${JSON.stringify(state)}`);
  switch (action.type) {
    case "SEND_MESSAGE":
      return { ...state, messageCount: state.messageCount + 1 };
    case "SET_CLIENT_ID":
      return { ...state, clientId: action.payload };
    default:
      return state;
  }
};

function MainContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
  );
}

const MainContextConsumer = MainContext.Consumer;

export { MainContext, MainContextProvider, MainContextConsumer };