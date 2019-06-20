import React, { useContext } from 'react';
import { MainContext } from '../../context/main';

function About() {
  const { state } = useContext(MainContext);

  return (
    <div>
      <h2>About</h2>
      <p>This is the about page.</p>
      <p>Username: {state.username}</p>
    </div>
  );
}

export default About;