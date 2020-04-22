import React, { useState } from 'react';
import _ from 'lodash';

import Hand from '../home/game/components/hand';
import Board from '../home/game/components/board';

function Sandbox() {
  const [handA, setHandA] = useState(3);

  const handASet = _.map(_.range(handA), i => 1);

  const handleOwnerCardClick = (card, index) => {
    console.log(`Card is ${JSON.stringify(card)} with index of ${index}`)
  }

  const handleOpponentCardClick = (card, index) => {
    console.log(`Opponents card with index of ${index}`)
  }

  return (
    <React.Fragment>
      <Board>
        <button onClick={() => setHandA(handA + 1)}>Hand A</button>
        <Hand
          hand={handASet}
          owner={true}
          handleCardClick={handleOwnerCardClick}
        />
        <Hand
          hand={handASet}
          owner={false}
          position={'top'}
          handleCardClick={handleOpponentCardClick}
        />
      </Board>
    </React.Fragment>
  );
}

export default Sandbox;