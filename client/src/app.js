import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './app.css';
import './vendor/toastr.css';
import Home from './pages/home';
import About from './pages/about';
import Sandbox from './pages/sandbox';
import { SocketContext, Socket, Event } from 'react-socket-io';
import { MainContext, MainContextProvider } from './context/main';
import theme from './context/theme';
import injectSheet, { ThemeProvider } from 'react-jss';
import toastr from 'toastr';
import Navigation from './components/navigation';

const uri = `http://localhost:${process.env.PORT || 8000}`;
const options = { transports: ['websocket'] };

toastr.options = {
  positionClass : "toast-top-center",
  maxOpened: 1,
  autoDismiss: true
};

const style = {
  '@global': {
    body: {
      fontFamily: `${theme.font}, sans-serif`,
      color: theme.colorPrimary,
      backgroundColor: theme.colorBackground,
      margin: "0",
      padding: "0",
    },
    '#toast-container > div': {
        backgroundColor: "none",
        fontSize: "0.75em"
    },
    '.toast': {
      backgroundColor: theme.colorBackground,
    },
    '.toast-success': {
      backgroundColor: theme.colorSuccess,
    },
    '.toast-error': {
      backgroundColor: theme.colorError,
    },
    '.toast-info': {
      backgroundColor: theme.colorInfo,
    },
    '.toast-warning': {
      backgroundColor: theme.colorWarning,
    }
  }
};

function AppContainer() {
  return (
    <ThemeProvider theme={theme}>
      <MainContextProvider>
        <Socket uri={uri} options={options}>
          <App/>
        </Socket>
      </MainContextProvider>
    </ThemeProvider>
  );
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
    // toastr.success('Connected to server.');
  }

  const handleDisconnect = () => {
    // toastr.error('Disconnected from server.');
  }

  const handleReconnectAttempt = () => {
    // toastr.warning('Attempting to reconnect to server...');
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
        <Route path="/sandbox" component={Sandbox} />
      </React.Fragment>
      <Event event='connect' handler={handleConnect} />
      <Event event='disconnect' handler={handleDisconnect} />
      <Event event='reconnect_attempt' handler={handleReconnectAttempt} />
      <Event event='reconnect_failed' handler={handleReconnectFailed} />
    </Router>
  )
}

export default injectSheet(style)(AppContainer);
