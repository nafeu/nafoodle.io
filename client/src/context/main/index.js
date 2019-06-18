import React, { useReducer } from 'react';
import { initialState, reducer } from './reducer';

const MainContext = React.createContext();

function MainContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  );
}

const MainContextConsumer = MainContext.Consumer;

export { MainContext, MainContextProvider, MainContextConsumer };