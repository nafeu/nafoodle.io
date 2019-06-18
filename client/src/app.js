import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './app.css';
import Home from './pages/home';
import About from './pages/about';
import { SocketContext, Socket, Event } from 'react-socket-io';
import { MainContext, MainContextProvider } from "./context/main";

const uri = `http://localhost:${process.env.PORT || 8000}`;
const options = { transports: ['websocket'] };

function AppContainer() {
  return (
    <MainContextProvider>
      <Socket uri={uri} options={options}>
        <App/>
      </Socket>
    </MainContextProvider>
  );
}

function Navigation() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  )
}

function App() {
  const { dispatch } = useContext(MainContext);
  const socket = useContext(SocketContext);

  const setClientId = clientId => dispatch({ type: 'SET_CLIENT_ID', payload: clientId });

  const handleConnect = () => {
    setClientId(socket.id);
  }

  return (
    <Router>
      <React.Fragment>
        <Navigation/>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </React.Fragment>
      <Event event='connect' handler={handleConnect} />
    </Router>
  )
}

export default AppContainer;
