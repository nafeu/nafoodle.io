import React from 'react';

import Hand from '../home/game/components/hand';
import Board from '../home/game/components/board';

function Sandbox() {
  return (
    <React.Fragment>
      <Board>
        <Hand hand={[0, 1, 2, 1, 0]}/>
      </Board>
    </React.Fragment>
  );
}

export default Sandbox;