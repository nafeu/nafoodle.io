import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './app.css';
import Home from './pages/home';
import About from './pages/about';

function App() {
  return (
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
  );
}

export default App;
