import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './app.css';
import Home from './pages/home';
import About from './pages/about';
import { Socket } from 'react-socket-io';
import { MainContextProvider } from "./context/main";

const uri = `http://localhost:${process.env.PORT || 8000}`;
const options = { transports: ['websocket'] };

function App() {
  return (
    <MainContextProvider>
      <Socket uri={uri} options={options}>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
          </div>
        </Router>
      </Socket>
    </MainContextProvider>
  );
}

export default App;
