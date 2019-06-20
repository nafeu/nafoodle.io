import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './app.css';
import './vendor/toastr.css';
import Home from './pages/home';
import About from './pages/about';
import { SocketContext, Socket, Event } from 'react-socket-io';
import { MainContext, MainContextProvider } from "./context/main";
import toastr from 'toastr';

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

  useEffect(() => {
    const onevent = socket.onevent;

    socket.onevent = function (packet) {
        const args = packet.data || [];
        onevent.call(this, packet);
        packet.data = ["*"].concat(args);
        onevent.call(this, packet);
    };

    socket.on("*",function(event,data) {
      console.log(event);
      console.log(data);
    });
  }, [socket]);

  const setClientId = clientId => dispatch({ type: 'updateClientId', payload: clientId });

  const handleConnect = () => {
    setClientId(socket.id);
    toastr.success('Connected to server.');
  }

  const handleDisconnect = () => {
    toastr.error('Disconnected from server.');
  }

  const handleReconnectAttempt = () => {
    toastr.warning('Attempting to reconnect to server...');
  }

  const handleReconnectFailed = () => {
    toastr.error('Please check your connection.', 'Cannot reach the server right now.');
  }

  return (
    <Router>
      <React.Fragment>
        <Navigation/>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </React.Fragment>
      <Event event='connect' handler={handleConnect} />
      <Event event='disconnect' handler={handleDisconnect} />
      <Event event='reconnect_attempt' handler={handleReconnectAttempt} />
      <Event event='reconnect_failed' handler={handleReconnectFailed} />
    </Router>
  )
}

export default AppContainer;
