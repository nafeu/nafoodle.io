import React, { useState } from 'react';
import _ from 'lodash';

import Hand from '../home/game/components/hand';
import Board from '../home/game/components/board';
import Deck from '../home/game/components/deck';
import Pile from '../home/game/components/pile';

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
        <button onClick={() => setHandA(handA + 1)}>Pick Up</button>
        <button onClick={() => setHandA(handA > 0 ? handA - 1 : 0)}>Drop</button>
        <Hand
          hand={handASet}
          owner={true}
          handleCardClick={handleOwnerCardClick}
          canClick={true}
        />
        <Hand
          hand={handASet}
          owner={false}
          position={'top'}
          handleCardClick={handleOpponentCardClick}
        />
        <Hand
          hand={handASet}
          owner={false}
          position={'left'}
          handleCardClick={handleOpponentCardClick}
        />
        <Hand
          hand={handASet}
          owner={false}
          position={'right'}
          handleCardClick={handleOpponentCardClick}
        />
        <Deck
          deck={_.map(_.range(50), i => 0)}
          position={'middle'}
        />
        <Pile
          pile={handASet}
          position={'middle'}
          player={'top'}
          messiness={5}
        />
        <Pile
          pile={handASet}
          position={'middle'}
          player={'bottom'}
          messiness={5}
        />
      </Board>
    </React.Fragment>
  );
}

export default Sandbox;